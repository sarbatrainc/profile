/**
 * Experience, education and the service offering.
 *
 * Accuracy rules (PORTFOLIO_MASTER_PROMPT.md §9, §10, §11, §25):
 * - No employment dates, job titles, salaries, university grades, client names,
 *   certifications or performance metrics are stated unless the user supplied
 *   them. `period`, `startDate` and `endDate` are only rendered when a real
 *   value exists.
 * - No GitHub or demo URLs are invented.
 * - No numerical or commercial results are fabricated.
 */
export type ExperienceColor = "accent" | "accent-2" | "success" | "warning" | "muted";

export interface ExperienceProject {
  name: string;
  description?: string;
  /** Key feature/bullet points for the project. */
  details?: string[];
  technologies?: string[];
}

export interface ExperienceEntry {
  organisation: string;
  role: string;
  type: string;
  /** Shown only when actually provided — never invented. */
  location?: string;
  period?: string;
  startDate?: string;
  endDate?: string;
  description: string;
  /** Responsibility / focus bullets. */
  highlights: string[];
  /** Short tags summarising the technical/collaborative focus. */
  focusAreas: string[];
  /** Technologies used in this role. */
  technologies?: string[];
  /** Projects delivered under this role. */
  projects?: ExperienceProject[];
  /** Verified achievements — only added when a real one exists. */
  achievements?: string[];
  /** Theme color used for the timeline marker and card accent. */
  color?: ExperienceColor;
  /** Optional logo asset path; the UI falls back to a coloured initial badge. */
  logo?: string;
}

export const experience: ExperienceEntry[] = [
  {
    organisation: "Virtual Tribes",
    role: "Flutter Developer Intern",
    type: "Internship",
    color: "accent-2",
    description:
      "Worked as a Flutter Developer Intern, building client-side applications and integrations in Dart. Part of this work involved a Nepali Calendar application, which required careful handling of date logic and localisation rather than relying on defaults.",
    highlights: [
      "Built Flutter application features in Dart against backend APIs.",
      "Worked on a Nepali Calendar application, dealing with calendar conversion logic and locale-specific date handling.",
      "Integrated application data with backend services and handled API responses, loading and error states.",
      "Communicated with a development team about requirements and implemented review feedback.",
    ],
    focusAreas: ["Flutter", "Dart", "API integration"],
    technologies: ["Flutter", "Dart", "REST API"],
  },
  {
    organisation: "Hetauda City College",
    role: "Part-time Instructor / Teacher",
    type: "Teaching",
    location: "Hetauda, Nepal",
    period: "Approximately two years",
    color: "warning",
    description:
      "Taught Grade 11 and Grade 12 for around two years. Teaching computer science to senior students meant breaking down programming and technical concepts until they were genuinely understandable, which changed how I design software for non-technical users.",
    highlights: [
      "Taught Grade 11 and Grade 12 students across the syllabus.",
      "Explained complex programming concepts in plain language, using examples that matched students' own work.",
      "Gave technical instruction and worked through problems with students individually.",
      "Developed presentation skills by teaching material directly to a room.",
    ],
    focusAreas: ["Communication", "Technical teaching", "Presentation"],
  },
  {
    organisation: "Bal Jagriti English Secondary School",
    role: "Professional Experience",
    type: "School",
    location: "Hetauda-2, Basudev Marga, Nepal",
    color: "success",
    description:
      "A foundational part of my professional journey, grounded in working directly with a school community and real-world school operations — exposure to education systems, technology and practical problem solving.",
    highlights: [],
    focusAreas: ["Education systems", "Technology exposure", "Problem solving"],
  },
  {
    organisation: "Sarbatra Inc.",
    role: "App Developer",
    type: "Professional",
    color: "accent",
    description:
      "Professional software development across mobile, desktop and web from a single Flutter/Dart codebase, backed by a Laravel API and PostgreSQL database. I build API-driven applications, integrate hardware and external services, implement UI/UX, and handle debugging, maintenance and production deployment.",
    highlights: [
      "Flutter application development for Android, iOS, web and desktop.",
      "Dart application logic and state management.",
      "REST API integration between the client and backend services.",
      "Laravel backend integration, including business logic and API design.",
      "PostgreSQL data modelling, schema and migrations.",
      "UI/UX implementation and responsive, accessible screens.",
      "Application architecture across client, API and database layers.",
      "Debugging and maintenance of production applications.",
      "API-driven application development with typed request/response contracts.",
      "Deployment and production support.",
    ],
    focusAreas: ["Flutter", "Dart", "Laravel", "PostgreSQL", "REST API", "Firebase"],
    technologies: ["Flutter", "Dart", "Laravel", "PostgreSQL", "REST API", "Firebase", "Git", "GitHub"],
    projects: [
      {
        name: "Sanket",
        description: "Smart school/office management system",
        details: [
          "Student management and teacher management.",
          "Digital attendance, including biometric attendance hardware integration.",
          "Digital bell and timetable system.",
          "IoT-related features: smoke detection and water-level monitoring.",
          "Student and teacher ID card generation.",
          "Exam seat planning.",
          "School voting module.",
        ],
        technologies: ["Flutter", "Dart", "Laravel", "PostgreSQL", "REST API"],
      },
      {
        name: "Bhok Lagyo",
        description: "Restaurant / POS application",
        details: [
          "Flutter application for order and restaurant-management workflows.",
          "Restaurant API integration.",
          "Order and order-item management with corrections.",
          "Batched receipt printing with multiple copies (kitchen, customer, register).",
          "Takeaway order flow.",
          "Production and deployment experience.",
        ],
        technologies: ["Flutter", "Dart", "REST API", "PostgreSQL", "Receipt printing"],
      },
      {
        name: "Ashri Bhakti / Ashri Kids",
        description: "Devotional and educational application for children",
        details: [
          "Flutter-based application for mobile.",
          "API-driven architecture backed by Laravel.",
          "Interactive application features: games, quizzes and a parent-gate flow.",
          "CMS-driven content pipeline (bhajans, stories, shlokas, calendar, Rashifal).",
          "Guest access plus Google sign-in.",
        ],
        technologies: ["Flutter", "Dart", "Laravel", "PostgreSQL", "REST API", "Firebase"],
      },
    ],
  },
  {
    organisation: "KutumbaTech",
    role: "Flutter Developer Intern",
    type: "Internship",
    color: "accent-2",
    description:
      "Interned as a Flutter developer, building mobile features against an existing production codebase and API layer. Worked with the KutumbaTech restaurant API and Swagger-based API documentation.",
    highlights: [
      "Flutter development in Dart.",
      "Mobile application development.",
      "REST API integration against existing production APIs.",
      "Worked with the KutumbaTech restaurant API and Swagger-based API documentation.",
      "Debugging and testing features through the development cycle.",
      "Learning professional development practices and code review workflows.",
      "Collaborated with a development team on requirements and implementation.",
    ],
    focusAreas: ["Flutter", "Dart", "REST API", "Mobile"],
    technologies: ["Flutter", "Dart", "REST API"],
  },
];

