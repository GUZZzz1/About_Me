import { access, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const htmlFiles = [
  resolve(root, "src/index.html"),
  resolve(root, "src/one-page.html"),
  resolve(root, "src/resume/overview.html")
];

const localImageRefs = new Set();
for (const htmlFile of htmlFiles) {
  const html = await readFile(htmlFile, "utf8");
  for (const match of html.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["']/gi)) {
    const source = match[1];
    if (!source.startsWith("data:") && !/^https?:/i.test(source)) localImageRefs.add(source);
  }
}

const missing = [];
for (const source of localImageRefs) {
  const relative = source.replace(/^\.\.\//, "");
  const assetPath = resolve(root, "public", relative);
  try {
    await access(assetPath);
  } catch {
    missing.push(`${source} -> ${assetPath}`);
  }
}

if (missing.length) {
  console.error("Missing local image assets:");
  missing.forEach(item => console.error(`- ${item}`));
  process.exitCode = 1;
} else {
  console.log(`Checked ${localImageRefs.size} local image references.`);
}
