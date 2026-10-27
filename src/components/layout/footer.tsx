import Link from "next/link";

import { navigation } from "@/content/process";
import { featuredProjects } from "@/content/projects";
import { siteConfig, socialLinks } from "@/config/site.config";
import { Container } from "@/components/ui/layout";
import {
  GithubIcon,
  LinkedInIcon,
  MailIcon,
  WhatsappIcon,
} from "@/components/ui/icons";

const iconByLabel = {
  GitHub: GithubIcon,
  LinkedIn: LinkedInIcon,
  Email: MailIcon,
  WhatsApp: WhatsappIcon,
} as const;

export function Footer() {
  const year = new Date().getFullYear();
  const visibleSocials = socialLinks.filter((link) => Boolean(link.href));

  return (
    <footer className="border-t border-border bg-background-subtle">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Identity */}
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="grid size-9 place-items-center rounded-xl border border-border bg-surface-2 text-xs font-semibold text-accent"
              >
                RG
              </span>
              <p className="text-base font-semibold tracking-tight text-foreground">
                {siteConfig.name}
              </p>
            </div>
            <p className="mt-4 text-sm text-muted">{siteConfig.title}</p>
            <p className="mt-3 text-sm leading-relaxed text-subtle">
              Flutter and full-stack applications built with Laravel, PostgreSQL and REST APIs.
            </p>

            {visibleSocials.length > 0 && (
              <ul className="mt-6 flex items-center gap-2">
                {visibleSocials.map((link) => {
                  const Icon = iconByLabel[link.label as keyof typeof iconByLabel];
                  const isExternal = link.href?.startsWith("http");

                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        aria-label={link.label}
                        title={link.label}
                        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface-2 text-muted transition-colors duration-200 hover:border-accent/40 hover:text-accent"
                      >
                        {Icon && <Icon size={17} />}
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <h2 className="text-xs font-medium tracking-[0.18em] text-subtle uppercase">
              Navigate
            </h2>
            <ul className="mt-4 space-y-2.5">
              {navigation.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors duration-200 hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="text-xs font-medium tracking-[0.18em] text-subtle uppercase">
              Get in touch
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {siteConfig.email && (
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-muted transition-colors duration-200 hover:text-foreground"
                  >
                    {siteConfig.email}
                  </a>
                </li>
              )}
              {siteConfig.phone && (
                <li>
                  <a
                    href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                    className="text-muted transition-colors duration-200 hover:text-foreground"
                  >
                    {siteConfig.phone}
                  </a>
                </li>
              )}
              <li className="text-subtle">{siteConfig.location}</li>
            </ul>

            {siteConfig.resumeUrl && (
              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors duration-200 hover:text-accent-hover"
              >
                Download Resume
                <span aria-hidden="true">&rarr;</span>
              </a>
            )}
          </div>
        </div>

        {/* Recent work thumbnails */}
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {featuredProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}/`}
              className="group flex items-center gap-3 rounded-xl border border-border bg-surface/50 p-3 hover:border-accent/40 hover:bg-surface/80"
            >
              <div className="grid size-10 shrink-0 place-items-center rounded-lg border border-border bg-surface-2 group-hover:border-accent/40">
                <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-accent">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground group-hover:text-accent">
                  {project.name}
                </p>
                <p className="text-[11px] text-subtle">{project.category}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-subtle">Built with Next.js, Tailwind CSS and TypeScript</p>
        </div>
      </Container>
    </footer>
  );
}
