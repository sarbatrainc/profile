import { siteConfig, whatsappLink } from "@/config/site.config";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";
import { ArrowUpRightIcon, WhatsappIcon } from "@/components/ui/icons";

export function CTA() {
  return (
    <section className="border-y border-border bg-background-subtle py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-8 rounded-2xl border border-border bg-gradient-to-br from-accent/8 via-transparent to-accent-2/8 p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-5">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-border bg-surface text-accent">
                <WhatsappIcon size={22} />
              </span>
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  Ready to build something remarkable?
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                  Website, software, mobile app or AI automation — tell me the goal and I will
                  bring the plan, timeline and team.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {siteConfig.phone && (
                <a
                  href={whatsappLink(siteConfig.chatDefaultText)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3 text-sm font-medium text-whatsapp-on shadow-float transition-colors duration-200 hover:bg-whatsapp-hover focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  <WhatsappIcon size={18} />
                  WhatsApp Me
                </a>
              )}
              <ButtonCTA />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function ButtonCTA() {
  const hasPhone = Boolean(siteConfig.phone);
  return (
    <ButtonLink href="/#contact" variant="outline" size="sm" className={hasPhone ? "ml-3 sm:ml-0" : ""}>
      Start a conversation
      <ArrowUpRightIcon size={15} />
    </ButtonLink>
  );
}
