import type { Metadata } from "next"

import { PageHero } from "@/components/page-hero"
import { PhotoBackdrop } from "@/components/photo-backdrop"
import { PhotoBand } from "@/components/photo-band"
import { PhotoFigure } from "@/components/photo-figure"
import { ProjectCarousel } from "@/components/project-carousel"
import { engineeringPhotos, engineeringProjects, engineeringSkills, engineeringToolkit } from "@/lib/content"

export const metadata: Metadata = {
  title: "Проектирование",
  description:
    "Физические проекты: CAD, 3D-печать, электроника, пайка и сборка вычислительных систем.",
}

export default function DesignPage() {
  return (
    <>
      <div className="relative overflow-hidden">
        <PhotoBackdrop
          src="/photos/printer-cat.webp"
          width={904}
          height={1200}
          className="bottom-0 right-0 top-16 hidden w-[400px] xl:block"
          imageClassName="object-[50%_40%] opacity-65 saturate-[0.6]"
        />
        <PageHero
          number="02"
          kicker="engineering"
          title="От схемы до корпуса."
          description="3D-моделирование, печать, электроника и железо: от модели в САПР до готовой детали."
        />
      </div>

      <section className="container-page pb-0" aria-labelledby="projects-title">
        <ProjectCarousel projects={engineeringProjects} />
      </section>

      <PhotoBand
        src="/photos/ram-gpu.webp"
        caption="железо на столе"
        width={1200}
        height={904}
        imageClassName="object-[50%_50%]"
      />

      <section className="container-page pt-16 pb-20">
        <div aria-labelledby="skills-title">
          <h2
            id="skills-title"
            className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted/80"
          >
            компетенции
          </h2>

          <div className="mt-6 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {engineeringSkills.map((group) => (
              <article key={group.title} className="border-t border-line/50 pt-4">
                <h3 className="text-[13px] font-medium text-foreground">{group.title}</h3>
                <ul className="mt-3 space-y-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="text-[12px] leading-6 text-muted/80">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-20" aria-labelledby="photos-title">
          <div className="flex items-baseline justify-between gap-4">
            <h2
              id="photos-title"
              className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted/80"
            >
              железо и печать
            </h2>
            <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted/80">
              07
            </span>
          </div>
          <p className="mt-3 max-w-xl text-[12px] leading-6 text-muted/80">
            Напечатанные детали, модели и разобранная техника.
          </p>
          <div className="mt-6 columns-2 gap-4 lg:columns-3">
            {engineeringPhotos.map((photo) => (
              <PhotoFigure key={photo.src} {...photo} className="mb-4" />
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-line/40 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted/80">
            инструменты
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted/80">
            {engineeringToolkit.join(" · ")}
          </span>
        </div>
      </section>
    </>
  )
}
