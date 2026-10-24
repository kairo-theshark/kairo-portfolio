import type { ReactNode } from "react"

interface PageHeroProps {
  number: string
  kicker: string
  title: ReactNode
  description: string
  meta?: Array<{ label: string; value: string }>
}

export function PageHero({ number, kicker, title, description, meta }: PageHeroProps) {
  return (
    <section className="container-page pb-10 pt-28 sm:pb-14 sm:pt-36">
      <div className="flex items-center gap-2.5 font-mono text-[9px] uppercase tracking-[0.2em] text-muted/80">
        <span className="text-accent/70">{number}</span>
        <span className="h-px w-5 bg-line" aria-hidden="true" />
        {kicker}
      </div>

      <h1 className="mt-5 max-w-2xl text-balance text-3xl font-normal leading-[1.12] tracking-[-0.035em] text-foreground sm:text-5xl">
        {title}
      </h1>

      <p className="mt-4 max-w-xl text-[13px] leading-6 text-muted sm:text-sm">{description}</p>

      {meta ? (
        <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-3">
          {meta.map((item) => (
            <div key={item.label}>
              <dt className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted/80">
                {item.label}
              </dt>
              <dd className="mt-1 text-[11px] text-foreground/70">{item.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </section>
  )
}
