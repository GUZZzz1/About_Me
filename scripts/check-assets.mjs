import { access, readFile, readdir } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = resolve(root, "src");
const publicRoot = resolve(root, "public");

async function collectHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map((entry) => {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) return collectHtmlFiles(path);
    return entry.isFile() && entry.name.endsWith(".html") ? [path] : [];
  }));
  return files.flat();
}

const htmlFiles = await collectHtmlFiles(sourceRoot);

const localImageRefs = [];
for (const htmlFile of htmlFiles) {
  const html = await readFile(htmlFile, "utf8");
  for (const match of html.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["']/gi)) {
    const source = match[1];
    if (!source.startsWith("data:") && !/^https?:/i.test(source)) {
      localImageRefs.push({ htmlFile, source: source.split(/[?#]/, 1)[0] });
    }
  }
}

const missing = [];
for (const item of localImageRefs) {
  const htmlOutputPath = relative(sourceRoot, item.htmlFile);
  const outputRelativePath = join(dirname(htmlOutputPath), item.source);
  const candidates = [resolve(sourceRoot, outputRelativePath), resolve(publicRoot, outputRelativePath)];
  let found = false;
  for (const assetPath of candidates) {
    try {
      await access(assetPath);
      found = true;
      break;
    } catch {}
  }
  if (!found) missing.push(`${relative(root, item.htmlFile)}: ${item.source}`);
}

if (missing.length) {
  console.error("Missing local image assets:");
  missing.forEach(item => console.error(`- ${item}`));
  process.exitCode = 1;
} else {
  console.log(`Checked ${localImageRefs.length} local image references across ${htmlFiles.length} HTML files.`);
}
