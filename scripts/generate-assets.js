import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function createPng(width, height, getPixel) {
  const rowSize = 1 + width * 4;
  const raw = Buffer.alloc(rowSize * height);
  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    raw[rowOffset] = 0; // Filter: none
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = getPixel(x, y, width, height);
      const pxOffset = rowOffset + 1 + x * 4;
      raw[pxOffset] = Math.max(0, Math.min(255, Math.round(r)));
      raw[pxOffset + 1] = Math.max(0, Math.min(255, Math.round(g)));
      raw[pxOffset + 2] = Math.max(0, Math.min(255, Math.round(b)));
      raw[pxOffset + 3] = Math.max(0, Math.min(255, Math.round(a)));
    }
  }

  function crc32(buf) {
    let table = [];
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let k = 0; k < 8; k++) c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
      table[i] = c;
    }
    let crc = 0 ^ (-1);
    for (let i = 0; i < buf.length; i++) crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xFF];
    return (crc ^ (-1)) >>> 0;
  }

  function chunk(type, data) {
    const typeBuf = Buffer.from(type, 'ascii');
    const lenBuf = Buffer.alloc(4);
    lenBuf.writeUInt32BE(data.length, 0);
    const crcBuf = Buffer.alloc(4);
    crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
    return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const compressed = zlib.deflateSync(raw, { level: 6 });
  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', compressed),
    chunk('IEND', Buffer.alloc(0))
  ]);
}

