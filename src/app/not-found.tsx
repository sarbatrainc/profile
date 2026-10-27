import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { TerminalIcon } from "@/components/ui/icons";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
      <span className="grid size-14 place-items-center rounded-2xl border border-border bg-surface-2 text-accent">
        <TerminalIcon size={24} />
      </span>

      <p className="mt-8 text-sm text-subtle">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        This route does not exist.
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
        The page you were looking for has moved or was never deployed. The projects and case studies
        are all reachable from the homepage.
      </p>

      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/" size="lg">
          Back to homepage
        </ButtonLink>
        <ButtonLink href="/#projects" size="lg" variant="secondary">
          View projects
        </ButtonLink>
      </div>
    </Container>
  );
}