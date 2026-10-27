import type { SVGProps } from "react";
import type { ProjectIcon } from "@/content/projects";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 20, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

/* ---------------------------------------------------------------- brand --- */

export const GithubIcon = ({ size = 20, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.921.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

export const LinkedInIcon = ({ size = 20, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.03-1.86-3.03-1.85 0-2.13 1.44-2.13 2.94v5.66H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);

export const XIcon = ({ size = 20, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.59-6.64 7.59H.47l8.6-9.83L0 1.15h7.6l5.24 6.93 6.06-6.93zm-1.29 19.49h2.04L6.49 3.24H4.3l13.31 17.4z" />
  </svg>
);

export const MailIcon = (props: IconProps) => (
  <Svg {...props}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2.5 6 8.4 6a2 2 0 0 0 2.2 0l8.4-6" />
  </Svg>
);

export const PhoneIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </Svg>
);

export const WhatsappIcon = ({ size = 20, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path d="M19.05 4.95C17.22 3.06 14.74 2 12 2 6.48 2 2 6.22 2 11.31c0 1.96.52 3.85 1.49 5.48L2 22l5.66-1.49c1.56.85 3.39 1.33 5.34 1.33 5.52 0 10.05-4.26 10.05-9.44S17.57 4.95 16.63 4.95h.42c-.93 1.62-2.54 2.97-4.68 3.84.03-.08.11-.24.17-.38.59-.65.96-1.48 1.03-2.41-1.61-.31-3.27-.48-4.97-.5-1.53.02-3.01.43-4.24 1.24-.35-.07-.68-.16-.68-.41v-.01c0-.11.04-.21.12-.29.11-.15 1.04-.98 1.81-1.33.28-.11.6-.25.92-.19.24.04.49.09 1.01-.16v-.02c1.21-.42 2.54-.65 3.9-.65 1.35 0 2.66.33 3.81.95.28.13.54.39.66.69.14.32.17.72.11 1.11-.03.19-.07.38-.14.58.02 0 .04-.02.07-.03-.41 1.25-.27 2.51-.11 3.77.1.48-.16.88-.34 1.24-.62-2.78-.44-5.73-.21-8.33.88-2.28 2.21-3.48 5.06-2.78 7.5l-.02.06c.59.47 1.3.78 2.07.89-.13.38-.27.76-.43 1.14-3.19-1.51-5.1-4.97-5.1-8.8 0-.64.1-1.29.28-1.91 1.73-1.51 4.02-2.38 6.42-2.38 1.78 0 3.5.47 4.99 1.33 1.36-.8 2.78-1.33 4.26-1.55 1.2-.18 2.44.09 3.55.86-1.06 1.58-2.37 2.87-3.79 3.72z" />
  </svg>
);

export const MapPinIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </Svg>
);

/* ------------------------------------------------------------ interface --- */

export const SunIcon = (props: IconProps) => (
  <Svg {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </Svg>
);

export const MoonIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </Svg>
);

export const ArrowRightIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </Svg>
);

export const ArrowLeftIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M20 12H5M11 6l-6 6 6 6" />
  </Svg>
);

export const ArrowUpRightIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Svg>
);

export const DownloadIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
  </Svg>
);

export const ExternalLinkIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <path d="M15 3h6v6M10 14 21 3" />
  </Svg>
);

export const CheckIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M20 6 9 17l-5-5" />
  </Svg>
);

export const MenuIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M3 12h18M3 6h18M3 18h18" />
  </Svg>
);

export const CloseIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M18 6 6 18M6 6l12 12" />
  </Svg>
);

export const LayersIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="m12 2 9 5-9 5-9-5 9-5z" />
    <path d="m3 12 9 5 9-5M3 17l9 5 9-5" />
  </Svg>
);

export const DatabaseIcon = (props: IconProps) => (
  <Svg {...props}>
    <ellipse cx="12" cy="6" rx="8" ry="3" />
    <path d="M4 6v12c0 1.66 3.58 3 8 3s8-1.34 8-3V6M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
  </Svg>
);

