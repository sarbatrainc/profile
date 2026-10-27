import type { ProjectIcon } from "@/content/projects";
import { ProjectGlyph } from "@/components/ui/icons";

export interface FlowLayer {
  label: string;
  detail: string;
  /** Optional glyph shown in the node. */
  icon?: ProjectIcon;
}

/**
 * Vertical architecture flow: layer nodes joined by connectors.
 *
 * Purely presentational and rendered on the server, so it works without
 * JavaScript and stays readable to crawlers.
 */
export function StackFlow({
  layers,
  accent = "default",
  className,
}: {
  layers: FlowLayer[];
  accent?: "default" | "compact";
  className?: string;
}) {
  const compact = accent === "compact";

  return (
    <ol className={`relative flex flex-col ${className ?? ""}`}>
      {layers.map((layer, index) => {
        const isLast = index === layers.length - 1;

        return (
          <li key={layer.label} className="relative flex gap-4">
            {/* Connector between this node and the next. */}
            {!isLast && (
              <span
                aria-hidden="true"
                className="absolute left-[1.4rem] top-full flex h-8 w-px flex-col items-center justify-center"
              >
                <span className="h-full w-px bg-gradient-to-b from-accent/50 to-border" />
                <span className="absolute bottom-0 size-1.5 rotate-45 border-b border-r border-accent/60" />
              </span>
            )}

            <span
              aria-hidden="true"
              className={[
                "relative z-10 grid shrink-0 place-items-center rounded-xl border border-border bg-surface text-accent",
                compact ? "size-9" : "size-11",
              ].join(" ")}
            >
              {layer.icon ? (
                <ProjectGlyph icon={layer.icon} size={compact ? 16 : 18} />
              ) : (
              <span className="text-[11px] font-medium">
                {String(index + 1).padStart(2, "0")}
              </span>
              )}
            </span>

            <div className={compact ? "pb-8 pt-1.5" : "pb-9 pt-2"}>
              <p className={compact ? "text-sm font-semibold text-foreground" : "font-medium text-foreground"}>
                {layer.label}
              </p>
              <p className={compact ? "mt-0.5 text-[13px] text-muted" : "mt-1 text-sm leading-relaxed text-muted"}>
                {layer.detail}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/**
 * Horizontal workflow: sequential steps joined by arrows. Wraps on small
 * screens so long workflows stay readable.
 */
export function WorkflowFlow({ steps, label }: { steps: string[]; label: string }) {
  return (
    <div>
      <p className="text-[11px] tracking-[0.18em] text-subtle uppercase">{label}</p>

      <ol className="mt-4 flex flex-wrap items-center gap-y-3">
        {steps.map((step) => (
          <li key={step} className="flex items-center gap-3">
            <span className="inline-flex items-center rounded-lg border border-border bg-surface-2 px-3 py-2 text-xs text-foreground">
              {step}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}