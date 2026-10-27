/**
 * Theme store.
 *
 * Kept outside React so the dark/light choice is a plain external system the
 * UI subscribes to, rather than state synchronised through effects. The
 * initial value is read from localStorage on the client; during hydration React
 * uses the server snapshot, then immediately switches to the stored preference.
 *
 * The <html> class itself is applied by ThemeScript before first paint, so the
 * page never renders in the wrong theme.
 */

export type ThemeChoice = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

const STORAGE_KEY = "theme";
const MEDIA_QUERY = "(prefers-color-scheme: dark)";

const isBrowser = typeof window !== "undefined";

const isThemeChoice = (value: unknown): value is ThemeChoice =>
  value === "light" || value === "dark" || value === "system";

const readStoredChoice = (): ThemeChoice => {
  if (!isBrowser) return "system";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isThemeChoice(stored) ? stored : "system";
  } catch {
    // Private browsing or blocked storage: fall back to the OS preference.
    return "system";
  }
};

const systemPrefersDark = () => {
  if (!isBrowser) return true;
  try {
    return window.matchMedia(MEDIA_QUERY).matches;
  } catch {
    return true;
  }
};

const resolve = (choice: ThemeChoice): ResolvedTheme =>
  choice === "system" ? (systemPrefersDark() ? "dark" : "light") : choice;

/** Current preference; initialised from storage on the client. */
let choice: ThemeChoice = readStoredChoice();
let resolved: ResolvedTheme = resolve(choice);

const listeners = new Set<() => void>();

const emit = () => {
  for (const listener of listeners) listener();
};

/** Applies the choice to the document and notifies subscribers. */
const apply = () => {
  if (isBrowser) {
    const root = document.documentElement;
    root.classList.toggle("dark", resolved === "dark");
    root.style.colorScheme = resolved;
  }
  emit();
};

export const themeStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);

    // While the choice is "system", follow OS-level changes live.
    const media = isBrowser ? window.matchMedia(MEDIA_QUERY) : undefined;
    const onSystemChange = () => {
      if (choice !== "system") return;
      resolved = resolve(choice);
      apply();
    };
    media?.addEventListener("change", onSystemChange);

    // Keep multiple tabs in sync.
    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;
      choice = isThemeChoice(event.newValue) ? event.newValue : "system";
      resolved = resolve(choice);
      apply();
    };
    window.addEventListener("storage", onStorage);

    return () => {
      listeners.delete(listener);
      media?.removeEventListener("change", onSystemChange);
      window.removeEventListener("storage", onStorage);
    };
  },

  getChoice: () => choice,

  getResolved: () => resolved,

  /** Constant snapshot used while server-rendering and during hydration. */
  getServerChoice: (): ThemeChoice => "system",
  getServerResolved: (): ResolvedTheme => "dark",

  setTheme(next: ThemeChoice) {
    choice = next;
    resolved = resolve(next);

    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Preference simply will not persist; the session still switches.
    }

    apply();
  },

  toggle() {
    themeStore.setTheme(resolved === "dark" ? "light" : "dark");
  },
};