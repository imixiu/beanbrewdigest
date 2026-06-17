import { getAllArticles } from "../../../../lib/db";

export const dynamic = "force-dynamic";
const CHUNK = 5000;

export async function GET() {
  const base = "https://beanbrewdigest.com";
  const articles = await getAllArticles();
  const total = articles.length + 7; // articles + 7 static pages
  const totalPages = Math.ceil(total / CHUNK);

  const sitemaps = Array.from({ length: totalPages }, (_, i) =>
    `<sitemap><loc>${base}/sitemap/${i + 1}</loc></sitemap>`
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.join("\n")}
</sitemapindex>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" }
  });
}
