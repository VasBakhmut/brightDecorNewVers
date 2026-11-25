export const SITE = {
  name: "Bright Decor",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.brightdecor.com.au",
  phone: "0420 750 595",
  phoneIntl: "+61420750595",
  email: "max@brightdecor.com.au",
  address: {
    street: "140 The Avenue",
    suburb: "Sunnybank Hills",
    state: "QLD",
    postcode: "4109",
  },
  hours: [
    { day: "Monday – Friday", time: "9:00am – 5:00pm" },
    { day: "Saturday", time: "By appointment" },
    { day: "Sunday", time: "By appointment" },
  ],
} as const;

export const NAV = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/#services",
    children: [
      { label: "Residential", href: "/services/residential-painting" },
      { label: "Commercial", href: "/services/commercial-painting" },
      { label: "Body Corporate", href: "/services/body-corporate-painting" },
    ],
  },
  { label: "Projects", href: "/#projects" },
  { label: "About Us", href: "/#about" },
] as const;

export const CONTACT_HREF = "/contact";

export const INTRO =
  "With over 20 years of experience and a real focus on customer satisfaction, you can rely on us for your next painting project and home repairs. We provide professional painting and property maintenance services for homeowners and business customers.";

export const SERVICES = [
  {
    id: "residential",
    slug: "residential-painting",
    n: "01",
    title: "Residential",
    lead: "Homes painted the way you would do it yourself, if you had the time and the trade.",
    points: [
      "Interior and exterior repaints",
      "Decks, fences, doors and windows",
      "Careful preparation, masking and clean-up",
      "Repairs and general property maintenance",
    ],
    photo: "res-grey",
    alt: "Freshly painted dark grey weatherboard house with white trims and shutters",
  },
  {
    id: "commercial",
    slug: "commercial-painting",
    n: "02",
    title: "Commercial",
    lead: "Offices, apartment buildings and large sites, finished on schedule and with minimal disruption.",
    points: [
      "Exterior repaints with boom lift access",
      "Interior fit-out and refresh work",
      "Detailed scopes and clear timelines",
      "Fully licensed and insured crews",
    ],
    photo: "com-apartments",
    alt: "Multi-storey apartment building being repainted in cream and ochre from a boom lift",
  },
  {
    id: "body-corporate",
    slug: "body-corporate-painting",
    n: "03",
    title: "Body Corporate",
    lead: "Strata and common-property painting that committees and managers can sign off with confidence.",
    points: [
      "Common areas, stairwells and car parks",
      "Protective floor and line-marking coatings",
      "Rust treatment and handrail restoration",
      "Staged works to keep residents moving",
    ],
    photo: "strata-stairs",
    alt: "Stairwell with freshly coated grey concrete stairs in an apartment complex",
  },
] as const;

export const SPECIALIST = [
  {
    n: "i",
    title: "Rust removal & industrial epoxy",
    text: "Steel handrails and balustrades stripped back to sound metal, treated, then sealed under an industrial epoxy system built to survive Queensland weather.",
    photos: [
      ["rust-1", "Corroded green steel handrail before treatment"],
      ["rust-5", "Galvanised handrails prepared for epoxy coating"],
      ["rust-7", "Steel handrails and stairs finished in black industrial epoxy"],
    ],
  },
  {
    n: "ii",
    title: "French Wash & special finishes",
    text: "Soft, layered, cloud-like decorative finishes that give feature walls and ceilings real depth. Applied by hand, never templated.",
    photos: [
      ["wash-1", "Charcoal French Wash feature wall in a living room"],
      ["wash-3", "Gold decorative finish on a bulkhead"],
      ["wash-4", "Gold decorative finish on a ceiling"],
    ],
  },
  {
    n: "iii",
    title: "Timber staining & decks",
    text: "Decks, stairs, pergolas and built-in joinery sanded, stained and sealed so the grain glows and the finish lasts.",
    photos: [
      ["timber-3", "Herringbone-pattern timber deck freshly stained"],
      ["timber-1", "Stained timber stairs beside a glass balustrade"],
      ["timber-2", "Stained timber storage bench on a paved patio"],
    ],
  },
  {
    n: "iv",
    title: "Preparation, washing & spraying",
    text: "The part nobody sees but everybody pays for if it is skipped: pressure washing, masking, sanding and spray finishing for windows and joinery.",
    photos: [
      ["res-wash", "Pressure washing a garage door before painting"],
      ["res-mask", "Masking paper and tape protecting surfaces before spraying"],
      ["res-glass", "Sliding windows masked ready for spray painting"],
    ],
  },
] as const;

