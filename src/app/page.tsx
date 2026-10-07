import { projects, clientTypes } from "@/lib/data";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { AudienceTabs } from "@/components/sections/AudienceTabs";
import { ServicesList } from "@/components/sections/ServicesList";
import { Process } from "@/components/sections/Process";
import { ProjectsScroller } from "@/components/sections/ProjectsScroller";
import { Testimonials } from "@/components/sections/Testimonials";
import { SafetyBanner } from "@/components/sections/SafetyBanner";
import { Marquee } from "@/components/sections/Marquee";
import { InsightsPreview } from "@/components/sections/InsightsPreview";
import { CtaBand } from "@/components/sections/CtaBand";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <AudienceTabs />

      <section className="py-24 md:py-32">
        <div className="container-x">
          <SectionHeading
            eyebrow="What we build"
            title="One team, from soil test to snag list"
            accent={["soil", "snag"]}
            intro="Six in-house disciplines under one contract — so nothing falls between consultants."
            className="mb-16"
          />
          <ServicesList />
        </div>
      </section>

      <Process />
      <ProjectsScroller projects={projects.slice(0, 6)} />
      <Testimonials />

      <SafetyBanner />
      <InsightsPreview />
      <CtaBand />
    </>
  );
}
