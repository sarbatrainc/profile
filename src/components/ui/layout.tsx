import { Reveal } from "@/components/ui/reveal";

export function Container({
  children,
  className,
  size = "default",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}) {
  const width = {
    narrow: "max-w-3xl",
    default: "max-w-6xl",
    wide: "max-w-7xl",
  }[size];

  return <div className={`mx-auto w-full ${width} px-5 sm:px-8 ${className ?? ""}`}>{children}</div>;
}

/**
 * Consistent section wrapper: anchor target, vertical rhythm and decorative
 * divider so every section on the page is spaced the same way.
 */
export function Section({
  id,
  children,
  className,
  bordered = true,
  labelledBy,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  bordered?: boolean;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={[
        "scroll-mt-24 py-20 sm:py-28",
        bordered ? "border-t border-border" : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </section>
  );
}

interface SectionHeadingProps {
  /** Small label above the title, e.g. "02 — Skills". */
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  id?: string;
  children?: React.ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  id,
  children,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={[
        "flex flex-col gap-4",
        align === "center" ? "mx-auto max-w-3xl items-center text-center" : "max-w-3xl",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {eyebrow && (
        <p className="text-xs font-medium tracking-[0.18em] text-accent uppercase">
          {eyebrow}
        </p>
      )}
      <h2 id={id} className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="text-base leading-relaxed text-muted sm:text-lg">{description}</p>
      )}
      {children}
    </Reveal>
  );
}