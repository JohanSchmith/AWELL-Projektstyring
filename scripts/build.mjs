import { mkdir, copyFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const dist = resolve(root, "dist");

const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || "";
const anonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || "";

await mkdir(dist, { recursive: true });
await copyFile(resolve(root, "index.html"), resolve(dist, "index.html"));
await writeFile(
  resolve(dist, "config.js"),
  `window.AWELL_SUPABASE_CONFIG = ${JSON.stringify({ url, anonKey }, null, 2)};\n`
);

console.log("Built dist/");
