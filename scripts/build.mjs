import { cp, mkdir, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(root, "docs");

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(resolve(root, "src"), output, { recursive: true, force: true });
await cp(resolve(root, "public"), output, { recursive: true, force: true });

console.log("Built GitHub Pages output in docs/");
