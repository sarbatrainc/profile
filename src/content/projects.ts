/**
 * Project content.
 *
 * Authenticity rules applied here (PORTFOLIO_MASTER_PROMPT.md §7, §8, §25):
 * - No GitHub or demo URL is invented. `links` stays empty until a real URL is
 *   added; the UI hides the corresponding button.
 * - No numerical or commercial results are fabricated.
 * - Every feature carries an explicit state so a reader can tell what is
 *   implemented, what is integrated with hardware or a third party, and what is
 *   still being built. Nothing is presented as production-deployed unless it is.
 * - No credentials, tokens, hostnames or database secrets appear anywhere.
 */

export type ProjectStatus = "Live" | "In Development" | "Completed" | "Concept" | "Private";

export type FeatureState = "Implemented" | "Integrated" | "In Development";

export type ProjectIcon = "school" | "vote" | "flame" | "restaurant" | "book";

export interface ProjectFeature {
  title: string;
  state: FeatureState;
  description: string;
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  slug: string;
  name: string;
  category: string;
  status: ProjectStatus;
  /** Only shown when a real year/period is known. */
  period?: string;
  /** One line used on the project card. */
  summary: string;
  /** Featured projects are surfaced first on the homepage. */
  featured: boolean;
  icon: ProjectIcon;
  /** Tailwind gradient classes for the project card visual. */
  accent: string;

  /** 01 — Overview */
  overview: string[];
  /** 02 — Problem */
  problem: string[];
  /** 03 — Solution */
  solution: string[];
  /** 04 — Features */
  features: ProjectFeature[];
  /** 05 — Technology */
  technologies: { group: string; items: string[] }[];
  /** 06 — Architecture */
  architecture: {
    summary: string;
    layers: { label: string; detail: string }[];
    integrations: string[];
    workflow?: string[];
  };
  /** 07 — Challenges */
  challenges: { title: string; description: string }[];
  /** 08 — My Contribution */
  contribution: string[];
  /** 09 — Current status / results */
  results: string[];

  /** Real links only. Left empty on purpose — see note above. */
  links: ProjectLink[];
}

