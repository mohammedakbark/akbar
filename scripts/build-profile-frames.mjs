// Prepares extra head-follow frames: aligns each source photo to public/profile/center.webp
// (matching the torso, which should not move between poses), crops to the site framing and writes WebP.
//
//   node scripts/build-profile-frames.mjs <source-dir> [--sheet <contact-sheet.png>] [--quality 62]
//
// Source files are only read. Output goes to public/profile/<same name>.webp.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const OUT_DIR = "public/profile";
const REF = path.join(OUT_DIR, "center.webp");
const W = 1100;
const H = 1065;
const BAND_TOP = 740; // collar + shoulders + torso: the part that stays put between poses
// Corner logo in source pixels (1952×2198 sources), with margin.
const LOGO = { x0: 1640, y0: 1898, x1: 1920, y1: 2115 };

const args = process.argv.slice(2);
const srcDir = args[0];
const opt = (name, fallback) => (args.includes(name) ? args[args.indexOf(name) + 1] : fallback);
const sheetPath = opt("--sheet", null);
const quality = Number(opt("--quality", 62));
if (!srcDir) {
  console.error("usage: node scripts/build-profile-frames.mjs <source-dir> [--sheet out.png] [--quality 62]");
  process.exit(1);
}

async function gray(input, width, pad) {
  const { data, info } = await sharp(input)
    .flatten({ background: "#000" })
    .resize({ width })
    .png()
    .toBuffer()
    .then((buf) =>
      sharp(buf)
        .extend({ top: pad, bottom: pad, left: pad, right: pad, extendWith: "copy" })
        .extractChannel(0) // photos are monochrome; one channel keeps the pixel indexing simple
        .raw()
        .toBuffer({ resolveWithObject: true }),
    );
  if (info.channels !== 1) throw new Error(`expected 1 channel, got ${info.channels}`);
  return { data, w: info.width, h: info.height };
}

/** Mean absolute difference between the reference band and the source window at (ox, oy). */
function score(ref, src, ox, oy, bandTop, stride) {
  // 1 − normalised cross-correlation: ignores brightness differences and cannot be "won" by
  // sliding the (mostly black) torso out of the band.
  let n = 0, sa = 0, sb = 0, saa = 0, sbb = 0, sab = 0;
  for (let y = bandTop; y < ref.h; y += stride) {
    const sy = y + oy;
    if (sy < 0 || sy >= src.h) return Infinity;
    for (let x = 0; x < ref.w; x += stride) {
      const sx = x + ox;
      if (sx < 0 || sx >= src.w) return Infinity;
      const a = ref.data[y * ref.w + x];
      const b = src.data[sy * src.w + sx];
      n++; sa += a; sb += b; saa += a * a; sbb += b * b; sab += a * b;
    }
  }
  const cov = sab - (sa * sb) / n;
  const va = saa - (sa * sa) / n;
  const vb = sbb - (sb * sb) / n;
  if (va <= 0 || vb <= 0) return Infinity;
  return 1 - cov / Math.sqrt(va * vb);
}

async function align(file) {
  // Coarse pass at quarter size.
  const q = 4;
  const ref4 = await gray(REF, W / q, 0);
  let best = { err: Infinity };
  for (let s = 0.95; s <= 1.0501; s += 0.01) {
    const w4 = Math.round((W * s) / q);
    const pad = 24;
    const src = await gray(file, w4, pad);
    const bx = pad + Math.round((w4 - ref4.w) / 2);
    for (let dy = -20; dy <= 20; dy++)
      for (let dx = -20; dx <= 20; dx++) {
        const err = score(ref4, src, bx + dx, pad + dy, Math.round(BAND_TOP / q), 1);
        if (err < best.err) best = { err, s, dx: dx * q, dy: dy * q };
      }
  }
  // Fine pass at full size around the coarse result.
  const ref = await gray(REF, W, 0);
  let fine = { err: Infinity };
  for (let s = best.s - 0.0075; s <= best.s + 0.0076; s += 0.0025) {
    const w = Math.round(W * s);
    const pad = 120;
    const src = await gray(file, w, pad);
    const bx = pad + Math.round((w - W) / 2);
    for (let dy = best.dy - 6; dy <= best.dy + 6; dy++)
      for (let dx = best.dx - 6; dx <= best.dx + 6; dx++) {
        const err = score(ref, src, bx + dx, pad + dy, BAND_TOP, 2);
        if (err < fine.err) fine = { err, s, w, dx, dy };
      }
  }
  return fine;
}

