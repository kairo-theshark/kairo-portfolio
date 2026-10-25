"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import type { ProjectImportance, ProjectItem } from "@/lib/types"

interface ProjectCardProps {
  project: ProjectItem
  index: string
}

// Silver and gold cases are the exceptions worth spotting, so they alone carry
// a fading top rule and a dot in the corner. Normal cases stay plain.
const rankedTone: Partial<Record<ProjectImportance, { rule: string; dot: string }>> = {
  gold: {
    rule: "[--card-rule:rgb(var(--color-gold)/0.75)] [--card-glow:rgb(var(--color-gold)/0.45)]",
    dot: "bg-gold",
  },
  silver: {
    rule: "[--card-rule:rgb(var(--color-silver)/0.7)] [--card-glow:rgb(var(--color-silver)/0.4)]",
    dot: "bg-silver",
  },
}

const MAX_TILT = 6

export function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null)
  const frame = useRef(0)

  // Pointer tilt on the card itself: the surface leans and lifts slightly under
  // the cursor, while the content inside stays flat. Only armed for real
  // pointers, and fully disabled by prefers-reduced-motion.
  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)")
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (!finePointer.matches || reducedMotion.matches) return

    const reset = () => {
      cancelAnimationFrame(frame.current)
      card.style.transform = ""
      card.classList.remove("card-tilting")
    }

    const handleMove = (event: PointerEvent) => {
      const rect = card.getBoundingClientRect()
      // Normalised offset from the centre, -1 at the top/left edge.
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5

      cancelAnimationFrame(frame.current)
      frame.current = requestAnimationFrame(() => {
        card.classList.add("card-tilting")
        card.style.transform =
          `perspective(900px) rotateX(${(-y * MAX_TILT).toFixed(2)}deg) ` +
          `rotateY(${(x * MAX_TILT).toFixed(2)}deg) translateZ(12px) scale(1.05)`
      })
    }

    const handleEnter = () => card.classList.add("card-hover")
    const handleLeave = () => {
      reset()
      card.classList.remove("card-hover")
    }

    card.addEventListener("pointermove", handleMove)
    card.addEventListener("pointerenter", handleEnter)
    card.addEventListener("pointerleave", handleLeave)

    return () => {
      cancelAnimationFrame(frame.current)
      card.removeEventListener("pointermove", handleMove)
      card.removeEventListener("pointerenter", handleEnter)
      card.removeEventListener("pointerleave", handleLeave)
      reset()
    }
  }, [])

  const title = (
    <h2 className="text-lg font-medium tracking-[-0.02em] text-foreground">{project.name}</h2>
  )

  const tone = project.importance ? rankedTone[project.importance] : undefined

  return (
    <article
      ref={cardRef}
      className={cn(
        "case-card relative flex h-full flex-col overflow-hidden rounded-xl bg-surface/25 p-5",
        tone && "card-ranked",
        tone &&
          "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:transition-opacity before:duration-500",
        tone && "before:content-['']",
        tone && "before:opacity-45",
        tone?.rule,
      )}
    >
      <div className="flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.16em] text-muted/80">
        <span className="text-accent">{index}</span>
        <span>{project.status}</span>
      </div>

      <div className="mt-6">
        {project.href ? (
          <Link href={project.href} aria-label={`Открыть проект ${project.name}`}>
            {title}
          </Link>
        ) : (
          title
        )}

        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted/80">
          {project.subtitle}
        </p>
      </div>

      <p className="mt-4 text-[14px] leading-7 text-muted/85">{project.description}</p>

      <ul className="mt-4 space-y-2">
        {project.details.map((detail) => (
          <li key={detail} className="flex gap-3 text-[14px] leading-7 text-muted/80">
            <span className="mt-3 size-1 shrink-0 rounded-full bg-line" aria-hidden="true" />
            <span>{detail}</span>
          </li>
        ))}
      </ul>

      {project.note ? (
        <p className="mt-4 border-l border-warning/40 pl-3 font-mono text-[11px] uppercase leading-6 tracking-[0.08em] text-warning/70">
          {project.note}
        </p>
      ) : null}

      <p className="mt-auto pt-5 font-mono text-[11px] uppercase leading-6 tracking-[0.12em] text-muted/80">
        {project.stack.join(" · ")}
      </p>

      {tone ? (
        <span
          aria-hidden="true"
          className={cn("absolute right-3.5 bottom-3.5 size-3 rounded-full", tone.dot)}
        />
      ) : null}
    </article>
  )
}
