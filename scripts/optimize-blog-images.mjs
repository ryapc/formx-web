#!/usr/bin/env node
/**
 * One-shot script: compress oversized blog images and emit .webp siblings.
 * Run once: node scripts/optimize-blog-images.mjs
 */
import sharp from 'sharp';
import { readFileSync, writeFileSync, statSync, readdirSync } from 'fs';
import { join, extname, basename } from 'path';

// Use exact names for most files; discover Screenshot files via readdirSync
// because macOS exports them with a narrow no-break space (U+202F) before "PM"
const BLOG_DIR = 'public/images/blog';
const allFiles = readdirSync(BLOG_DIR);

const SCREENSHOT_PREFIXES = [
  'Screenshot-2026-04-15-at-1.53.46',
  'Screenshot-2026-04-13-at-10.05.23',
  'Screenshot-2026-04-15-at-12.54.19',
];
const screenshotFiles = SCREENSHOT_PREFIXES
  .map(prefix => allFiles.find(f => f.startsWith(prefix)))
  .filter(Boolean)
  .map(f => join(BLOG_DIR, f));

const IMAGES = [
  // already compressed in first run — skip to avoid re-compressing compressed files
  // 'public/images/blog/consolidated-blogpost-11.png',
  // 'public/images/blog/66bcb97f0f20e07238d50b4a_OCR-Insurance_2.jpeg',
  // 'public/images/blog/consolidated-blog-7.png',
  // 'public/images/blog/consolidated-blogpost-9.png',
  // 'public/images/blog/consolidated-blogpost-8.png',
  'public/images/blog/proxyimage-67e0c21f.png',
  'public/images/blog/proxyimage-6808b015.png',
  'public/images/blog/OCR-Insurance_featured.jpg',
  'public/images/blog/64f7725c083e63d6bf18c972_pexels-mikhail-nilov-8297031.jpeg',
  'public/images/blog/66bcb94c9fae536dc80fb34c_OCR-Insurance_1.jpeg',
  ...screenshotFiles,
];

const TARGET_QUALITY = 75;

for (const imgPath of IMAGES) {
  const before = statSync(imgPath).size;
  const ext = extname(imgPath).toLowerCase();
  const webpPath = imgPath.replace(/\.(png|jpe?g)$/i, '.webp');

  // Compress original in-place
  const instance = sharp(imgPath);
  let compressed;
  if (ext === '.png') {
    compressed = await instance.png({ quality: TARGET_QUALITY, compressionLevel: 9 }).toBuffer();
  } else {
    compressed = await instance.jpeg({ quality: TARGET_QUALITY, mozjpeg: true }).toBuffer();
  }
  writeFileSync(imgPath, compressed);

  // Emit .webp sibling
  await sharp(imgPath).webp({ quality: TARGET_QUALITY }).toFile(webpPath);

  const after = statSync(imgPath).size;
  const webpSize = statSync(webpPath).size;
  console.log(
    `${basename(imgPath)}: ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB | webp: ${(webpSize / 1024).toFixed(0)}KB`
  );
}
