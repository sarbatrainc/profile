import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/reveal";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question:
      "Are you a freelance web developer or do you work through a company?",
    answer:
      "I personally architect and build every project I take on. I work across the full stack — Flutter interface, Laravel API, PostgreSQL schema and deployment — so there is no gap between what the database can express and what the interface can show.",
  },
  {
    question: "Can you add AI automation to my existing business software?",
    answer:
      "Yes. I integrate LLMs into existing workflows: WhatsApp assistants, document processing, lead qualification and AI-assisted QA — with guardrails, cost tracking and a human fallback where it matters.",
  },
  {
    question: "Do you work with clients outside Nepal?",
    answer:
      "Yes. I work in your timezone for calls and ship in two-week increments with staging links, so you see progress instead of promises.",
  },
  {
    question: "Which technologies do you use?",
    answer:
      "Flutter and Dart for mobile, web and desktop; Laravel and PHP for APIs; PostgreSQL for data; plus REST APIs, Firebase, Supabase, GitHub and local-payment integrations where relevant.",
  },
  {
    question: "How much does a website or application cost?",
    answer:
      "Every quote comes from a written scope after we agree on the goal. I do not publish price lists because school management software, a restaurant POS and an election platform are different jobs — I will tell you how I would approach yours once we talk.",
  },
  {
    question: "Do you build mobile apps or only websites?",
    answer:
      "Both. Flutter lets me ship one codebase to Android, iOS, web and desktop, so the same application runs wherever your users are.",
  },
];

export function FAQ() {
  return (
    <Section id="faq" bordered>
      <Container>
        <SectionHeading
          id="faq-heading"
          eyebrow="10 — FAQ"
          title="Questions people ask me"
          description="Straight answers about how I work and what I build."
        />

        <div className="mt-12 max-w-3xl grid gap-3">
          {faqs.map((item, index) => (
            <Reveal key={item.question} delay={index * 60}>
              <details
                className="group rounded-xl border border-border bg-surface/50 p-5 transition-colors duration-200 open:border-accent/40 open:bg-surface"
              >
                <summary
                  className="flex items-center justify-between cursor-pointer list-none font-medium text-foreground outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
                >
                  <span className="text-sm">{item.question}</span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 rounded-full border border-border bg-surface px-1.5 text-[10px] font-medium text-subtle group-open:text-accent"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
