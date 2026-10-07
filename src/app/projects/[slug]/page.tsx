import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/lib/data";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Photo } from "@/components/ui/Photo";
import { Parallax } from "@/components/motion/Parallax";
import { Arrow } from "@/components/ui/Button";
import { CtaBand } from "@/components/sections/CtaBand";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.title}, ${p.location}`,
    description: p.summary,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { images: [{ url: p.cover }] },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) notFound();
  const project = projects[idx];
  const next = projects[(idx + 1) % projects.length];

  const facts = [
    ["Location", project.location],
    ["Category", project.category],
    ["Built-up area", project.area],
    ["Client", project.client],
    ["Year", String(project.year)],
    ["Status", project.status],
  ];

  return (
    <>
      <PageHero
        crumbs={[{ label: "Projects", href: "/projects" }, { label: project.title }]}
        eyebrow={`${project.category} · ${project.location}`}
        title={project.title}
        intro={project.summary}
        image={project.cover}
      />

      <section className="py-20 md:py-28">
        <div className="container-x grid gap-16 lg:grid-cols-[1fr_1.6fr]">
          <Reveal>
            <dl className="divide-y divide-line border-y border-line">
              {facts.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 py-4">
                  <dt className="text-mute">{k}</dt>
                  <dd className="text-right font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <div className="space-y-14">
            <Reveal>
              <p className="eyebrow">The challenge</p>
              <p className="mt-4 font-display text-3xl leading-snug md:text-4xl">{project.challenge}</p>
            </Reveal>
            <Reveal>
              <p className="eyebrow">Our approach</p>
              <p className="mt-4 text-lg leading-relaxed text-ink-2 md:text-xl">{project.solution}</p>
            </Reveal>
            <RevealGroup className="grid grid-cols-3 gap-4 border-t border-line pt-10">
              {project.metrics.map((m) => (
                <RevealItem key={m.label}>
                  <p className="font-display text-3xl text-laterite md:text-5xl">{m.value}</p>
                  <p className="mt-2 text-sm text-mute">{m.label}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      <section aria-label="Project gallery" className="pb-24 md:pb-32">
        <div className="container-x grid gap-6 md:grid-cols-2">
          {project.gallery.map((src, i) => (
            <Reveal key={src} delay={i * 0.08} className={i === 0 ? "md:col-span-2" : ""}>
              <div className={`relative overflow-hidden rounded-[1.75rem] ${i === 0 ? "h-[60vh]" : "h-[46vh]"}`}>
                <Parallax speed={90} className="absolute -inset-y-16 inset-x-0">
                  <Photo src={src} alt={`${project.title} — view ${i + 1}`} className="h-full w-full" sizes={i === 0 ? "100vw" : "50vw"} />
                </Parallax>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Link href={`/projects/${next.slug}`} className="group block border-t border-line">
        <div className="container-x flex flex-col gap-8 py-20 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow">Next project</p>
            <p className="mt-4 font-display text-5xl transition-colors group-hover:text-laterite md:text-7xl">{next.title}</p>
            <p className="mt-2 text-mute">{next.location}</p>
          </div>
          <div className="relative h-40 w-64 shrink-0 overflow-hidden rounded-2xl">
            <Photo src={next.cover} alt="" zoom className="h-full w-full" sizes="256px" />
            <span className="absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-full bg-paper"><Arrow /></span>
          </div>
        </div>
      </Link>
      <CtaBand />
    </>
  );
}
