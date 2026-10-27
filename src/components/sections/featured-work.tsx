"use client";

import { featuredProjects } from "@/content/projects";
import { Container, Section } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";
import { Tag } from "@/components/ui/badge";
import { ProjectVisual } from "@/components/sections/project-visual";

export function FeaturedWork() {
  return (
    <Section id="featured-work" bordered className="bg-background-subtle">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium tracking-[0.18em] text-accent uppercase">
              Selected work
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Projects I have built
            </h2>
          </div>
          <p className="text-sm text-muted sm:text-base">
            Real applications — Flutter interfaces, Laravel APIs, PostgreSQL
            databases — shipped end to end.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <Reveal
              key={project.slug}
              className="group rounded-2xl border border-border bg-surface hover:bg-surface/50 transition-colors duration-300"
            >
              {/* Project image / visual */}
              <div className="relative overflow-hidden rounded-xl border border-border bg-surface-2 aspect-video">
                <ProjectVisual project={project} />
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <span className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-2 px-2.5 py-0.5 text-[10px] font-medium text-muted uppercase tracking-wider">
                  {project.category}
                </span>
                <h3
                  className="text-base font-semibold tracking-tight text-foreground group-hover:text-accent transition-colors"
                >
                  {project.name}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {project.summary}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.technologies[0]?.items.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
