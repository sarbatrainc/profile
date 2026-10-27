"use client";

import { siteConfig } from "@/config/site.config";
import { Section } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";

export function Stats() {
  return (
    <Section id="stats" bordered={false} className="bg-background-subtle">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20 sm:py-28">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium tracking-[0.18em] text-accent uppercase">
              By the numbers
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              A few numbers that matter
            </h2>
          </div>
          <p className="text-sm text-muted sm:text-base">
            Real facts, no padding — what I have actually built and shipped.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {siteConfig.stats.map((stat, index) => (
            <Reveal
              key={stat.number}
              delay={index * 60}
              className="group rounded-2xl border border-border bg-surface p-8 sm:p-10 hover:border-accent/35 transition-colors duration-300"
            >
              <div className="flex flex-col gap-3">
                <span
                  className="text-4xl font-semibold tracking-tight text-foreground"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  {stat.number}
                </span>
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {stat.label}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {stat.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
