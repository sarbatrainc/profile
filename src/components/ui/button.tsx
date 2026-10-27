import Link from "next/link";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-on shadow-card hover:bg-accent-hover hover:shadow-float active:translate-y-px",
  secondary:
    "bg-surface-2 text-foreground border border-border hover:border-border-strong hover:bg-surface-raised",
  outline:
    "border border-border-strong text-foreground hover:border-accent hover:text-accent",
  ghost: "text-muted hover:text-foreground hover:bg-surface-2",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

interface SharedProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

type ButtonProps = SharedProps & {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  "aria-label"?: string;
};

type ButtonLinkProps = SharedProps & {
  href: string;
  /** Render as an external link: new tab, no-opener. */
  external?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
};

type ClassInput = Omit<SharedProps, "children">;

function buildClasses({ variant, size, className }: ClassInput) {
  return [base, variants[variant ?? "primary"], sizes[size ?? "md"], className]
    .filter(Boolean)
    .join(" ");
}

export function Button({
  variant,
  size,
  className,
  children,
  onClick,
  type = "button",
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buildClasses({ variant, size, className })}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant,
  size,
  className,
  children,
  href,
  external,
  onClick,
  ...rest
}: ButtonLinkProps) {
  const classes = buildClasses({ variant, size, className });

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={classes}
        {...rest}
      >
        {children}
      </a>
    );
  }

  // In-page anchors (#contact) should not trigger client navigation.
  if (href.startsWith("#")) {
    return (
      <a href={href} onClick={onClick} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={classes} {...rest}>
      {children}
    </Link>
  );
}