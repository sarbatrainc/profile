import { siteConfig, socialLinks } from "@/config/site.config";
import { Container, Section } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/sections/contact-form";
import { GithubIcon, LinkedInIcon, MailIcon, MapPinIcon, PhoneIcon } from "@/components/ui/icons";

const iconByLabel = {
  GitHub: GithubIcon,
  LinkedIn: LinkedInIcon,
  Email: MailIcon,
} as const;

interface ContactDetail {
  icon: typeof MailIcon;
  label: string;
  value: string;
  href?: string;
}

export function Contact() {
  const details: ContactDetail[] = [];

  if (siteConfig.email) {
    details.push({
      icon: MailIcon,
      label: "Email",
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    });
  }

  if (siteConfig.phone) {
    details.push({
      icon: PhoneIcon,
      label: "Phone",
      value: siteConfig.phone,
      href: `tel:${siteConfig.phone.replace(/\s+/g, "")}`,
    });
  }

  details.push({ icon: MapPinIcon, label: "Location", value: siteConfig.location });

  const visibleSocials = socialLinks.filter((link) => Boolean(link.href));

  return (
    <Section id="contact" labelledBy="contact-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Left: heading and direct channels */}
          <Reveal direction="right">
            <div className="flex flex-col">
              <p className="text-xs font-medium tracking-[0.18em] text-accent uppercase">
                09 — Contact
              </p>

              <h2
                id="contact-heading"
                className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
              >
                Have a project in mind?
              </h2>

              <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
                I&apos;m open to software development opportunities, freelance projects,
                collaborations and meaningful technology work.
              </p>

              <dl className="mt-9 flex flex-col divide-y divide-border border-y border-border">
                {details.map((detail) => (
                  <div key={detail.label} className="flex items-center gap-4 py-4">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-border bg-surface-2 text-accent">
                      <detail.icon size={17} />
                    </span>
                    <div className="min-w-0">
                      <dt className="text-[11px] tracking-[0.16em] text-subtle uppercase">
                        {detail.label}
                      </dt>
                      <dd className="mt-0.5 truncate text-sm text-foreground">
                        {detail.href ? (
                          <a
                            href={detail.href}
                            className="transition-colors duration-200 hover:text-accent"
                          >
                            {detail.value}
                          </a>
                        ) : (
                          detail.value
                        )}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>

              {visibleSocials.length > 0 && (
                <div className="mt-8">
                  <p className="text-[11px] tracking-[0.16em] text-subtle uppercase">
                    Elsewhere
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {visibleSocials.map((link) => {
                      const Icon = iconByLabel[link.label as keyof typeof iconByLabel];
                      const isExternal = link.href?.startsWith("http");

                      return (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            {...(isExternal
                              ? { target: "_blank", rel: "noopener noreferrer" }
                              : {})}
                            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2 px-4 py-2 text-sm text-muted transition-colors duration-200 hover:border-accent/40 hover:text-foreground"
                          >
                            {link.label === "Email" ? null : Icon && <Icon size={16} />}
                            {link.label}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </Reveal>

          {/* Right: form */}
          <Reveal direction="left" delay={110}>
            <div className="rounded-2xl border border-border bg-surface/60 p-6 shadow-card sm:p-8">
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                Send a message
              </h3>
              <p className="mt-1.5 text-sm text-muted">
                Tell me what you are building and I will reply with how I would approach it.
              </p>

              <div className="mt-6">
                <ContactForm />
              </div>

              {!siteConfig.email && (
                <p className="mt-6 rounded-xl border border-border bg-surface-2 px-4 py-3 text-xs leading-relaxed text-subtle">
                  No contact email is configured yet. Set{" "}
                  <code className="text-foreground">NEXT_PUBLIC_EMAIL</code> in{" "}
                  <code className="text-foreground">.env.local</code> to enable direct
                  contact — see <code className="text-foreground">README.md</code>.
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}