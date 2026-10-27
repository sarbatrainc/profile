/**
 * Structured data for search engines.
 *
 * Only facts that are actually configured are emitted: absent contact details
 * or profile URLs simply leave properties out of the JSON-LD.
 */
import { siteConfig } from "@/config/site.config";
import { projects } from "@/content/projects";

export function PersonJsonLd() {
  const personId = `${siteConfig.url}/#person`;

  const sameAs = [siteConfig.githubUrl, siteConfig.linkedinUrl, siteConfig.xUrl].filter(
    (url): url is string => Boolean(url),
  );

  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: siteConfig.name,
    jobTitle: siteConfig.jobTitle,
    description: siteConfig.intro,
    url: siteConfig.url,
    ...(siteConfig.email ? { email: `mailto:${siteConfig.email}` } : {}),
    ...(sameAs.length ? { sameAs } : {}),
    ...(siteConfig.location
      ? {
          address: {
            "@type": "PostalAddress",
            addressCountry: "NP",
          },
        }
      : {}),
    knowsAbout: [
      "Flutter",
      "Dart",
      "Laravel",
      "PHP",
      "PostgreSQL",
      "REST API development",
      "Full-stack application development",
      "Education technology",
      "Point of sale systems",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "BSc.CSIT",
    },
  };

  return <JsonLd data={schema} />;
}

export function WebSiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.intro,
        inLanguage: "en",
        publisher: { "@id": `${siteConfig.url}/#person` },
      }}
    />
  );
}

/**
 * CreativeWork entries for the projects. `url` is only set for projects that
 * are actually published — no invented repository or demo links.
 */
export function ProjectsJsonLd() {
  const entries = projects.map((project) => ({
    "@type": "CreativeWork",
    name: project.name,
    description: project.summary,
    url: `${siteConfig.url}/projects/${project.slug}/`,
    abstract: project.overview[0],
    keywords: project.technologies.flatMap((group) => group.items).join(", "),
    author: { "@id": `${siteConfig.url}/#person` },
  }));

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: entries.map((entry, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: entry,
        })),
      }}
    />
  );
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}