"use client";

import { useState } from "react";

import { featuredProjects } from "@/content/projects";
import { ButtonLink } from "@/components/ui/button";
import { StatusBadge, Tag } from "@/components/ui/badge";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";
import { ArrowRightIcon, ArrowUpRightIcon, ProjectGlyph } from "@/components/ui/icons";
import { ProjectVisual } from "@/components/sections/project-visual";
import { ErrorBoundary } from "@/components/ui/error-boundary";

export function Projects() {
  // Unique categories across featured projects, preserving first-seen order.
  const categories = Array.from(
    new Set(featuredProjects.map((project) => project.category)),
  );
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered = activeCategory === "All"
    ? featuredProjects
    : featuredProjects.filter((project) => project.category === activeCategory);

  return (
    <Section id="projects" labelledBy="projects-heading">
      <Container>
        <SectionHeading
          id="projects-heading"
          eyebrow="03 — Projects"
          title="Featured Projects"
          description="Real applications built end to end — interface, API, database and deployment. Each case study explains the problem, the architecture and what I actually built."
        />

        <ErrorBoundary>
          <div className="mt-14 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory("All")}
              className={[
                "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-200",
                activeCategory === "All"
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-surface-2 text-muted hover:border-border-strong hover:text-foreground",
              ].join(" ")}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={[
                  "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-200",
                  activeCategory === category
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border bg-surface-2 text-muted hover:border-border-strong hover:text-foreground",
                ].join(" ")}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-12 flex flex-col gap-16 sm:gap-20">
            {filtered.map((project, index) => {
              const reversed = index % 2 === 1;

              return (
                <article
                  key={project.slug}
                  className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
                >
                  {/* Visual */}
                  <Reveal
                    direction={reversed ? "left" : "right"}
                    className={reversed ? "lg:order-2" : undefined}
                  >
                    <div className="group">
                      <ProjectVisual project={project} />
                    </div>
                  </Reveal>

                  {/* Content */}
                  <Reveal
                    direction={reversed ? "right" : "left"}
                    delay={90}
                    className={reversed ? "lg:order-1" : undefined}
                  >
                    <div className="flex flex-col items-start">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xs tracking-[0.16em] text-subtle uppercase">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <StatusBadge status={project.status} withDot />
                      </div>

                      <h3 className="mt-4 flex items-center gap-2.5 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                        <ProjectGlyph
                          icon={project.icon}
                          size={24}
                          className="shrink-0 text-accent"
                        />
                        {project.name}
                      </h3>

                      <p className="mt-2 text-xs tracking-wide text-accent">
                        {project.category}
                      </p>

                      <p className="mt-4 text-base leading-relaxed text-muted">{project.summary}</p>

                      {/* Highlights taken from the case study's feature list. */}
                      <ul className="mt-6 flex flex-col gap-2.5">
                        {project.features.slice(0, 4).map((feature) => (
                          <li key={feature.title} className="flex items-start gap-2.5 text-sm">
                            <span
                              aria-hidden="true"
                              className="mt-2 size-1 shrink-0 rounded-full bg-accent/70"
                            />
                            <span className="text-muted">{feature.title}</span>
                            <span className="mt-px text-[10px] tracking-wide text-subtle">
                              {feature.state === "Implemented"
                                ? "implemented"
                                : feature.state === "Integrated"
                                  ? "integrated"
                                  : "in dev"}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 flex flex-wrap gap-1.5">
                        {project.technologies[0].items.map((tech) => (
                          <Tag key={tech}>{tech}</Tag>
                        ))}
                      </div>

                      {/* Buttons appear only when a real link exists. */}
                      <div className="mt-8 flex flex-wrap items-center gap-3">
                        <ButtonLink href={`/projects/${project.slug}/`} variant="secondary">
                          Read Case Study
                          <ArrowRightIcon size={16} />
                        </ButtonLink>

                        {project.links.map((link) => (
                          <ButtonLink key={link.href} href={link.href} external variant="outline">
                            {link.label}
                            <ArrowUpRightIcon size={15} />
                          </ButtonLink>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                </article>
              );
            })}
          </div>
        </ErrorBoundary>
      </Container>
    </Section>
  );
}
