import { readFile } from "fs/promises";
import path from "path";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ file: string }> }
) {
  const { file } = await params;
  if (!file.endsWith(".xml")) return new Response("Not found", { status: 404 });
  try {
    const content = await readFile(path.join(process.cwd(), "public/sitemap", file), "utf-8");
    return new Response(content, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
  } catch { return new Response("Not found", { status: 404 }); }
}
