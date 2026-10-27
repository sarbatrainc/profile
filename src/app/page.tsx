import { ProjectsJsonLd } from "@/components/seo/json-ld";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { ExperienceSection } from "@/components/sections/experience";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { Architecture } from "@/components/sections/architecture";
import { GitHubCta } from "@/components/sections/github-cta";
import { FAQ } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { FeaturedWork } from "@/components/sections/featured-work";
import { Stats } from "@/components/sections/stats";
import { CTA } from "@/components/sections/cta";

export default function HomePage() {
  return (
    <>
      <ProjectsJsonLd />
      <Hero />
      <About />
      <FeaturedWork />
      <Stats />
      <Skills />
      <Projects />
      <ExperienceSection />
      <Services />
      <Process />
      <Architecture />
      <GitHubCta />
      <FAQ />
      <CTA />
      <Contact />
    </>
  );
}