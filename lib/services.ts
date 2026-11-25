import type { PhotoKey } from "./photos.generated";

export type ServicePage = {
  slug: string;
  name: string; // "Residential"
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  hero: PhotoKey;
  heroAlt: string;
  scope: { title: string; text: string }[];
  process: { title: string; text: string }[];
  gallery: { k: PhotoKey; alt: string }[];
  faq: { q: string; a: string }[];
};

const PROCESS = (last: string) => [
  { title: "Free quote", text: "We look at the job, listen to what you need and send a detailed written quote with a clear scope and timeline." },
  { title: "Preparation", text: "Washing, repairs, sanding and masking. This is where a lasting finish is won, so it is never rushed." },
  { title: "Painting", text: "Quality paint from reputable brands, applied by experienced tradesmen. Low-VOC options are available on request." },
  { title: "Finish & hand-over", text: last },
];

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: "residential-painting",
    name: "Residential",
    metaTitle: "Residential Painters Brisbane | Interior & Exterior House Painting",
    metaDescription:
      "Licensed, insured residential painters in Brisbane. Interior and exterior house painting, decks, fences, doors and repairs, backed by a 5-year workmanship guarantee. Free quote.",
    h1: "Residential painters in Brisbane",
    intro:
      "Homes painted the way you would do it yourself, if you had the time and the trade. Bright Decor brings over 20 years of hands-on experience to family homes across Brisbane, from a single feature wall to a full exterior repaint.",
    hero: "res-grey",
    heroAlt: "Freshly painted dark grey weatherboard house with white trims and shutters",
    scope: [
      { title: "Interior painting", text: "Walls, ceilings, trims and doors, with furniture protected and surfaces properly prepared before the first coat." },
      { title: "Exterior repaints", text: "Weatherboard, render and brick exteriors washed, repaired and finished in paint built for Queensland weather." },
      { title: "Decks, fences & timber", text: "Sanding, staining and sealing so the grain glows and the finish lasts." },
      { title: "Doors, windows & joinery", text: "Careful masking and spray finishing for a smooth, factory-like result on doors, windows and shutters." },
      { title: "Special finishes", text: "French Wash and other decorative finishes applied by hand to give feature walls and ceilings real depth." },
      { title: "Repairs & maintenance", text: "Patching, filling and general property maintenance so the new paint goes on a sound surface." },
    ],
    process: PROCESS("A final walk-through with you, full clean-up, and your 5-year workmanship guarantee."),
    gallery: [
      { k: "res-white", alt: "White painted single-storey house with white screens and black trims" },
      { k: "res-deck", alt: "Grey painted timber deck walkway with white balustrade" },
      { k: "res-doors", alt: "Black painted French doors with louvred shutters" },
      { k: "res-fence", alt: "Timber fence with cable screening beside a garden" },
    ],
    faq: [
      {
        q: "How long does it take to paint a house in Brisbane?",
        a: "It depends on size, condition and the weather. A typical interior repaint takes a few days, while a full exterior can take one to two weeks. Your written quote includes a start date and an estimated finish date.",
      },
      {
        q: "Do I need to move out while you paint?",
        a: "No. We work room by room and protect your furniture and floors. For the best result, move furniture to the centre of the room, remove pictures and hooks, and tell us about any holes you want to keep.",
      },
      {
        q: "Can you paint just one room or a feature wall?",
        a: "Yes. We take on small jobs as well as whole-house repaints, with the same preparation and the same guarantee.",
      },
    ],
  },
  {
    slug: "commercial-painting",
    name: "Commercial",
    metaTitle: "Commercial Painters Brisbane | Office, Retail & Building Painting",
    metaDescription:
      "Commercial painters in Brisbane for offices, apartment buildings and large sites. Boom lift exterior repaints, interior fit-out refreshes, clear timelines. Licensed and insured. Free quote.",
    h1: "Commercial painters in Brisbane",
    intro:
      "Offices, apartment buildings and large sites, finished on schedule and with minimal disruption. Our licensed and insured crews handle detailed scopes, work at height and tight timelines for Brisbane businesses and property managers.",
    hero: "com-apartments",
    heroAlt: "Multi-storey apartment building being repainted in cream and ochre from a boom lift",
    scope: [
      { title: "Exterior repaints", text: "Multi-storey buildings repainted with boom lift access, including preparation, repairs and protective coatings." },
      { title: "Office interiors", text: "Interior refreshes and fit-out painting planned around your team so the business keeps running." },
      { title: "Large halls & open spaces", text: "Exposed trusses, high walls and big ceilings painted safely and evenly." },
      { title: "Work at height", text: "Boom lift and access equipment operated by experienced crews, with safety taken seriously." },
      { title: "Detailed scopes", text: "A written scope that says exactly what is included, so there are no surprises on the invoice." },
      { title: "Ongoing maintenance", text: "Touch-ups and planned repaints to keep your property looking professional year after year." },
    ],
    process: PROCESS("An inspection with you or your property manager, full clean-up, and a 5-year workmanship guarantee."),
    gallery: [
      { k: "com-office-a", alt: "Grey painted two-storey commercial building with green-tinted windows" },
      { k: "com-hall", alt: "Large hall with exposed timber trusses taped off for painting" },
      { k: "com-boom", alt: "View from a boom lift beside a repainted apartment building" },
      { k: "com-apartments", alt: "Apartment building repainted in cream and ochre" },
    ],
    faq: [
      {
        q: "Can you work around our business hours?",
        a: "Yes. We agree the schedule with you before work starts and plan the job to keep disruption to a minimum.",
      },
      {
        q: "Are you licensed and insured for commercial work?",
        a: "Yes. Bright Decor is fully insured and QBCC certified, and we are happy to provide our credentials with your quote.",
      },
      {
        q: "Do you provide a fixed, detailed quote?",
        a: "Yes. Every quote has a clear scope and timeline. If anything unexpected turns up, we talk to you before proceeding.",
      },
    ],
  },
  {
    slug: "body-corporate-painting",
    name: "Body Corporate",
    metaTitle: "Body Corporate & Strata Painters Brisbane | Common Area Painting",
    metaDescription:
      "Body corporate and strata painters in Brisbane. Common areas, stairwells, car parks, protective floor coatings and rust treatment, with committee-friendly quotes. Licensed and insured.",
    h1: "Body corporate & strata painters in Brisbane",
    intro:
      "Strata and common-property painting that committees and managers can sign off with confidence. We provide clear written scopes, staged works that keep residents moving and a finish backed by a 5-year workmanship guarantee.",
    hero: "strata-stairs",
    heroAlt: "Stairwell with freshly coated grey concrete stairs in an apartment complex",
    scope: [
      { title: "Common areas & stairwells", text: "Hallways, stairwells, lobbies and car parks repainted and refreshed." },
      { title: "Protective floor coatings", text: "Durable floor coatings with line-marking and safety lines for stairwells and car parks." },
      { title: "Rust treatment & handrails", text: "Steel handrails and balustrades stripped to sound metal, treated and sealed under an industrial epoxy system." },
      { title: "Complex exteriors", text: "Full exterior repaints of apartment buildings, completed with boom lift access." },
      { title: "Staged works", text: "Work planned in stages so residents can keep using the building safely." },
      { title: "Committee-ready quotes", text: "Detailed written quotes and clear timelines that are easy to present to a committee or body corporate manager." },
    ],
    process: PROCESS("A walk-through with your manager, full clean-up, and a 5-year workmanship guarantee."),
    gallery: [
      { k: "strata-floor", alt: "Grey floor coating with yellow safety line in a strata stairwell" },
      { k: "strata-b", alt: "Freshly painted ground-floor common area with fire extinguisher" },
      { k: "rust-7", alt: "Steel handrails and stairs finished in black industrial epoxy" },
      { k: "rust-1", alt: "Corroded green steel handrail before treatment" },
    ],
    faq: [
      {
        q: "Can you work with our strata manager and committee?",
        a: "Yes. We provide detailed written quotes and scopes that are easy to review, and we keep the manager informed throughout the job.",
      },
      {
        q: "How do you keep residents safe during the works?",
        a: "Works are staged and clearly marked so access is maintained, and surfaces are protected throughout.",
      },
      {
        q: "Can you remove rust and refinish handrails?",
        a: "Yes. Rust is stripped back to sound metal, treated, then sealed under an industrial epoxy system designed for Queensland conditions.",
      },
    ],
  },
];

export const bySlug = (slug: string) => SERVICE_PAGES.find((s) => s.slug === slug);
