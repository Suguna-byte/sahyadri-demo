import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";

export function CtaBand({ title = "Have a plot, a plan, or a problem?" }: { title?: string }) {
  return (
    <section className="relative overflow-hidden bg-laterite py-24 text-paper md:py-32 grain">
      <div aria-hidden className="blueprint absolute inset-0 opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="container-x relative text-center">
        <Reveal y={12}><p className="eyebrow text-sand!">Start a conversation</p></Reveal>
        <SplitHeading text={title} className="display-xl mx-auto mt-6 max-w-4xl" />
        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-xl text-lg text-paper/80">
            Tell us about your site. A senior engineer — not a salesperson — will call you back within one working day.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Magnetic><Button href="/contact" variant="light">Request a site visit</Button></Magnetic>
            <Button href={site.phoneHref} variant="outline" className="border-paper/40! text-paper! hover:bg-paper! hover:text-ink!">Call {site.phone}</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