export const PROJECTS = [
  { photo: "res-deck", cat: "Residential", title: "Deck & balustrade", alt: "Grey painted timber deck walkway with white balustrade" },
  { photo: "com-hall", cat: "Commercial", title: "Interior repaint", alt: "Large hall with exposed timber trusses taped off for painting" },
  { photo: "res-white", cat: "Residential", title: "Full exterior repaint", alt: "White painted single-storey house with white screens and black trims" },
  { photo: "com-office-a", cat: "Commercial", title: "Office exterior", alt: "Grey painted two-storey commercial building with green-tinted windows" },
  { photo: "strata-floor", cat: "Body corporate", title: "Stairwell floor coating", alt: "Grey floor coating with yellow safety line in a strata stairwell" },
  { photo: "res-doors", cat: "Residential", title: "French doors", alt: "Black painted French doors with louvred shutters" },
  { photo: "com-boom", cat: "Commercial", title: "Work at height", alt: "View from a boom lift beside a repainted apartment building" },
  { photo: "res-fence", cat: "Residential", title: "Fence & screening", alt: "Timber fence with cable screening beside a garden" },
  { photo: "strata-b", cat: "Body corporate", title: "Common areas", alt: "Freshly painted ground-floor common area with fire extinguisher" },
] as const;

export const WHY = [
  { n: "01", title: "Licensed, insured & QBCC certified", text: "Every job is carried out by a licensed, fully insured team. You can see the credentials before we ever pick up a brush." },
  { n: "02", title: "Detailed quotes & clear timelines", text: "A written scope that says exactly what is included, a start date and an end date. If anything unexpected turns up, we talk to you first." },
  { n: "03", title: "5-Year Workmanship Guarantee", text: "We stand behind our finish. If something we have done is not right within five years, we come back and make it right." },
] as const;

export const BRANDS = ["Dulux", "Taubmans", "Wattyl", "Solver", "Haymes", "Resene"] as const;

export const FAQ = [
  {
    q: "What kind of paint does Bright Decor use?",
    a: "Bright Decor exclusively uses high-quality paint products from reputable brands, such as Dulux, Taubmans, Wattyl, Solver, Haymes and Resene. If requested, our painting tradesmen can use eco-friendly and low-VOC paints that are better for the environment and your health. We can advise you on the best type of product for your paint job, based on your preferences, budget and the surface to be painted.",
  },
  {
    q: "Are you insured and experienced?",
    a: "Yes, we are fully insured and have years of hands-on experience in residential and commercial painting. You can feel confident knowing your property is in safe, capable hands.",
  },
  {
    q: "Will there be any hidden costs?",
    a: "No, transparency is a core part of how we operate. Our quotes are detailed and clearly outline the scope of work, so you understand exactly what’s included. If anything unexpected arises, we’ll always discuss it with you first before proceeding. No surprises, no pressure, just honest communication.",
  },
  {
    q: "How can I prepare my house for professional painting services?",
    a: "If you’re using our interior painting services, we recommend moving all your furniture into the centre of the room so our painters can easily drop sheet it all and have access to the walls. Remove all pictures from the walls and all hooks. Take note of any holes you want left in the walls otherwise they will be filled and painted over.",
  },
] as const;

export const RAINBOW = ["#e63027", "#f58a1f", "#f7cf1d", "#3cb44a", "#2f80d1", "#7e3694"] as const;
