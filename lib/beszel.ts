// Server-only module: Beszel (PocketBase) client, telemetry mapping and cache.
// Never import this file from a client component and never expose its
// credentials through NEXT_PUBLIC_* variables.

import { serverInfo, serverMetrics } from "@/lib/content"
import type { DashboardData, ServerMetric } from "@/lib/types"

const REQUEST_TIMEOUT_MS = 5000
const AUTH_TTL_MS = 30 * 60 * 1000
const DEFAULT_TTL_MS = 30 * 1000
const OFFLINE_TTL_MS = 10 * 1000

interface BeszelConfig {
  url: string
  email: string
  password: string
  system: string
  displayName: string
}

type DashboardRole = "home" | "vps"

const HOME_HOSTNAME = "home-server"
const VPS_HOSTNAME = "vps · vpn"

interface BeszelSystem {
  id?: string
  name?: string
  status?: string
  updated?: string
  info?: unknown
}

interface BeszelStatsRecord {
  created?: string
  stats?: unknown
}

interface BeszelList<T> {
  items?: T[]
}

interface MappedSnapshot {
  metrics: ServerMetric[]
  uptime: string
  networkUp: string
  networkDown: string
}

type JsonRecord = Record<string, unknown>

const EMPTY_METRICS: ServerMetric[] = [
  { label: "CPU", value: "—", percent: 0, tone: "warning" },
  { label: "RAM", value: "—", percent: 0, tone: "warning" },
  { label: "Disk", value: "—", percent: 0, tone: "warning" },
  { label: "Temp", value: "—", percent: 0, tone: "warning" },
]

let auth: { token: string; expiresAt: number } | null = null
const caches = new Map<DashboardRole, { data: DashboardData; expiresAt: number }>()
const lastLive = new Map<DashboardRole, DashboardData>()

function asRecord(value: unknown): JsonRecord | null {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return null
  }
  return value as JsonRecord
}

function toNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value
  }
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : null
  }
  return null
}

function firstNumber(...values: unknown[]): number | null {
  for (const value of values) {
    const parsed = toNumber(value)
    if (parsed !== null) {
      return parsed
    }
  }
  return null
}

function toPercent(value: number | null): number {
  if (value === null) {
    return 0
  }
  return Math.min(100, Math.max(0, Math.round(value)))
}

function ratio(used: number | null, total: number | null): number | null {
  if (used === null || total === null || total <= 0) {
    return null
  }
  return (used / total) * 100
}

function readCredentials(): Pick<BeszelConfig, "url" | "email" | "password"> | null {
  const url = process.env.BESZEL_URL?.trim().replace(/\/+$/, "")
  const email = process.env.BESZEL_EMAIL?.trim()
  const password = process.env.BESZEL_PASSWORD

  if (!url || !email || !password) {
    return null
  }

  return { url, email, password }
}

// Both systems live in the same Beszel hub, so they share the URL and the
// read-only credentials. Only the system name differs.
function homeConfig(): BeszelConfig | null {
  const credentials = readCredentials()

  if (!credentials) {
    return null
  }

  return {
    ...credentials,
    system: process.env.BESZEL_SYSTEM?.trim() ?? "",
    displayName: process.env.BESZEL_DISPLAY_NAME?.trim() || HOME_HOSTNAME,
  }
}

function vpsConfig(): BeszelConfig | null {
  const credentials = readCredentials()

  if (!credentials) {
    return null
  }

  return {
    ...credentials,
    system: process.env.BESZEL_VPS_SYSTEM?.trim() || "VPS",
    displayName: process.env.BESZEL_VPS_DISPLAY_NAME?.trim() || VPS_HOSTNAME,
  }
}

function cacheTtlMs(): number {
  const seconds = toNumber(process.env.BESZEL_REVALIDATE)
  if (seconds === null) {
    return DEFAULT_TTL_MS
  }
  return Math.min(300, Math.max(10, seconds)) * 1000
}

async function send(
  config: BeszelConfig,
  path: string,
  init: { method?: string; body?: unknown; token?: string | null } = {},
): Promise<Response> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    return await fetch(`${config.url}${path}`, {
      method: init.method ?? "GET",
      headers: {
        Accept: "application/json",
        ...(init.body === undefined ? {} : { "Content-Type": "application/json" }),
        ...(init.token ? { Authorization: init.token } : {}),
      },
      body: init.body === undefined ? undefined : JSON.stringify(init.body),
      cache: "no-store",
      signal: controller.signal,
    })
  } finally {
    clearTimeout(timeout)
  }
}

async function authenticate(config: BeszelConfig, force = false): Promise<string> {
  if (!force && auth && auth.expiresAt > Date.now()) {
    return auth.token
  }

  const response = await send(config, "/api/collections/users/auth-with-password", {
    method: "POST",
    body: { identity: config.email, password: config.password },
  })

  if (!response.ok) {
    throw new Error(`auth responded ${response.status}`)
  }

  const payload = (await response.json()) as JsonRecord
  const token = typeof payload.token === "string" ? payload.token : null

  if (!token) {
    throw new Error("auth returned no token")
  }

  auth = { token, expiresAt: Date.now() + AUTH_TTL_MS }
  return token
}

