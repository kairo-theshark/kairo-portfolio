import type { Metadata } from "next"

import { PageHero } from "@/components/page-hero"
import { PhotoBackdrop } from "@/components/photo-backdrop"
import { PhotoFigure } from "@/components/photo-figure"
import { ProjectCarousel } from "@/components/project-carousel"
import { developmentProjects, developmentStack, workspacePhotos } from "@/lib/content"

export const metadata: Metadata = {
  title: "Разработка",
  description:
    "Проекты и инженерный подход: self-hosting, автоматизация, C/C++ и сопровождение собственного сайта.",
}

export default function DevelopmentPage() {
  return (
    <>
      <div className="relative overflow-hidden">
        <PhotoBackdrop
          src="/photos/lan-ports.webp"
          width={904}
          height={1200}
          className="bottom-0 right-0 top-16 hidden w-[400px] xl:block"
          imageClassName="object-[50%_50%] opacity-60 saturate-[0.55]"
        />
        <PageHero
          number="01"
          kicker="development"
          title="Код как система."
          description="Self-hosting, автоматизация и low-level: от скриптов до собственной серверной инфраструктуры."
        />
      </div>

      <section className="container-page pb-20" aria-labelledby="projects-title">
        <ProjectCarousel projects={developmentProjects} />

        <div className="mt-20" aria-labelledby="photos-title">
          <div className="flex items-baseline justify-between gap-4">
            <h2
              id="photos-title"
              className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted/80"
            >
              рабочее место
            </h2>
            <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted/80">
              02
            </span>
          </div>
          <p className="mt-3 max-w-xl text-[12px] leading-6 text-muted/80">
            Стол, сеть и диагностика.
          </p>
          <div className="mt-6 grid gap-4 overflow-hidden sm:-mr-8 sm:grid-cols-[1.35fr_1fr] sm:items-start">
            <PhotoFigure {...workspacePhotos[0]} reveal="left" />
            <PhotoFigure {...workspacePhotos[1]} reveal="right" className="sm:mt-16" />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-line/40 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted/80">
            стек
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted/80">
            {developmentStack.join(" · ")}
          </span>
        </div>
      </section>
    </>
  )
}
