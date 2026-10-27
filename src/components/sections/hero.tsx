import { siteConfig, socialLinks } from "@/config/site.config";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { DownloadIcon, GithubIcon, LinkedInIcon, WhatsappIcon } from "@/components/ui/icons";
import Image from "next/image";

interface SocialIcon {
  label: string;
  Icon: React.ComponentType<{ size?: number }>;
}

const socialIconMap: Record<string, SocialIcon> = {
  GitHub: { label: "GitHub", Icon: GithubIcon },
  LinkedIn: { label: "LinkedIn", Icon: LinkedInIcon },
  WhatsApp: { label: "WhatsApp", Icon: WhatsappIcon },
};

export function Hero() {
  const visibleSocials = socialLinks.filter(
    (link) => Boolean(link.href) && link.label in socialIconMap,
  );

  const [firstName, surname] = siteConfig.name.split(" ");

  return (
    <section id="home" className="relative overflow-hidden pt-24 pb-20 sm:pt-32 sm:pb-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 size-[600px] -translate-x-1/2 rounded-full bg-accent/8 blur-[120px]" />
        <div className="absolute -top-10 right-0 size-[460px] rounded-full bg-accent-2/8 blur-[120px]" />
      </div>

      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="animate-hero-in flex justify-center relative" style={{ animationDelay: "400ms" }}>
            <div className="relative group">
              <Image
                src="/photo.jpg"
                alt={siteConfig.name}
                className="rounded-[2rem] border border-border bg-surface-2 shadow-card object-cover"
                sizes="(max-width: 480px) 100vw, 480px"
                priority
                width={520}
                height={640}
                style={{ aspectRatio: "4 / 5" }}
              />
              <span className="absolute -bottom-6 -right-6 z-10 grid size-12 place-items-center rounded-full border border-white bg-accent shadow-lg transition-all duration-300 group-hover:scale-110">
                <span className="text-[11px] font-semibold text-accent-on">{firstName[0]}{surname[0]}</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col items-start justify-center">
            <p className="animate-hero-in inline-flex items-center gap-2 rounded-full border border-border bg-surface-2/70 px-3 py-1.5 text-xs font-medium text-muted backdrop-blur-sm"
              style={{ animationDelay: "60ms" }}
            >
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-70" />
                <span className="relative inline-flex size-1.5 rounded-full bg-success" />
              </span>
              Open to software development opportunities
            </p>

            <p
              className="animate-hero-in mt-4 text-xs font-semibold tracking-widest uppercase text-foreground"
              style={{ animationDelay: "120ms" }}
            >
              Namaste, I am
            </p>

            <h1
              className="animate-hero-in mt-1 tracking-tight text-foreground sm:text-5xl lg:text-6xl italic"
              style={{ animationDelay: "160ms" }}
            >
              <span className="block">{firstName}</span>
              <span className="block mt-0 text-accent font-bold tracking-[-0.02em]">{surname}</span>
            </h1>

            <p
              className="animate-hero-in mt-4 font-medium text-foreground sm:text-xl lg:text-2xl"
              style={{ animationDelay: "220ms" }}
            >
              {siteConfig.title}
            </p>

            <div
              className="animate-hero-in mt-4 flex items-center gap-3 text-sm text-muted"
              style={{ animationDelay: "240ms" }}
            >
              <span className="relative flex size-4">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex size-4 rounded-full bg-accent" />
              </span>
              “A developer by skill. An entrepreneur by mindset.”
            </div>

            <p
              className="animate-hero-in mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg"
              style={{ animationDelay: "280ms" }}
            >
              {siteConfig.intro}
            </p>

            <div
              className="animate-hero-in mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ animationDelay: "340ms" }}
            >
              <ButtonLink href="#projects" size="lg">
                View My Work
              </ButtonLink>
              <ButtonLink href="#contact" size="lg" variant="secondary">
                Let&apos;s Work Together
              </ButtonLink>
              {siteConfig.resumeUrl && (
                <ButtonLink href={siteConfig.resumeUrl} external size="lg" variant="ghost">
                  <DownloadIcon size={17} />
                  Download Resume
                </ButtonLink>
              )}
            </div>

            {visibleSocials.length > 0 && (
              <div
                className="animate-hero-in mt-8 flex items-center gap-3"
                style={{ animationDelay: "400ms" }}
              >
                {visibleSocials.map((link) => {
                  const { Icon } = socialIconMap[link.label as keyof typeof socialIconMap];
                  const isExternal = link.href?.startsWith("http");
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      aria-label={link.label}
                      className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface-2 text-muted cursor-pointer transition-colors duration-200 hover:border-accent/40 hover:text-accent hover:scale-105"
                    >
                      <Icon size={17} />
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </Container>

      <div className="relative mt-20 sm:mt-28 -mx-5 sm:-mx-8">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-6 sm:grid-cols-3">
            {siteConfig.highlights.map((highlight) => (
              <div
                key={highlight.title}
                className="rounded-2xl border border-border bg-surface/60 p-8 sm:p-10 backdrop-blur-sm"
              >
                <h3 className="text-sm font-semibold tracking-[0.12em] uppercase text-muted">
                  {highlight.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-foreground sm:text-lg">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
