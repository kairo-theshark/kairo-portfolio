import { ProjectCard } from "@/components/project-card"
import type { ProjectItem } from "@/lib/types"

interface ProjectGridProps {
  projects: ProjectItem[]
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <h2
          id="projects-title"
          className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted/80"
        >
          кейсы
        </h2>

        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted/80">
          {String(projects.length).padStart(2, "0")}
        </span>
      </div>

      <div className="mx-auto mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((project, index) => (
          <div key={project.slug} className="case-reveal">
            <ProjectCard project={project} index={String(index + 1).padStart(2, "0")} />
          </div>
        ))}
      </div>
    </>
  )
}
