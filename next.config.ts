import type { NextConfig } from "next";

const security = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const immutable = [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }];

const config: NextConfig = {
  poweredByHeader: false,
  images: { formats: ["image/webp"], minimumCacheTTL: 31536000 },
  async headers() {
    return [
      { source: "/:path*", headers: security },
      { source: "/img/:path*", headers: immutable },
      { source: "/icons/:path*", headers: immutable },
    ];
  },
};

export default config;
