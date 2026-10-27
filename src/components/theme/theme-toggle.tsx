"use client";

import { useTheme } from "@/components/theme/theme-provider";
import { MoonIcon, SunIcon } from "@/components/ui/icons";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={[
        "group relative inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface-2 text-muted transition-colors duration-200",
        "hover:border-border-strong hover:bg-surface-raised hover:text-foreground",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <SunIcon
        size={18}
        className={`absolute transition-all duration-300 ${
          isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"
        }`}
      />
      <MoonIcon
        size={18}
        className={`absolute transition-all duration-300 ${
          isDark ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"
        }`}
      />
    </button>
  );
}