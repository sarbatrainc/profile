import { experience, education } from "@/content/experience";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";
import { MapPinIcon } from "@/components/ui/icons";
import { ErrorBoundary } from "@/components/ui/error-boundary";

function periodText(entry: (typeof experience)[number]): string {
  const parts = [entry.startDate, entry.period, entry.endDate].filter(Boolean);
  return parts.length > 0 ? parts.join(" — ") : "";
}

export function ExperienceSection() {
  return (
    <Section id="experience" labelledBy="experience-heading" className="bg-background-subtle">
      <Container>
        <SectionHeading
          id="experience-heading"
          eyebrow="04 — Experience"
          title="Work Experience & Journey"
          description="A path from school-time teaching and an internship, through Flutter application development across education, restaurant and devotional domains, into full-stack work I ship and support."
        />

        <div className="mt-12 space-y-10">
          <ErrorBoundary>
            {experience.map((entry, index) => (
              <div
                key={entry.organisation}
                className="group relative pl-14 border-l-2 border-accent/20"
              >
                {/* Timeline marker */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 -top-0.5 size-4 rounded-full bg-accent ring-4 ring-accent/10 ring-offset-2 ring-offset-background-subtle shadow-[0_0_10px_3px_oklch(54%_0.19_262_/0.35)]"
                />

                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline gap-2.5">
                  <span
                    className="text-[11px] font-medium tracking-wide text-accent"
                  >
                    {periodText(entry) || entry.type}
                  </span>
                  <span className="ml-auto text-[11px] font-medium tracking-wide text-subtle">
                    #{String(index + 1).padStart(2, "0")}
                  </span>
                  </div>

                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {entry.role}
                  </h3>

                  <p className="text-sm font-medium text-accent-2">
                    {entry.organisation}
                  </p>

                  {entry.location && (
                    <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted">
                      <MapPinIcon size={13} />
                      {entry.location}
                    </p>
                  )}

                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {entry.description}
                  </p>

                  {entry.highlights.length > 0 && (
                    <ul className="mt-4 flex flex-col gap-2 text-sm text-muted">
                      {entry.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-2">
                          <span className="mt-1 size-1 shrink-0 rounded-full bg-accent/70" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </ErrorBoundary>
        </div>

        {/* Education */}
        <Section className="border-none py-0 mt-16">
          <div className="mt-16 grid gap-4">
            <p className="text-xs font-medium tracking-[0.18em] text-subtle uppercase">
              05 — Education
            </p>
            {education.map((entry) => (
              <Reveal key={entry.qualification} className="rounded-2xl border border-border bg-surface/50 p-6 shadow-card">
                <h3 className="text-xl font-semibold tracking-tight text-foreground">
                  {entry.qualification}
                </h3>
                <p className="mt-1 text-accent">{entry.field}</p>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
                  {entry.detail}
                </p>
              </Reveal>
            ))}
          </div>
        </Section>
      </Container>
    </Section>
  );
}
