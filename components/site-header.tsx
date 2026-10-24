import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { siteConfig, socialLinks } from "@/lib/content"

export function SiteHeader() {
  const headerLink = socialLinks.find((link) => link.showInHeader)

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="group flex min-h-11 items-center gap-2"
          aria-label={`${siteConfig.name} — на главную`}
        >
          <span className="font-mono text-[12px] font-medium tracking-[0.28em] text-foreground transition group-hover:text-accent-soft">
            {siteConfig.name.toUpperCase()}
          </span>
          <span className="hidden font-mono text-[9px] uppercase tracking-[0.18em] text-muted/80 sm:inline">
            portfolio
          </span>
        </Link>

        <div className="flex items-center gap-3 font-mono text-[10px] text-muted sm:gap-5">
          <span className="hidden items-center gap-1.5 md:inline-flex">
            <span className="size-1.5 rounded-full bg-positive" aria-hidden="true" />
            {siteConfig.availability}
          </span>
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex min-h-11 items-center transition hover:text-foreground"
          >
            {siteConfig.email}
          </a>
          {headerLink ? (
            <a
              href={headerLink.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-1 transition hover:text-foreground"
            >
              {headerLink.label.toLowerCase()}
              <ArrowUpRight className="size-3" aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </div>
    </header>
  )
}
