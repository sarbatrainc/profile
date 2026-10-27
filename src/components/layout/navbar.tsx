"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { navigation } from "@/content/process";
import { siteConfig, socialLinks } from "@/config/site.config";
import { ButtonLink } from "@/components/ui/button";
import { CloseIcon, DownloadIcon, MenuIcon } from "@/components/ui/icons";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();

  const sectionHref = (href: string) =>
    href.startsWith("#") ? (pathname === "/" ? href : `/${href}`) : href;

  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navigation
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (sections.length === 0 || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.15, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, closeMenu]);

  const isActive = (id: string) => activeSection === id;

  const visibleSocials = socialLinks.filter((link) => Boolean(link.href));

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300",
        scrolled || menuOpen
          ? "glass border-b shadow-soft"
          : "border-b border-transparent bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:h-18 sm:px-8">
        {/* Brand */}
        <Link
          href="/"
          onClick={closeMenu}
          className="group flex items-center gap-2.5 rounded-md"
          aria-label={`${siteConfig.name} — home`}
        >
          <span
            aria-hidden="true"
            className="grid size-9 place-items-center rounded-xl border border-border bg-surface-2 text-xs font-semibold text-accent transition-colors duration-200 group-hover:border-accent/40"
          >
            RG
          </span>
          <span className="hidden text-sm font-semibold tracking-tight text-foreground sm:block">
            Raghav Ghimire
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden lg:flex lg:items-center lg:gap-1">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => (
              <li key={item.id}>
                <Link
                  href={sectionHref(item.href)}
                  aria-current={isActive(item.id) ? "page" : undefined}
                  className={[
                    "relative inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200",
                    isActive(item.id) ? "text-accent" : "text-muted hover:text-foreground",
                  ].join(" ")}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={[
                      "absolute inset-x-3 -bottom-px h-px origin-left bg-accent transition-transform duration-300 ease-out",
                      isActive(item.id) ? "scale-x-100" : "scale-x-0",
                    ].join(" ")}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <ButtonLink href={sectionHref("#contact")} size="sm" variant="primary">
            Hire Me
          </ButtonLink>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface-2 text-foreground transition-colors duration-200 hover:border-border-strong lg:hidden"
          >
            <CloseIcon size={18} className={menuOpen ? "block" : "hidden"} />
            <MenuIcon size={18} className={menuOpen ? "hidden" : "block"} />
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        ref={panelRef}
        className={[
          "grid overflow-hidden border-b border-border bg-background/95 backdrop-blur-xl lg:hidden",
          menuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          scrolled || menuOpen ? "" : "border-transparent",
        ].join(" ")}
        style={{ transition: "grid-template-rows 320ms cubic-bezier(0.22,1,0.36,1), opacity 240ms ease-out" }}
      >
        <div className="min-h-0">
          <nav aria-label="Mobile" className="mx-auto w-full max-w-7xl px-5 pb-6 pt-2 sm:px-8">
            <ul className="flex flex-col">
              {navigation.map((item, index) => (
                <li key={item.id} className="border-b border-border/70 last:border-b-0">
                  <Link
                    href={sectionHref(item.href)}
                    onClick={closeMenu}
                    aria-current={isActive(item.id) ? "page" : undefined}
                    className={[
                      "flex items-center justify-between py-3.5 text-base font-medium transition-colors duration-200",
                      isActive(item.id) ? "text-accent" : "text-foreground",
                    ].join(" ")}
                  >
                    {item.label}
                    <span className="text-xs text-subtle">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {visibleSocials.length > 0 && (
              <div className="mt-5 mb-4 flex flex-wrap gap-2 border-t border-border pt-4">
                {visibleSocials.map((link) => {
                  const isExternal = link.href?.startsWith("http");
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      aria-label={link.label}
                      className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface-2 text-muted transition-colors duration-200 hover:border-accent/40 hover:text-accent"
                    >
                      {link.label === "GitHub" ? (
                        <svg width={17} height={17} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.921.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                        </svg>
                      ) : link.label === "LinkedIn" ? (
                        <svg width={17} height={17} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.03-1.86-3.03-1.85 0-2.13 1.44-2.13 2.94v5.66H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                        </svg>
                      ) : null}
                    </a>
                  );
                })}
              </div>
            )}

            <div className="mt-5 flex flex-col gap-3">
              <ButtonLink href={sectionHref("#contact")} onClick={closeMenu} className="w-full size-full" variant="primary">
                Hire Me
              </ButtonLink>
              {siteConfig.resumeUrl && (
                <ButtonLink href={siteConfig.resumeUrl} external variant="secondary" className="w-full size-full">
                  <DownloadIcon size={16} />
                  Download Resume
                </ButtonLink>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
