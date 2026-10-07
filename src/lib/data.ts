import { img } from "./images";

/* ------------------------------------------------------------------
   Content layer. Typed, static, and colocated so pages can be fully
   statically generated. Swap for a headless CMS (Sanity / Payload)
   by keeping these types as the contract.
   NOTE: All figures, people and projects are illustrative demo content.
------------------------------------------------------------------- */

export type Stat = { value: number; suffix?: string; prefix?: string; decimals?: number; label: string };

export const stats: Stat[] = [
  { value: 140, suffix: "+", label: "Projects handed over across Pune Metropolitan Region" },
  { value: 4.6, suffix: "M", decimals: 1, label: "Square feet constructed since 1999" },
  { value: 97, suffix: "%", label: "Projects delivered on or before the committed date" },
];

/* ----------------------------- Services ----------------------------- */

export type Service = {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  image: string;
  scope: string[];
  highlights: { title: string; body: string }[];
  idealFor: string;
};

export const services: Service[] = [
  {
    slug: "residential-construction",
    title: "Residential construction",
    kicker: "Homes & towers",
    summary:
      "From a single bungalow in Kothrud to a 22-storey tower in Wakad — RCC structures engineered for Pune's black-cotton soil and built to last generations.",
    image: img.whiteResidence,
    scope: ["G+4 to G+24 residential towers", "Independent bungalows & row houses", "Villas & gated plotted developments", "Society redevelopment"],
    highlights: [
      { title: "Soil-first foundations", body: "Every project starts with a geotechnical survey. Expansive soils get under-reamed piles, not guesswork." },
      { title: "Fixed-price contracts", body: "Itemised BOQ with material brands locked in writing before the first excavator arrives." },
      { title: "Weekly photo reports", body: "Owners get a dated progress report every Saturday — no site visit required." },
    ],
    idealFor: "Landowners, families and housing societies",
  },
  {
    slug: "commercial-buildings",
    title: "Commercial buildings",
    kicker: "Offices & retail",
    summary:
      "Grade-A office floors, high-street retail and mixed-use buildings along Baner, Kharadi and the Hinjawadi IT corridor.",
    image: img.glassTower,
    scope: ["IT/ITES office buildings", "Retail & showroom blocks", "Mixed-use developments", "Hospitality & F&B shells"],
    highlights: [
      { title: "Post-tensioned slabs", body: "Longer column-free spans give tenants flexible floor plates and save a floor of height." },
      { title: "Façade engineering", body: "Unitised glazing and ACP systems designed and installed by our in-house team." },
      { title: "IGBC-ready", body: "Green building documentation built into the process, not bolted on at the end." },
    ],
    idealFor: "Developers, investors and corporate occupiers",
  },
  {
    slug: "industrial-warehousing",
    title: "Industrial & warehousing",
    kicker: "Sheds & plants",
    summary:
      "Pre-engineered steel buildings, factory sheds and Grade-A warehousing in Chakan, Talegaon, Ranjangaon and Shirwal MIDC belts.",
    image: img.steelFrame,
    scope: ["Pre-engineered buildings (PEB)", "Manufacturing plants & clean rooms", "Grade-A warehousing", "FM2-grade industrial flooring"],
    highlights: [
      { title: "Fast-track steel", body: "Fabrication starts in parallel with foundations — most sheds close in under 120 days." },
      { title: "Heavy-duty floors", body: "Laser-screeded floors rated for racking loads and VNA forklifts." },
      { title: "MIDC approvals", body: "We coordinate plan sanctions, fire NOC and occupancy for you." },
    ],
    idealFor: "Manufacturers, 3PLs and auto-component suppliers",
  },
  {
    slug: "interiors-fitouts",
    title: "Interiors & fit-outs",
    kicker: "Turnkey interiors",
    summary:
      "Design-and-build interiors for apartments, villas and workplaces, with a single point of accountability from concept to handover.",
    image: img.living,
    scope: ["Residential interiors", "Corporate office fit-outs", "MEP & HVAC integration", "Modular kitchens & wardrobes"],
    highlights: [
      { title: "3D before you commit", body: "Photo-real renders and a materials board signed off before procurement." },
      { title: "In-house carpentry", body: "Our own factory in Bhosari, so quality and timelines stay in our hands." },
      { title: "Snag-free handover", body: "A 120-point checklist walked with you before keys change hands." },
    ],
    idealFor: "Homeowners and companies setting up in Pune",
  },
  {
    slug: "renovation-retrofitting",
    title: "Renovation & retrofit",
    kicker: "Restore & strengthen",
    summary:
      "Structural audits, jacketing, waterproofing and full redevelopment for ageing buildings — so they're safe for the next fifty monsoons.",
    image: img.scaffolding,
    scope: ["Structural audits & NDT testing", "Column & beam jacketing", "Terrace & basement waterproofing", "Façade restoration"],
    highlights: [
      { title: "Occupied-site expertise", body: "Most of our retrofit work happens while families still live in the building." },
      { title: "Monsoon-proofing", body: "Crystalline and membrane systems with written 10-year warranties." },
      { title: "Heritage sensitivity", body: "We've restored wadas in the old city without losing their character." },
    ],
    idealFor: "Housing societies, trusts and heritage owners",
  },
  {
    slug: "project-management",
    title: "Project management",
    kicker: "PMC services",
    summary:
      "Independent project management for owners who want an expert on their side of the table — cost control, quality audits and schedule assurance.",
    image: img.siteTeam,
    scope: ["Tendering & contractor selection", "Cost planning & value engineering", "Quality & safety audits", "Schedule & cash-flow control"],
    highlights: [
      { title: "Owner's advocate", body: "We sign no contractor agreements of our own on PMC jobs — no conflicts." },
      { title: "Live dashboards", body: "Budget, schedule and RFI status in a shared dashboard, updated daily." },
      { title: "Value engineering", body: "Clients typically save 6–9% of construction cost without changing the design intent." },
    ],
    idealFor: "Institutions, landowners and first-time developers",
  },
];

