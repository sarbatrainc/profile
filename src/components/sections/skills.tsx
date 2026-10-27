import { skillGroups } from "@/content/skills";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";

export function Skills() {
  return (
    <Section id="skills" labelledBy="skills-heading" className="bg-background-subtle">
      <Container>
        <SectionHeading
          id="skills-heading"
          eyebrow="02 — Skills"
          title="Technical Skills"
          description="The technologies I use to build, and what each one is actually used for in the work."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {skillGroups.map((group, groupIndex) => (
            <Reveal
              key={group.title}
              delay={groupIndex * 80}
              className={groupIndex === skillGroups.length - 1 ? "lg:col-span-2" : undefined}
            >
              <section
                aria-labelledby={`skill-group-${groupIndex}`}
                className="flex h-full flex-col rounded-2xl border border-border bg-surface/70 p-6 shadow-soft transition-colors duration-300 hover:border-border-strong sm:p-7"
              >
                <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3
                    id={`skill-group-${groupIndex}`}
                    className="text-lg font-semibold tracking-tight text-foreground"
                  >
                    {group.title}
                  </h3>
                </header>
                <p className="mt-2 text-sm text-muted">{group.summary}</p>

                <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                  {group.items.map((item) => (
                    <li key={item.name} className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          aria-hidden="true"
                          className="size-1.5 shrink-0 rounded-full bg-accent/70"
                        />
                        <h4 className="text-sm font-medium text-foreground">{item.name}</h4>
                      </div>
                      <p className="mt-1 pl-3.5 text-[13px] leading-relaxed text-muted">
                        {item.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}