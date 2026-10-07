import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/data";
import { img } from "@/lib/images";
import { PageHero } from "@/components/sections/PageHero";
import { Photo } from "@/components/ui/Photo";
import { Arrow } from "@/components/ui/Button";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Process } from "@/components/sections/Process";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Construction services in Pune",
  description: "Residential, commercial and industrial construction, interiors, retrofit and project management across the Pune Metropolitan Region.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Services" }]}
        eyebrow="What we build"
        title="Everything from the foundation up"
        accent={["foundation"]}
        intro="Six disciplines, one accountable team. Pick the one you need — or hand us the whole project from land survey to handover."
        image={img.craneSkyline}
      />

      <section className="py-24 md:py-32">
        <RevealGroup className="container-x grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <RevealItem key={s.slug}>
              <Link href={`/services/${s.slug}`} className="group block">
                <div className="relative">
                  <Photo src={s.image} alt="" zoom className="aspect-[4/5] rounded-[1.75rem]" sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw" />
                  <span className="absolute left-5 top-5 rounded-full bg-paper/90 px-3 py-1 text-xs font-semibold tabular-nums backdrop-blur">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className="eyebrow mt-7">{s.kicker}</p>
                <h2 className="mt-3 flex items-center justify-between gap-4 text-3xl transition-colors group-hover:text-laterite">
                  {s.title} <Arrow className="text-laterite" />
                </h2>
                <p className="mt-4 leading-relaxed text-mute">{s.summary}</p>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <Process />
      <CtaBand title="Not sure which service you need?" />
    </>
  );
}
