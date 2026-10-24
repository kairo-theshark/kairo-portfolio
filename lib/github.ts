// Server-only module: GitHub REST client for the public commit feed.
// It uses no credentials and never reads tokens. Never import this file from a
// client component; the feed is fetched and cached in the Node.js process.

import { githubOwner } from "@/lib/content"
import type { CommitFeed, CommitItem } from "@/lib/types"

const API_BASE = "https://api.github.com"
const REQUEST_TIMEOUT_MS = 5000
const CACHE_TTL_MS = 15 * 60 * 1000
const OFFLINE_TTL_MS = 60 * 1000
const COMMITS_PER_PAGE = 20
const REPOS_PER_PAGE = 100
const TOTAL_LIMIT = 20
// Safety bound when the API order does not match the committer date order.
const MAX_PAGES_PER_REPO = 10
const REPO_CONCURRENCY = 5

interface Repo {
  fullName: string
  branch: string
  name: string
}

interface ParsedCommit {
  item: CommitItem
  time: number
}

class GithubError extends Error {
  readonly status: number
  readonly retryAt: number | null

  constructor(message: string, status: number, retryAt: number | null = null) {
    super(message)
    this.name = "GithubError"
    this.status = status
    this.retryAt = retryAt
  }
}

async function request(url: string): Promise<Response> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    return await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      cache: "no-store",
      signal: controller.signal,
    })
  } finally {
    clearTimeout(timeout)
  }
}

function retryAtFrom(response: Response): number | null {
  const retryAfter = Number(response.headers.get("retry-after"))

  if (Number.isFinite(retryAfter) && retryAfter > 0) {
    return Date.now() + retryAfter * 1000
  }

  const remaining = response.headers.get("x-ratelimit-remaining")
  const reset = Number(response.headers.get("x-ratelimit-reset"))

  if (remaining === "0" && Number.isFinite(reset) && reset > 0) {
    return reset * 1000
  }

  return null
}

async function getJson(url: string): Promise<unknown> {
  const response = await request(url)

  if (!response.ok) {
    // Rate limits arrive as 403 (primary/secondary) or 429, both with hints.
    const limited = response.status === 403 || response.status === 429

    throw new GithubError(
      `responded ${response.status}`,
      response.status,
      limited ? retryAtFrom(response) : null,
    )
  }

  return response.json()
}

function parseRepo(value: unknown): Repo | null {
  if (typeof value !== "object" || value === null) {
    return null
  }

  const record = value as Record<string, unknown>
  const fullName = record.full_name
  const branch = record.default_branch

  if (typeof fullName !== "string" || typeof branch !== "string" || !branch) {
    return null
  }

  return { fullName, branch, name: fullName.split("/").pop() ?? fullName }
}

function parseCommit(repoName: string, value: unknown): ParsedCommit | null {
  if (typeof value !== "object" || value === null) {
    return null
  }

  const record = value as Record<string, unknown>

  // Merge commits are the only ones with more than one parent.
  if (Array.isArray(record.parents) && record.parents.length > 1) {
    return null
  }

  const sha = record.sha
  const url = record.html_url
  const commit = record.commit

  if (typeof sha !== "string" || typeof url !== "string" || !url.startsWith("https://github.com/")) {
    return null
  }

  if (typeof commit !== "object" || commit === null) {
    return null
  }

  const details = commit as Record<string, unknown>
  const committer = details.committer
  const rawDate =
    typeof committer === "object" && committer !== null
      ? (committer as Record<string, unknown>).date
      : null
  const time = typeof rawDate === "string" ? Date.parse(rawDate) : Number.NaN
  const message = typeof details.message === "string" ? details.message.split("\n")[0].trim() : ""

  if (!Number.isFinite(time) || !message) {
    return null
  }

  return {
    item: {
      repo: repoName,
      sha,
      message,
      date: new Date(time).toISOString(),
      url,
    },
    time,
  }
}

async function listRepos(): Promise<Repo[]> {
  const repos: Repo[] = []

  for (let page = 1; ; page += 1) {
    const payload = await getJson(
      `${API_BASE}/users/${encodeURIComponent(githubOwner)}/repos?type=owner&per_page=${REPOS_PER_PAGE}&page=${page}`,
    )

    if (!Array.isArray(payload)) {
      throw new GithubError("unexpected repository payload", 0)
    }

    for (const value of payload) {
      const repo = parseRepo(value)

      if (repo) {
        repos.push(repo)
      }
    }

    // The last page is the first one that is not full; no fixed page cap.
    if (payload.length < REPOS_PER_PAGE) {
      return repos
    }
  }
}

