import type { Metadata, Viewport } from "next";

import { siteConfig } from "@/config/site.config";
import { PersonJsonLd, WebSiteJsonLd } from "@/components/seo/json-ld";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppChat } from "@/components/whatsapp/whatsapp-chat";
import { CursorGlow } from "@/components/ui/cursor-glow";

import "./globals.css";

const TITLE = "Raghav Ghimire | Flutter & Full-Stack Developer";

const DESCRIPTION =
  "Raghav Ghimire is a Flutter and Full-Stack Developer specializing in Flutter, Dart, Laravel, PostgreSQL, REST APIs and real-world education and business applications.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: TITLE,
    template: `%s | ${siteConfig.name}`,
  },
  description: DESCRIPTION,
  applicationName: `${siteConfig.name} — Portfolio`,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  keywords: [
    "Raghav Ghimire",
    "Flutter Developer",
    "Full-Stack Developer",
    "Dart",
    "Laravel",
    "PHP",
    "PostgreSQL",
    "REST API",
    "Education Technology",
    "School Management System",
    "Point of Sale",
    "Nepal",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: `${siteConfig.name} — Flutter & Full-Stack Developer`,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
  formatDetection: {
    email: siteConfig.email ? true : false,
    telephone: siteConfig.phone ? true : false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbfd" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0f16" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin=""
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Satoshi:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className="min-h-dvh bg-background font-sans text-foreground antialiased">
        <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-accent-on"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppChat />
          <CursorGlow />
          <PersonJsonLd />
          <WebSiteJsonLd />
        </body>
    </html>
  );
}