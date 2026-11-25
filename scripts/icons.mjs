import sharp from "sharp";
import { writeFileSync, rmSync } from "node:fs";

const mark = "public/img/mark.png";
async function square(size, pad = 0.1) {
  const inner = Math.round(size * (1 - pad * 2));
  const m = await sharp(mark).resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: "#ffffff" } })
    .composite([{ input: m, gravity: "center" }])
    .png()
    .toBuffer();
}

const out = { "icon-48.png": 48, "icon-96.png": 96, "icon-192.png": 192, "icon-512.png": 512, "apple-touch-icon.png": 180, "logo-512.png": 512 };
for (const [name, size] of Object.entries(out)) {
  const buf = await square(size, name === "apple-touch-icon.png" ? 0.12 : 0.08);
  writeFileSync(`public/icons/${name}`, buf);
}

// favicon.ico with 16/32/48 PNG entries
const sizes = [16, 32, 48];
const imgs = await Promise.all(sizes.map((s) => square(s, 0.04)));
const head = Buffer.alloc(6);
head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const dir = Buffer.concat(imgs.map((b, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(sizes[i], 0); e.writeUInt8(sizes[i], 1); e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6);
  e.writeUInt32LE(b.length, 8); e.writeUInt32LE(offset, 12);
  offset += b.length;
  return e;
}));
writeFileSync("public/favicon.ico", Buffer.concat([head, dir, ...imgs]));
rmSync("app/icon.png", { force: true });
console.log("done");