async function listRepoCommits(repo: Repo): Promise<CommitItem[]> {
  const items = new Map<string, ParsedCommit>()
  let ordered = true
  let oldestSeen = Number.POSITIVE_INFINITY

  for (let page = 1; page <= MAX_PAGES_PER_REPO; page += 1) {
    const payload = await getJson(
      `${API_BASE}/repos/${repo.fullName}/commits?sha=${encodeURIComponent(repo.branch)}&per_page=${COMMITS_PER_PAGE}&page=${page}`,
    )

    if (!Array.isArray(payload)) {
      throw new GithubError("unexpected commit payload", 0)
    }

    if (payload.length === 0) {
      break
    }

    for (const value of payload) {
      // Merge commits are dropped before the window is applied, so a page full
      // of merges keeps reading following pages instead of shortening the feed.
      const parsed = parseCommit(repo.name, value)

      if (!parsed) {
        continue
      }

      // GitHub returns commits newest first. If a later page contradicts the
      // committer date order, keep reading instead of stopping at the window.
      if (parsed.time > oldestSeen) {
        ordered = false
      }

      oldestSeen = Math.min(oldestSeen, parsed.time)
      items.set(parsed.item.sha, parsed)
    }

    if (items.size >= TOTAL_LIMIT && ordered) {
      break
    }

    if (payload.length < COMMITS_PER_PAGE) {
      break
    }
  }

  return [...items.values()]
    .sort((a, b) => b.time - a.time || a.item.sha.localeCompare(b.item.sha))
    .slice(0, TOTAL_LIMIT)
    .map((entry) => entry.item)
}

async function mapLimit<T, R>(
  items: T[],
  limit: number,
  task: (item: T) => Promise<R>,
): Promise<Array<PromiseSettledResult<R>>> {
  const results: Array<PromiseSettledResult<R>> = new Array(items.length)
  let cursor = 0

  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor
      cursor += 1

      try {
        results[index] = { status: "fulfilled", value: await task(items[index]) }
      } catch (error) {
        results[index] = { status: "rejected", reason: error }
      }
    }
  })

  await Promise.all(workers)
  return results
}

async function loadFeed(): Promise<CommitFeed> {
  const repos = await listRepos()
  const results = await mapLimit(repos, REPO_CONCURRENCY, listRepoCommits)

  const candidates = new Map<string, ParsedCommit>()
  let incomplete = false
  let retryAt: number | null = null

  for (const result of results) {
    if (result.status === "fulfilled") {
      for (const item of result.value) {
        candidates.set(item.sha, { item, time: Date.parse(item.date) })
      }

      continue
    }

    const error = result.reason

    // Deleted or no longer public (404) and empty repositories (409) are not
    // failures: the repository is simply skipped.
    if (error instanceof GithubError && (error.status === 404 || error.status === 409)) {
      continue
    }

    incomplete = true
    if (error instanceof GithubError && error.retryAt) {
      retryAt = retryAt === null ? error.retryAt : Math.max(retryAt, error.retryAt)
    }
  }

  // A partial result must never replace the last complete snapshot.
  if (incomplete) {
    throw new GithubError("incomplete repository data", 0, retryAt)
  }

  return {
    status: "live",
    updatedAt: new Date().toISOString(),
    commits: [...candidates.values()]
      .sort((a, b) => b.time - a.time || a.item.sha.localeCompare(b.item.sha))
      .slice(0, TOTAL_LIMIT)
      .map((entry) => entry.item),
  }
}

let cache: { feed: CommitFeed; expiresAt: number } | null = null
let lastGood: CommitFeed | null = null
let inflight: Promise<CommitFeed> | null = null

function offlineFeed(): CommitFeed {
  return lastGood
    ? { ...lastGood, status: "offline" }
    : { status: "offline", updatedAt: null, commits: [] }
}

async function refresh(): Promise<CommitFeed> {
  try {
    const feed = await loadFeed()
    lastGood = feed
    cache = { feed, expiresAt: Date.now() + CACHE_TTL_MS }
    return feed
  } catch (error) {
    // Only a path or a status code is logged, never payloads or credentials.
    const message = error instanceof Error ? error.message : "unknown error"
    console.warn(`[github] commit feed unavailable: ${message}`)

    const retryAt = error instanceof GithubError ? error.retryAt : null
    const wait = retryAt === null ? OFFLINE_TTL_MS : Math.max(retryAt - Date.now(), OFFLINE_TTL_MS)
    const feed = offlineFeed()

    // Do not retry while a rate limit is still in effect.
    cache = { feed, expiresAt: Date.now() + Math.min(wait, CACHE_TTL_MS) }
    return feed
  }
}

export async function getCommitFeed(): Promise<CommitFeed> {
  if (cache && cache.expiresAt > Date.now()) {
    return cache.feed
  }

  // A cold cache must not trigger the same refresh several times concurrently.
  if (!inflight) {
    inflight = refresh().finally(() => {
      inflight = null
    })
  }

  return inflight
}
