import Link from "next/link";

import { services } from "@/content/experience";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";
import { ArrowUpRightIcon } from "@/components/ui/icons";

export function Services() {
  return (
    <Section id="services" labelledBy="services-heading">
      <Container>
        <SectionHeading
          id="services-heading"
          eyebrow="06 — Services"
          title="What I Can Build"
          description="Seven areas of work, all covering the full path from interface to deployed system."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.number} delay={(index % 3) * 80}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface/60 p-6 transition-colors duration-300 hover:border-accent/35 hover:bg-surface sm:p-7">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-accent to-accent-2 transition-transform duration-500 ease-out group-hover:scale-x-100"
                />

                <span className="text-xs font-medium tracking-[0.16em] text-accent">
                  {service.number}
                </span>

                <h3 className="mt-3 text-base font-semibold tracking-tight text-foreground">
                  {service.title}
                </h3>

                <p className="mt-2.5 text-sm leading-relaxed text-muted">{service.description}</p>

                <ul className="mt-5 flex flex-col gap-2 border-t border-border pt-4">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[13px] text-subtle">
                      <span
                        aria-hidden="true"
                        className="mt-1.5 size-1 shrink-0 rounded-full bg-accent/60"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/#contact"
                  className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors duration-200 hover:text-accent-hover group-hover:underline-offset-4 group-hover:underline"
                >
                  Start a conversation
                  <ArrowUpRightIcon size={15} />
                </Link>
              </article>
            </Reveal>
          ))}

          {/* Closing card */}
          <Reveal delay={160}>
            <article className="flex h-full flex-col justify-between rounded-2xl border border-border bg-gradient-to-br from-accent/10 via-transparent to-accent-2/10 p-6 sm:p-7">
              <div>
                <h3 className="text-base font-semibold tracking-tight text-foreground">
                  Something else in mind?
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  Most real projects combine several of these. Describe the problem you are trying to
                  solve and I will tell you how I would approach it.
                </p>
              </div>
              <Link
                href="/#contact"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors duration-200 hover:text-accent-hover"
              >
                Start a conversation
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </article>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
