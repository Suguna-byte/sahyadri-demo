import type { Metadata } from "next";
import { Suspense } from "react";
import { site } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm, ContactFormWithParams } from "@/components/sections/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { Arrow } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Contact & quote",
  description: `Request a fixed-price construction quote or site visit in Pune. Call ${site.phone} or send an enquiry.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.address.line2}, ${site.address.city}`)}`;
  return (
    <>
      <PageHero crumbs={[{ label: "Contact" }]} eyebrow="Contact" title="Let's walk your site together" accent={["site"]} intro="Share a few details and a senior engineer will call within one working day to set up a free site visit anywhere in PMR." />
      <section className="py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <Reveal className="space-y-10">
            <div>
              <p className="eyebrow">Call or WhatsApp</p>
              <a href={site.phoneHref} className="mt-3 block font-display text-4xl hover:text-laterite">{site.phone}</a>
              <p className="mt-1 text-sm text-mute">{site.hours}</p>
            </div>
            <div>
              <p className="eyebrow">Email</p>
              <a href={`mailto:${site.email}`} className="mt-3 block text-xl hover:text-laterite">{site.email}</a>
            </div>
            <div>
              <p className="eyebrow">Head office</p>
              <address className="mt-3 not-italic text-lg leading-relaxed">
                {site.address.line1}<br />{site.address.line2}<br />{site.address.city}
              </address>
              <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="group mt-4 inline-flex items-center gap-2 text-sm font-semibold text-laterite">
                Open in Google Maps <Arrow />
              </a>
            </div>
            <div className="rounded-[1.75rem] bg-paper-2 p-6">
              <p className="font-semibold">What happens next?</p>
              <ol className="mt-4 space-y-3 text-sm text-mute">
                <li><strong className="text-ink">1.</strong> We call you within one working day.</li>
                <li><strong className="text-ink">2.</strong> Free site visit and soil check discussion.</li>
                <li><strong className="text-ink">3.</strong> Indicative estimate within a week; fixed BOQ after design freeze.</li>
              </ol>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Suspense fallback={<ContactForm />}>
              <ContactFormWithParams />
            </Suspense>
          </Reveal>
        </div>
      </section>
    </>
  );
}