/* ---------------------------- Audiences ----------------------------- */

export type Audience = {
  id: string;
  label: string;
  title: string;
  image: string;
  features: { title: string; body: string }[];
  href: string;
};

export const audiences: Audience[] = [
  {
    id: "homeowners",
    label: "Homeowners",
    title: "Your bungalow, built like a landmark",
    image: img.whiteResidence,
    href: "/services/residential-construction",
    features: [
      { title: "Design to keys", body: "Architecture, approvals, construction and interiors with one contract and one accountable team." },
      { title: "Transparent pricing", body: "A line-by-line BOQ with brands specified — so the price you sign is the price you pay." },
      { title: "Progress in your pocket", body: "Weekly photo reports and milestone-linked payments, so you always know where your money is." },
      { title: "10-year structural warranty", body: "Our name on the foundation, in writing, for a decade after handover." },
    ],
  },
  {
    id: "developers",
    label: "Developers",
    title: "A build partner that protects your launch dates",
    image: img.twinTowers,
    href: "/services/commercial-buildings",
    features: [
      { title: "RERA-aligned scheduling", body: "Construction timelines engineered backwards from your registered possession date." },
      { title: "Cycle-time discipline", body: "Aluminium formwork and 7-day slab cycles on towers above G+12." },
      { title: "Cost certainty", body: "Escalation clauses capped and indexed — no surprise variations mid-project." },
      { title: "Sales-ready sample flats", body: "Show flats delivered in 60 days to support your launch campaign." },
    ],
  },
  {
    id: "industrial",
    label: "Industrial & corporate",
    title: "Plants and offices that open on day one",
    image: img.steelFrame,
    href: "/services/industrial-warehousing",
    features: [
      { title: "Fast-track PEB", body: "Steel fabricated off-site while foundations cure — most sheds close in under four months." },
      { title: "Statutory approvals", body: "MIDC plans, fire NOC and factory licence coordinated end-to-end." },
      { title: "Zero-harm sites", body: "ISO 45001 safety systems and a 1.2M safe-man-hour record." },
      { title: "Plug-and-play MEP", body: "Electrical, HVAC and utilities commissioned before you move a single machine in." },
    ],
  },
];

/* ----------------------------- Process ------------------------------ */

export const processSteps = [
  { n: "01", title: "Site & soil", body: "Topographic and geotechnical survey, feasibility and FSI study before a single drawing is made." },
  { n: "02", title: "Design & approvals", body: "Architecture, structure and MEP coordinated in BIM; PMC/PCMC sanction handled by our liaison team." },
  { n: "03", title: "Fixed-price BOQ", body: "An itemised bill of quantities with locked brands, milestones and payment schedule." },
  { n: "04", title: "Build", body: "Daily site logs, weekly owner reports and third-party quality audits at every slab." },
  { n: "05", title: "Handover & care", body: "120-point snag walk, as-built drawings, and a 10-year structural warranty." },
];

