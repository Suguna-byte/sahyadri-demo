import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { PageHero } from "@/components/sections/PageHero";
import { Photo } from "@/components/ui/Photo";
import { Arrow } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Insights",
  description: "Engineering notes, regulation explainers and maintenance guides from Pune's construction sites.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  const [featured, ...rest] = posts;
  return (
    <>
      <PageHero crumbs={[{ label: "Insights" }]} eyebrow="Insights" title="Notes from site" accent={["site"]} intro="Practical writing on building in Pune — soil, regulation, materials and maintenance." />

      <section className="py-16 md:py-24">
        <div className="container-x">
          <Reveal>
            <Link href={`/insights/${featured.slug}`} className="group grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
              <Photo src={featured.cover} alt="" zoom priority className="aspect-[16/10] rounded-[2rem]" sizes="(min-width:1024px) 60vw, 100vw" />
              <div>
                <p className="eyebrow">Featured · {featured.category}</p>
                <h2 className="display-md mt-4 transition-colors group-hover:text-laterite">{featured.title}</h2>
                <p className="mt-5 text-lg text-mute">{featured.excerpt}</p>
                <p className="mt-6 flex items-center gap-3 text-sm font-semibold">
                  <time dateTime={featured.date}>{formatDate(featured.date)}</time> · {featured.readTime} read <Arrow className="text-laterite" />
                </p>
              </div>
            </Link>
          </Reveal>

          <RevealGroup className="mt-24 grid gap-10 md:grid-cols-3">
            {rest.map((p) => (
              <RevealItem key={p.slug}>
                <Link href={`/insights/${p.slug}`} className="group block">
                  <Photo src={p.cover} alt="" zoom className="aspect-[4/3] rounded-3xl" sizes="(min-width:768px) 33vw, 100vw" />
                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-mute">{p.category} · {p.readTime}</p>
                  <h3 className="mt-3 text-2xl leading-snug transition-colors group-hover:text-laterite">{p.title}</h3>
                  <p className="mt-3 text-mute">{p.excerpt}</p>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
