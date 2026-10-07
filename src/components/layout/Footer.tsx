import Link from "next/link";
import { site } from "@/lib/site";
import { services } from "@/lib/data";
import { Logo } from "./Logo";
import { Newsletter } from "./Newsletter";
import { Button } from "@/components/ui/Button";

const columns = [
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Insights", href: "/insights" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
  { title: "What we build", links: services.map((s) => ({ label: s.title, href: `/services/${s.slug}` })) },
  {
    title: "Projects",
    links: [
      { label: "All projects", href: "/projects" },
      { label: "Residential", href: "/projects?category=Residential" },
      { label: "Commercial", href: "/projects?category=Commercial" },
      { label: "Industrial", href: "/projects?category=Industrial" },
      { label: "Interiors", href: "/projects?category=Interiors" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden bg-ink text-paper grain">
      <div className="container-x relative pt-20 pb-10">
        <div className="grid gap-12 border-b border-paper/15 pb-16 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <Logo tone="paper" />
            <p className="mt-8 max-w-md font-display text-3xl leading-tight md:text-4xl">
              Site notes from Pune&apos;s builders — one email a month.
            </p>
            <Newsletter />
          </div>
          <div className="flex flex-col justify-between gap-10 lg:items-end">
            <div className="flex flex-wrap gap-3">
              <Button href="/contact" variant="primary">Get a quote</Button>
              <Button href={site.whatsapp} variant="light">WhatsApp us</Button>
            </div>
            <address className="not-italic text-paper/70 lg:text-right">
              {site.address.line1}<br />
              {site.address.line2}<br />
              {site.address.city}<br />
              <a href={site.phoneHref} className="mt-3 inline-block text-paper hover:text-laterite-2">{site.phone}</a>
              <br />
              <a href={`mailto:${site.email}`} className="text-paper hover:text-laterite-2">{site.email}</a>
            </address>
          </div>
        </div>

        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="eyebrow mb-5 text-laterite-2!">{col.title}</h2>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-paper/75 transition-colors hover:text-paper">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h2 className="eyebrow mb-5 text-laterite-2!">Follow</h2>
            <ul className="space-y-3">
              {Object.entries(site.social).map(([k, v]) => (
                <li key={k}>
                  <a href={v} target="_blank" rel="noopener noreferrer" className="capitalize text-paper/75 hover:text-paper">{k}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p aria-hidden className="pointer-events-none select-none font-display text-[19vw] leading-[0.9] tracking-tighter pb-[0.12em] text-paper/[0.06] lg:text-[16rem]">
          Sahyadri
        </p>

        <div className="mt-8 flex flex-col gap-4 border-t border-paper/15 pt-8 text-xs text-paper/55 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} {site.name} Pvt. Ltd. All rights reserved. · {site.rera}</p>
          <p>Demo website — projects, people and figures are illustrative.</p>
        </div>
      </div>
    </footer>
  );
}