export const ServerIcon = (props: IconProps) => (
  <Svg {...props}>
    <rect x="3" y="3" width="18" height="7" rx="2" />
    <rect x="3" y="14" width="18" height="7" rx="2" />
    <path d="M7 6.5h.01M7 17.5h.01" />
  </Svg>
);

export const CodeIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
  </Svg>
);

export const TerminalIcon = (props: IconProps) => (
  <Svg {...props}>
    <rect x="2" y="3" width="20" height="18" rx="2" />
    <path d="m6 8 3 2.5L6 13M13 14h5" />
  </Svg>
);

export const SmartphoneIcon = (props: IconProps) => (
  <Svg {...props}>
    <rect x="6" y="2" width="12" height="20" rx="3" />
    <path d="M11 18.5h2" />
  </Svg>
);

export const PrinterIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" rx="1" />
  </Svg>
);

export const FingerprintIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M12 11a2 2 0 0 1 2 2c0 2.5-.3 5-1 7" />
    <path d="M8.5 20.5A14 14 0 0 0 10 13a2 2 0 0 1 4 0c0 1.2-.06 2.4-.18 3.6" />
    <path d="M5.5 17.5A12 12 0 0 0 6 13a6 6 0 0 1 12 0c0 1.1-.03 2.2-.1 3.3" />
    <path d="M3.5 12.5A9 9 0 0 1 6 7" />
  </Svg>
);

export const CloudIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M17.5 19a4.5 4.5 0 0 0 .5-8.97A6 6 0 0 0 6.2 11.2 3.9 3.9 0 0 0 6.5 19h11z" />
  </Svg>
);

export const KeyIcon = (props: IconProps) => (
  <Svg {...props}>
    <circle cx="7.5" cy="15.5" r="4.5" />
    <path d="m10.7 12.3 8.3-8.3M17 6l2.5 2.5M14.5 8.5 17 11" />
  </Svg>
);

export const PlugIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M9 2v6M15 2v6M6 8h12v3a6 6 0 0 1-12 0V8zM12 17v5" />
  </Svg>
);

/* -------------------------------------------------------------- project --- */

const projectIconPaths: Record<ProjectIcon, React.ReactNode> = {
  school: (
    <>
      <path d="M12 3 2 8l10 5 10-5-10-5Z" />
      <path d="M5.5 10.2V16c0 1.7 2.9 3 6.5 3s6.5-1.3 6.5-3v-5.8" />
      <path d="M10 19v-3.5a2 2 0 0 1 4 0V19" />
    </>
  ),
  vote: (
    <>
      <rect x="3" y="4" width="18" height="15" rx="2" />
      <path d="M8 9h8M8.5 14.5l2.5 2.5 4.5-4.5" />
      <path d="M3 22h18" />
    </>
  ),
  flame: (
    <>
      <path d="M12 2s4.5 5 4.5 8.6a4.5 4.5 0 0 1-9 0C7.5 8.6 8 7.4 8 7.4S5.5 11 5.5 14.5a6.5 6.5 0 0 0 13 0C18.5 9 12 2 12 2Z" />
      <path d="M12 21.5a2.8 2.8 0 0 0 2.8-2.8c0-1.6-2.8-3.7-2.8-3.7s-2.8 2.1-2.8 3.7A2.8 2.8 0 0 0 12 21.5Z" />
    </>
  ),
  restaurant: (
    <>
      <path d="M6 3v6a2 2 0 0 0 4 0V3M8 11v10" />
      <path d="M16 21V3c2 0 3 1.8 3 4.5S18 12 16 12" />
    </>
  ),
  book: (
    <>
      <path d="M4 5a2 2 0 0 1 2-2h13v17H6a2 2 0 0 0-2 2V5Z" />
      <path d="M4 18a2 2 0 0 1 2-2h13" />
    </>
  ),
};

export function ProjectGlyph({ icon, ...props }: IconProps & { icon: ProjectIcon }) {
  return <Svg {...props}>{projectIconPaths[icon]}</Svg>;
}

export const socialIconMap = {
  github: GithubIcon,
  linkedin: LinkedInIcon,
  mail: MailIcon,
  whatsapp: WhatsappIcon,
} as const;