async function render(file, a) {
  const pad = 120;
  const meta = await sharp(file).metadata();
  const scaled = await sharp(file).flatten({ background: "#000" }).resize({ width: a.w }).toBuffer();
  const padded = await sharp(scaled)
    .extend({ top: pad, bottom: pad, left: pad, right: pad, extendWith: "copy" })
    .toBuffer();
  const left = pad + Math.round((a.w - W) / 2) + a.dx;
  const top = pad + a.dy;
  let out = await sharp(padded).extract({ left, top, width: W, height: H }).png().toBuffer();

  // Does the corner logo fall inside the crop?
  const f = a.w / meta.width;
  const box = {
    x0: Math.max(0, Math.floor(LOGO.x0 * f + pad - left)),
    y0: Math.max(0, Math.floor(LOGO.y0 * f + pad - top)),
    x1: Math.min(W, Math.ceil(LOGO.x1 * f + pad - left)),
    y1: Math.min(H, Math.ceil(LOGO.y1 * f + pad - top)),
  };
  const bw = box.x1 - box.x0;
  const bh = box.y1 - box.y0;
  let logo = "cropped out";
  if (bw > 0 && bh > 0) {
    // Cover it with the shirt patch just to its left, feathered.
    const patch = await sharp(out).extract({ left: box.x0 - bw, top: box.y0, width: bw, height: bh }).raw().toBuffer({ resolveWithObject: true });
    const feather = 6;
    const rgba = Buffer.alloc(bw * bh * 4);
    const ch = patch.info.channels;
    for (let y = 0; y < bh; y++)
      for (let x = 0; x < bw; x++) {
        const edge = Math.min(x, y, box.x1 === W ? Infinity : bw - 1 - x, box.y1 === H ? Infinity : bh - 1 - y);
        const i = (y * bw + x) * 4;
        rgba[i] = patch.data[(y * bw + x) * ch];
        rgba[i + 1] = patch.data[(y * bw + x) * ch + 1];
        rgba[i + 2] = patch.data[(y * bw + x) * ch + 2];
        rgba[i + 3] = Math.round(255 * Math.min(1, edge / feather));
      }
    const overlay = await sharp(rgba, { raw: { width: bw, height: bh, channels: 4 } }).png().toBuffer();
    out = await sharp(out).composite([{ input: overlay, left: box.x0, top: box.y0 }]).png().toBuffer();
    logo = `covered ${bw}x${bh} at ${box.x0},${box.y0}`;
  }
  return { out, logo };
}

async function mean(input, region) {
  const { data } = await sharp(input).greyscale().extract(region).raw().toBuffer({ resolveWithObject: true });
  let s = 0;
  for (const v of data) s += v;
  return s / data.length;
}

const BG = { left: 0, top: 0, width: 140, height: 300 };
const SHIRT = { left: 250, top: 960, width: 600, height: 100 };
const refTone = { bg: await mean(REF, BG), shirt: await mean(REF, SHIRT) };
console.log(`reference tone: background ${refTone.bg.toFixed(1)}, shirt ${refTone.shirt.toFixed(1)}`);

const files = fs.readdirSync(srcDir).filter((f) => /\.(png|jpe?g|webp)$/i.test(f)).sort();

// The sources share one framing, so use one transform for all of them (the median of the
// per-file results); frames then cannot shift against each other.
const fits = [];
for (const f of files) {
  const fit = await align(path.join(srcDir, f));
  fits.push(fit);
  console.log(`fit ${f.padEnd(32)} scale ${fit.s.toFixed(4)} dx ${fit.dx} dy ${fit.dy} err ${fit.err.toFixed(3)}`);
}
const median = (key) => fits.map((x) => x[key]).sort((p, q) => p - q)[Math.floor(fits.length / 2)];
const a = { s: median("s"), dx: median("dx"), dy: median("dy") };
a.w = Math.round(W * a.s);
a.err = 0;
console.log(`shared transform: scale ${a.s.toFixed(4)} dx ${a.dx} dy ${a.dy}`);

for (const f of files) {
  const file = path.join(srcDir, f);
  let { out, logo } = await render(file, a);
  // Some sources come out with a lifted black level; pull those back to the reference.
  const lift = (await mean(out, BG)) - refTone.bg;
  if (lift > 2) {
    out = await sharp(out).linear(1, -lift).png().toBuffer();
    logo += `, black level −${lift.toFixed(1)}`;
  }
  const name = path.basename(f, path.extname(f)) + ".webp";
  const dest = path.join(OUT_DIR, name);
  await sharp(out).webp({ quality }).toFile(dest);
  const bg = await mean(out, BG);
  const shirt = await mean(out, SHIRT);
  console.log(
    `${name.padEnd(32)} scale ${a.s.toFixed(4)} dx ${String(a.dx).padStart(4)} dy ${String(a.dy).padStart(4)} err ${a.err.toFixed(3)}` +
      ` | bg ${bg.toFixed(1)} shirt ${shirt.toFixed(1)} | ${(fs.statSync(dest).size / 1024).toFixed(0)} KB | logo ${logo}`,
  );
}

if (sheetPath) {
  const cols = ["full-left", "half-left", "", "half-right", "full-right"];
  const rows = ["top", "half-top", "", "half-bottom", "bottom"];
  const nameAt = (r, c) => {
    const row = rows[r];
    const col = cols[c];
    if (!row && !col) return "center";
    if (!row) return col.replace("full-", "");
    if (!col) return row;
    // Corner files use the short "top-left" form; half rows keep "full-" in the name.
    return row.startsWith("half") ? `${row}-${col}` : `${row}-${col.replace("full-", "")}`;
  };
  const tw = 300;
  const th = Math.round((tw * H) / W);
  const tiles = [];
  for (let r = 0; r < 5; r++)
    for (let c = 0; c < 5; c++) {
      const input = await sharp(path.join(OUT_DIR, nameAt(r, c) + ".webp")).resize({ width: tw, height: th }).png().toBuffer();
      tiles.push({ input, left: c * tw, top: r * th });
    }
  await sharp({ create: { width: tw * 5, height: th * 5, channels: 3, background: "#f0f" } }).composite(tiles).png().toFile(sheetPath);
  console.log("contact sheet:", sheetPath);
}
