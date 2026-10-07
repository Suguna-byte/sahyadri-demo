import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { posts } from "@/lib/data";
import { site } from "@/lib/site";
import { formatDate } from "@/lib/utils";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { ReadingProgress } from "@/components/ui/ReadingProgress";
import { CtaBand } from "@/components/sections/CtaBand";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.excerpt,
    alternates: { canonical: `/insights/${p.slug}` },
    openGraph: { type: "article", publishedTime: p.date, images: [{ url: p.cover }] },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();
  const more = posts.filter((p) => p.slug !== slug).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.date,
    image: post.cover,
    publisher: { "@type": "Organization", name: site.name },
  };

  return (
    <>
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        crumbs={[{ label: "Insights", href: "/insights" }, { label: post.category }]}
        eyebrow={`${post.category} · ${post.readTime} read`}
        title={post.title}
        image={post.cover}
      >
        <p className="mt-6 text-sm text-mute">Published <time dateTime={post.date}>{formatDate(post.date)}</time></p>
      </PageHero>

      <article className="py-20 md:py-28">
        <div className="container-x max-w-3xl!">
          {post.body.map((b, i) => (
            <Reveal key={i} className="mb-10">
              {b.heading && <h2 className="mb-4 text-3xl">{b.heading}</h2>}
              <p className={i === 0 ? "font-display text-2xl leading-relaxed text-ink" : "text-lg leading-[1.8] text-ink-2"}>{b.text}</p>
            </Reveal>
          ))}
        </div>
      </article>

      <section className="border-t border-line py-20">
        <div className="container-x">
          <p className="eyebrow">Keep reading</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {more.map((m) => (
              <Link key={m.slug} href={`/insights/${m.slug}`} className="group rounded-[1.75rem] border border-line p-8 transition-colors hover:border-ink">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-mute">{m.category}</p>
                <h3 className="mt-3 text-2xl group-hover:text-laterite">{m.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
