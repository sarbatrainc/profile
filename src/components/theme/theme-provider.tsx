"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";

import { themeStore } from "@/components/theme/theme-store";
import type { ResolvedTheme, ThemeChoice } from "@/components/theme/theme-store";

interface ThemeContextValue {
  /** What the user picked, which may be "system". */
  theme: ThemeChoice;
  /** What is actually rendered right now. */
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: ThemeChoice) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getChoice,
    themeStore.getServerChoice,
  );

  const resolvedTheme = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getResolved,
    themeStore.getServerResolved,
  );

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      resolvedTheme,
      setTheme: themeStore.setTheme,
      toggleTheme: themeStore.toggle,
    }),
    [theme, resolvedTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside <ThemeProvider>");
  }
  return context;
}