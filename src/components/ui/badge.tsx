import type { FeatureState, ProjectStatus } from "@/content/projects";

/**
 * Visual label for project and feature state.
 *
 * Colour communicates status honestly: only "Live" and "Completed" read as a
 * finished state, everything else stays visually quieter.
 */
const projectStatusStyles: Record<ProjectStatus, string> = {
  Live: "border-success/30 bg-success-soft text-success",
  Completed: "border-accent/25 bg-accent-soft text-accent",
  "In Development": "border-warning/30 bg-warning-soft text-warning",
  Concept: "border-border-strong bg-surface-2 text-muted",
  Private: "border-border bg-surface-2 text-subtle",
};

const featureStateStyles: Record<FeatureState, string> = {
  Implemented: "border-success/25 bg-success-soft text-success",
  Integrated: "border-accent/25 bg-accent-soft text-accent",
  "In Development": "border-warning/30 bg-warning-soft text-warning",
};

const dotStyles: Record<ProjectStatus, string> = {
  Live: "bg-success",
  Completed: "bg-accent",
  "In Development": "bg-warning",
  Concept: "bg-subtle",
  Private: "bg-subtle",
};

export function StatusBadge({
  status,
  withDot = false,
  className,
}: {
  status: ProjectStatus;
  withDot?: boolean;
  className?: string;
}) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        projectStatusStyles[status],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {withDot && (
        <span className="relative flex size-1.5">
          <span
            className={`absolute inline-flex size-full rounded-full opacity-60 ${dotStyles[status]}`}
          />
        </span>
      )}
      {status}
    </span>
  );
}

export function FeatureStateBadge({ state }: { state: FeatureState }) {
  return (
    <span
      className={[
        "inline-flex shrink-0 items-center rounded-md border px-2 py-0.5 text-[11px] font-medium tracking-wide",
        featureStateStyles[state],
      ].join(" ")}
    >
      {state}
    </span>
  );
}

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-lg border border-border bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted transition-colors duration-200",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
}