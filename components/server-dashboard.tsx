import { ArrowDown, ArrowUp } from "lucide-react"

import type { DashboardData, ServerMetric } from "@/lib/types"
import { cn } from "@/lib/utils"

interface ServerDashboardProps {
  data: DashboardData
}

const toneBar: Record<ServerMetric["tone"], string> = {
  accent: "bg-accent/70",
  positive: "bg-positive/70",
  warning: "bg-warning/70",
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

export function ServerDashboard({ data }: ServerDashboardProps) {
  const stamp = formatStamp(data.updatedAt)

  return (
    <div className="w-full rounded-xl border border-line/50 bg-surface/30 p-5 sm:p-7 lg:p-8">
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted/80">
          {data.hostname}
        </p>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em]",
            statusText[data.status],
          )}
        >
          <span className={cn("size-1.5 rounded-full", statusDot[data.status])} />
          {statusLabel[data.status]}
        </span>
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-x-5 gap-y-7 sm:grid-cols-4 sm:gap-x-8">
        {data.metrics.map((metric) => (
          <div key={metric.label}>
            <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted/80">
              {metric.label}
            </dt>
            <dd className="mt-2 text-2xl font-light tracking-[-0.03em] text-foreground sm:text-3xl">
              {metric.value}
              <span
                className="mt-3 block h-px overflow-hidden bg-line/60"
                role="progressbar"
                aria-label={metric.label}
                aria-valuenow={metric.percent}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <span
                  className={cn("block h-full", toneBar[metric.tone])}
                  style={{ width: `${metric.percent}%` }}
                />
              </span>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 flex flex-col gap-3 border-t border-line/40 pt-5 font-mono text-[11px] text-muted/80 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="inline-flex items-center gap-1.5">
            <ArrowDown className="size-3 text-accent/70" aria-hidden="true" />
            {data.networkDown}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ArrowUp className="size-3 text-positive/70" aria-hidden="true" />
            {data.networkUp}
          </span>
          <span className="text-muted/80">uptime {data.uptime}</span>
        </div>

        <span className="shrink-0 text-[11px] uppercase tracking-[0.14em] text-muted/80">
          {data.status === "demo"
            ? "demo data"
            : stamp
              ? `updated ${stamp}`
              : "no data"}
        </span>
      </div>
    </div>
  )
}
