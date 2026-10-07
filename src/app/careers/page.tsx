import type { Metadata } from "next";
import { jobs } from "@/lib/data";
import { img } from "@/lib/images";
import { site } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Careers",
  description: "Site engineering, planning, QS, safety and interiors roles at Sahyadri Buildcon in Pune.",
  alternates: { canonical: "/careers" },
};

const perks = [
  ["Real responsibility, early", "Graduate engineers run a floor within their first year."],
  ["Learn from builders", "Monthly site walks with our directors and a sponsored M.Tech track."],
  ["Health for your family", "Group medical cover for you, your spouse, children and parents."],
  ["Home by dinner", "Six-day sites, but a hard stop on overtime culture at the office."],
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Careers" }]}
        eyebrow="Careers"
        title="Build the city you live in"
        accent={["city"]}
        intro="We're hiring engineers, planners and designers who'd rather be on site than in a spreadsheet — and are great at both."
        image={img.crew}
      />

      <section className="py-24 md:py-32">
        <div className="container-x">
          <SectionHeading eyebrow="Why Sahyadri" title="A place to get good at building" />
          <RevealGroup className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {perks.map(([t, b]) => (
              <RevealItem key={t} className="rounded-[1.75rem] bg-paper-2 p-8">
                <h3 className="text-2xl">{t}</h3>
                <p className="mt-3 text-mute leading-relaxed">{b}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section id="openings" className="pb-24 md:pb-32">
        <div className="container-x">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="display-md">Open roles <span className="text-laterite">({jobs.length})</span></h2>
            <p className="text-mute">Don&apos;t see your role? Email <a className="text-ink underline underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a></p>
          </div>
          <Accordion
            items={jobs.map((j) => ({
              id: j.id,
              title: j.title,
              meta: `${j.team} · ${j.location} · ${j.type}`,
              content: (
                <div className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
                  <div>
                    <p className="text-ink-2">{j.summary}</p>
                    <p className="mt-2 text-sm md:hidden">{j.team} · {j.location} · {j.type}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">You&apos;ll need</p>
                    <ul className="mt-3 space-y-2">
                      {j.requirements.map((r) => <li key={r} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-laterite" />{r}</li>)}
                    </ul>
                    <Button href={`mailto:${site.email}?subject=Application: ${j.title}`} variant="dark" className="mt-6">Apply for this role</Button>
                  </div>
                </div>
              ),
            }))}
          />
        </div>
      </section>
    </>
  );
}
