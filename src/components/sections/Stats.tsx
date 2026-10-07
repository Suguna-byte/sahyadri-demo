import { stats } from "@/lib/data";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";

export function Stats() {
  return (
    <section aria-labelledby="stats-title" className="border-y border-line bg-paper-2/60">
      <div className="container-x grid gap-10 py-16 md:grid-cols-[0.8fr_2fr] md:py-20">
        <Reveal>
          <p id="stats-title" className="eyebrow">Our business</p>
          <p className="mt-3 font-display text-2xl leading-snug">Twenty-seven years of keeping promises, in numbers.</p>
        </Reveal>
        <dl className="grid gap-10 sm:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="border-l border-line pl-6">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-6xl leading-none tracking-tight text-ink md:text-7xl">
                <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} prefix={s.prefix} />
              </dd>
              <dd aria-hidden className="mt-4 text-sm leading-relaxed text-mute">{s.label}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