const assets = [
  {
    name: 'logo.png',
    width: 256,
    height: 256,
    fn: (x, y, w, h) => {
      // Stylized MD Fox Logo
      const cx = w / 2;
      const cy = h / 2;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      // Fox head silhouette / stylized M shape
      // Base background: transparent or circle
      if (dist < 110) {
        // Fox ears
        const isLeftEar = (x > 40 && x < 110 && y > 30 && y < 120 && (120 - y) > Math.abs(x - 75) * 1.4);
        const isRightEar = (x > 146 && x < 216 && y > 30 && y < 120 && (120 - y) > Math.abs(x - 181) * 1.4);
        const isEarInner = (isLeftEar && y > 50 && (110 - y) > Math.abs(x - 75) * 1.8) ||
                           (isRightEar && y > 50 && (110 - y) > Math.abs(x - 181) * 1.8);
        
        // Face polygon
        const inFace = y >= 80 && y <= 210 && Math.abs(dx) <= (210 - y) * 0.9 + 15 && Math.abs(dx) <= 90;
        
        if (isEarInner) return [255, 244, 233, 255]; // cream inside ear
        if (isLeftEar || isRightEar || inFace) {
          // M cheeks and muzzle
          const inCheekWhite = y > 140 && Math.abs(dx) < 65 && (y - 140) > Math.abs(dx) * 0.7;
          const isNose = y > 185 && y < 200 && Math.abs(dx) < 14;
          const isEyeLeft = y > 125 && y < 140 && Math.abs(x - 90) < 10;
          const isEyeRight = y > 125 && y < 140 && Math.abs(x - 166) < 10;

          if (isNose || isEyeLeft || isEyeRight) return [30, 30, 30, 255]; // charcoal
          if (inCheekWhite) return [255, 244, 233, 255]; // cream
          return [255, 106, 0, 255]; // fox orange
        }
      }
      return [0, 0, 0, 0];
    }
  },
  {
    name: 'mascot-hero.png',
    width: 480,
    height: 560,
    fn: (x, y, w, h) => {
      // 3D Fox Mascot with black hoodie
      const cx = w / 2;
      const dx = x - cx;

      // Ears
      const inLeftEar = (x > 90 && x < 210 && y > 40 && y < 190 && (190 - y) > Math.abs(x - 150) * 1.3);
      const inRightEar = (x > 270 && x < 390 && y > 40 && y < 190 && (190 - y) > Math.abs(x - 330) * 1.3);
      const inLeftEarInner = inLeftEar && (180 - y) > Math.abs(x - 150) * 1.8 && y > 70;
      const inRightEarInner = inRightEar && (180 - y) > Math.abs(x - 330) * 1.8 && y > 70;

      // Head
      const headDist = Math.sqrt(dx * dx + Math.pow(y - 200, 2) * 1.1);
      const inHead = headDist < 125;

      // Hoodie Body (Charcoal)
      const inBody = y >= 270 && y <= 450 && Math.abs(dx) < (95 + (y - 270) * 0.35);
      const inHoodieLogo = inBody && y > 320 && y < 355 && Math.abs(dx) < 30;

      // Arms / Hands
      const inArms = y > 300 && y < 420 && Math.abs(dx) > 85 && Math.abs(dx) < 145;

      // Legs & Shoes
      const inLegs = y > 440 && y < 510 && (Math.abs(dx - 45) < 26 || Math.abs(dx + 45) < 26);
      const inShoes = y >= 500 && y < 540 && (Math.abs(dx - 50) < 36 || Math.abs(dx + 50) < 36);

      // Tail
      const tailX = x - 370;
      const tailY = y - 370;
      const inTail = Math.sqrt(tailX * tailX * 0.6 + tailY * tailY) < 95 && x > 280;
      const inTailTip = inTail && x > 380 && y < 360;

      if (inLeftEarInner || inRightEarInner) return [255, 230, 210, 255];
      if (inLeftEar || inRightEar) return [255, 106, 0, 255];

      if (inHead) {
        // Face features
        const isNose = y > 230 && y < 246 && Math.abs(dx) < 16;
        const isMouth = y >= 248 && y <= 256 && Math.abs(dx) < 26 && (y - 248) > Math.pow(dx / 12, 2);
        const inCheekWhite = y > 205 && Math.abs(dx) < 110 && (y - 205) > (Math.abs(dx) - 30) * 0.6;
        const isEyeLeft = y > 185 && y < 208 && Math.abs(x - 190) < 15;
        const isEyeRight = y > 185 && y < 208 && Math.abs(x - 290) < 15;
        const isEyeHighlight = (Math.abs(x - 186) < 4 && Math.abs(y - 190) < 4) || (Math.abs(x - 286) < 4 && Math.abs(y - 190) < 4);

        if (isEyeHighlight) return [255, 255, 255, 255];
        if (isEyeLeft || isEyeRight || isNose) return [30, 30, 30, 255];
        if (isMouth) return [190, 50, 20, 255];
        if (inCheekWhite) return [255, 244, 233, 255];
        return [255, 106, 0, 255]; // fox orange
      }

      if (inTailTip) return [255, 244, 233, 255];
      if (inTail) return [255, 106, 0, 255];

      if (inHoodieLogo) return [255, 106, 0, 255]; // MD orange text
      if (inBody || inArms) return [30, 30, 30, 255]; // black hoodie
      if (inLegs) return [45, 45, 45, 255];
      if (inShoes) return [255, 106, 0, 255]; // orange sneakers

      return [0, 0, 0, 0];
    }
  },
  {
    name: 'mascot-icon.png',
    width: 256,
    height: 256,
    fn: (x, y, w, h) => {
      const cx = w / 2;
      const dx = x - cx;
      const inLeftEar = (x > 40 && x < 110 && y > 20 && y < 110 && (110 - y) > Math.abs(x - 75) * 1.3);
      const inRightEar = (x > 146 && x < 216 && y > 20 && y < 110 && (110 - y) > Math.abs(x - 181) * 1.3);
      const inLeftEarInner = inLeftEar && y > 45 && (105 - y) > Math.abs(x - 75) * 1.7;
      const inRightEarInner = inRightEar && y > 45 && (105 - y) > Math.abs(x - 181) * 1.7;
      const inHead = Math.sqrt(dx * dx + Math.pow(y - 120, 2) * 1.1) < 76;
      const inHoodie = y > 175 && y < 245 && Math.abs(dx) < (60 + (y - 175) * 0.7);

      if (inLeftEarInner || inRightEarInner) return [255, 235, 220, 255];
      if (inLeftEar || inRightEar) return [255, 106, 0, 255];
      if (inHead) {
        const isNose = y > 140 && y < 152 && Math.abs(dx) < 10;
        const inCheek = y > 125 && Math.abs(dx) < 65 && (y - 125) > (Math.abs(dx) - 15) * 0.6;
        const isEyeLeft = y > 110 && y < 125 && Math.abs(x - 100) < 8;
        const isEyeRight = y > 110 && y < 125 && Math.abs(x - 156) < 8;
        if (isEyeLeft || isEyeRight || isNose) return [30, 30, 30, 255];
        if (inCheek) return [255, 244, 233, 255];
        return [255, 106, 0, 255];
      }
      if (inHoodie) return [30, 30, 30, 255];
      return [0, 0, 0, 0];
    }
  },
  {
    name: 'mascot-working.png',
    width: 320,
    height: 280,
    fn: (x, y, w, h) => {
      const cx = w / 2;
      const dx = x - cx;
      const inLeftEar = (x > 50 && x < 130 && y > 25 && y < 120 && (120 - y) > Math.abs(x - 90) * 1.3);
      const inRightEar = (x > 190 && x < 270 && y > 25 && y < 120 && (120 - y) > Math.abs(x - 230) * 1.3);
      const inHead = Math.sqrt(dx * dx + Math.pow(y - 130, 2)) < 82;
      const inPaws = y > 185 && y < 235 && (Math.abs(dx - 55) < 32 || Math.abs(dx + 55) < 32);

      if (inLeftEar || inRightEar) return [255, 106, 0, 255];
      if (inHead) {
        const isNose = y > 152 && y < 165 && Math.abs(dx) < 11;
        const inCheek = y > 135 && Math.abs(dx) < 70 && (y - 135) > (Math.abs(dx) - 15) * 0.6;
        const isEyeLeft = y > 120 && y < 138 && Math.abs(x - 125) < 9;
        const isEyeRight = y > 120 && y < 138 && Math.abs(x - 195) < 9;
        if (isEyeLeft || isEyeRight || isNose) return [30, 30, 30, 255];
        if (inCheek) return [255, 244, 233, 255];
        return [255, 106, 0, 255];
      }
      if (inPaws) return [255, 106, 0, 255];
      return [0, 0, 0, 0];
    }
  },
  // Portfolio items
  {
    name: 'portfolio-branding-01.jpg',
    width: 480,
    height: 340,
    fn: (x, y, w, h) => {
      // Coffee brand "Brew Brighter" artisan warm aesthetic
      const grad = y / h;
      // Warm craft paper / coffee studio background
      const baseR = 245 - grad * 30;
      const baseG = 230 - grad * 40;
      const baseB = 210 - grad * 50;

      // Coffee cup on right
      const cupDist = Math.sqrt(Math.pow(x - 340, 2) * 0.8 + Math.pow(y - 200, 2));
      if (cupDist < 75 && y > 130 && y < 270) {
        if (y < 145) return [255, 106, 0, 255]; // orange lid
        return [250, 250, 250, 255]; // white cup
      }
      // Coffee beans bag on left
      if (x > 90 && x < 240 && y > 100 && y < 280) {
        return [220, 195, 170, 255]; // craft paper bag
      }
      return [baseR, baseG, baseB, 255];
    }
  },
  {
    name: 'portfolio-branding-02.jpg',
    width: 480,
    height: 340,
    fn: (x, y, w, h) => {
      // Tech Startup "SOLARA" - sleek dark background with sunburst
      const cx = w / 2;
      const cy = h / 2;
      const dist = Math.sqrt(Math.pow(x - cx, 2) + Math.pow(y - cy, 2));
      // Dark slate background
      if (dist < 45) {
        // glowing sunburst center
        return [255, 106, 0, 255];
      }
      if (dist < 75 && ((x + y) % 18 < 6)) {
        // sunburst rays
        return [255, 140, 50, 255];
      }
      return [26, 28, 32, 255];
    }
  },
  {
    name: 'portfolio-web-01.jpg',
    width: 480,
    height: 340,
    fn: (x, y, w, h) => {
      // Lifestyle Web Design "A Healthier Happier You"
      // Studio desk background
      if (x > 70 && x < 410 && y > 50 && y < 280) {
        // Laptop screen
        if (y < 75) return [40, 42, 48, 255]; // laptop top frame
        if (y > 255) return [200, 202, 208, 255]; // keyboard base
        // screen content
        if (y < 115) return [255, 106, 0, 255]; // orange hero banner on website
        return [248, 246, 242, 255]; // clean content body
      }
      return [238, 235, 230, 255];
    }
  },
  {
    name: 'portfolio-graphic-01.jpg',
    width: 480,
    height: 340,
    fn: (x, y, w, h) => {
      // Skincare Brand Social Media Design "Good Skin Brighter Days"
      // Mobile screen mockup
      const cx = w / 2;
      if (Math.abs(x - cx) < 85 && y > 40 && y < 300) {
        // phone
        if (Math.abs(x - cx) > 80 || y < 48 || y > 292) return [30, 30, 30, 255]; // phone bezel
        // screen
        if (y > 60 && y < 160) return [255, 140, 60, 255]; // orange skincare glow
        return [255, 248, 240, 255];
      }
      return [255, 238, 224, 255];
    }
  },
  {
    name: 'portfolio-graphic-02.jpg',
    width: 480,
    height: 340,
    fn: (x, y, w, h) => {
      // Food Brand Packaging "FoxBite"
      // Orange branded food box
      const cx = w / 2;
      const cy = h / 2 + 10;
      if (Math.abs(x - cx) < 100 && Math.abs(y - cy) < 80) {
        // Box front
        return [255, 106, 0, 255];
      }
      if (x > 60 && x < 120 && y > 160 && y < 260) {
        return [230, 180, 130, 255]; // jar/cylinder
      }
      return [245, 235, 225, 255];
    }
  },
  {
    name: 'portfolio-web-02.jpg',
    width: 480,
    height: 340,
    fn: (x, y, w, h) => {
      // Print Design Event Poster "Good Ideas Live Longer"
      // Clean poster mockup angled on table
      if (x > 120 && x < 360 && y > 45 && y < 295) {
        // Poster paper
        if (y > 70 && y < 120 && x > 140 && x < 300) return [30, 30, 30, 255]; // Bold typography header
        if (y > 150 && y < 190 && x > 140 && x < 260) return [255, 106, 0, 255]; // Orange accent block
        return [255, 255, 255, 255];
      }
      return [230, 226, 220, 255];
    }
  }
];

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

for (const asset of assets) {
  console.log(`Generating ${asset.name}...`);
  const buf = createPng(asset.width, asset.height, asset.fn);
  fs.writeFileSync(path.join(publicDir, asset.name), buf);
  
  // Also copy favicon.png from logo.png
  if (asset.name === 'logo.png') {
    fs.writeFileSync(path.join(publicDir, 'favicon.png'), buf);
  }
}

console.log('All image assets successfully generated in /public!');