async function beszelGet<T>(config: BeszelConfig, path: string): Promise<T> {
  let token = await authenticate(config)
  let response = await send(config, path, { token })

  if (response.status === 401) {
    token = await authenticate(config, true)
    response = await send(config, path, { token })
  }

  if (!response.ok) {
    throw new Error(`${path} responded ${response.status}`)
  }

  return (await response.json()) as T
}

async function findSystem(config: BeszelConfig): Promise<BeszelSystem> {
  const response = await beszelGet<BeszelList<BeszelSystem>>(
    config,
    "/api/collections/systems/records?perPage=200&sort=name",
  )

  const systems = (response.items ?? []).filter((item) => typeof item?.id === "string")

  if (systems.length === 0) {
    throw new Error("no systems are shared with this user")
  }

  const wanted = config.system
  if (!wanted) {
    return systems[0]
  }

  const byId = systems.find((item) => item.id === wanted)
  if (byId) {
    return byId
  }

  const byName = systems.find((item) => item.name?.toLowerCase() === wanted.toLowerCase())
  if (byName) {
    return byName
  }

  throw new Error("configured system not found")
}

async function latestStats(
  config: BeszelConfig,
  systemId: string,
): Promise<BeszelStatsRecord | null> {
  const query = new URLSearchParams({
    filter: `(system='${systemId.replace(/'/g, "")}')`,
    sort: "-created",
    perPage: "1",
  })

  const response = await beszelGet<BeszelList<BeszelStatsRecord>>(
    config,
    `/api/collections/system_stats/records?${query.toString()}`,
  )

  return response.items?.[0] ?? null
}

function maxTemperature(value: unknown): number | null {
  if (Array.isArray(value)) {
    const values = value
      .map((item) => {
        const record = asRecord(item)
        return record ? firstNumber(record.v, record.value) : toNumber(item)
      })
      .filter((item): item is number => item !== null)

    return values.length > 0 ? Math.max(...values) : null
  }

  const record = asRecord(value)
  if (record) {
    const values = Object.values(record)
      .map((item) => toNumber(item))
      .filter((item): item is number => item !== null)

    return values.length > 0 ? Math.max(...values) : null
  }

  return toNumber(value)
}

function networkRates(info: JsonRecord, stats: JsonRecord): { up: number | null; down: number | null } {
  const bandwidth = Array.isArray(info.bb)
    ? info.bb
    : Array.isArray(stats.b)
      ? stats.b
      : null

  if (bandwidth) {
    return { up: firstNumber(bandwidth[0]), down: firstNumber(bandwidth[1]) }
  }

  // Older agents report megabytes per collection interval (about 60 seconds).
  const bytesPerSecond = (1024 * 1024) / 60
  const sent = firstNumber(stats.ns)
  const received = firstNumber(stats.nr)

  return {
    up: sent === null ? null : sent * bytesPerSecond,
    down: received === null ? null : received * bytesPerSecond,
  }
}

function formatSize(gigabytes: number | null, fallbackPercent: number | null): string {
  if (gigabytes !== null && gigabytes > 0) {
    if (gigabytes >= 1024) {
      return `${(gigabytes / 1024).toFixed(1)} TB`
    }
    if (gigabytes >= 1) {
      return `${gigabytes.toFixed(1)} GB`
    }
    return `${Math.round(gigabytes * 1024)} MB`
  }

  if (fallbackPercent !== null) {
    return `${Math.round(fallbackPercent)}%`
  }

  return "—"
}

function formatUptime(seconds: number | null): string {
  if (seconds === null || seconds <= 0) {
    return "—"
  }

  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  if (days > 0) {
    return `${days}d ${hours}h`
  }
  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }
  return `${minutes}m`
}

function formatRate(bytesPerSecond: number | null): string {
  if (bytesPerSecond === null || bytesPerSecond < 0) {
    return "—"
  }

  const bits = bytesPerSecond * 8

  if (bits >= 1_000_000) {
    return `${(bits / 1_000_000).toFixed(bits >= 10_000_000 ? 0 : 1)} Mbps`
  }
  if (bits >= 1_000) {
    return `${Math.round(bits / 1_000)} Kbps`
  }
  return `${Math.round(bits)} bps`
}

function metric(
  label: string,
  value: string,
  percent: number,
  tone: ServerMetric["tone"],
): ServerMetric {
  return { label, value, percent, tone: percent >= 90 ? "warning" : tone }
}