/* ----------------------------- Projects ----------------------------- */

export type ProjectCategory = "Residential" | "Commercial" | "Industrial" | "Interiors";

export type Project = {
  slug: string;
  title: string;
  location: string;
  category: ProjectCategory;
  year: number;
  status: "Completed" | "Ongoing";
  area: string;
  client: string;
  cover: string;
  gallery: string[];
  summary: string;
  challenge: string;
  solution: string;
  metrics: { label: string; value: string }[];
};

export const projects: Project[] = [
  {
    slug: "deccan-heights-wakad",
    title: "Deccan Heights",
    location: "Wakad, Pune",
    category: "Residential",
    year: 2025,
    status: "Completed",
    area: "3,20,000 sq ft",
    client: "Private developer",
    cover: img.highrise,
    gallery: [img.balconies, img.glassBalconies, img.bedroom],
    summary: "Twin G+22 residential towers with 264 apartments, podium amenities and a rooftop garden.",
    challenge: "A RERA possession date 30 months out, a tight urban plot and expansive black-cotton soil.",
    solution: "Under-reamed piles, aluminium formwork for a 7-day slab cycle, and podium works run in parallel with the superstructure.",
    metrics: [{ label: "Slab cycle", value: "7 days" }, { label: "Handed over", value: "2 mo early" }, { label: "Apartments", value: "264" }],
  },
  {
    slug: "baner-business-bay",
    title: "Baner Business Bay",
    location: "Baner, Pune",
    category: "Commercial",
    year: 2024,
    status: "Completed",
    area: "1,85,000 sq ft",
    client: "Institutional investor",
    cover: img.glassTower,
    gallery: [img.monoFacade, img.towerLowAngle, img.studio],
    summary: "A Grade-A office building with post-tensioned floor plates and a unitised glass façade.",
    challenge: "Tenants wanted 14 m column-free spans; the investor wanted an IGBC Gold rating.",
    solution: "PT slabs saved a full floor of height, while a high-performance glazing package cut cooling load by 22%.",
    metrics: [{ label: "Column-free span", value: "14 m" }, { label: "Rating", value: "IGBC Gold" }, { label: "Cooling load", value: "−22%" }],
  },
  {
    slug: "chakan-logistics-park",
    title: "Chakan Logistics Park",
    location: "Chakan MIDC",
    category: "Industrial",
    year: 2025,
    status: "Completed",
    area: "4,10,000 sq ft",
    client: "3PL operator",
    cover: img.steelFrame,
    gallery: [img.steelYard, img.excavator, img.rebar],
    summary: "Three Grade-A PEB warehouses with FM2 flooring, 12 m clear heights and 48 dock levellers.",
    challenge: "The operator's lease started in 150 days — from bare land.",
    solution: "Steel fabrication ran in our partner yard while piling progressed; laser-screed floors poured in 2,000 m² bays.",
    metrics: [{ label: "Bare land to keys", value: "142 days" }, { label: "Clear height", value: "12 m" }, { label: "Docks", value: "48" }],
  },
  {
    slug: "kothrud-courtyard-house",
    title: "The Courtyard House",
    location: "Kothrud, Pune",
    category: "Residential",
    year: 2024,
    status: "Completed",
    area: "6,800 sq ft",
    client: "Private family",
    cover: img.warmFacade,
    gallery: [img.living, img.interiorWood, img.bedroom],
    summary: "A three-generation family home arranged around a central courtyard, with exposed concrete and teak.",
    challenge: "Keep the home cool through Pune summers without leaning on air-conditioning.",
    solution: "A ventilated courtyard, deep overhangs and a cavity-wall envelope keep interiors 4–5°C below ambient.",
    metrics: [{ label: "Passive cooling", value: "−5°C" }, { label: "Build time", value: "14 mo" }, { label: "Generations", value: "3" }],
  },
  {
    slug: "kharadi-tech-campus",
    title: "Kharadi Tech Campus — Phase II",
    location: "Kharadi, Pune",
    category: "Commercial",
    year: 2026,
    status: "Ongoing",
    area: "2,60,000 sq ft",
    client: "Technology company",
    cover: img.craneSkyline,
    gallery: [img.crane, img.scaffolding, img.concreteWork],
    summary: "A second office tower and connected amenity block for a growing tech campus.",
    challenge: "Construct alongside a fully operational campus with 3,000 people on site daily.",
    solution: "Segregated logistics routes, night-time concrete pours and acoustic hoarding along occupied edges.",
    metrics: [{ label: "Progress", value: "68%" }, { label: "Safe man-hours", value: "4.1 L" }, { label: "Occupants nearby", value: "3,000" }],
  },
  {
    slug: "hinjawadi-office-fitout",
    title: "Hinjawadi Workplace Fit-out",
    location: "Hinjawadi Phase 1",
    category: "Interiors",
    year: 2025,
    status: "Completed",
    area: "62,000 sq ft",
    client: "Global engineering firm",
    cover: img.studio,
    gallery: [img.interiorWood, img.living, img.carpentry],
    summary: "A 600-seat workplace with collaboration zones, labs and a staff café — delivered in 11 weeks.",
    challenge: "Global HQ design standards, Indian supply chains and an immovable go-live date.",
    solution: "Pre-fabricated joinery from our Bhosari workshop and a 24×6 shift pattern for the last four weeks.",
    metrics: [{ label: "Seats", value: "600" }, { label: "Delivered in", value: "11 wks" }, { label: "Snags at handover", value: "0" }],
  },
  {
    slug: "talegaon-auto-plant",
    title: "Auto-Component Plant",
    location: "Talegaon MIDC",
    category: "Industrial",
    year: 2023,
    status: "Completed",
    area: "1,40,000 sq ft",
    client: "Auto-component manufacturer",
    cover: img.steelYard,
    gallery: [img.steelFrame, img.excavator, img.rebar],
    summary: "A manufacturing plant with a 25-tonne EOT crane bay, admin block and effluent treatment plant.",
    challenge: "Heavy press foundations isolated from the rest of the shop floor to stop vibration travelling.",
    solution: "Isolated raft foundations with vibration dampers, and structure designed around crane gantry loads.",
    metrics: [{ label: "EOT crane", value: "25 T" }, { label: "Build time", value: "9 mo" }, { label: "LTIs", value: "0" }],
  },
  {
    slug: "sadashiv-peth-wada-restoration",
    title: "Wada Restoration",
    location: "Sadashiv Peth, Pune",
    category: "Residential",
    year: 2023,
    status: "Completed",
    area: "9,200 sq ft",
    client: "Family trust",
    cover: img.concreteFacade,
    gallery: [img.carpentry, img.ladder, img.interiorWood],
    summary: "Structural restoration of a 120-year-old wada, retaining its timber frame and courtyard.",
    challenge: "Decayed timber columns and a sagging upper floor, in a building the family still lived in.",
    solution: "Phased jacking and timber splicing, with new hidden steel in the floors — invisible from below.",
    metrics: [{ label: "Building age", value: "120 yrs" }, { label: "Original timber kept", value: "80%" }, { label: "Occupied", value: "Throughout" }],
  },
];

