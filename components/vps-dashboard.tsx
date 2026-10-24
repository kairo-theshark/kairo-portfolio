import { ArrowDown, ArrowUp } from "lucide-react"

import type { DashboardData } from "@/lib/types"
import { cn } from "@/lib/utils"

interface VpsDashboardProps {
  data: DashboardData
}

const statusLabel: Record<DashboardData["status"], string> = {
  live: "online",
  offline: "offline",
  demo: "demo",
}

const statusText: Record<DashboardData["status"], string> = {
  live: "text-positive",
  offline: "text-warning",
  demo: "text-muted/80",
}

const statusDot: Record<DashboardData["status"], string> = {
  live: "animate-pulse-dot bg-positive",
  offline: "bg-warning",
  demo: "bg-muted/40",
}

function formatStamp(value: string | null): string | null {
  if (!value) {
    return null
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return null
  }

  // UTC keeps server-rendered and client-rendered output identical.
  return `${date.toISOString().slice(11, 16)} UTC`
}

// Compact companion to ServerDashboard: the same Beszel fields, one size down,
// no progress bars, so the home-server panel stays the primary surface. The VPS
// agent has no temperature sensor, so traffic takes that slot instead.
export function VpsDashboard({ data }: VpsDashboardProps) {
  const stamp = formatStamp(data.updatedAt)

  return (
    <section
      aria-label="VPS and VPN telemetry"
      className="w-full rounded-xl border border-line/50 bg-surface/20 p-4"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted/80">
          {data.hostname}
        </p>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em]",
            statusText[data.status],
          )}
        >
          <span className={cn("size-1.5 rounded-full", statusDot[data.status])} aria-hidden="true" />
          {statusLabel[data.status]}
        </span>
      </div>

      <dl className="mt-3 grid grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-4 sm:gap-x-8">
        <div>
          <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted/80">
            Traffic
          </dt>
          <dd className="mt-1.5 text-lg font-light tracking-[-0.02em] text-foreground/75">
            <span className="flex items-center gap-1.5">
              <ArrowDown className="size-3 shrink-0 text-accent/70" aria-hidden="true" />
              {data.networkDown}
            </span>
            <span className="mt-0.5 flex items-center gap-1.5">
              <ArrowUp className="size-3 shrink-0 text-positive/70" aria-hidden="true" />
              {data.networkUp}
            </span>
          </dd>
        </div>

        {data.metrics.map((metric) => (
          <div key={metric.label}>
            <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted/80">
              {metric.label}
            </dt>
            <dd className="mt-1.5 text-lg font-light tracking-[-0.02em] text-foreground/75">
              {metric.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-3 flex flex-col gap-2 border-t border-line/40 pt-3 font-mono text-[10px] text-muted/80 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-muted/80">uptime {data.uptime}</span>

        <span className="shrink-0 text-[8px] uppercase tracking-[0.14em] text-muted/80">
          {stamp ? `updated ${stamp}` : "no data"}
        </span>
      </div>
    </section>
  )
}
