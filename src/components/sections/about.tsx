import { siteConfig } from "@/config/site.config";
import { education } from "@/content/experience";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";
import { ArrowUpRightIcon, MapPinIcon } from "@/components/ui/icons";
import Image from "next/image";

const backgroundPoints = [
  {
    title: "BSc.CSIT background",
    detail:
      "Computer Science and Information Technology studies — programming, databases and software engineering.",
  },
  {
    title: "Flutter & Dart in production",
    detail: "Mobile, web and desktop applications built with Flutter and Dart.",
  },
  {
    title: "Laravel backends",
    detail: "REST APIs, authentication, role-based access and admin panels.",
  },
  {
    title: "PostgreSQL",
    detail: "Schema design, migrations and relational modelling for real data.",
  },
  {
    title: "Domain experience",
    detail: "Education software, election systems, restaurant POS and content applications.",
  },
  {
    title: "Deployment",
    detail: "Hosting, environment configuration, domains and production troubleshooting.",
  },
];

export function About() {
  return (
    <Section id="about" labelledBy="about-heading">
      <Container>
        <SectionHeading
          id="about-heading"
          eyebrow="01 — About"
          title="About Me"
          description="I build complete applications — interface, API, database and deployment — rather than isolated screens."
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Profile photo */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative group">
              <Image
                src="/photo.jpg"
                alt={siteConfig.name}
                fill
                className="object-cover rounded-2xl border border-border bg-surface-2 shadow-card transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 480px) 100vw, 400px"
                priority
              />
              <span className="absolute -bottom-4 -right-4 z-10 grid size-10 place-items-center rounded-full border border-white bg-accent shadow-lg transition-all duration-300 group-hover:scale-110">
                <span className="text-[10px] font-semibold text-accent-on">RG</span>
              </span>
            </div>
          </div>

          {/* Narrative */}
          <Reveal className="flex flex-col gap-5">
            {siteConfig.about.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-base leading-relaxed text-muted sm:text-lg">
                {paragraph}
              </p>
            ))}

            <div className="mt-2 flex flex-wrap items-center gap-3">
              {education.map((entry) => (
                <span
                  key={entry.qualification}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2 px-3.5 py-1.5 text-sm font-medium text-foreground"
                >
                  {entry.qualification}
                </span>
              ))}
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2 px-3.5 py-1.5 text-sm text-muted">
                <MapPinIcon size={15} />
                {siteConfig.location}
              </span>
            </div>
          </Reveal>

          {/* What I actually work with */}
          <Reveal delay={120}>
            <div className="rounded-2xl border border-border bg-surface/60 p-6 shadow-card sm:p-7">
              <h3 className="text-xs font-medium tracking-[0.18em] text-subtle uppercase">
                Background
              </h3>

              <dl className="mt-5 divide-y divide-border">
                {backgroundPoints.map((point) => (
                  <div key={point.title} className="flex flex-col gap-1 py-3.5 first:pt-0 last:pb-0">
                    <dt className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                      {point.title}
                      <ArrowUpRightIcon size={13} className="text-accent" />
                    </dt>
                    <dd className="text-sm leading-relaxed text-muted">{point.detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>

          {/* Qualitative highlights — deliberately not statistics. */}
          <div className="mt-14 grid gap-5 sm:grid-cols-3">
            {siteConfig.highlights.map((highlight, index) => (
              <Reveal key={highlight.title} delay={index * 90}>
                <article className="group h-full rounded-2xl border border-border bg-surface/50 p-6 transition-colors duration-300 hover:border-accent/35 hover:bg-surface">
                  <h3 className="text-base font-semibold text-foreground">{highlight.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{highlight.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
      </Container>
    </Section>
  );
}