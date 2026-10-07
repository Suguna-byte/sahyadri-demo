import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { services, projects } from "@/lib/data";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Photo } from "@/components/ui/Photo";
import { Button, Arrow } from "@/components/ui/Button";
import { CtaBand } from "@/components/sections/CtaBand";

const categoryFor: Record<string, string> = {
  "residential-construction": "Residential",
  "commercial-buildings": "Commercial",
  "industrial-warehousing": "Industrial",
  "interiors-fitouts": "Interiors",
};

// Pre-render every service at build time (SSG).
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return {};
  return { title: `${s.title} in Pune`, description: s.summary, alternates: { canonical: `/services/${s.slug}` } };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const related = projects.filter((p) => p.category === categoryFor[service.slug]).slice(0, 3);
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHero
        crumbs={[{ label: "Services", href: "/services" }, { label: service.title }]}
        eyebrow={service.kicker}
        title={service.title}
        intro={service.summary}
        image={service.image}
      >
        <Reveal delay={0.6} className="mt-10 flex flex-wrap gap-4">
          <Button href={`/contact?service=${service.slug}`}>Get a quote</Button>
          <Button href="/projects" variant="outline">See related work</Button>
        </Reveal>
      </PageHero>

      <section className="py-24 md:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-[1fr_1.4fr]">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow">Scope</p>
            <h2 className="display-md mt-4">What&apos;s included</h2>
            <ul className="mt-8 space-y-3">
              {service.scope.map((x) => (
                <li key={x} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-laterite" />
                  {x}
                </li>
              ))}
            </ul>
            <p className="mt-8 rounded-2xl bg-paper-2 p-5 text-sm text-mute"><strong className="text-ink">Ideal for:</strong> {service.idealFor}</p>
          </Reveal>
          <RevealGroup className="grid gap-6">
            {service.highlights.map((h, i) => (
              <RevealItem key={h.title} className="rounded-[1.75rem] border border-line p-8 md:p-10">
                <p className="font-display text-5xl text-laterite tabular-nums">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-6 text-3xl">{h.title}</h3>
                <p className="mt-4 leading-relaxed text-mute">{h.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-paper-2 py-24 md:py-32">
          <div className="container-x">
            <h2 className="display-md">Recent {service.kicker.toLowerCase()} work</h2>
            <RevealGroup className="mt-12 grid gap-8 md:grid-cols-3">
              {related.map((p) => (
                <RevealItem key={p.slug}>
                  <Link href={`/projects/${p.slug}`} className="group block">
                    <Photo src={p.cover} alt={p.title} zoom className="aspect-[4/3] rounded-3xl" sizes="(min-width:768px) 33vw, 100vw" />
                    <h3 className="mt-5 text-2xl group-hover:text-laterite">{p.title}</h3>
                    <p className="text-sm text-mute">{p.location} · {p.year}</p>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      <section className="py-24">
        <div className="container-x">
          <p className="eyebrow">Other services</p>
          <ul className="mt-6 border-t border-line">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/services/${o.slug}`} className="group flex items-center justify-between border-b border-line py-6">
                  <span className="font-display text-3xl transition-transform duration-500 group-hover:translate-x-3 group-hover:text-laterite">{o.title}</span>
                  <Arrow />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
