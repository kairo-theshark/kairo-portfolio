import { Suspense } from "react"
import { ArrowDown, ArrowUpRight } from "lucide-react"

import { DashboardSkeleton } from "@/components/dashboard-skeleton"
import { LiveDashboard } from "@/components/live-dashboard"
import { ModuleButtons } from "@/components/module-buttons"
import { CommitsSkeleton, RecentCommits } from "@/components/recent-commits"
import { getDashboardData, getVpsDashboardData } from "@/lib/beszel"
import { githubProfile, pickHomeQuote } from "@/lib/content"
import { getCommitFeed } from "@/lib/github"
import { cn } from "@/lib/utils"

export const dynamic = "force-dynamic"

async function DashboardSection() {
  const [dashboard, vps] = await Promise.all([getDashboardData(), getVpsDashboardData()])

  return <LiveDashboard initial={dashboard} initialVps={vps} />
}

async function CommitsSection() {
  const feed = await getCommitFeed()

  return <RecentCommits feed={feed} />
}

export default function HomePage() {
  const quote = pickHomeQuote()

  return (
    <>
      <section className="relative flex min-h-[100svh] items-center justify-center px-5 pb-24 pt-24">
        <div className="w-full max-w-3xl animate-fade-up text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted/80">
            инженер · разработчик
          </p>

          <h1
            className={cn(
              "mx-auto mt-6 max-w-lg whitespace-pre-line text-balance text-[26px] font-normal leading-[1.25] tracking-[-0.025em] text-foreground sm:text-[34px]",
              quote.mono && "max-w-xl font-mono tracking-[-0.01em]",
              quote.compact && "max-w-2xl text-[18px] leading-[1.35] sm:text-[34px]",
            )}
          >
            {quote.href ? (
              <a
                href={quote.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-line/60 underline-offset-4 transition hover:text-accent-soft"
              >
                {quote.text}
              </a>
            ) : (
              quote.text
            )}
          </h1>

          <ModuleButtons />
        </div>

        <a
          href="#commits"
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted/80 transition hover:text-muted"
          aria-label="Прокрутить к коммитам"
        >
          scroll
          <ArrowDown className="size-3.5" aria-hidden="true" />
        </a>
      </section>

      <section id="commits" className="border-t border-line/40">
        <div className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="flex items-center justify-between">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted/80">
              коммиты
            </h2>
            <a
              href={githubProfile.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted/80 transition hover:text-foreground"
            >
              github
              <ArrowUpRight className="size-3" aria-hidden="true" />
            </a>
          </div>

          <div className="mt-3">
            <Suspense fallback={<CommitsSkeleton />}>
              <CommitsSection />
            </Suspense>
          </div>
        </div>
      </section>

      <section className="border-t border-line/40">
        <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted/80">
              инфраструктура
            </h2>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted/80">
              телеметрия
            </span>
          </div>

          <Suspense fallback={<DashboardSkeleton />}>
            <DashboardSection />
          </Suspense>
        </div>
      </section>
    </>
  )
}
