import type { Project } from "@/content/projects";
import { ProjectGlyph } from "@/components/ui/icons";

/**
 * Large, animated banner for each case study.
 *
 * It is deliberately an abstract, branded illustration (gradient + glyph + a
 * few interface hints) rather than a claimed screenshot — consistent with the
 * ProjectVisual placeholder philosophy in PORTFOLIO_MASTER_PROMPT.md §7. The
 * banner animates in on entry and respects `prefers-reduced-motion`.
 */
export function ProjectBanner({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`animate-hero-in w-full ${className ?? ""}`}
      style={{ animationDelay: "420ms" }}
    >
      <div
        className={`relative isolate overflow-hidden rounded-[1.6rem] border border-border bg-gradient-to-br ${project.accent} shadow-card motion-safe:animate-[float-slow_12s_ease-in-out_infinite]`}
      >
        {/* Texture + depth */}
        <div className="bg-dots absolute inset-0 opacity-55" />
        <div className="absolute -inset-6 rounded-full blur-3xl" />

        <div className="relative z-10 flex h-60 w-full items-center justify-center sm:h-64">
          {/* Central glyph with a soft halo */}
          <span className="relative grid size-20 place-items-center rounded-2xl border border-border bg-surface/70 shadow-card backdrop-blur">
            <span className="absolute -inset-5 rounded-full bg-accent/20 blur-xl" />
            <ProjectGlyph icon={project.icon} size={46} className="text-accent-2 drop-shadow" />
          </span>

          {/* Abstract interface hints, tinted by the project accent */}
          <span className="absolute top-5 right-6 h-1.5 w-10/12 rounded-full bg-accent/40" />
          <span className="absolute top-11 right-6 h-1.5 w-8/12 rounded-full bg-accent-2/30" />
          <span className="absolute bottom-6 left-6 h-2.5 w-9 rounded-full bg-foreground/15" />
          <span className="absolute bottom-6 left-auto right-6 h-1 w-2/5 rounded-full bg-foreground/10" />
          <span
            aria-hidden="true"
            className="absolute bottom-14 right-6 flex items-center gap-1 text-[11px] font-medium tracking-wider text-accent"
          >
            <span className="size-1.5 rounded-full bg-accent" />
            {project.category}
          </span>
        </div>
      </div>
    </div>
  );
}
