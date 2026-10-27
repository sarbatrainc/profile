import { siteConfig } from "@/config/site.config";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";
import { ArrowUpRightIcon, GithubIcon } from "@/components/ui/icons";

/**
 * GitHub call to action.
 *
 * The button is rendered only when a real profile URL is configured, so no
 * invented repository or profile link can ever appear.
 */
export function GitHubCta() {
  return (
    <section className="border-y border-border bg-background-subtle py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-8 rounded-2xl border border-border bg-gradient-to-br from-accent/10 via-surface/50 to-accent-2/10 p-7 sm:p-10 lg:flex-row lg:items-center">
            <div className="flex items-start gap-5">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-border bg-surface text-accent">
                <GithubIcon size={22} />
              </span>
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  Explore my code and development work.
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                  My repositories cover the Flutter work I am proud to publish, along with the Laravel
                  and database work behind it.
                </p>
              </div>
            </div>

            {siteConfig.githubUrl && (
              <ButtonLink href={siteConfig.githubUrl} external size="lg" className="shrink-0">
                View GitHub
                <ArrowUpRightIcon size={16} />
              </ButtonLink>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}