import sharp from "sharp";

const W = 1200;
const H = 750;

const gradients = [
  {
    name: "dashboard",
    from: { r: 99, g: 102, b: 241 },
    to: { r: 6, g: 182, b: 212 },
  },
  {
    name: "automation",
    from: { r: 139, g: 92, b: 246 },
    to: { r: 236, g: 72, b: 153 },
  },
];

for (const g of gradients) {
  const img = Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:rgb(${g.from.r},${g.from.g},${g.from.b});stop-opacity:0.15" />
          <stop offset="100%" style="stop-color:rgb(${g.to.r},${g.to.g},${g.to.b});stop-opacity:0.05" />
        </linearGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="#111827"/>
      <rect width="${W}" height="${H}" fill="url(#bg)"/>
      <rect x="${W/2-60}" y="${H/2-60}" width="120" height="120" rx="20" fill="rgba(99,102,241,0.15)"/>
      <rect x="${W/2-40}" y="${H/2-40}" width="80" height="80" rx="16" fill="rgba(99,102,241,0.25)"/>
      <text x="${W/2}" y="${H/2+70}" text-anchor="middle" fill="#94A3B8" font-family="Inter,sans-serif" font-size="18">${g.name === "dashboard" ? "AI-Powered Dashboard" : "Smart Automation"}</text>
    </svg>`
  );

  await sharp(img).resize(W, H).jpeg({ quality: 85 }).toFile(`public/projects/${g.name}.jpg`);
  console.log(`Created public/projects/${g.name}.jpg`);
}
