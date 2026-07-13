import { existsSync, readdirSync, readFileSync } from "node:fs";
import { extname, join, resolve } from "node:path";

const distDir = resolve("dist");

if (!existsSync(distDir)) {
  console.error("dist/ does not exist. Run the production build before checking links.");
  process.exit(1);
}

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function candidates(pathname) {
  const clean = decodeURIComponent(pathname).replace(/^\/+/, "");
  const direct = join(distDir, clean);

  if (!clean || pathname.endsWith("/")) return [join(direct, "index.html")];
  if (extname(clean)) return [direct];
  return [direct, `${direct}.html`, join(direct, "index.html")];
}

const failures = [];
const htmlFiles = walk(distDir).filter((file) => file.endsWith(".html"));
const attributePattern = /\b(?:href|src)=["']([^"']+)["']/g;

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");

  for (const match of html.matchAll(attributePattern)) {
    const raw = match[1];
    if (!raw.startsWith("/") || raw.startsWith("//")) continue;

    const pathname = raw.split(/[?#]/, 1)[0];
    if (!pathname || candidates(pathname).some(existsSync)) continue;

    failures.push(`${file.replace(`${distDir}\\`, "")} -> ${raw}`);
  }
}

if (failures.length) {
  console.error(`Found ${failures.length} broken internal link(s):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Internal link check passed across ${htmlFiles.length} HTML files.`);
