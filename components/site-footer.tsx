import Link from "next/link"

import { navLinks, siteConfig, socialLinks } from "@/lib/content"

export function SiteFooter() {
  const footerLinks = socialLinks.filter((link) => link.showInFooter)

  return (
    <footer className="border-t border-line/40">
      <div className="container-page flex flex-col gap-5 py-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted/80">
          © 2026 {siteConfig.name}
        </p>

        <nav aria-label="Навигация в подвале" className="flex flex-wrap gap-x-5 gap-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex min-h-11 items-center text-[14px] text-muted transition hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted/80">
          {footerLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center transition hover:text-foreground"
            >
              {link.label.toLowerCase()}
            </a>
          ))}
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex min-h-11 items-center transition hover:text-foreground"
          >
            email
          </a>
        </div>
      </div>
    </footer>
  )
}
