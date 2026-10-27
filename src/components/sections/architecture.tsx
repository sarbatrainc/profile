import { architectureStack, integrationPoints } from "@/content/process";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { StackFlow } from "@/components/ui/flow";
import { Reveal } from "@/components/ui/reveal";
import {
  CloudIcon,
  CodeIcon,
  DatabaseIcon,
  FingerprintIcon,
  KeyIcon,
  PlugIcon,
  PrinterIcon,
  ServerIcon,
  SmartphoneIcon,
  TerminalIcon,
} from "@/components/ui/icons";

const integrationIcons = [
  FingerprintIcon,
  PrinterIcon,
  KeyIcon,
  CloudIcon,
  PlugIcon,
] as const;

export function Architecture() {
  return (
    <Section labelledBy="architecture-heading">
      <Container>
        <SectionHeading
          id="architecture-heading"
          eyebrow="08 — Architecture"
          title="From Interface to Infrastructure"
          description="Frontend work is only one layer. This is the path a feature travels from a Flutter widget down to a running server — and the hardware and third-party services it may touch on the way."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* Vertical stack */}
          <Reveal direction="right">
            <div className="rounded-2xl border border-border bg-surface/60 p-6 shadow-soft sm:p-8">
              <p className="text-xs font-medium tracking-[0.18em] text-subtle uppercase">
                The stack
              </p>
              <StackFlow layers={architectureStack} className="mt-7" />
            </div>
          </Reveal>

          {/* Integration points */}
          <Reveal direction="left" delay={100}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {integrationPoints.map((point, index) => {
                  const Icon = integrationIcons[index] ?? PlugIcon;

                  return (
                    <div
                      key={point.label}
                      className="rounded-2xl border border-border bg-surface/60 p-5 transition-colors duration-300 hover:border-accent/35"
                    >
                      <Icon size={20} className="text-accent" />
                      <h3 className="mt-3.5 text-sm font-semibold text-foreground">{point.label}</h3>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{point.detail}</p>
                    </div>
                  );
                })}
              </div>

              {/* Client targets */}
              <div className="rounded-2xl border border-border bg-gradient-to-br from-accent/8 via-transparent to-accent-2/8 p-6 sm:p-7">
                <p className="text-xs font-medium tracking-[0.18em] text-subtle uppercase">
                  One codebase, several targets
                </p>

                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    { icon: SmartphoneIcon, label: "Android & iOS", detail: "Mobile applications" },
                    { icon: CodeIcon, label: "Web", detail: "Flutter Web, admin panels, voting" },
                    { icon: TerminalIcon, label: "Desktop", detail: "Windows and Linux targets" },
                    { icon: ServerIcon, label: "Backend", detail: "Laravel API on your own hosting" },
                  ].map((target) => (
                    <li key={target.label} className="flex items-start gap-3">
                      <target.icon size={18} className="mt-0.5 shrink-0 text-accent" />
                      <span>
                        <span className="block text-sm font-medium text-foreground">{target.label}</span>
                        <span className="block text-[13px] text-muted">{target.detail}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What this means */}
              <div className="rounded-2xl border border-border bg-surface/60 p-6 sm:p-7">
                <div className="flex items-center gap-2.5">
                  <DatabaseIcon size={18} className="text-accent" />
                  <h3 className="text-sm font-semibold text-foreground">
                    Why this matters for your project
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  When one person owns the whole path, there is no gap between what the database can
                  express and what the interface can show. Data constraints, permission rules and
                  validation get decided once and applied everywhere, instead of being rediscovered at
                  every layer.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}