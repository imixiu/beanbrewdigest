import { INDEX_HTML } from "../../lib/templates";

export const dynamic = "force-dynamic";

export async function GET() {
  return new Response(INDEX_HTML, {
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=31536000, s-maxage=31536000" },
  });
}
