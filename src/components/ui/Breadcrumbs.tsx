import Link from "next/link";

export type Crumb = { label: string; href?: string };

/** Visible breadcrumbs + BreadcrumbList JSON-LD for search results. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ label: "Home", href: "/" }, ...items];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, ...(c.href ? { item: c.href } : {}) })),
  };
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ol className="flex flex-wrap items-center gap-2 text-sm text-mute">
        {all.map((c, i) => (
          <li key={i} className="flex items-center gap-2">
            {c.href && i < all.length - 1 ? <Link href={c.href} className="hover:text-ink">{c.label}</Link> : <span aria-current="page" className="text-ink">{c.label}</span>}
            {i < all.length - 1 && <span aria-hidden>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
