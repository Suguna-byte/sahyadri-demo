import { SplitHeading } from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { Photo } from "@/components/ui/Photo";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";

export function PageHero({
  eyebrow,
  title,
  accent,
  intro,
  image,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: string;
  accent?: string[];
  intro?: string;
  image?: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-32 md:pt-40">
      <div aria-hidden className="blueprint pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_30%_20%,black,transparent_65%)]" />
      <div className="container-x relative">
        {crumbs && <Breadcrumbs items={crumbs} />}
        <Reveal y={10}><p className="eyebrow mb-6">{eyebrow}</p></Reveal>
        <SplitHeading as="h1" immediate delay={0.2} text={title} accent={accent} className="display-xl max-w-5xl" />
        {intro && (
          <Reveal delay={0.5}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-mute md:text-xl">{intro}</p>
          </Reveal>
        )}
        {children}
      </div>
      {image && (
        <div className="container-x mt-14 md:mt-20">
          <Reveal y={60} className="overflow-hidden rounded-[2rem]">
            <div className="relative h-[52vh] min-h-[320px] overflow-hidden md:h-[70vh]">
              <Parallax speed={160} className="absolute -inset-y-24 inset-x-0">
                <Photo src={image} alt="" priority className="h-full w-full" sizes="100vw" />
              </Parallax>
            </div>
          </Reveal>
        </div>
      )}
    </section>
  );
}
