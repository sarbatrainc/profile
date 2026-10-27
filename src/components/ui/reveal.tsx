"use client";

import { useEffect, useRef, useState } from "react";

type RevealDirection = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: React.ReactNode;
  /** Stagger in milliseconds, applied as a CSS custom property. */
  delay?: number;
  direction?: RevealDirection;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header" | "footer";
}

/** Starting offset per direction, expressed as CSS custom properties. */
const offsetsByDirection: Record<RevealDirection, { x: string; y: string }> = {
  up: { x: "0px", y: "18px" },
  down: { x: "0px", y: "-18px" },
  left: { x: "22px", y: "0px" },
  right: { x: "-22px", y: "0px" },
  none: { x: "0px", y: "0px" },
};

/**
 * Reveals children when they scroll into view.
 *
 * The initial hidden state lives in globals.css behind the `.js` class, so
 * content is always visible when JavaScript is unavailable. Reduced-motion
 * preferences are handled in the same stylesheet.
 */
export function Reveal({
  children,
  delay = 0,
  direction = "up",
  className,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Browsers without IntersectionObserver get the content shown immediately,
    // by writing the attribute directly so no re-render is required.
    if (typeof IntersectionObserver === "undefined") {
      node.dataset.revealed = "true";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const offset = offsetsByDirection[direction];
  const style = {
    "--reveal-delay": `${delay}ms`,
    "--reveal-x": offset.x,
    "--reveal-y": offset.y,
  } as React.CSSProperties;

  return (
    <Tag
      ref={ref as React.Ref<never>}
      data-reveal=""
      data-revealed={revealed ? "true" : "false"}
      style={style}
      className={className}
    >
      {children}
    </Tag>
  );
}