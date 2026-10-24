"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { ProjectCard } from "@/components/project-card"
import type { ProjectItem } from "@/lib/types"

interface ProjectCarouselProps {
  projects: ProjectItem[]
}

const arrowClass =
  "inline-flex size-11 items-center justify-center rounded-full border border-line/50 text-muted transition hover:border-accent/40 hover:text-foreground disabled:pointer-events-none disabled:opacity-30"

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const updateArrows = useCallback(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    setCanPrev(scroller.scrollLeft > 4)
    setCanNext(scroller.scrollLeft + scroller.clientWidth < scroller.scrollWidth - 4)
  }, [])

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    updateArrows()
    scroller.addEventListener("scroll", updateArrows, { passive: true })
    window.addEventListener("resize", updateArrows)

    return () => {
      scroller.removeEventListener("scroll", updateArrows)
      window.removeEventListener("resize", updateArrows)
    }
  }, [updateArrows])

  const handleScroll = (direction: -1 | 1) => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const card = scroller.querySelector<HTMLElement>("[data-case-card]")
    const step = card ? card.offsetWidth + 16 : scroller.clientWidth * 0.85

    scroller.scrollBy({ left: direction * step, behavior: "smooth" })
  }

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <h2
          id="projects-title"
          className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted/80"
        >
          кейсы
        </h2>

        <div className="flex items-center gap-3">
          <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted/80">
            {String(projects.length).padStart(2, "0")}
          </span>
          {canPrev || canNext ? (
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => handleScroll(-1)}
                disabled={!canPrev}
                className={arrowClass}
                aria-label="Предыдущие кейсы"
              >
                <ChevronLeft className="size-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => handleScroll(1)}
                disabled={!canNext}
                className={arrowClass}
                aria-label="Следующие кейсы"
              >
                <ChevronRight className="size-4" aria-hidden="true" />
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <div
        ref={scrollerRef}
        role="region"
        aria-label="Кейсы, горизонтальная прокрутка"
        tabIndex={0}
        className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((project, index) => (
          <div
            key={project.slug}
            data-case-card
            className="w-[calc(100%_-_2rem)] shrink-0 snap-start lg:w-[calc((100%_-_2rem)/3)]"
          >
            <ProjectCard project={project} index={String(index + 1).padStart(2, "0")} />
          </div>
        ))}
      </div>
    </>
  )
}
