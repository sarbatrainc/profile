import type { Project } from "@/content/projects";
import Image from "next/image";

/**
 * Visual for each project card: a real screenshot/mockup where one exists,
 * otherwise a stylised wireframe that communicates what the software does.
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
    <Image
      src="/school.png"
      alt="School Election Management System voting interface"
      className="max-w-full h-auto rounded-2xl border border-border bg-surface-2 shadow-card object-contain"
      sizes="(max-width: 640px) 100vw, 640px"
      width={640}
      height={480}
      style={{ display: "block", margin: "0 auto" }}
    />
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
    <Image
      src="/bhoklahyo.png"
      alt="Bhok Lagyo restaurant POS interface"
      className="max-w-full h-auto rounded-2xl border border-border bg-surface-2 shadow-card object-contain"
      sizes="(max-width: 640px) 100vw, 640px"
      width={640}
      height={480}
      style={{ display: "block", margin: "0 auto" }}
    />
  );
}

/* ----------------------------------------------------------- Notes app --- */

function NotesVisual() {
  return (
    <Image
      src="/class-9-10-notes.png"
      alt="Class 9 and 10 Notes Platform promotional banner"
      className="max-w-full h-auto rounded-2xl border border-border bg-surface-2 shadow-card object-contain"
      sizes="(max-width: 640px) 100vw, 640px"
      width={640}
      height={480}
      style={{ display: "block", margin: "0 auto" }}
    />
  );
}

const visualByIcon: Record<Project["icon"], (slug: string) => React.ReactNode> = {
  school: SanketVisual,
  vote: ElectionVisual,
  flame: AshriVisual,
  restaurant: RestaurantVisual,
  book: NotesVisual,
};