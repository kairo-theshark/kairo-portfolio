import type { Metadata } from "next"

import { PageHero } from "@/components/page-hero"
import { PhotoBackdrop } from "@/components/photo-backdrop"
import { PhotoFigure } from "@/components/photo-figure"
import { ProjectGrid } from "@/components/project-grid"
import { developmentProjects, developmentStack, workspacePhotos } from "@/lib/content"

export const metadata: Metadata = {
  title: "Раздел 1",
  description: "Описание раздела: проекты, подход и инструменты.",
}

export default function DevelopmentPage() {
  return (
    <>
      <div className="relative overflow-hidden">
        <PhotoBackdrop
          src="/photos/placeholder-3.webp"
          width={904}
          height={1200}
          className="bottom-0 right-0 top-16 hidden w-[400px] xl:block"
          imageClassName="object-[50%_50%] opacity-60 saturate-[0.55]"
        />
        <PageHero
          number="01"
          kicker="development"
          title="Заголовок раздела"
          description="Одна строка описания раздела."
        />
      </div>

      <section className="container-page pb-20" aria-labelledby="projects-title">
        <ProjectGrid projects={developmentProjects} />

        <div className="mt-20" aria-labelledby="photos-title">
          <div className="flex items-baseline justify-between gap-4">
            <h2
              id="photos-title"
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted/80"
            >
              фотографии
            </h2>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted/80">
              02
            </span>
          </div>
          <p className="mt-3 max-w-xl text-[14px] leading-7 text-muted/80">
            Описание фотографий раздела.
          </p>
          <div className="mt-6 grid gap-4 overflow-hidden sm:-mr-8 sm:grid-cols-[1.35fr_1fr] sm:items-start">
            <PhotoFigure {...workspacePhotos[0]} />
            <PhotoFigure {...workspacePhotos[1]} className="sm:mt-16" />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-line/40 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted/80">
            стек
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted/80">
            {developmentStack.join(" · ")}
          </span>
        </div>
      </section>
    </>
  )
}
