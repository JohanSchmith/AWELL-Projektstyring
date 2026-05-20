import { mkdir, copyFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const dist = resolve(root, "dist");

const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || "";
const anonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || "";

await mkdir(dist, { recursive: true });
await mkdir(resolve(dist, "icons"), { recursive: true });

// App filer
await copyFile(resolve(root, "index.html"), resolve(dist, "index.html"));
await writeFile(
  resolve(dist, "config.js"),
  `window.AWELL_SUPABASE_CONFIG = ${JSON.stringify({ url, anonKey }, null, 2)};\n`
);

// PWA filer
await copyFile(resolve(root, "manifest.json"), resolve(dist, "manifest.json"));
await copyFile(resolve(root, "sw.js"), resolve(dist, "sw.js"));
await copyFile(resolve(root, "icons", "icon-192.png"), resolve(dist, "icons", "icon-192.png"));
await copyFile(resolve(root, "icons", "icon-512.png"), resolve(dist, "icons", "icon-512.png"));

console.log("Built dist/");
