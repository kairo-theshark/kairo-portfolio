import Link from "next/link"

import { cn } from "@/lib/utils"
import type { ProjectImportance, ProjectItem } from "@/lib/types"

interface ProjectCardProps {
  project: ProjectItem
  index: string
}

// Muted gold/silver outlines for the projects the owner is proud of most.
const importanceBorder: Record<ProjectImportance, string> = {
  gold: "border-gold/55 hover:border-gold/80",
  silver: "border-silver/45 hover:border-silver/70",
  normal: "border-line/50 hover:border-accent/30",
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const title = (
    <h2 className="text-lg font-medium tracking-[-0.02em] text-foreground">{project.name}</h2>
  )

  return (
    <article
      className={cn(
        "case-card flex h-full flex-col rounded-xl border bg-surface/25 p-5 transition duration-300 hover:bg-surface/40",
        importanceBorder[project.importance ?? "normal"],
      )}
    >
      <div className="flex items-center justify-between gap-4 font-mono text-[8px] uppercase tracking-[0.16em] text-muted/80">
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

        <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-muted/80">
          {project.subtitle}
        </p>
      </div>

      <p className="mt-4 text-[12px] leading-6 text-muted/85">{project.description}</p>

      <ul className="mt-4 space-y-1.5">
        {project.details.map((detail) => (
          <li key={detail} className="flex gap-3 text-[12px] leading-6 text-muted/80">
            <span className="mt-2.5 size-1 shrink-0 rounded-full bg-line" aria-hidden="true" />
            <span>{detail}</span>
          </li>
        ))}
      </ul>

      {project.note ? (
        <p className="mt-4 border-l border-warning/40 pl-3 font-mono text-[9px] uppercase leading-5 tracking-[0.08em] text-warning/70">
          {project.note}
        </p>
      ) : null}

      <p className="mt-auto pt-5 font-mono text-[8px] uppercase leading-5 tracking-[0.12em] text-muted/80">
        {project.stack.join(" · ")}
      </p>
    </article>
  )
}
