import { getAllArticles } from "../../../../lib/db";

export const dynamic = "force-dynamic";
const CHUNK = 5000;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const page = parseInt(id, 10);
  if (!page || page < 1) return new Response("Not Found", { status: 404 });

  const base = "https://beanbrewdigest.com";

  // 固定静态页面放在 sitemap1 的前面
  const staticPages = [
    { loc: `${base}/`, priority: "1.0", changefreq: "daily" },
    { loc: `${base}/brewing-methods`, priority: "0.8", changefreq: "daily" },
    { loc: `${base}/bean-origins`, priority: "0.8", changefreq: "daily" },
    { loc: `${base}/roasting-craft`, priority: "0.8", changefreq: "daily" },
    { loc: `${base}/cafe-culture`, priority: "0.8", changefreq: "daily" },
    { loc: `${base}/equipment-gear`, priority: "0.8", changefreq: "daily" },
    { loc: `${base}/recipes-drinks`, priority: "0.8", changefreq: "daily" },
  ];

  const articles = await getAllArticles();

  // 所有条目合并：7 个静态页 + N 篇文章
  const allItems: string[] = staticPages.map(
    p => `<url><loc>${p.loc}</loc><changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>`
  );
  articles.forEach(a => {
    const mod = a.modified_time ? new Date(a.modified_time).toISOString().split("T")[0] : "";
    allItems.push(`<url><loc>${base}/${a.type}/${a.short_title}</loc>${mod ? `<lastmod>${mod}</lastmod>` : ""}<changefreq>monthly</changefreq><priority>0.6</priority></url>`);
  });

  const total = allItems.length;
  const totalPages = Math.ceil(total / CHUNK);
  if (page > totalPages) return new Response("Not Found", { status: 404 });

  const start = (page - 1) * CHUNK;
  const slice = allItems.slice(start, start + CHUNK);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${slice.join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml", "Cache-Control": "public, s-maxage=86400" }
  });
}
