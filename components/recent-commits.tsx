import { ArrowUpRight } from "lucide-react"

import { formatDate } from "@/lib/content"
import type { CommitFeed } from "@/lib/types"

const VISIBLE_LIMIT = 3

function statusLabel(feed: CommitFeed): string {
  if (!feed.updatedAt) {
    return "offline · no data"
  }

  const time = `${feed.updatedAt.slice(11, 16)} UTC`
  return feed.status === "live" ? `updated ${time}` : `offline · updated ${time}`
}

export function RecentCommits({ feed }: { feed: CommitFeed }) {
  const items = feed.commits.slice(0, VISIBLE_LIMIT)

  return (
    <div>
      {items.length === 0 ? (
        <p className="py-4 font-mono text-[9px] uppercase tracking-[0.14em] text-muted/80">
          no data
        </p>
      ) : (
        <ol className="divide-y divide-line/40">
          {items.map((item) => (
            <li key={item.sha}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-[74px_1fr_auto] items-center gap-3 py-4 sm:grid-cols-[92px_1fr_auto] sm:gap-5"
              >
                <time
                  dateTime={item.date}
                  className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted/80"
                >
                  {formatDate(item.date.slice(0, 10))}
                </time>
                <span className="flex min-w-0 items-center gap-2.5">
                  <span className="truncate text-[13px] text-foreground/90 transition group-hover:text-accent-soft">
                    {item.message}
                  </span>
                  <span className="hidden shrink-0 font-mono text-[8px] uppercase tracking-[0.14em] text-muted/80 sm:inline">
                    {item.repo}
                  </span>
                </span>
                <ArrowUpRight
                  className="size-3.5 text-muted/80 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ol>
      )}

      <p className="mt-3 font-mono text-[8px] uppercase tracking-[0.14em] text-muted/80">
        {statusLabel(feed)}
      </p>
    </div>
  )
}

export function CommitsSkeleton() {
  return (
    <div role="status" aria-live="polite" aria-label="Loading commits" className="divide-y divide-line/40">
      <span className="sr-only">Loading commits</span>

      {[0, 1, 2].map((row) => (
        <div
          key={row}
          className="grid grid-cols-[74px_1fr] items-center gap-3 py-4 sm:grid-cols-[92px_1fr] sm:gap-5"
          aria-hidden="true"
        >
          <div className="h-2 w-14 animate-pulse rounded-full bg-line/50" />
          <div className="h-2.5 w-3/4 animate-pulse rounded-full bg-line/40" />
        </div>
      ))}
    </div>
  )
}
