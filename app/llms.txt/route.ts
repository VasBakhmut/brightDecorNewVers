import { SERVICE_PAGES } from "@/lib/services";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

/** Plain-text site summary served at /llms.txt. */
export function GET() {
  const a = SITE.address;
  const body = `# ${SITE.name}

> Licensed and insured painters in Brisbane, Queensland with over 20 years of experience. Residential, commercial and body corporate painting and property maintenance, backed by a 5-year workmanship guarantee.

## Business details
- Name: ${SITE.name}
- Location: ${a.street}, ${a.suburb} ${a.state} ${a.postcode}, Australia
- Service area: Brisbane, Queensland
- Phone: ${SITE.phone}
- Email: ${SITE.email}
- Hours: ${SITE.hours.map((h) => `${h.day} ${h.time}`).join("; ")}

## Services
${SERVICE_PAGES.map((s) => `- [${s.name} painting](${SITE.url}/services/${s.slug}): ${s.metaDescription}`).join("\n")}

## Pages
- [Home](${SITE.url}/)
- [Contact and free quote](${SITE.url}/contact)
- [Privacy policy](${SITE.url}/privacy-policy)
- [Terms of use](${SITE.url}/terms)
`;
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