export const projects: Project[] = [
  {
    slug: "sanket",
    name: "Sanket",
    category: "School / Education Management Platform",
    status: "In Development",
    featured: true,
    icon: "school",
    accent: "from-indigo-500/20 via-blue-500/10 to-transparent",
    summary:
      "A school-focused digital platform that pulls timetable, bell, attendance, ID cards, exam seating and elections into one multi-module application.",
    overview: [
      "Sanket is a school-focused digital platform designed to bring multiple operational systems into one application. Instead of a school running separate spreadsheets, registers and printed schedules for each activity, Sanket models the school as a set of connected modules over a single backend.",
      "It is one of my major ongoing software projects, and the one that most clearly shows how I work: the Flutter client, the Laravel API and the PostgreSQL data model are designed as one system, with hardware integrations treated as a first-class requirement rather than an afterthought.",
    ],
    problem: [
      "School operations are fragmented. Attendance, timetables, bell scheduling, exam seating, ID cards and elections are each maintained separately, often in spreadsheets that different staff members edit independently.",
      "The same student, teacher or class record has to be re-entered in each of those places, so data drifts and reports are assembled by hand at the end of each term.",
      "Some processes cannot live in a spreadsheet at all — fingerprint attendance hardware, generated ID cards and automatic bell signalling need real software and real device integration.",
    ],
    solution: [
      "A single Flutter application that staff and students use, backed by one Laravel API and one PostgreSQL database, organised into independent modules that share a common identity and data model.",
      "Shared records mean a student or teacher is defined once and reused by attendance, seating, cards, elections and reports.",
      "External systems plug in at the backend: fingerprint devices report in through dedicated endpoints, and content, timetables and bell timings are managed centrally so the app does not need an update to change a schedule.",
    ],
    features: [
      {
        title: "Digital school management",
        state: "Implemented",
        description:
          "Central records for classes, sections, subjects and students feeding every other module.",
      },
      {
        title: "Digital bell and timetable system",
        state: "Implemented",
        description:
          "Backend-managed periods and bell timings that drive the app, so schedule changes do not require a release.",
      },
      {
        title: "Teacher attendance",
        state: "Implemented",
        description: "Teacher check-in and records with reporting built on the same attendance model.",
      },
      {
        title: "Fingerprint attendance hardware integration",
        state: "Integrated",
        description:
          "Device-side fingerprint attendance reports into the backend, which records and reconciles the events.",
      },
      {
        title: "Student ID card generation",
        state: "Implemented",
        description: "Print-ready student identity cards generated from live student records.",
      },
      {
        title: "Teacher ID card generation",
        state: "Implemented",
        description: "Staff cards generated from the same identity system used across the platform.",
      },
      {
        title: "Exam seat planning",
        state: "In Development",
        description:
          "Exam hall and seat allocation driven by class size and available rooms, still being completed.",
      },
      {
        title: "School election integration",
        state: "Integrated",
        description:
          "Reuses the School Election Management System as a module, so election data shares the school's identity records.",
      },
      {
        title: "Student and teacher data management",
        state: "Implemented",
        description: "Create, update and archive records once, reused by attendance, cards and reports.",
      },
      {
        title: "Backend-managed content and timings",
        state: "Implemented",
        description:
          "Content, announcements and timings are served by the API rather than hardcoded in the client.",
      },
      {
        title: "Reports and exports",
        state: "In Development",
        description: "Attendance and record exports are being finished on top of the existing data layer.",
      },
      {
        title: "Multi-module architecture",
        state: "Implemented",
        description:
          "Each module is developed and shipped independently over shared infrastructure.",
      },
    ],
    technologies: [
      { group: "Application", items: ["Flutter", "Dart", "Flutter Web"] },
      { group: "Backend", items: ["Laravel", "PHP", "REST API"] },
      { group: "Data", items: ["PostgreSQL", "Database design", "Migrations"] },
      { group: "Integration", items: ["Fingerprint attendance hardware", "Receipt / ID card printing"] },
    ],
    architecture: {
      summary:
        "Requirements from the school are captured in a Flutter client, expressed through a Laravel API, persisted in PostgreSQL, and extended by hardware and external integrations at the edges.",
      layers: [
        { label: "School Requirements", detail: "Operational needs defined by school staff" },
        { label: "Flutter Application", detail: "One client across mobile, web and desktop" },
        { label: "Laravel / API Backend", detail: "Modules, roles, validation and business rules" },
        { label: "PostgreSQL Database", detail: "Shared relational model for every module" },
        { label: "Hardware / External", detail: "Fingerprint devices, ID card printing, services" },
      ],
      integrations: ["Fingerprint attendance devices", "ID card generation and printing", "Shared election module"],
    },
    challenges: [
      {
        title: "One identity across many modules",
        description:
          "Attendance, cards, seating and elections all need the same student and teacher records to stay consistent. Solving that once in the data model was cheaper than reconciling duplicates later.",
      },
      {
        title: "Hardware that does not speak HTTP cleanly",
        description:
          "Fingerprint devices push events in bursts and occasionally out of order. The backend has to accept idempotent writes so a retried event does not double-count an attendance record.",
      },
      {
        title: "Schedules that change without an app release",
        description:
          "Timetable and bell timings are operational data, not code. Moving them into the API keeps the client stable while the school adjusts its day.",
      },
    ],
    contribution: [
      "Designed and built the multi-module architecture, including how modules share identity and data.",
      "Developed the Flutter application and its API integration layer.",
      "Built the Laravel backend, its authentication and role-based access control, and the PostgreSQL schema and migrations.",
      "Implemented the attendance flow and the fingerprint hardware integration, including event handling on the server.",
      "Implemented student and teacher ID card generation.",
      "Built backend-managed content and bell/timetable configuration.",
      "Currently developing exam seat planning and the reports and exports layer.",
    ],
    results: [
      "Sanket is an active, ongoing project rather than a finished product, and each module is delivered independently over a shared foundation.",
      "Fingerprint attendance and ID card generation run as working integrations rather than manual substitutes.",
      "Timings and content are now data-driven, so routine school changes no longer need a new build.",
      "Exam seat planning and reporting are the remaining work before the module set is complete.",
    ],
    links: [],
  },
  {
    slug: "school-election-management-system",
    name: "School Election Management System",
    category: "Education Technology / Voting System",
    status: "In Development",
    featured: true,
    icon: "vote",
    accent: "from-violet-500/20 via-fuchsia-500/10 to-transparent",
    summary:
      "A centralised digital election platform that replaces spreadsheet-based school elections, with multi-school administration, audit logs and a login-free student voting interface.",
    overview: [
      "The School Election Management System is a complete election platform built to replace manual, spreadsheet-based election workflows with one centralised system. It covers the full lifecycle: a school is set up, candidates are registered against positions and houses, an election is opened, students vote without needing an account, votes are recorded securely, and results are published.",
      "It is a multi-school system with separated Super Admin and School Admin panels, running on a Flutter Web frontend against a Laravel API and a PostgreSQL database.",
    ],
    problem: [
      "School elections were being run on spreadsheets. Ballots were tallied by hand, results were slow to produce, and there was no reliable record of who had voted or what happened afterwards.",
      "Manual talling is also error-prone and unverifiable. When a result is disputed there is no audit trail to inspect.",
      "Voting itself is sensitive: a student should be able to cast a vote without creating an account or learning to use an administrative system, and each voter must be able to vote only once.",
    ],
    solution: [
      "A multi-school Laravel API where a Super Admin manages schools globally and each School Admin runs their own election inside their own data boundary.",
      "A Flutter Web frontend: administrative panels for staff, and a deliberately simple, focused voting interface for students that requires no login.",
      "Server-side vote recording with one-vote-per-voter enforcement, voter receipts and audit logs so any result can be traced after the fact.",
      "A PostgreSQL database and a migration path away from a local MySQL/XAMPP development environment toward hosted PostgreSQL on Supabase.",
    ],
    features: [
      {
        title: "Super Admin panel",
        state: "Implemented",
        description: "Global management of schools and the overall platform.",
      },
      {
        title: "School Admin panel",
        state: "Implemented",
        description: "Per-school administration with access scoped to that school only.",
      },
      {
        title: "Student and voter management",
        state: "Implemented",
        description: "Voter records per school, which later govern voting eligibility.",
      },
      {
        title: "Candidate management",
        state: "Implemented",
        description: "Candidates registered against positions and houses before an election opens.",
      },
      {
        title: "Election management and positions",
        state: "Implemented",
        description: "Elections created with their positions, then opened and closed by the school admin.",
      },
      {
        title: "Houses",
        state: "Implemented",
        description: "House groupings used to organise candidates and results.",
      },
      {
        title: "Voting system",
        state: "Implemented",
        description:
          "A no-login student voting interface, with the vote itself recorded and validated server-side.",
      },
      {
        title: "Results and voting status",
        state: "Implemented",
        description: "Results published per position, with live voting status for administrators.",
      },
      {
        title: "Audit logs and voter receipts",
        state: "Implemented",
        description: "Traceable activity records and a receipt for each recorded vote.",
      },
      {
        title: "Multi-school architecture",
        state: "Implemented",
        description: "One platform serving many schools with separated data and access.",
      },
      {
        title: "Flutter Web frontend",
        state: "Implemented",
        description: "Web client for both the admin panels and the student voting flow.",
      },
      {
        title: "Laravel API and PostgreSQL",
        state: "Implemented",
        description: "Backend API and relational data model backing every flow.",
      },
      {
        title: "Hosted PostgreSQL migration",
        state: "In Development",
        description:
          "Moving from a local MySQL/XAMPP setup to PostgreSQL on Supabase for a hosted deployment.",
      },
    ],
    technologies: [
      { group: "Frontend", items: ["Flutter Web", "Dart", "Responsive admin UI"] },
      { group: "Backend", items: ["Laravel", "PHP", "REST API", "Authentication", "Role-based access"] },
      { group: "Data", items: ["PostgreSQL", "Relational data modelling", "Migrations"] },
      { group: "Operations", items: ["Git", "GitHub", "Environment configuration"] },
    ],
    architecture: {
      summary:
        "A three-tier system: Flutter Web clients, a Laravel API enforcing multi-school boundaries and vote integrity, and PostgreSQL holding election, candidate and vote records.",
      layers: [
        { label: "Flutter Web", detail: "Admin panels plus a login-free student voting interface" },
        { label: "Laravel API", detail: "Auth, multi-school scoping, vote validation, audit logging" },
        { label: "PostgreSQL", detail: "Schools, voters, candidates, positions, houses, elections, votes" },
      ],
      integrations: ["Supabase hosted PostgreSQL (migration in progress)"],
      workflow: [
        "School Setup",
        "Candidates",
        "Election",
        "Student Voting",
        "Secure Vote Recording",
        "Results",
      ],
    },
    challenges: [
      {
        title: "Voting without accounts",
        description:
          "Students must vote without the friction of registration, but the system still has to know who voted and stop a second vote. That pushed the identity check and the one-vote rule to live on the server rather than in the client.",
      },
      {
        title: "Multi-tenant data boundaries",
        description:
          "Many schools share one database, so every query needs a school scope. Getting this right per query, rather than per screen, is what keeps one school's data invisible to another.",
      },
      {
        title: "Trustworthy results",
        description:
          "Because the previous process was hand-tallied spreadsheets, results had to be defensible. Audit logs and receipts exist so a disputed result can be explained rather than argued.",
      },
      {
        title: "Moving from local MySQL to hosted PostgreSQL",
        description:
          "Development ran on a local MySQL/XAMPP environment. Moving to hosted PostgreSQL meant aligning the schema with PostgreSQL specifics and preparing the database for a deployment that is configured entirely through environment variables.",
      },
    ],
    contribution: [
      "Designed the multi-school architecture, including how admin roles and data boundaries are separated.",
      "Built the Laravel API: authentication, role-based access control, school scoping, and all election, candidate, position and house endpoints.",
      "Developed the Flutter Web frontend, including both admin panels and the student voting interface.",
      "Implemented secure vote recording, one-vote-per-voter enforcement, voter receipts and audit logs.",
      "Designed the PostgreSQL schema and wrote the migrations.",
      "Handled the migration path from a local MySQL/XAMPP environment to hosted PostgreSQL on Supabase.",
    ],
    results: [
      "Spreadsheet-based election handling is replaced by one centralised system covering setup through results.",
      "Every recorded vote has a receipt and an audit trail, so results can be traced after an election closes.",
      "Students vote through a focused interface with no login, while identity and one-vote enforcement remain server-side.",
      "The platform currently runs against a local MySQL/XAMPP environment; the move to hosted PostgreSQL on Supabase is the remaining step before public deployment.",
    ],
    links: [],
  },
  {
    slug: "ashri-bhakti",
    name: "Ashri Bhakti",
    category: "Kids / Devotional / Content Application",
    status: "In Development",
    featured: true,
    icon: "flame",
    accent: "from-amber-500/20 via-orange-500/10 to-transparent",
    summary:
      "A devotional and educational application for children, combining bhajan and story content with Gita shlokas, a Rashifal calendar, and a set of playable games behind a parent gate.",
    overview: [
      "Ashri Bhakti is a modern devotional and educational application for children. It combines spiritual and cultural content — bhajans, stories, Gita shlokas, a calendar and Rashifal — with news and editorial content, and then adds a set of children's games and a quiz so the app is genuinely interactive rather than a static reader.",
      "Content is managed through a CMS and delivered by a Laravel API to a Flutter application, so new content can be published without an app release. A parent gate protects the game and quiz areas from younger children navigating away unsupervised.",
    ],
    problem: [
      "Devotional content for children is usually either static — a fixed list of bhajans and stories baked into the app — or scattered across general websites that are not designed for young users.",
      "There is no separation between content a child should explore freely and areas intended for parents, and no safe way to gate interactive sections on a shared device.",
      "Publishing an update to content normally means shipping an app release, which is slow and reaches users unevenly.",
    ],
    solution: [
      "A Flutter application using Riverpod for state and GoRouter for navigation, so each content area is a clean, navigable section rather than one long page.",
      "A CMS-backed content pipeline: editors publish bhajans, stories, shlokas, calendar entries, Rashifal and news, and the Laravel API serves them to the app.",
      "A parent gate in front of games and quizzes, with PIN-based unlocking, so a child cannot wander out of the intended area.",
      "Guest access for reading, with optional Google sign-in for a personalised experience, and AdMob integrated for the Android build.",
    ],
    features: [
      {
        title: "Bhajan and content sections",
        state: "Implemented",
        description: "Categorised devotional content served from the backend.",
      },
      {
        title: "Stories",
        state: "Implemented",
        description: "Narrative content presented as a browsable, child-friendly section.",
      },
      {
        title: "Gita shloka content",
        state: "Implemented",
        description: "Shloka content with supporting explanation delivered via the API.",
      },
      {
        title: "Calendar",
        state: "Implemented",
        description: "An in-app calendar section as part of the content structure.",
      },
      {
        title: "Rashifal",
        state: "Implemented",
        description: "Rashifal content managed and delivered through the CMS pipeline.",
      },
      {
        title: "News and editorial content",
        state: "Implemented",
        description: "A CMS-backed content feed alongside the devotional material.",
      },
      {
        title: "Kids games",
        state: "Implemented",
        description: "Quiz, memory, puzzle and temple kitchen games as interactive sections.",
      },
      {
        title: "Parent gate with PIN and biometric support",
        state: "In Development",
        description:
          "PIN-based gating is in place; the biometric-related portion is still being completed.",
      },
      {
        title: "Guest and user access",
        state: "Implemented",
        description: "Readable without an account, with Google sign-in available when wanted.",
      },
      {
        title: "CMS-based content management",
        state: "Implemented",
        description: "Editors publish content; the app renders it without a release.",
      },
      {
        title: "AdMob integration",
        state: "Integrated",
        description: "Google AdMob wired into the Android build.",
      },
    ],
    technologies: [
      { group: "Application", items: ["Flutter", "Dart", "Riverpod", "GoRouter"] },
      { group: "Backend", items: ["Laravel", "PHP", "REST API", "CMS"] },
      { group: "Data", items: ["PostgreSQL"] },
      { group: "Platform", items: ["Google Sign-In", "AdMob", "Local authentication"] },
    ],
    architecture: {
      summary:
        "Content flows one way: editors publish into the CMS, the Laravel API serves it, the Flutter application presents it, and children interact with it under a parent gate.",
      layers: [
        { label: "CMS", detail: "Editors manage bhajans, stories, shlokas, calendar, Rashifal and news" },
        { label: "Laravel API", detail: "Serves structured content and handles user and parent-gate logic" },
        { label: "Flutter Application", detail: "Riverpod state, GoRouter navigation, games and quiz" },
        { label: "Children / Parents", detail: "Children read and play; parents unlock gated areas" },
      ],
      integrations: ["Google Sign-In", "Google AdMob", "Device biometrics / local PIN"],
    },
    challenges: [
      {
        title: "Keeping a children's app focused",
        description:
          "A large amount of very different content — devotional material, editorial news and four games — has to feel like one product. Consistent theming and a clear navigation model did more work here than any individual screen.",
      },
      {
        title: "A parent gate that actually holds",
        description:
          "The gate has to stop a determined child without being annoying for a parent who opens the app ten times a day. That pushed toward device-local unlocking rather than an account-based check.",
      },
      {
        title: "Content updates without app releases",
        description:
          "Routing all content through the CMS and API means the app's reading surfaces stay stable while the content changes underneath them.",
      },
    ],
    contribution: [
      "Designed the application structure and content categories for the Flutter app.",
      "Built the Flutter frontend with Riverpod state management and GoRouter navigation.",
      "Built the Laravel API and the CMS-driven content pipeline.",
      "Implemented the kids' games: quiz, memory, puzzle and temple kitchen.",
      "Implemented the parent gate and PIN flow, with the biometric portion in progress.",
      "Integrated Google sign-in and AdMob for the Android build.",
      "Designed the PostgreSQL schema for content, users and gate state.",
    ],
    results: [
      "Devotional, educational and interactive content now lives in one application rather than a fixed static app.",
      "Content is published through a CMS, so updates no longer depend on an app release.",
      "The parent gate keeps the game and quiz areas separate from the content a child explores on their own.",
      "Biometric-related functionality is still in development; the rest of the listed content and game sections are implemented.",
    ],
    links: [],
  },
  {
    slug: "bhok-lagyo",
    name: "Bhok Lagyo",
    category: "Restaurant POS / Business Software",
    status: "In Development",
    featured: true,
    icon: "restaurant",
    accent: "from-emerald-500/20 via-teal-500/10 to-transparent",
    summary:
      "A restaurant POS application covering tenant setup, order and item management, takeaway orders, and batched receipt printing with multiple copies.",
    overview: [
      "Bhok Lagyo is a restaurant-focused point-of-sale application built to simplify how orders are taken, corrected and printed. It handles restaurant login, tenant setup per restaurant, order and order-item management, takeaway orders, and the receipt printing workflow including batched prints and multiple copies.",
      "The printing workflow is the part that makes it business software rather than a demo: real restaurants need several copies of a bill at once — for the kitchen, for the customer and for the register — and they need to reprint when something is wrong.",
    ],
    problem: [
      "Restaurants running on paper or a basic register lose orders, mis-charge items and produce bills that are slow to produce during service.",
      "Printing several copies of the same bill reliably is genuinely awkward. Kitchen copy, customer copy and register copy need to come out together and in the right order.",
      "Each restaurant operates as its own business. Menu, staff and order data cannot bleed between tenants.",
      "Mistakes at the counter must be fixable — a wrong or unwanted order item should be removable without corrupting the order or its history.",
    ],
    solution: [
      "A Flutter POS client driving an API-driven restaurant workflow, so ordering behaviour is defined on the server and every action is recorded consistently.",
      "Tenant-aware setup: each restaurant configures its own domain and context after login, and its data stays separate from every other restaurant's.",
      "Order and order-item management with the ability to delete an item from an order cleanly.",
      "A print batch workflow that issues multiple receipt copies in one action, supporting takeaway orders as well as in-house service.",
    ],
    features: [
      {
        title: "Restaurant login",
        state: "Implemented",
        description: "Each restaurant signs in to its own isolated context.",
      },
      {
        title: "Tenant and domain setup",
        state: "Implemented",
        description: "Per-restaurant configuration so data stays separated between tenants.",
      },
      {
        title: "Order management",
        state: "Implemented",
        description: "Orders created, tracked and managed through API-backed workflows.",
      },
      {
        title: "Order item management",
        state: "Implemented",
        description: "Items added, adjusted and removed from an order.",
      },
      {
        title: "Order item deletion",
        state: "Implemented",
        description:
          "Removing an incorrect item updates the order and its totals without leaving inconsistent state.",
      },
      {
        title: "Takeaway orders",
        state: "Implemented",
        description: "Takeaway orders handled as a distinct flow from in-house service.",
      },
      {
        title: "Receipt printing",
        state: "Integrated",
        description: "Receipt output driven through device printing integration.",
      },
      {
        title: "Print batch handling and multiple copies",
        state: "Implemented",
        description:
          "Several copies of a receipt printed in one batch, so kitchen, customer and register copies stay aligned.",
      },
    ],
    technologies: [
      { group: "Application", items: ["Flutter", "Dart", "Mobile POS interface"] },
      { group: "Backend", items: ["REST API", "Backend integration", "Restaurant management APIs"] },
      { group: "Operations", items: ["Receipt printing", "Print batching", "Multi-tenant data"] },
    ],
    architecture: {
      summary:
        "A four-step operational path: the POS client talks to a restaurant API, which manages orders, which then drives the printing and receipt workflow.",
      layers: [
        { label: "Flutter POS", detail: "Counter interface for taking and correcting orders" },
        { label: "Restaurant API", detail: "Tenant-scoped order, item and restaurant management endpoints" },
        { label: "Order Management", detail: "Order lifecycle, item state and totals" },
        { label: "Printing / Receipt", detail: "Batch printing and multiple receipt copies" },
      ],
      integrations: ["Receipt printers", "Restaurant management APIs"],
    },
    challenges: [
      {
        title: "Printing batches that stay consistent",
        description:
          "A batch has to print several copies of one bill together. If a batch fails halfway the restaurant gets mismatched copies, so the batch is treated as a unit rather than a set of independent print jobs.",
      },
      {
        title: "Correcting orders without losing history",
        description:
          "Deleting an item at the counter has to update the bill immediately while keeping the order record coherent for reporting.",
      },
      {
        title: "Tenant isolation in business data",
        description:
          "Two restaurants must never see each other's menus or orders. Tenant scoping is applied in the API rather than trusted to the client.",
      },
    ],
    contribution: [
      "Designed the tenant-aware data and configuration model for the restaurant POS.",
      "Built the Flutter POS client and its API integration layer.",
      "Developed the restaurant management APIs for orders, order items and restaurant setup.",
      "Implemented order item deletion with correct recalculation of order totals.",
      "Implemented takeaway orders and the batched multi-copy receipt printing workflow.",
    ],
    results: [
      "Ordering, item correction and receipt output are handled in one API-driven workflow instead of paper and manual arithmetic.",
      "Multiple receipt copies print as a single batch, matching how a restaurant actually needs them.",
      "Restaurant data is isolated per tenant, so separate businesses do not see each other's records.",
      "The project is in active development.",
    ],
    links: [],
  },
  {
    slug: "class-9-10-notes-platform",
    name: "Class 9 & 10 Notes Platform",
    category: "Education / Digital Learning",
    status: "Concept",
    featured: true,
    icon: "book",
    accent: "from-sky-500/20 via-cyan-500/10 to-transparent",
    summary:
      "A digital learning platform concept for Class 9 and 10 students, with subject-based notes and past questions served as backend-uploaded images.",
    overview: [
      "The Class 9 & 10 Notes Platform is an education-focused learning concept: students log in, pick their class and then a subject, and get notes and past questions for that subject.",
      "Rather than rebuilding a rich document editor, notes and past questions are uploaded from the backend as images. That keeps the learning interface fast on a mobile connection and makes publishing new material a backend task rather than a development task. The concept covers Science, Mathematics, English, Nepali, Account, Computer, Optional Mathematics and Environment Science.",
    ],
    problem: [
      "Students preparing for board exams collect notes and past questions across scattered PDFs, messengers and shared drives, with no single place organised by class and subject.",
      "Material is often outdated or mismatched to the student's actual class and subject combination.",
      "Heavy downloadable documents are slow to open on an ordinary mobile connection.",
    ],
    solution: [
      "A simple learning path — login, then class, then subject — that lands the student directly on the material they need.",
      "Notes and past questions delivered as backend-uploaded images, so pages render quickly and look consistent on every device size.",
      "Subject coverage across Science, Mathematics, English, Nepali, Account, Computer, Optional Mathematics and Environment Science.",
    ],
    features: [
      {
        title: "Login",
        state: "In Development",
        description: "Student sign-in as the entry point to the learning path.",
      },
      {
        title: "Class selection",
        state: "In Development",
        description: "Students choose their class, which filters the available subjects.",
      },
      {
        title: "Subject selection",
        state: "In Development",
        description: "Subjects are scoped to the selected class.",
      },
      {
        title: "Notes with backend-uploaded images",
        state: "In Development",
        description: "Notes served as images uploaded through the backend.",
      },
      {
        title: "Past questions",
        state: "In Development",
        description: "Past papers organised by subject alongside the notes.",
      },
      {
        title: "Smooth animations and mobile-friendly interface",
        state: "In Development",
        description: "A learning interface designed for a phone screen first.",
      },
    ],
    technologies: [
      { group: "Application", items: ["Flutter", "Dart", "Mobile-first interface"] },
      { group: "Backend", items: ["REST API", "Content upload endpoints"] },
      { group: "Content", items: ["Subject-based notes", "Past questions"] },
    ],
    architecture: {
      summary:
        "A straightforward content platform: material is uploaded to the backend and served to a Flutter client organised by class and subject.",
      layers: [
        { label: "Student", detail: "Logs in and selects class and subject" },
        { label: "Flutter Application", detail: "Mobile-first reading and navigation" },
        { label: "Content API", detail: "Serves notes and past questions per class and subject" },
      ],
      integrations: [],
      workflow: ["Login", "Select Class", "Select Subject", "Read Notes", "Practise Past Questions"],
    },
    challenges: [
      {
        title: "Making material feel current",
        description:
          "Because content is uploaded rather than coded, keeping the platform accurate becomes a publishing routine rather than a development task.",
      },
      {
        title: "Readable on a phone",
        description:
          "Serving notes as images keeps load times low, but the viewer still has to handle different page sizes and screen widths gracefully.",
      },
    ],
    contribution: [
      "Defined the class and subject structure covering the eight subject areas.",
      "Designed the student flow from login through class and subject selection to material.",
      "Specified the backend content model for uploaded notes and past questions.",
    ],
    results: [
      "This project is at concept stage: the flow, subject structure and content model are defined, and implementation is still to be built.",
      "It is included because it represents the kind of focused, mobile-first education product I intend to build.",
    ],
    links: [],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export const getProjectBySlug = (slug: string) => projects.find((project) => project.slug === slug);

export const getAdjacentProjects = (slug: string) => {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };

  return {
    previous: index > 0 ? projects[index - 1] : undefined,
    next: index < projects.length - 1 ? projects[index + 1] : undefined,
  };
};