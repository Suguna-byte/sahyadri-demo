import type { Metadata } from "next";
import { faqs } from "@/lib/data";
import { PageHero } from "@/components/sections/PageHero";
import { Accordion } from "@/components/ui/Accordion";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers on pricing, approvals, warranties, payments and timelines for construction projects in Pune.",
  alternates: { canonical: "/faq" },
};

// FAQPage structured data → eligible for FAQ rich results.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero crumbs={[{ label: "FAQ" }]} eyebrow="FAQ" title="Questions we hear on every site visit" accent={["every"]} />
      <section className="py-20 md:py-28">
        <div className="container-x max-w-4xl!">
          <Accordion defaultOpen="0" items={faqs.map((f, i) => ({ id: String(i), title: f.q, content: f.a }))} />
        </div>
      </section>
      <CtaBand title="Still have a question?" />
    </>
  );
}
