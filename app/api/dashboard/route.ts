import { NextResponse } from "next/server"

import { getDashboardData, getVpsDashboardData } from "@/lib/beszel"
import type { DashboardResponse } from "@/lib/types"

export const dynamic = "force-dynamic"
export const revalidate = 0
export const runtime = "nodejs"

// The dashboard polls every 30 seconds. 60 requests per minute per client is
// far above normal use and keeps a single client from hammering the 4 GB host.
const WINDOW_MS = 60_000
const MAX_REQUESTS = 60
const buckets = new Map<string, { count: number; resetAt: number }>()

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")
  const realIp = request.headers.get("x-real-ip")
  const value = forwarded?.split(",")[0]?.trim() || realIp || "unknown"
  return value.slice(0, 64)
}

function allow(key: string): boolean {
  const now = Date.now()
  const bucket = buckets.get(key)

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return true
  }

  bucket.count += 1
  return bucket.count <= MAX_REQUESTS
}

export async function GET(request: Request) {
  const key = clientKey(request)

  if (!allow(key)) {
    return NextResponse.json(
      { error: "rate_limited" },
      {
        status: 429,
        headers: {
          "Cache-Control": "no-store",
          "Retry-After": "30",
        },
      },
    )
  }

  if (buckets.size > 1024) {
    const now = Date.now()
    for (const [entryKey, bucket] of buckets) {
      if (bucket.resetAt <= now) {
        buckets.delete(entryKey)
      }
    }
  }

  const [home, vps] = await Promise.all([getDashboardData(), getVpsDashboardData()])
  const payload: DashboardResponse = { ...home, vps }

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  })
}
