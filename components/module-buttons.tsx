import Link from "next/link"
import { Github } from "lucide-react"

import { modules } from "@/lib/content"
import { cn } from "@/lib/utils"

const linkClass =
  "group relative inline-flex min-h-11 items-center justify-center gap-2 px-3 py-3 text-[14px] text-foreground/65 transition duration-300 hover:text-foreground sm:text-[15px] md:px-2"

export function ModuleButtons() {
  return (
    <nav
      aria-label="Разделы портфолио"
      className="mx-auto mt-12 grid w-full max-w-xl grid-cols-2 justify-items-center gap-x-3 gap-y-1 md:max-w-3xl md:grid-cols-5 md:gap-x-1"
    >
      {modules.map((item) => {
        const isGithub = item.icon === "github"
        const className = cn(
          linkClass,
          isGithub && "col-span-2 text-accent-soft/90 md:col-span-1",
        )

        const content = (
          <>
            <span
              className={cn(
                "pointer-events-none absolute inset-0 -z-10 rounded-full bg-accent/10 opacity-40 blur-xl transition duration-500 group-hover:bg-accent/20 group-hover:opacity-100",
                isGithub && "opacity-60",
              )}
              aria-hidden="true"
            />
            {isGithub ? (
              <Github
                className="relative size-4 text-accent/80 transition group-hover:text-accent"
                aria-hidden="true"
              />
            ) : null}
            <span
              className={cn(
                "relative transition group-hover:[text-shadow:0_0_22px_rgba(139,181,255,0.55)]",
                isGithub
                  ? "font-medium [text-shadow:0_0_18px_rgba(139,181,255,0.35)]"
                  : "[text-shadow:0_0_16px_rgba(139,181,255,0.2)]",
              )}
            >
              {item.title}
            </span>
          </>
        )

        if (item.external) {
          return (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className={className}
            >
              {content}
            </a>
          )
        }

        return (
          <Link key={item.href} href={item.href} className={className}>
            {content}
          </Link>
        )
      })}
    </nav>
  )
}
