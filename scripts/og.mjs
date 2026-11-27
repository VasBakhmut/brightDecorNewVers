import sharp from "sharp";

const W = 1200, H = 630;
const photo = await sharp("public/img/res-house.webp").resize(W, H, { fit: "cover", position: "centre" }).toBuffer();
const mark = await sharp("public/img/mark.png").resize({ height: 120 }).toBuffer();

const overlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0.35" stop-color="#0c2b45" stop-opacity="0"/><stop offset="1" stop-color="#0c2b45" stop-opacity="0.92"/>
  </linearGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <text x="200" y="500" font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="76" fill="#ffffff">Bright Decor</text>
  <text x="202" y="548" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="22" letter-spacing="4" fill="#7fd3e4">PAINTING &amp; PROPERTY MAINTENANCE  ·  BRISBANE</text>
</svg>`);

const badge = await sharp({ create: { width: 150, height: 150, channels: 4, background: "#ffffff" } })
  .composite([{ input: await sharp(mark).resize(112, 112, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } }).toBuffer(), gravity: "center" }])
  .png().toBuffer();

await sharp(photo)
  .composite([{ input: overlay }, { input: badge, left: 40, top: 440 }])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile("public/og.jpg");
console.log("og done");
