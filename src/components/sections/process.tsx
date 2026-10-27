import { processSteps } from "@/content/process";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";

export function Process() {
  return (
    <Section labelledBy="process-heading" className="bg-background-subtle">
      <Container>
        <SectionHeading
          id="process-heading"
          eyebrow="07 — How I Work"
          title="How I Work"
          description="The same sequence on every project, from the first conversation through to a maintained deployment."
        />

        <ol className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <Reveal as="li" key={step.number} delay={(index % 4) * 70}>
              <div className="group relative flex h-full flex-col">
                <div className="relative flex items-center gap-3">
                  <span
                    className="relative z-10 inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-accent/20 bg-surface text-sm font-medium text-accent"
                  >
                    {step.number}
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 -top-[4rem] h-px w-[calc(100%+4rem)] -translate-x-1/2 bg-border opacity-30 sm:hidden"
                  />
                  <span
                    aria-hidden="true"
                    className="hidden lg:block absolute left-1/2 top-full -translate-x-1/2 h-[2rem] w-px bg-gradient-to-b from-accent/40 to-transparent"
                  />
                </div>

                <h3 className="mt-5 text-base font-semibold tracking-tight text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
