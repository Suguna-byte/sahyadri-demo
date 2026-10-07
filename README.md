# Sahyadri Buildcon — website

Marketing website for a (fictional) construction company in Pune. Built with
**Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Motion · Lenis**.

> Layout inspired by the structure of sparkadvisors.com; brand, copy, palette, logo and
> interactions are original. Projects, people and figures are illustrative demo content.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production build (all 31 routes prerendered)
npm run typecheck
```

Requires Node 20.9+.

## Pages

| Route | What's there |
|---|---|
| `/` | Hero with scroll-parallax collage, count-up stats, audience tabs, cursor-preview services list, scroll-progress process, pinned horizontal projects gallery, draggable testimonials, marquee, safety banner, insights, CTA |
| `/services`, `/services/[slug]` | 6 services with scope, highlights, related projects |
| `/projects`, `/projects/[slug]` | Animated, URL-driven category filter; case studies with gallery parallax and "next project" |
| `/about` | Story, values, milestones, leadership |
| `/careers` | Perks + accessible accordion of open roles |
| `/insights`, `/insights/[slug]` | Articles with reading-progress bar and Article JSON-LD |
| `/contact` | Server Action form with server-side validation, honeypot, a11y error handling |
| `/faq` | Accordion + FAQPage JSON-LD |
| 404, `sitemap.xml`, `robots.txt`, favicon | |

## Re-brand in three files

- `src/lib/site.ts` — name, phone, address, nav
- `src/components/layout/Logo.tsx` — the mark
- `src/app/globals.css` — `@theme` colour + font tokens

Content lives in `src/lib/data.ts`; photos are mapped by key in `src/lib/images.ts`
(Unsplash, free licence — swap for real site photos).

## Deploy

Push to GitHub and import into Vercel — no env vars required. To receive enquiries,
wire `src/app/contact/actions.ts` to your CRM or an email API.

See **[TECHNICAL_DECISIONS.md](./TECHNICAL_DECISIONS.md)** for the architecture write-up.
