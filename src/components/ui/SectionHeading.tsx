import clsx from "clsx";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";

export function SectionHeading({
  eyebrow,
  title,
  accent,
  intro,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  accent?: string[];
  intro?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={clsx("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <Reveal y={12}>
          <p className="eyebrow mb-5">{eyebrow}</p>
        </Reveal>
      )}
      <SplitHeading text={title} accent={accent} className="display-lg" />
      {intro && (
        <Reveal delay={0.15}>
          <p className={clsx("mt-6 max-w-xl text-lg leading-relaxed text-mute", align === "center" && "mx-auto")}>{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