export const projectCategories: ("All" | ProjectCategory)[] = ["All", "Residential", "Commercial", "Industrial", "Interiors"];

/* --------------------------- Testimonials --------------------------- */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  project: string;
  image: string;
  metrics: { label: string; value: string }[];
};

export const testimonials: Testimonial[] = [
  {
    quote: "They gave us a fixed number, and they kept it. Two years, two towers, and not one conversation about cost overruns.",
    name: "Ananya Kulkarni",
    role: "Director, residential developer",
    project: "Deccan Heights, Wakad",
    image: img.highrise,
    metrics: [{ label: "Handed over", value: "2 mo early" }, { label: "Variations", value: "0" }],
  },
  {
    quote: "Bare land to a running warehouse in under five months. Our lease started on time because Sahyadri did.",
    name: "Rohan Mehta",
    role: "Head of Real Estate, 3PL operator",
    project: "Chakan Logistics Park",
    image: img.steelFrame,
    metrics: [{ label: "Bare land to keys", value: "142 days" }, { label: "Docks", value: "48" }],
  },
  {
    quote: "Every Saturday a report arrived with photos of our home going up. We built a house from Singapore without a single surprise.",
    name: "Sneha & Vikram Joshi",
    role: "Homeowners",
    project: "The Courtyard House, Kothrud",
    image: img.warmFacade,
    metrics: [{ label: "Build time", value: "14 mo" }, { label: "Site visits needed", value: "3" }],
  },
];

