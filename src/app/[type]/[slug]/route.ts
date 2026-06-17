import { readFile } from "fs/promises";
import path from "path";
import { getArticleBySlug, getRelatedArticles } from "../../../../lib/db";
import { VALID_TYPES } from "../../../../lib/topics";

export const dynamic = "force-dynamic";

async function loadTemplate(name: string): Promise<string> {
  return readFile(path.join(process.cwd(), "templates", name), "utf-8");
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ type: string; slug: string }> }
) {
  const { type, slug } = await params;
  if (!VALID_TYPES.has(type)) return new Response("Not Found", { status: 404 });

  const article = await getArticleBySlug(slug);
  if (!article) return new Response("Article not found", { status: 404 });

  const [header, footer, related] = await Promise.all([
    loadTemplate("header.html"), loadTemplate("footer.html"),
    getRelatedArticles(article.id, article.type ?? type),
  ]);

  const title = article.title ?? "";
  const description = article.description ?? "";
  const articleUrl = `https://beanbrewdigest.com/${type}/${slug}`;
  const imageUrl = article.img ?? "";

  const ogTags = [
    `<meta property="og:title" content="${escapeHtml(title)}">`,
    `<meta property="og:description" content="${escapeHtml(description)}">`,
    `<meta property="og:type" content="article">`,
    `<meta property="og:url" content="${articleUrl}">`,
    `<meta property="og:site_name" content="Bean Brew Digest">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapeHtml(title)}">`,
    `<meta name="twitter:description" content="${escapeHtml(description)}">`,
  ];
  if (imageUrl) {
    ogTags.push(`<meta property="og:image" content="${escapeHtml(imageUrl)}">`);
    ogTags.push(`<meta name="twitter:image" content="${escapeHtml(imageUrl)}">`);
  }

  const renderedHeader = header
    .replace("{{TITLE}}", escapeHtml(title))
    .replace("{{DESCRIPTION}}", escapeHtml(description))
    .replace("{{CANONICAL}}", articleUrl)
    .replace("{{OG_META}}", ogTags.join("\n    "))
    .replace("</head>", `<link rel="stylesheet" href="/article.css">\n</head>`);

  const author = article.author ?? "";
  const authorSlug = author.toLowerCase().replace(/\s+/g, "-");
  const pubTime = article.published_time ?? article.modified_time;
  const pubDate = pubTime ? new Date(pubTime).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "";
  const metaParts: string[] = [];
  if (author) metaParts.push(`By <a href="/author/${authorSlug}" class="meta-author">${escapeHtml(author)}</a>`);
  if (pubDate) metaParts.push(`<time class="meta-date">${escapeHtml(pubDate)}</time>`);
  const metaBlock = metaParts.length ? `<div class="article-meta">${metaParts.join(" · ")}</div>` : "";
  const coverBlock = imageUrl ? `<img class="article-cover" src="${escapeHtml(imageUrl)}" alt="${escapeHtml(title)}" loading="eager">` : "";

  const jsonLd = JSON.stringify({
    "@context": "https://schema.org", "@type": "Article",
    headline: title, description, url: articleUrl,
    ...(imageUrl ? { image: imageUrl } : {}),
    publisher: { "@type": "Organization", name: "Bean Brew Digest", url: "https://beanbrewdigest.com" },
    ...(author ? { author: { "@type": "Person", name: author } } : {}),
    ...(pubTime ? { datePublished: new Date(pubTime).toISOString().split("T")[0] } : {}),
  });

  const typeName = type.charAt(0).toUpperCase() + type.slice(1).replace(/-/g, " ");
  const breadcrumb = `<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a> › <a href="/${type}">${typeName}</a> › <span>${escapeHtml(title)}</span></nav>`;

  let relatedHtml = "";
  if (related.length > 0) {
    relatedHtml = `<div class="related-articles"><h3>More Articles</h3><div class="related-list">${related.map(r => {
      const t = escapeHtml(r.title ?? r.short_title ?? "");
      const href = `/${escapeHtml(r.type ?? type)}/${escapeHtml(r.short_title ?? "")}`;
      const img = r.img ? `<img src="${escapeHtml(r.img)}" alt="${t}" loading="lazy">` : "";
      return `<a href="${href}">${img}<span>${t}</span></a>`;
    }).join("")}</div></div>`;
  }

  const html = renderedHeader + `<main class="article-wrap">${breadcrumb}${coverBlock}<h1>${escapeHtml(title)}</h1>${metaBlock}${article.body ?? ""}${relatedHtml}<script type="application/ld+json">${jsonLd}</script></main>` + footer;

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, s-maxage=31536000" },
  });
}
