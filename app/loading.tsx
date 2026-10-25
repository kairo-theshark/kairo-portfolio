export default function Loading() {
  return (
    <div
      className="container-page flex min-h-[70vh] items-center pb-20 pt-28"
      role="status"
      aria-live="polite"
    >
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted/80">
          загрузка
        </p>
        <div className="mt-3 h-px w-24 animate-pulse bg-accent/50" aria-hidden="true" />
      </div>
    </div>
  )
}
