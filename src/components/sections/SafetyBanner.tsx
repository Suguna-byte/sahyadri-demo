import { img } from "@/lib/images";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";

export function SafetyBanner() {
  return (
    <section className="container-x py-24 md:py-32">
      <div className="relative overflow-hidden rounded-[2.25rem] bg-monsoon text-paper">
        <div className="absolute inset-0 opacity-40">
          <Parallax speed={140} className="absolute -inset-y-24 inset-x-0">
            <Photo src={img.scaffolding} alt="" className="h-full w-full" sizes="100vw" />
          </Parallax>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-monsoon via-monsoon/85 to-monsoon/20" />
        <div className="relative grid gap-10 p-8 py-16 md:grid-cols-[1.3fr_1fr] md:p-16">
          <Reveal>
            <p className="eyebrow text-sand!">Zero-harm programme</p>
            <h2 className="display-md mt-5 max-w-xl">1.2 million safe man-hours — and every worker trained before day one.</h2>
            <p className="mt-6 max-w-lg leading-relaxed text-paper/75">
              Our on-site safety academy trains every crew member in Marathi and Hindi before they step onto a slab. ISO 45001
              certified, audited monthly, and non-negotiable.
            </p>
            <div className="mt-8">
              <Button href="/about#values" variant="light">How we keep sites safe</Button>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="grid grid-cols-2 content-end gap-4 self-end">
            {[["0", "Fatal incidents since founding"], ["100%", "Crews inducted before work"], ["ISO", "45001 certified"], ["Monthly", "Third-party audits"]].map(([v, l]) => (
              <div key={l} className="rounded-2xl border border-paper/15 bg-paper/5 p-5 backdrop-blur">
                <p className="font-display text-3xl">{v}</p>
                <p className="mt-1 text-xs text-paper/70">{l}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
