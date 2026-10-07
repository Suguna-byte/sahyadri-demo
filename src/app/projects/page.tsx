import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectsGrid, Grid } from "@/components/sections/ProjectsGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { Stats } from "@/components/sections/Stats";

export const metadata: Metadata = {
  title: "Projects",
  description: "Residential towers, offices, industrial plants and interiors built by Sahyadri Buildcon across Pune, Chakan and Talegaon.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Projects" }]}
        eyebrow="Our work"
        title="140 buildings. One standard."
        accent={["One"]}
        intro="A selection of homes, workplaces and plants we've built across the Pune Metropolitan Region."
      />
      <section className="py-16 md:py-24">
        <div className="container-x">
          {/* useSearchParams needs a Suspense boundary; the fallback renders the full list so the static HTML is complete. */}
          <Suspense fallback={<Grid active="All" />}>
            <ProjectsGrid />
          </Suspense>
        </div>
      </section>
      <Stats />
      <CtaBand title="Let's add your project to this page" />
    </>
  );
}