/* ----------------------------- Insights ----------------------------- */

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  cover: string;
  body: { heading?: string; text: string }[];
};

export const posts: Post[] = [
  {
    slug: "building-on-black-cotton-soil",
    title: "Building on Pune's black-cotton soil: what owners should know",
    excerpt: "Expansive soils swell in the monsoon and shrink in summer. Here's how foundations are designed to cope.",
    category: "Engineering",
    date: "2026-09-18",
    readTime: "6 min",
    cover: img.excavator,
    body: [
      { text: "Large parts of Pune sit on expansive black-cotton soil. It swells when wet and shrinks when dry, and that seasonal movement is the single biggest cause of cracked walls in otherwise sound homes." },
      { heading: "Start with a soil report", text: "A geotechnical investigation tells your structural engineer the depth of the active zone and the safe bearing capacity. Skipping it to save a few thousand rupees is the most expensive decision an owner can make." },
      { heading: "Choose the right foundation", text: "Under-reamed piles anchor the building below the active zone. For lighter structures, a cushion of non-expansive material under the footings can work. The choice depends on the report — not habit." },
      { heading: "Mind the plinth", text: "Plinth protection, proper drainage and a moisture barrier stop water pooling around the foundation — reducing the swell that causes damage in the first place." },
    ],
  },
  {
    slug: "maharera-timelines-explained",
    title: "MahaRERA timelines, explained for first-time developers",
    excerpt: "Your registered possession date is a legal promise. Construction planning should start from it, not end at it.",
    category: "Regulation",
    date: "2026-08-27",
    readTime: "5 min",
    cover: img.twinTowers,
    body: [
      { text: "Once a project is registered with MahaRERA, the possession date you declare becomes a commitment to every buyer. Delays carry interest liabilities and reputational cost." },
      { heading: "Plan backwards", text: "We build schedules backwards from the possession date, with float reserved for the two monsoons most projects will see." },
      { heading: "Quarterly updates", text: "Progress disclosures are due regularly. Daily site logs make these filings straightforward rather than a quarterly scramble." },
    ],
  },
  {
    slug: "peb-vs-conventional-sheds",
    title: "PEB vs conventional steel: choosing the right industrial shed",
    excerpt: "Pre-engineered buildings win on speed and steel tonnage — but not on every project.",
    category: "Industrial",
    date: "2026-07-30",
    readTime: "7 min",
    cover: img.steelYard,
    body: [
      { text: "Pre-engineered buildings use tapered sections designed for the exact loads on each member. The result is typically less steel and much faster erection." },
      { heading: "When PEB wins", text: "Large clear spans, standard bay sizes and tight timelines — most warehouses and assembly plants." },
      { heading: "When conventional wins", text: "Heavy crane loads, irregular geometry or frequent future modifications can favour conventional hot-rolled frames." },
    ],
  },
  {
    slug: "monsoon-waterproofing-checklist",
    title: "A pre-monsoon waterproofing checklist for housing societies",
    excerpt: "Twelve things to inspect between March and May so June doesn't arrive through your ceiling.",
    category: "Maintenance",
    date: "2026-04-12",
    readTime: "4 min",
    cover: img.scaffolding,
    body: [
      { text: "Most leakage complaints in Pune trace back to a handful of failure points: terraces, external walls, plumbing shafts and window sills." },
      { heading: "Terraces first", text: "Check for cracks, ponding and failed joints around parapets and pipe penetrations." },
      { heading: "Don't forget shafts", text: "Duct and plumbing shafts are hidden water highways. Inspect them before you repaint anything." },
    ],
  },
];

/* ------------------------------ Careers ----------------------------- */

export type Job = { id: string; title: string; team: string; location: string; type: string; summary: string; requirements: string[] };

