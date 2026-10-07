import Link from "next/link";
import { posts } from "@/lib/data";
import { Photo } from "@/components/ui/Photo";
import { Button, Arrow } from "@/components/ui/Button";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { formatDate } from "@/lib/utils";

export function InsightsPreview() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-4">Insights</p>
            <h2 className="display-lg">Read the latest from site</h2>
          </div>
          <Button href="/insights" variant="outline">All articles</Button>
        </div>
        <RevealGroup className="mt-14 grid gap-8 md:grid-cols-3">
          {posts.slice(0, 3).map((p) => (
            <RevealItem key={p.slug}>
              <Link href={`/insights/${p.slug}`} className="group block">
                <Photo src={p.cover} alt="" zoom className="aspect-[4/3] rounded-3xl" sizes="(min-width:768px) 33vw, 100vw" />
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-mute">
                  {p.category} · <time dateTime={p.date}>{formatDate(p.date)}</time>
                </p>
                <h3 className="mt-3 text-2xl leading-snug transition-colors group-hover:text-laterite">{p.title}</h3>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">Read article <Arrow /></span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
