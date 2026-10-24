export function DashboardSkeleton() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading telemetry"
      className="space-y-4"
    >
      <span className="sr-only">Loading telemetry</span>

      {/* Compact VPS block keeps the layout stable while both snapshots load. */}
      <div
        className="w-full rounded-xl border border-line/50 bg-surface/20 p-4"
        aria-hidden="true"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="h-2 w-20 animate-pulse rounded-full bg-line/60" />
          <div className="h-2 w-12 animate-pulse rounded-full bg-line/50" />
        </div>

        <div className="mt-3 grid grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-4 sm:gap-x-8">
          {[0, 1, 2, 3].map((item) => (
            <div key={item}>
              <div className="h-2 w-8 animate-pulse rounded-full bg-line/50" />
              <div className="mt-2.5 h-4 w-14 animate-pulse rounded-full bg-line/40" />
            </div>
          ))}
        </div>

        <div className="mt-3 border-t border-line/40 pt-3">
          <div className="h-2 w-32 animate-pulse rounded-full bg-line/40" />
        </div>
      </div>

      <div
        className="w-full rounded-xl border border-line/50 bg-surface/30 p-5 sm:p-7 lg:p-8"
        aria-hidden="true"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="h-2 w-28 animate-pulse rounded-full bg-line/60" />
          <div className="h-2 w-16 animate-pulse rounded-full bg-line/50" />
        </div>

        <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-7 sm:grid-cols-4 sm:gap-x-8">
          {[0, 1, 2, 3].map((item) => (
            <div key={item}>
              <div className="h-2 w-10 animate-pulse rounded-full bg-line/50" />
              <div className="mt-4 h-7 w-20 animate-pulse rounded-full bg-line/40" />
              <div className="mt-4 h-px w-full bg-line/50" />
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-line/40 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="h-2 w-40 animate-pulse rounded-full bg-line/40" />
          <div className="h-2 w-24 animate-pulse rounded-full bg-line/30" />
        </div>
      </div>
    </div>
  )
}