export interface EducationEntry {
  qualification: string;
  field: string;
  detail: string;
}

export const education: EducationEntry[] = [
  {
    qualification: "BSc.CSIT",
    field: "Computer Science and Information Technology",
    detail:
      "Undergraduate studies covering programming, databases, software engineering and web technologies — the foundation behind the application and backend work in this portfolio.",
  },
];

export interface Service {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
}

export const services: Service[] = [
  {
    number: "01",
    title: "Flutter Application Development",
    description:
      "Modern Android, iOS, Web and Desktop applications from a single Flutter codebase.",
    deliverables: ["Flutter UI and state management", "Android / iOS / Web / Desktop targets", "Offline-tolerant and responsive screens"],
  },
  {
    number: "02",
    title: "Full-Stack Application Development",
    description: "Flutter frontend, Laravel backend and PostgreSQL database, built as one system.",
    deliverables: ["Flutter application layer", "Laravel API and business logic", "PostgreSQL schema and migrations"],
  },
  {
    number: "03",
    title: "REST API Development",
    description: "Secure and structured API development and integration.",
    deliverables: ["Designed and versioned endpoints", "Authentication and role-based access", "Documented request and response shapes"],
  },
  {
    number: "04",
    title: "Business Software",
    description: "POS, management systems, dashboards and workflow applications.",
    deliverables: ["Order and record management", "Admin panels and dashboards", "Reports and exports"],
  },
  {
    number: "05",
    title: "Education Technology",
    description: "School management, attendance, election, learning and administrative systems.",
    deliverables: ["Multi-school and role-based systems", "Attendance and hardware integration", "Voting and results workflows"],
  },
  {
    number: "06",
    title: "Database & Backend Systems",
    description: "Database design, migrations, authentication and backend architecture.",
    deliverables: ["Relational data modelling", "Version-controlled migrations", "Server-side validation and integrity rules"],
  },
  {
    number: "07",
    title: "Existing App Development",
    description: "Fixing, improving and extending existing Flutter and Laravel applications.",
    deliverables: ["Bug diagnosis across the stack", "Feature work without rewrites", "Performance and structure improvements"],
  },
];
