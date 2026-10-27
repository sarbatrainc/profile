import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getAdjacentProjects, getProjectBySlug, projects } from "@/content/projects";
import type { ProjectIcon } from "@/content/projects";
import { siteConfig } from "@/config/site.config";
import { ButtonLink } from "@/components/ui/button";
import { FeatureStateBadge, StatusBadge, Tag } from "@/components/ui/badge";
import { Container } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";
import { StackFlow, WorkflowFlow } from "@/components/ui/flow";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  ProjectGlyph,
} from "@/components/ui/icons";
import { ProjectBanner } from "@/components/sections/project-banner";
import { ProjectsJsonLd } from "@/components/seo/json-ld";

type Params = { params: Promise<{ slug: string }> };

/** Only the projects defined in the content file are generated. */
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  const url = `/projects/${project.slug}/`;

  return {
    title: `${project.name} — Case Study`,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: `${project.name} — Case Study | ${siteConfig.name}`,
      description: project.summary,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${project.name} — ${project.category}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} — Case Study | ${siteConfig.name}`,
      description: project.summary,
      images: ["/og-image.png"],
    },
  };
}

const sections = [
  { id: "overview", number: "01", title: "Overview" },
  { id: "problem", number: "02", title: "Problem" },
  { id: "solution", number: "03", title: "Solution" },
  { id: "features", number: "04", title: "Features" },
  { id: "technology", number: "05", title: "Technology" },
  { id: "architecture", number: "06", title: "Architecture" },
  { id: "challenges", number: "07", title: "Challenges" },
  { id: "contribution", number: "08", title: "My Contribution" },
  { id: "results", number: "09", title: "Results / Current Status" },
] as const;

export default async function ProjectCaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const { previous, next } = getAdjacentProjects(project.slug);

  return (
    <>
      <ProjectsJsonLd />

      <article>
        {/* ------------------------------------------------------------ hero */}
        <header className="relative overflow-hidden border-b border-border pt-32 pb-14 sm:pt-40 sm:pb-16">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-24 left-1/4 size-[460px] rounded-full bg-accent/8 blur-[120px]" />
            <div className="absolute -bottom-24 right-1/4 size-[420px] rounded-full bg-accent-2/8 blur-[120px]" />
          </div>

          <Container>
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 font-mono text-xs text-subtle">
                <li>
                  <Link href="/" className="transition-colors duration-200 hover:text-foreground">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    href="/#projects"
                    className="transition-colors duration-200 hover:text-foreground"
                  >
                    Projects
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-foreground">{project.name}</li>
              </ol>
            </nav>

            <div className="mt-8 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <StatusBadge status={project.status} withDot />
                  <span className="text-xs tracking-[0.14em] text-subtle uppercase">
                    {project.category}
                  </span>
                </div>

                <h1 className="mt-5 flex items-center gap-3 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
                  <ProjectGlyph icon={project.icon} size={30} className="shrink-0 text-accent" />
                  {project.name}
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                  {project.summary}
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  {project.links.map((link) => (
                    <ButtonLink key={link.href} href={link.href} external variant="outline">
                      {link.label}
                      <ArrowUpRightIcon size={15} />
                    </ButtonLink>
                  ))}
                  <ButtonLink href="#contribution" variant="secondary">
                    What I built
                    <ArrowRightIcon size={16} />
                  </ButtonLink>
                  <ButtonLink href="/#contact" variant="ghost">
                    Discuss a similar project
                  </ButtonLink>
                </div>
              </div>

              <ProjectBanner project={project} />
            </div>
          </Container>
        </header>

        {/* ------------------------------------------------------- body */}
        <Container className="py-14 sm:py-16">
          <div className="grid gap-12 lg:grid-cols-[0.22fr_0.78fr] lg:gap-16">
            {/* Table of contents */}
            <nav aria-label="Case study sections" className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-[11px] tracking-[0.18em] text-subtle uppercase">
                On this page
              </p>
              <ol className="mt-4 flex flex-col gap-1">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="group flex items-baseline gap-2.5 rounded-lg px-2 py-1.5 text-sm text-muted transition-colors duration-200 hover:bg-surface-2 hover:text-foreground"
                    >
                      <span className="text-[11px] text-subtle">{section.number}</span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="flex min-w-0 flex-col gap-14">
              <SectionBlock number="01" title="Overview" id="overview">
                <Prose paragraphs={project.overview} />
              </SectionBlock>

              <SectionBlock number="02" title="Problem" id="problem">
                <Prose paragraphs={project.problem} />
              </SectionBlock>

              <SectionBlock number="03" title="Solution" id="solution">
                <Prose paragraphs={project.solution} />
              </SectionBlock>

              <SectionBlock number="04" title="Features" id="features">
                <p className="max-w-2xl text-sm leading-relaxed text-muted">
                  Each feature is labelled by its current state:{" "}
                  <span className="text-foreground">Implemented</span> means it is built and working,{" "}
                  <span className="text-foreground">Integrated</span> means it is connected to
                  hardware or an external service, and{" "}
                  <span className="text-foreground">In Development</span> means it is actively
                  being built and is not yet complete.
                </p>

                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {project.features.map((feature) => (
                    <li
                      key={feature.title}
                      className="rounded-xl border border-border bg-surface/50 p-4 transition-colors duration-300 hover:border-border-strong"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-sm font-medium text-foreground">{feature.title}</h3>
                        <FeatureStateBadge state={feature.state} />
                      </div>
                      <p className="mt-2 text-[13px] leading-relaxed text-muted">
                        {feature.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </SectionBlock>

              <SectionBlock number="05" title="Technology" id="technology">
                <div className="grid gap-5 sm:grid-cols-2">
                  {project.technologies.map((group) => (
                    <div
                      key={group.group}
                      className="rounded-xl border border-border bg-surface/50 p-5"
                    >
                      <h3 className="text-[11px] tracking-[0.16em] text-subtle uppercase">
                        {group.group}
                      </h3>
                      <ul className="mt-3.5 flex flex-wrap gap-1.5">
                        {group.items.map((item) => (
                          <li key={item}>
                            <Tag>{item}</Tag>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </SectionBlock>

              <SectionBlock number="06" title="Architecture" id="architecture">
                <p className="max-w-2xl text-sm leading-relaxed text-muted">
                  {project.architecture.summary}
                </p>

                <div className="mt-8 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
                  <div className="rounded-2xl border border-border bg-surface/50 p-6">
                    <p className="text-[11px] tracking-[0.16em] text-subtle uppercase">
                      Layers
                    </p>
                    <StackFlow
                      layers={project.architecture.layers.map((layer, index) => ({
                        label: layer.label,
                        detail: layer.detail,
                        icon: layerIconFor(project.icon, index),
                      }))}
                      accent="compact"
                      className="mt-6"
                    />
                  </div>

                  <div className="flex flex-col gap-6">
                    {project.architecture.workflow && (
                      <div className="rounded-2xl border border-border bg-surface/50 p-6">
                        <WorkflowFlow
                          steps={project.architecture.workflow}
                          label="Workflow"
                        />
                      </div>
                    )}

                    {project.architecture.integrations.length > 0 && (
                      <div className="rounded-2xl border border-border bg-surface/50 p-6">
                        <p className="font-mono text-[11px] tracking-[0.16em] text-subtle uppercase">
                          Integrations
                        </p>
                        <ul className="mt-4 flex flex-col gap-2.5">
                          {project.architecture.integrations.map((integration) => (
                            <li key={integration} className="flex items-start gap-2.5 text-sm text-muted">
                              <span
                                aria-hidden="true"
                                className="mt-2 size-1 shrink-0 rounded-full bg-accent/70"
                              />
                              {integration}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </SectionBlock>

              <SectionBlock number="07" title="Challenges" id="challenges">
                <div className="grid gap-4 sm:grid-cols-2">
                  {project.challenges.map((challenge) => (
                    <div
                      key={challenge.title}
                      className="rounded-xl border border-border bg-surface/50 p-5"
                    >
                      <h3 className="text-sm font-semibold text-foreground">{challenge.title}</h3>
                      <p className="mt-2 text-[13px] leading-relaxed text-muted">
                        {challenge.description}
                      </p>
                    </div>
                  ))}
                </div>
              </SectionBlock>

              <SectionBlock number="08" title="My Contribution" id="contribution">
                <ul className="flex flex-col gap-3">
                  {project.contribution.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-muted">
                      <span
                        aria-hidden="true"
                        className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </SectionBlock>

              <SectionBlock number="09" title="Results / Current Status" id="results">
                <Prose paragraphs={project.results} />
              </SectionBlock>
            </div>
          </div>
        </Container>

        {/* ------------------------------------------------- prev / next */}
        <Container className="pb-16">
          <div className="grid gap-4 border-t border-border pt-10 sm:grid-cols-2">
            {previous ? (
              <Link
                href={`/projects/${previous.slug}/`}
                className="group rounded-2xl border border-border bg-surface/50 p-5 transition-colors duration-300 hover:border-accent/35"
              >
                <span className="inline-flex items-center gap-1.5 text-[11px] text-subtle">
                  <ArrowLeftIcon size={13} />
                  Previous project
                </span>
                <span className="mt-2 block text-base font-semibold text-foreground">
                  {previous.name}
                </span>
                <span className="mt-1 block text-[13px] text-muted">{previous.category}</span>
              </Link>
            ) : (
              <span />
            )}

            {next && (
              <Link
                href={`/projects/${next.slug}/`}
                className="group rounded-2xl border border-border bg-surface/50 p-5 text-right transition-colors duration-300 hover:border-accent/35"
              >
                <span className="inline-flex items-center gap-1.5 text-[11px] text-subtle">
                  Next project
                  <ArrowRightIcon size={13} />
                </span>
                <span className="mt-2 block text-base font-semibold text-foreground">
                  {next.name}
                </span>
                <span className="mt-1 block text-[13px] text-muted">{next.category}</span>
              </Link>
            )}
          </div>
        </Container>
      </article>
    </>
  );
}

/* ---------------------------------------------------------------- helpers --- */

function SectionBlock({
  number,
  title,
  id,
  children,
}: {
  number: string;
  title: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-medium text-accent">{number}</span>
          <span aria-hidden="true" className="h-px flex-1 bg-border" />
        </div>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">{title}</h2>
        <div className="mt-5">{children}</div>
      </Reveal>
    </section>
  );
}

function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="flex max-w-2xl flex-col gap-4">
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 40)} className="text-[15px] leading-relaxed text-muted sm:text-base">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

/**
 * The first architecture node carries the project's glyph; the remaining
 * nodes are numbered, which keeps the diagram readable.
 */
function layerIconFor(icon: ProjectIcon, index: number): ProjectIcon | undefined {
  return index === 0 ? icon : undefined;
}