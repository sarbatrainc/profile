/**
 * Technical skills, grouped by discipline.
 *
 * Presented as technology cards with a short description of how each area is
 * actually used — deliberately no percentage bars or invented proficiency
 * numbers (PORTFOLIO_MASTER_PROMPT.md §6).
 */

export interface SkillItem {
  name: string;
  description: string;
}

export interface SkillGroup {
  title: string;
  summary: string;
  items: SkillItem[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Application Development",
    summary: "One Flutter codebase serving mobile, web and desktop.",
    items: [
      {
        name: "Flutter",
        description:
          "Primary framework for the applications in this portfolio, used across Android, web and desktop.",
      },
      {
        name: "Dart",
        description: "The language behind every Flutter application I build.",
      },
      {
        name: "Flutter Web",
        description:
          "Web targets for admin panels and public-facing interfaces, such as the election voting flow.",
      },
      {
        name: "Mobile Applications",
        description: "Android-first application delivery with a consistent navigation structure.",
      },
      {
        name: "Desktop Applications",
        description: "Desktop builds for tools used in a fixed working environment.",
      },
      {
        name: "State Management",
        description: "Riverpod for application state and clear data flow between UI and API.",
      },
      {
        name: "Responsive UI",
        description: "Layouts designed from mobile upward, with breakpoints at tablet and desktop.",
      },
      {
        name: "API Integration",
        description: "Typed client layers, loading and error states, and offline-tolerant screens.",
      },
    ],
  },
  {
    title: "Backend",
    summary: "APIs, access control and the business rules underneath them.",
    items: [
      {
        name: "Laravel",
        description:
          "Backend framework for the API layer behind these applications, including multi-school scoping.",
      },
      {
        name: "PHP",
        description: "Server-side language used with Laravel for API and administration work.",
      },
      {
        name: "REST API",
        description: "Structured, versioned endpoints with consistent response shapes.",
      },
      {
        name: "Authentication",
        description: "Login flows, sessions and tokens, including no-login flows designed deliberately.",
      },
      {
        name: "Role-Based Access",
        description:
          "Super Admin, School Admin and staff roles enforced on the server, not just hidden in the UI.",
      },
      {
        name: "Admin Panels",
        description: "Back-office interfaces for configuration, records, reporting and elections.",
      },
      {
        name: "Backend Architecture",
        description:
          "Module boundaries, data flow between Flutter, Laravel and PostgreSQL, and integration points.",
      },
    ],
  },
  {
    title: "Database",
    summary: "Relational design that survives real data volumes and rules.",
    items: [
      {
        name: "PostgreSQL",
        description:
          "Primary database for these systems, including the hosted Supabase migration.",
      },
      {
        name: "MySQL",
        description:
          "Used during local development on XAMPP environments before PostgreSQL adoption.",
      },
      {
        name: "Database Design",
        description:
          "Modelling shared entities once — a student or restaurant defined a single time and reused.",
      },
      {
        name: "Migrations",
        description: "Version-controlled schema changes so deployments are repeatable.",
      },
      {
        name: "Relational Data Modelling",
        description:
          "Normalised structures for attendance, votes, orders and elections, with integrity rules enforced in the database.",
      },
    ],
  },
  {
    title: "Development",
    summary: "The day-to-day engineering work around features.",
    items: [
      {
        name: "Git",
        description: "Branching and history for work shared between client and server.",
      },
      {
        name: "GitHub",
        description: "Repository hosting and code review workflow.",
      },
      {
        name: "JSON",
        description: "API payload handling and content exchange between layers.",
      },
      {
        name: "Debugging",
        description:
          "Tracing problems across the stack — device behaviour, API responses and database state.",
      },
      {
        name: "Software Architecture",
        description: "Choosing module boundaries and deciding where logic belongs before writing features.",
      },
      {
        name: "Third-Party API Integration",
        description: "Wiring external services into an application without letting them leak into the UI.",
      },
    ],
  },
  {
    title: "Deployment & Infrastructure",
    summary: "Getting the finished system running on a real domain.",
    items: [
      {
        name: "Web Deployment",
        description: "Shipping applications and this portfolio to production hosting.",
      },
      {
        name: "PHP / Laravel Hosting",
        description: "Hosting environments configured for a PHP and Laravel backend.",
      },
      {
        name: "PostgreSQL / Supabase",
        description:
          "Hosted PostgreSQL for moving projects off a local development machine.",
      },
      {
        name: "Environment Configuration",
        description:
          "Configuration kept outside the codebase, so the same build runs in development and production.",
      },
      {
        name: "Domain Configuration",
        description: "Pointing a custom domain at the deployed application.",
      },
      {
        name: "API Deployment",
        description: "Standalone deployment of the API layer the applications depend on.",
      },
      {
        name: "Production Troubleshooting",
        description:
          "Diagnosing issues that only appear once real devices, data volumes and networks are involved.",
      },
    ],
  },
];