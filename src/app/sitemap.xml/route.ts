import { getAllArticles, getAllAuthors } from "../../../lib/db";

export const dynamic = "force-dynamic";

export async function GET(_request: Request) {
  const base = "https://tabletopcuration.com";
  const [articles, authors] = await Promise.all([getAllArticles(), getAllAuthors()]);

  const staticUrls = [
    `<url><loc>${base}/</loc><changefreq>daily</changefreq><priority>1.0</priority></url>`,
    ...["brewing-methods","bean-origins","roasting-craft","cafe-culture","equipment-gear","recipes-drinks"].map(t =>
      `<url><loc>${base}/${t}</loc><changefreq>daily</changefreq><priority>0.8</priority></url>`
    ),
    ...authors.map(a => `<url><loc>${base}/author/${a.slug}</loc><changefreq>weekly</changefreq><priority>0.5</priority></url>`),
  ];

  const articleUrls = articles.map(a => {
    const mod = a.modified_time ? new Date(a.modified_time).toISOString().split("T")[0] : "";
    return `<url><loc>${base}/${a.type}/${a.short_title}</loc>${mod ? `<lastmod>${mod}</lastmod>` : ""}<changefreq>monthly</changefreq><priority>0.6</priority></url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${staticUrls.join("")}${articleUrls.join("")}</urlset>`;

  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}
