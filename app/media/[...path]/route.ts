import { readFile } from "fs/promises";
import path from "path";

const roots: Record<string, string> = {
  works: path.join(process.cwd(), "assets", "images", "works"),
  brand: path.join(process.cwd(), "assets", "images", "brand"),
};

const types: Record<string, string> = {
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
};

export async function GET(_request: Request, context: { params: Promise<{ path: string[] }> }) {
  const parts = (await context.params).path;
  const bucket = parts[0];
  const root = roots[bucket];
  if (!root || parts.length < 2) return new Response("Not found", { status: 404 });

  const target = path.resolve(root, ...parts.slice(1));
  const relative = path.relative(root, target);
  if (relative.startsWith("..") || path.isAbsolute(relative)) return new Response("Not found", { status: 404 });

  const type = types[path.extname(target).toLowerCase()];
  if (!type) return new Response("Not found", { status: 404 });

  try {
    const file = await readFile(target);
    return new Response(file, {
      headers: {
        "Content-Type": type,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