export const jobs: Job[] = [
  { id: "site-engineer", title: "Site Engineer — Civil", team: "Construction", location: "Wakad, Pune", type: "Full-time", summary: "Run day-to-day execution on a G+22 residential tower, coordinating subcontractors and quality checks.", requirements: ["B.E./B.Tech Civil", "2–5 years on high-rise sites", "Working knowledge of IS codes & BBS"] },
  { id: "planning-engineer", title: "Planning Engineer", team: "Projects", location: "Baner HQ", type: "Full-time", summary: "Own schedules in Primavera P6 and turn site data into weekly owner reports.", requirements: ["Primavera P6 or MS Project", "3+ years in construction planning", "Strong Excel / Power BI"] },
  { id: "qs", title: "Quantity Surveyor", team: "Commercial", location: "Baner HQ", type: "Full-time", summary: "Prepare BOQs, certify RA bills and track cost against budget across multiple projects.", requirements: ["Civil degree or diploma", "4+ years QS experience", "Rate analysis per DSR"] },
  { id: "safety-officer", title: "HSE Officer", team: "Safety", location: "Chakan MIDC", type: "Full-time", summary: "Lead our zero-harm programme on an industrial site with 300+ workers.", requirements: ["ADIS / PDIS certification", "Experience with ISO 45001", "Fluent in Marathi & Hindi"] },
  { id: "interior-designer", title: "Interior Designer", team: "Interiors", location: "Baner HQ", type: "Full-time", summary: "Take residential and workplace interiors from concept to detailed drawings.", requirements: ["B.Des / Diploma in Interior Design", "AutoCAD, SketchUp, V-Ray", "A portfolio of built work"] },
];

/* -------------------------------- FAQ ------------------------------- */

export const faqs = [
  { q: "Which areas of Pune do you work in?", a: "We build across the Pune Metropolitan Region — PMC and PCMC limits, Hinjawadi, Wakad, Baner, Kharadi, Hadapsar, plus the Chakan, Talegaon, Ranjangaon and Shirwal industrial belts." },
  { q: "Do you offer fixed-price contracts?", a: "Yes. After design freeze we issue an itemised BOQ with brands specified. The contract value is fixed except for changes you request in writing." },
  { q: "Can you handle plan sanction and approvals?", a: "Our liaison team manages PMC/PCMC building permissions, MIDC approvals, fire NOC, and occupancy and completion certificates." },
  { q: "What's the minimum project size you take on?", a: "For new construction, independent bungalows from about 2,500 sq ft. For interiors and retrofits, we're happy to discuss smaller scopes." },
  { q: "How do payments work?", a: "Payments are linked to verifiable milestones — plinth, each slab, brickwork, finishes — never to the calendar." },
  { q: "Do you give a warranty?", a: "A 10-year structural warranty and a 12-month defect liability period on finishes, MEP and waterproofing." },
  { q: "How will I know what's happening on site?", a: "Every client gets a weekly photo report and access to a project dashboard with schedule, payments and open issues." },
  { q: "Are your projects RERA compliant?", a: "For developer clients we plan around registered possession dates and provide documentation for quarterly MahaRERA updates." },
];

/* ------------------------------ About ------------------------------- */

export const values = [
  { title: "Say it, then do it", body: "We commit to dates and numbers in writing — and we're measured by whether we hit them." },
  { title: "Engineer before you build", body: "Soil, structure and services are resolved on paper, where changes are cheap." },
  { title: "Everyone goes home", body: "Safety isn't a poster. It's who's allowed on site and what they're wearing." },
  { title: "Leave the city better", body: "Rainwater harvesting, solar-ready roofs and on-site waste segregation as default." },
];

export const milestones = [
  { year: "1999", text: "Founded in a two-room office in Shivajinagar, building bungalows in Kothrud and Aundh." },
  { year: "2006", text: "First G+12 residential tower handed over in Baner." },
  { year: "2012", text: "Industrial division launched with our first PEB plant in Chakan MIDC." },
  { year: "2018", text: "Interiors studio and Bhosari joinery workshop open." },
  { year: "2022", text: "ISO 9001 & ISO 45001 certified; 1M safe man-hours reached." },
  { year: "2026", text: "140+ projects and 4.6M sq ft delivered across the region." },
];

export const leadership = [
  { name: "Madhav Deshpande", role: "Founder & Chairman", initials: "MD" },
  { name: "Priya Gokhale", role: "Managing Director", initials: "PG" },
  { name: "Arjun Patil", role: "Director — Projects", initials: "AP" },
  { name: "Farah Shaikh", role: "Head of Design & Interiors", initials: "FS" },
];

export const clientTypes = [
  "Residential developers", "Housing societies", "Auto-component OEMs", "IT parks", "3PL operators", "Hospitals", "Schools & trusts", "Hospitality", "Family homeowners", "Pharma manufacturers",
];
