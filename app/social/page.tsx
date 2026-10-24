import type { Metadata } from "next"
import { ArrowUpRight } from "lucide-react"

import { CopyEmail } from "@/components/copy-email"
import { PageHero } from "@/components/page-hero"
import { siteConfig, socialGroups, socialLinks } from "@/lib/content"

export const metadata: Metadata = {
  title: "Социальное",
  description:
    "Открытые каналы связи: GitHub, Telegram, YouTube, Twitch и другие площадки.",
}

export default function SocialPage() {
  return (
    <>
      <PageHero
        number="04"
        kicker="social"
        title="Открытые каналы."
        description="Выберите удобный канал — отвечаю спокойно и по делу."
      />

      <section className="container-page pb-20" aria-labelledby="channels-title">
        <div className="max-w-2xl">
          <h2
            id="channels-title"
            className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted/80"
          >
            контакт
          </h2>

          <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-line/40 pt-5">
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex min-h-11 items-center text-lg tracking-[-0.02em] text-foreground transition hover:text-accent-soft"
            >
              {siteConfig.email}
            </a>
            <CopyEmail email={siteConfig.email} />
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex min-h-11 items-center font-mono text-[12px] text-muted transition hover:text-foreground"
            >
              {siteConfig.phone}
            </a>
            <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted/80">
              телефон
            </span>
          </div>

          <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
            <span className="font-mono text-[12px] text-muted">Санкт-Петербург</span>
            <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted/80">
              локация
            </span>
          </div>

          <div className="mt-12 space-y-9">
            {socialGroups.map((group) => {
              const links = socialLinks.filter((link) => link.category === group.id)

              if (links.length === 0) {
                return null
              }

              const titleId = `social-group-${group.id}`

              return (
                <section key={group.id} aria-labelledby={titleId}>
                  <h3
                    id={titleId}
                    className="font-mono text-[8px] uppercase tracking-[0.18em] text-muted/80"
                  >
                    {group.title}
                  </h3>

                  <ul className="mt-3 divide-y divide-line/40 border-t border-line/40">
                    {links.map((link) => (
                      <li key={link.id}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="group grid min-h-11 grid-cols-[120px_1fr_auto] items-center gap-3 py-3 sm:grid-cols-[150px_1fr_auto] sm:gap-5"
                        >
                          <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted/80">
                            {link.label}
                          </span>
                          <span className="truncate text-[13px] text-foreground/85 transition group-hover:text-accent-soft">
                            {link.handle}
                          </span>
                          <ArrowUpRight
                            className="size-3.5 text-muted/80 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                            aria-hidden="true"
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              )
            })}
          </div>

          <p className="mt-10 font-mono text-[8px] uppercase tracking-[0.14em] text-muted/80">
            отвечаю в течение дня · {siteConfig.timezone}
          </p>
        </div>
      </section>
    </>
  )
}
