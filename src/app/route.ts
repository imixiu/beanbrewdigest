import { INDEX_HTML } from "../../lib/templates";

export async function GET() {
  return new Response(INDEX_HTML, {
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, s-maxage=3600" },
  });
}
