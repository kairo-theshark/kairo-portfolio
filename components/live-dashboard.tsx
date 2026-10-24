"use client"

import { useEffect, useState } from "react"

import { ServerDashboard } from "@/components/server-dashboard"
import { VpsDashboard } from "@/components/vps-dashboard"
import type { DashboardData, DashboardResponse } from "@/lib/types"

const REFRESH_INTERVAL_MS = 30_000

interface LiveDashboardProps {
  initial: DashboardData
  initialVps: DashboardData
}

export function LiveDashboard({ initial, initialVps }: LiveDashboardProps) {
  const [data, setData] = useState(initial)
  const [vps, setVps] = useState(initialVps)

  useEffect(() => {
    let active = true
    let timer: ReturnType<typeof setInterval> | null = null

    const stop = () => {
      if (timer !== null) {
        clearInterval(timer)
        timer = null
      }
    }

    const refresh = async () => {
      try {
        const response = await fetch("/api/dashboard", { cache: "no-store" })
        if (!response.ok) {
          throw new Error(`dashboard responded ${response.status}`)
        }
        const next = (await response.json()) as DashboardResponse
        if (active) {
          setData(next)
          if (next.vps) {
            setVps(next.vps)
          }
        }
      } catch {
        if (active) {
          setData((current) =>
            current.status === "offline" ? current : { ...current, status: "offline" },
          )
          setVps((current) =>
            current.status === "offline" ? current : { ...current, status: "offline" },
          )
        }
      }
    }

    const start = () => {
      if (timer === null) {
        timer = setInterval(() => {
          void refresh()
        }, REFRESH_INTERVAL_MS)
      }
    }

    const sync = () => {
      if (document.hidden) {
        stop()
        return
      }
      // Refresh right away when the tab becomes visible again.
      void refresh()
      start()
    }

    if (document.hidden) {
      stop()
    } else {
      start()
    }

    document.addEventListener("visibilitychange", sync)

    return () => {
      active = false
      stop()
      document.removeEventListener("visibilitychange", sync)
    }
  }, [])

  return (
    <div className="space-y-4">
      <VpsDashboard data={vps} />
      <ServerDashboard data={data} />
    </div>
  )
}
