/**
 * Brand + contact config. Renaming the company is a change here plus the
 * mark in components/layout/Logo.tsx.
 */
export const site = {
  name: "Sahyadri Buildcon",
  shortName: "Sahyadri",
  tagline: "Built on basalt. Delivered on time.",
  description:
    "Sahyadri Buildcon is a Pune construction company delivering residential towers, bungalows, commercial offices and industrial sheds across PMR — on schedule, on budget and RERA compliant.",
  url: "https://sahyadribuildcon.example",
  city: "Pune",
  phone: "+91 20 4000 0000",
  phoneHref: "tel:+912040000000",
  whatsapp: "https://wa.me/912040000000",
  email: "hello@sahyadribuildcon.example",
  address: {
    line1: "4th Floor, Basalt House",
    line2: "Baner–Pashan Link Road, Baner",
    city: "Pune, Maharashtra 411045",
  },
  hours: "Mon–Sat · 9:30 am – 6:30 pm",
  founded: 1999,
  // Placeholder — replace with the real MahaRERA registration.
  rera: "MahaRERA Reg. P52100000000 (placeholder)",
  social: {
    linkedin: "https://www.linkedin.com/",
    instagram: "https://www.instagram.com/",
    youtube: "https://www.youtube.com/",
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; description: string }[];
};

export const nav: NavItem[] = [
  {
    label: "What we build",
    href: "/services",
    children: [
      { label: "Residential", href: "/services/residential-construction", description: "Towers, villas & independent bungalows" },
      { label: "Commercial", href: "/services/commercial-buildings", description: "Offices, retail & mixed-use" },
      { label: "Industrial", href: "/services/industrial-warehousing", description: "PEB sheds & warehousing in Chakan, Talegaon" },
      { label: "Interiors & fit-outs", href: "/services/interiors-fitouts", description: "Turnkey interiors for homes & workplaces" },
      { label: "Renovation & retrofit", href: "/services/renovation-retrofitting", description: "Structural repair & redevelopment" },
      { label: "Project management", href: "/services/project-management", description: "PMC for owners and developers" },
    ],
  },
  { label: "Projects", href: "/projects" },
  { label: "Company", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
];
