import { getArticlesByTypePaged } from "../../../lib/db";
import { TOPICS, VALID_TYPES } from "../../../lib/topics";
import { HEADER_TEMPLATE, FOOTER_TEMPLATE } from "../../../lib/templates";

export const dynamic = "force-dynamic";
const PAGE_SIZE = 100;

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ type: string }> }
) {
  const { type: rawType } = await params;
  if (!VALID_TYPES.has(rawType)) {
    return new Response("Not Found", { status: 404 });
  }

  const url = new URL(_request.url);
  const page = Math.max(1, parseInt(url.searchParams.get("page") || "1", 10));
  const { articles, total } = await getArticlesByTypePaged(rawType, page, PAGE_SIZE);
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const topicInfo = TOPICS[rawType];
  const title = topicInfo?.label ?? rawType;
  const description = topicInfo?.description ?? "";

  const renderedHeader = HEADER_TEMPLATE
    .replace("{{TITLE}}", escapeHtml(`${title} — Bean Brew Digest`))
    .replace("{{DESCRIPTION}}", escapeHtml(description))
    .replace("{{CANONICAL}}", `https://beanbrewdigest.com/${rawType}`)
    .replace("{{OG_META}}", "");

  let cards = "";
  for (const a of articles) {
    const t = escapeHtml(a.title ?? a.short_title ?? "");
    const href = `/${rawType}/${escapeHtml(a.short_title ?? "")}`;
    const img = a.img ? `<img src="${escapeHtml(a.img)}" alt="${t}" loading="lazy">` : `<div style="height:200px;background:#f5f0eb;"></div>`;
    const desc = a.description ? escapeHtml(a.description).slice(0, 120) : "";
    cards += `<a href="${href}" class="a-card">${img}<div class="a-card-body"><h3>${t}</h3><p>${desc}</p></div></a>`;
  }

  let pagination = "";
  if (totalPages > 1) {
    const links: string[] = [];
    if (page > 1) links.push(`<a href="/${rawType}?page=${page - 1}">&laquo; Prev</a>`);
    links.push(`<span>Page ${page} of ${totalPages}</span>`);
    if (page < totalPages) links.push(`<a href="/${rawType}?page=${page + 1}">Next &raquo;</a>`);
    pagination = `<div class="pagination">${links.join("")}</div>`;
  }

  const html = renderedHeader + `<main class="article-wrap" style="max-width:1200px;">
    <h1>${escapeHtml(title)}</h1>
    <p style="color:#6b5e53;margin-bottom:32px;">${escapeHtml(description)}</p>
    <div class="articles-grid">${cards}</div>${pagination}</main>` + FOOTER_TEMPLATE;

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, s-maxage=3600" },
  });
}
