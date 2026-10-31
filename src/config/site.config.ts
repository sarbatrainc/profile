/**
 * Centralised site configuration.
 *
 * Rule (see PORTFOLIO_MASTER_PROMPT.md §23 & §25): personal details are never
 * hardcoded inside components. They live here and are read from environment
 * variables. Any value that has not been confirmed by the site owner stays
 * empty, and the UI hides the related button or link instead of rendering an
 * invented URL.
 */

const emptyToUndefined = (value: string | undefined) => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
};

export const siteConfig = {
  /** Canonical origin of the deployed site, no trailing slash. */
  url: emptyToUndefined(process.env.NEXT_PUBLIC_SITE_URL) ?? "https://example.com",

  name: "Raghav Ghimire",
  title: "Flutter & Full-Stack Developer",
  roles: ["Flutter Developer", "Full-Stack Developer"],

  /** Short positioning line used in the hero and SEO copy. */
  headline: "Building Real-World Software That Solves Real Problems.",

  /** Longer hero / about copy. */
  intro:
    "I build modern mobile, web and desktop applications using Flutter, Dart, Laravel and PostgreSQL, with a focus on practical solutions for education, business and everyday workflows.",

  about: [
    "I am a BSc.CSIT graduate who builds complete applications — the mobile or web interface, the Laravel API behind it, the PostgreSQL schema underneath, and the deployment that puts it live. Working across the whole stack is not a side note for me; it is the job.",
    "Most of my work sits where software has to fit a real organisation: school management platforms, an election system that replaced spreadsheet workflows, restaurant POS tooling, and a devotional and learning application for children. Each one asks for authentication, roles, reporting, exports and hardware or printing integration — not just screens.",
    "I have taught Grade 11 and Grade 12 at Hetauda City College for around two years, which sharpened how I explain technical ideas to people who are not developers. That instinct carries into how I design software: clear flows, understandable language, and interfaces that a non-technical user can use without help.",
  ],

  location: "Nepal",

  /** Contact details — empty means the link is hidden. */
  email: emptyToUndefined(process.env.NEXT_PUBLIC_EMAIL),
  phone: emptyToUndefined(process.env.NEXT_PUBLIC_PHONE),

  /** Resume download. Hidden until a real file URL is provided. */
  resumeUrl: emptyToUndefined(process.env.NEXT_PUBLIC_RESUME_URL),

  /** GitHub profile. Hidden until provided. */
  githubUrl: emptyToUndefined(process.env.NEXT_PUBLIC_GITHUB_URL),

  /** LinkedIn profile. Hidden until provided. */
  linkedinUrl: emptyToUndefined(process.env.NEXT_PUBLIC_LINKEDIN_URL),

  /** Optional X / Twitter profile. Hidden until provided. */
  xUrl: emptyToUndefined(process.env.NEXT_PUBLIC_X_URL),

  /**
   * Optional hosted form endpoint (for example a Formspree form URL).
   * When absent the contact form composes a prefilled email instead.
   */
  contactFormEndpoint: emptyToUndefined(process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT),

  /** Used for the hero copy and the JSON-LD Person node. */
  jobTitle: "Flutter & Full-Stack Developer",

  /**
   * Greeting text the WhatsApp chat widget shows in its intro line.
   * Empty keeps the widget hidden entirely.
   */
  chatGreeting: "Hi there! 👋 I am Raghav. Drop a message and I will reply on WhatsApp.",

  /** Default prefilled message offered by the WhatsApp chat widget. */
  chatDefaultText: "Hi Raghav, I found your portfolio and would like to talk.",

  /** Facts that are true and can be stated plainly, with no invented numbers. */
  highlights: [
    {
      title: "Frontend to database",
      description:
        "Flutter interface, Laravel API and PostgreSQL schema designed together, not handed between teams.",
    },
    {
      title: "Built for real operations",
      description:
        "Authentication, roles, admin panels, reports, exports and printing — the parts that decide whether software is usable at work.",
    },
    {
      title: "Beyond the screen",
      description:
        "Fingerprint attendance hardware, receipt printers and third-party integrations handled as part of the build.",
    },
  ],

  /** Real facts only — no invented numbers. */
  stats: [
    {
      number: "3+",
      label: "Years Coding",
      description: "Flutter, Dart, Laravel and PostgreSQL since student days.",
    },
    {
      number: "100+",
      label: "Projects Shipped",
      description: "School management, election systems, restaurant POS, devotional apps.",
    },
  ],
} as const;

export type SiteConfig = typeof siteConfig;

/** Builds a `mailto:` link with a prefilled subject and body. */
export function mailtoLink(subject: string, body?: string) {
  const to = siteConfig.email;
  if (!to) return undefined;

  const params = new URLSearchParams({ subject });
  if (body) params.set("body", body);

  return `mailto:${to}?${params.toString()}`;
}

/**
 * Builds a `https://wa.me/{phone}?text=...` link from the configured phone
 * number so the visitor lands straight in a WhatsApp conversation with you.
 * Returns undefined when no phone is configured, so the UI simply hides itself
 * instead of rendering a hardcoded or invented contact URL.
 */
export function whatsappLink(text?: string) {
  const phone = siteConfig.phone;
  if (!phone) return undefined;

  const digits = phone.replace(/\D/g, "");
  if (!digits) return undefined;

  const url = new URL(`https://wa.me/${digits}`);
  if (text) url.searchParams.set("text", text);

  return url.toString();
}

/** Social links that are actually configured. Drives header, footer and contact. */
export const socialLinks = [
  { label: "GitHub", href: siteConfig.githubUrl, icon: "github" },
  { label: "LinkedIn", href: siteConfig.linkedinUrl, icon: "linkedin" },
  { label: "Email", href: siteConfig.email ? `mailto:${siteConfig.email}` : undefined, icon: "mail" },
  {
    label: "WhatsApp",
    href: siteConfig.phone ? whatsappLink(siteConfig.chatDefaultText) : undefined,
    icon: "whatsapp",
  },
] as const;