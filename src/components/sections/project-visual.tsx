import type { Project } from "@/content/projects";
import Image from "next/image";

/**
 * Abstract, decorative illustration of each application's interface.
 *
 * These are deliberately stylised wireframes rather than screenshots: no
 * real screens are claimed, and the shapes communicate what the software
 * actually does (attendance rows, a ballot, an order ticket, and so on).
 */
export function ProjectVisual({ project }: { project: Project }) {
  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${project.accent} shadow-card`}
    >
      <div className="bg-dots absolute inset-0 opacity-70" />

      <div className="relative p-5 sm:p-7">
        {/* Window chrome */}
        <div className="mb-5 flex items-center gap-2">
          <span className="flex gap-1.5">
            <span className="size-2 rounded-full bg-border-strong" />
            <span className="size-2 rounded-full bg-border-strong" />
            <span className="size-2 rounded-full bg-border-strong" />
          </span>
          <span className="ml-2 text-[10.5px] text-subtle">
            {project.name.toLowerCase().replace(/\s+/g, "_")}
          </span>
        </div>

        <div className="grid gap-3">
          {visualByIcon[project.icon](project.slug)}
        </div>
      </div>
    </div>
  );
}

const Bar = ({ w = "w-full", h = "h-2" }: { w?: string; h?: string }) => (
  <span className={`block ${h} ${w} rounded-full bg-border`} />
);

const Row = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-3 rounded-xl border border-border bg-surface/80 px-3.5 py-3 backdrop-blur-sm">
    {children}
  </div>
);

/* --------------------------------------------------------------- Sanket --- */

function SanketVisual() {
  return (
    <Image
      src="/sanket.png"
      alt="Sanket school management platform"
      className="max-w-full h-auto rounded-2xl border border-border bg-surface-2 shadow-card object-contain"
      sizes="(max-width: 640px) 100vw, 640px"
      width={640}
      height={480}
      style={{ display: "block", margin: "0 auto" }}
    />
  );
}

/* -------------------------------------------------------- Election system --- */

function ElectionVisual() {
  return (
    <>
      <Row>
        <span className="size-6 shrink-0 rounded-lg bg-accent/20" />
        <span className="min-w-0 flex-1 space-y-1.5">
          <Bar w="w-1/2" h="h-2.5" />
          <Bar w="w-1/3" h="h-1.5" />
        </span>
        <span className="text-[10px] text-success">voting live</span>
      </Row>
      {/* Ballot choices */}
      {[0, 1, 2].map((row) => (
        <div
          key={row}
          className="flex items-center gap-3 rounded-xl border border-border bg-surface/80 px-3.5 py-3 backdrop-blur-sm"
        >
          <span className="size-4 shrink-0 rounded-full border-[1.5px] border-border-strong" />
          <span className="min-w-0 flex-1 space-y-1.5">
            <Bar w={row === 0 ? "w-2/5" : row === 1 ? "w-1/3" : "w-1/2"} h="h-2.5" />
          </span>
          {row === 1 && <span className="size-4 shrink-0 rounded-full border-[1.5px] border-accent" />}
        </div>
      ))}
      {/* Result bars */}
      <div className="space-y-2 rounded-xl border border-border bg-surface/60 p-3.5">
        <Bar w="w-1/4" h="h-1.5" />
        <span className="mt-3 flex h-1.5 w-full overflow-hidden rounded-full bg-border">
          <span className="h-full w-[46%] bg-accent" />
        </span>
        <span className="flex h-1.5 w-full overflow-hidden rounded-full bg-border">
          <span className="h-full w-[31%] bg-accent-2" />
        </span>
        <span className="flex h-1.5 w-full overflow-hidden rounded-full bg-border">
          <span className="h-full w-[18%] bg-border-strong" />
        </span>
      </div>
    </>
  );
}

/* --------------------------------------------------------- Ashri Bhakti --- */

function AshriVisual() {
  return (
    <Image
      src="/ashri-bhakti.png"
      alt="Ashri Bhakti devotional app for children"
      className="w-full h-full rounded-2xl border border-border bg-surface-2 shadow-card object-cover"
      sizes="(max-width: 640px) 100vw, 640px"
      width={640}
      height={480}
      style={{ aspectRatio: "4 / 3", minHeight: "240px" }}
    />
  );
}

/* ---------------------------------------------------------- Bhok Lagyo --- */

function RestaurantVisual() {
  return (
    <>
      <Row>
        <span className="size-6 shrink-0 rounded-lg bg-accent/20" />
        <span className="min-w-0 flex-1 space-y-1.5">
          <Bar w="w-2/5" h="h-2.5" />
          <Bar w="w-1/2" h="h-1.5" />
        </span>
        <span className="text-[10px] text-accent">table 04</span>
      </Row>
      <div className="rounded-xl border border-border bg-surface/60 p-3.5">
        {[0, 1, 2].map((index) => (
          <div key={index} className="flex items-center justify-between gap-3 border-b border-border py-2 first:pt-0 last:border-b-0 last:pb-0">
            <span className="min-w-0 flex-1 space-y-1.5">
              <Bar w={index === 2 ? "w-1/3" : "w-2/5"} h="h-2.5" />
            </span>
            <span className="text-[10.5px] text-subtle">
              {index === 2 ? "removed" : `x${index + 1}`}
            </span>
          </div>
        ))}
        <div className="mt-3 flex items-center justify-between border-t border-dashed border-border pt-2.5">
          <span className="text-[10.5px] text-subtle">takeaway</span>
          <span className="text-[11px] font-medium text-foreground">total</span>
        </div>
      </div>
      {/* Print batch */}
      <div className="flex items-center gap-2.5">
        {["kitchen", "customer", "register"].map((copy) => (
          <div
            key={copy}
            className="flex-1 rounded-lg border border-dashed border-border-strong px-2 py-2 text-center"
          >
            <span className="text-[9.5px] text-subtle">{copy}</span>
            <span className="mt-1 block h-1 w-2/3 mx-auto rounded-full bg-accent/30" />
          </div>
        ))}
      </div>
    </>
  );
}

/* ----------------------------------------------------------- Notes app --- */

function NotesVisual() {
  return (
    <>
      <div className="flex flex-wrap gap-1.5">
        {["Science", "Mathematics", "English", "Nepali", "Account", "Computer"].map((subject, index) => (
          <span
            key={subject}
            className={`rounded-lg border px-2.5 py-1 text-[10.5px] ${
              index === 0 ? "border-accent/40 bg-accent/10 text-foreground" : "border-border bg-surface/70 text-subtle"
            }`}
          >
            {subject}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2.5">
        {[0, 1, 2].map((page) => (
          <div key={page} className="space-y-1.5 rounded-xl border border-border bg-surface/80 p-2.5">
            <span className="mb-1 block h-8 rounded-md bg-border/70" />
            <Bar h="h-1.5" w="w-full" />
            <Bar h="h-1.5" w="w-3/4" />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2.5 rounded-xl border border-border bg-surface/60 px-3.5 py-2.5">
        <span className="text-[10.5px] text-subtle">past questions</span>
        <span className="ml-auto flex gap-1">
          {Array.from({ length: 4 }).map((_, index) => (
            <span key={index} className="size-1.5 rounded-full bg-accent/40" />
          ))}
        </span>
      </div>
    </>
  );
}

const visualByIcon: Record<Project["icon"], (slug: string) => React.ReactNode> = {
  school: SanketVisual,
  vote: ElectionVisual,
  flame: AshriVisual,
  restaurant: RestaurantVisual,
  book: NotesVisual,
};