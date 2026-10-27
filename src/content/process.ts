/**
 * Process, architecture narrative and navigation structure.
 *
 * These describe how the work is actually carried out — no fabricated metrics.
 */

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Understand the Problem",
    description:
      "Start with what the business or school actually needs to happen, not with a feature list. Most of the difficult requirements in education and POS software come from how an organisation really operates.",
  },
  {
    number: "02",
    title: "Plan the Architecture",
    description:
      "Decide module boundaries, where logic belongs and how data flows between the client, the API and the database — before writing features, so the structure is not retrofitted later.",
  },
  {
    number: "03",
    title: "Design the User Experience",
    description:
      "Design the screens a non-technical user will actually touch: clear flows, plain language, and the shortest sensible path through each task.",
  },
  {
    number: "04",
    title: "Develop Frontend",
    description:
      "Build the Flutter application with deliberate state management, responsive layout and honest loading, empty and error states.",
  },
  {
    number: "05",
    title: "Build Backend / API",
    description:
      "Implement the Laravel API with authentication, role-based access and business rules enforced on the server rather than trusted to the client.",
  },
  {
    number: "06",
    title: "Integrate Database",
    description:
      "Design the PostgreSQL schema, write migrations, and keep integrity rules in the database rather than relying on the application to behave.",
  },
  {
    number: "07",
    title: "Test & Debug",
    description:
      "Test across the whole path — UI, API and database — and trace failures to their actual layer instead of patching the symptom.",
  },
  {
    number: "08",
    title: "Deploy & Maintain",
    description:
      "Configure the environment, deploy, connect the domain and handle the production issues that only appear with real users and devices.",
  },
];

/**
 * "From Interface to Infrastructure" — the vertical stack view.
 */
export const architectureStack: { label: string; detail: string }[] = [
  { label: "Flutter", detail: "Application UI across mobile, web and desktop" },
  { label: "State Management / UI", detail: "Riverpod state, navigation and interaction logic" },
  { label: "REST API", detail: "Typed requests, response handling and error states" },
  { label: "Laravel", detail: "Business rules, authentication, roles and modules" },
  { label: "PostgreSQL", detail: "Schema, migrations, integrity and reporting queries" },
  { label: "Deployment", detail: "Environment configuration, hosting, domain and HTTPS" },
];

export const integrationPoints: { label: string; detail: string }[] = [
  { label: "Hardware", detail: "Fingerprint attendance devices on real school hardware" },
  { label: "Printing", detail: "Receipt batches and ID card output" },
  { label: "Authentication", detail: "Password, token and Google sign-in flows" },
  { label: "Cloud Storage", detail: "Hosted PostgreSQL through Supabase" },
  { label: "Third-party APIs", detail: "Content delivery, sign-in and advertising services" },
];

export interface NavItem {
  label: string;
  href: string;
  /** Single-page anchors are handled in-page; other routes are real links. */
  id: string;
}

export const navigation: NavItem[] = [
  { label: "Home", href: "/", id: "home" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Skills", href: "/#skills", id: "skills" },
  { label: "Projects", href: "/#projects", id: "projects" },
  { label: "Experience", href: "/#experience", id: "experience" },
  { label: "Services", href: "/#services", id: "services" },
  { label: "Contact", href: "/#contact", id: "contact" },
];