import type { Metadata } from "next";
import { values, milestones, leadership } from "@/lib/data";
import { img } from "@/lib/images";
import { site } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Photo } from "@/components/ui/Photo";
import { Parallax } from "@/components/motion/Parallax";
import { Stats } from "@/components/sections/Stats";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "About us",
  description: `Founded in Pune in ${site.founded}, Sahyadri Buildcon has delivered 140+ projects across the region. Meet the team and the values behind the work.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Company" }]}
        eyebrow="Our story"
        title="A Pune company, built one promise at a time"
        accent={["promise"]}
        intro={`We started in ${site.founded} with two engineers and a rented mixer in Shivajinagar. Today we're 400 people strong — and we still put our name on every foundation.`}
        image={img.siteTeam}
      />

      <Stats />

      <section className="py-24 md:py-32">
        <div className="container-x grid items-center gap-16 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Why &ldquo;Sahyadri&rdquo;</p>
            <h2 className="display-md mt-5">Named for the mountains that made the Deccan.</h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-mute">
              <p>The Sahyadri range is basalt — slow to form, almost impossible to wear down. That&apos;s the standard we hold our buildings to.</p>
              <p>Our founder grew up watching Pune&apos;s wadas give way to towers. He wanted a builder that did both with the same care: honest engineering, honest pricing, and handover on the day promised.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 gap-4">
            <Parallax speed={60}><Photo src={img.carpentry} alt="Carpenter working on site" className="aspect-[3/4] rounded-3xl" sizes="25vw" /></Parallax>
            <Parallax speed={-60} className="mt-16"><Photo src={img.concreteWork} alt="Concrete finishing on site" className="aspect-[3/4] rounded-3xl" sizes="25vw" /></Parallax>
          </div>
        </div>
      </section>

      <section id="values" className="scroll-mt-28 bg-ink py-24 text-paper md:py-32">
        <div className="container-x">
          <div className="[&_.text-mute]:text-paper/60">
            <SectionHeading eyebrow="What we stand for" title="Four rules we don't bend" accent={["don't", "bend"]} />
          </div>
          <RevealGroup className="mt-16 grid gap-px overflow-hidden rounded-[2rem] bg-paper/15 md:grid-cols-2">
            {values.map((v, i) => (
              <RevealItem key={v.title} className="bg-ink p-10 md:p-12">
                <p className="font-display text-6xl text-laterite-2">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-8 text-3xl">{v.title}</h3>
                <p className="mt-4 max-w-md leading-relaxed text-paper/65">{v.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Milestones" title="Twenty-seven years on the ground" />
          <ol className="mt-16 border-t border-line">
            {milestones.map((m, i) => (
              <Reveal as="li" key={m.year} delay={i * 0.04} className="grid gap-4 border-b border-line py-8 md:grid-cols-[12rem_1fr] md:items-baseline">
                <span className="font-display text-5xl text-laterite">{m.year}</span>
                <span className="max-w-2xl text-lg text-ink-2">{m.text}</span>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-paper-2 py-24 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Leadership" title="The people who sign off" accent={["sign", "off"]} />
          <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((p) => (
              <RevealItem key={p.name} className="group rounded-[1.75rem] border border-line bg-paper p-6">
                <div aria-hidden className="grid aspect-square place-items-center rounded-2xl bg-sand font-display text-6xl text-laterite transition-colors duration-500 group-hover:bg-laterite group-hover:text-paper">
                  {p.initials}
                </div>
                <h3 className="mt-6 text-2xl">{p.name}</h3>
                <p className="mt-1 text-sm text-mute">{p.role}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaBand title="Build with people who answer the phone" />
    </>
  );
}