function mapSnapshot(info: JsonRecord, stats: JsonRecord): MappedSnapshot {
  const cpuPercent = toPercent(firstNumber(info.cpu, stats.cpu))

  const memTotal = firstNumber(stats.m)
  const memUsed = firstNumber(stats.mu)
  const memPercentValue = firstNumber(info.mp, stats.mp, ratio(memUsed, memTotal))

  const diskTotal = firstNumber(stats.d)
  const diskUsed = firstNumber(stats.du)
  const diskPercentValue = firstNumber(info.dp, stats.dp, ratio(diskUsed, diskTotal))

  const temperature = firstNumber(info.dt, stats.dt, maxTemperature(stats.t))
  // Agents without a temperature sensor report 0 instead of null; showing
  // "0°C" would look like a real reading, so treat 0 as "no sensor".
  const hasTemperature = temperature !== null && temperature > 0
  const { up, down } = networkRates(info, stats)

  return {
    metrics: [
      metric("CPU", `${Math.round(cpuPercent)}%`, cpuPercent, "accent"),
      metric("RAM", formatSize(memUsed, memPercentValue), toPercent(memPercentValue), "accent"),
      metric("Disk", formatSize(diskUsed, diskPercentValue), toPercent(diskPercentValue), "positive"),
      metric(
        "Temp",
        hasTemperature ? `${Math.round(temperature)}°C` : "—",
        hasTemperature ? toPercent(temperature) : 0,
        "positive",
      ),
    ],
    uptime: formatUptime(firstNumber(info.u)),
    networkUp: formatRate(up),
    networkDown: formatRate(down),
  }
}

function toIso(value: string | undefined): string | null {
  if (!value) {
    return null
  }

  const parsed = new Date(value.includes(" ") ? value.replace(" ", "T") : value)
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString()
}

function isOnline(system: BeszelSystem): boolean {
  return !system.status || system.status === "up"
}

async function fetchDashboard(config: BeszelConfig): Promise<DashboardData> {
  const system = await findSystem(config)
  const statsRecord = await latestStats(config, system.id as string)

  const info = asRecord(system.info) ?? {}
  const stats = asRecord(statsRecord?.stats) ?? {}
  const snapshot = mapSnapshot(info, stats)

  return {
    status: isOnline(system) ? "live" : "offline",
    hostname: config.displayName || system.name || HOME_HOSTNAME,
    updatedAt: toIso(system.updated) ?? new Date().toISOString(),
    ...snapshot,
  }
}

function demoDashboard(): DashboardData {
  return {
    status: "demo",
    hostname: serverInfo.hostname,
    uptime: serverInfo.uptime,
    networkUp: serverInfo.networkUp,
    networkDown: serverInfo.networkDown,
    updatedAt: null,
    metrics: serverMetrics,
  }
}

function offlineDashboard(previous: DashboardData | null, hostname: string): DashboardData {
  if (previous && previous.status !== "demo") {
    return { ...previous, status: "offline" }
  }

  return {
    status: "offline",
    hostname: previous?.hostname || hostname,
    uptime: "—",
    networkUp: "—",
    networkDown: "—",
    updatedAt: null,
    metrics: EMPTY_METRICS,
  }
}

// The VPS agent has no temperature sensor, so its snapshot only carries the
// metrics the panel actually shows; traffic sits in that slot instead.
function finalize(role: DashboardRole, data: DashboardData): DashboardData {
  if (role !== "vps") {
    return data
  }

  return {
    ...data,
    metrics: data.metrics.filter((metric) => metric.label !== "Temp"),
  }
}

async function loadDashboard(
  role: DashboardRole,
  config: BeszelConfig,
  fallbackHostname: string,
): Promise<DashboardData> {
  const cached = caches.get(role)

  if (cached && cached.expiresAt > Date.now()) {
    return cached.data
  }

  try {
    const data = finalize(role, await fetchDashboard(config))
    if (data.status === "live") {
      lastLive.set(role, data)
    }
    caches.set(role, { data, expiresAt: Date.now() + cacheTtlMs() })
    return data
  } catch (error) {
    // Never log credentials or tokens; the message only contains a path/status.
    const message = error instanceof Error ? error.message : "unknown error"
    console.warn(`[beszel] ${role} dashboard unavailable: ${message}`)

    const data = finalize(role, offlineDashboard(lastLive.get(role) ?? null, fallbackHostname))
    caches.set(role, { data, expiresAt: Date.now() + OFFLINE_TTL_MS })
    return data
  }
}

export async function getDashboardData(): Promise<DashboardData> {
  const config = homeConfig()

  if (!config) {
    // Demo values are a development-only fallback and always carry a visible
    // `demo` label. Production without credentials reports `offline`.
    const data =
      process.env.NODE_ENV === "production"
        ? offlineDashboard(null, HOME_HOSTNAME)
        : demoDashboard()
    caches.set("home", { data, expiresAt: Date.now() + DEFAULT_TTL_MS })
    return data
  }

  return loadDashboard("home", config, HOME_HOSTNAME)
}

// The VPS system is optional: without configuration it reports `offline` with
// dashes. Demo values are never used here, because they would look like real
// telemetry from a second machine.
export async function getVpsDashboardData(): Promise<DashboardData> {
  const config = vpsConfig()

  if (!config) {
    const data = finalize("vps", offlineDashboard(null, VPS_HOSTNAME))
    caches.set("vps", { data, expiresAt: Date.now() + DEFAULT_TTL_MS })
    return data
  }

  return loadDashboard("vps", config, VPS_HOSTNAME)
}
