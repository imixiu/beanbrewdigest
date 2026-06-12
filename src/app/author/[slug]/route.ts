import { readFile } from "fs/promises";
import path from "path";
import { getAuthorBySlug, getAllAuthors, getAllArticles } from "../../../../lib/db";

export const dynamic = "force-dynamic";

async function loadTemplate(name: string): Promise<string> {
  return readFile(path.join(process.cwd(), "templates", name), "utf-8");
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const [header, footer] = await Promise.all([loadTemplate("header.html"), loadTemplate("footer.html")]);

  if (slug === "team") {
    const authors = await getAllAuthors();
    const renderedHeader = header
      .replace("{{TITLE}}", "Our Team — Bean Brew Digest")
      .replace("{{DESCRIPTION}}", "Meet the coffee experts, roasters, and writers behind Bean Brew Digest.")
      .replace("{{CANONICAL}}", "https://tabletopcuration.com/author/team")
      .replace("{{OG_META}}", "");

    const members = authors.filter(a => a.slug !== "team");
    const cards = members.map(a => {
      const name = escapeHtml(a.name ?? "");
      const img = a.img ? `<img src="${escapeHtml(a.img)}" alt="${name}" style="width:80px;height:80px;border-radius:50%;object-fit:cover;margin-bottom:12px;">` : "";
      const desc = a.description ? escapeHtml(a.description).slice(0, 120) + "..." : "";
      return `<a href="/author/${escapeHtml(a.slug ?? "")}" style="text-decoration:none;color:inherit;display:flex;flex-direction:column;align-items:center;text-align:center;border:1px solid #e8dfd6;border-radius:12px;padding:24px;transition:box-shadow 0.2s;">${img}<h3 style="margin:0 0 8px;font-size:1.1rem;">${name}</h3><p style="margin:0;color:#6b5e53;font-size:0.9rem;">${desc}</p></a>`;
    }).join("");

    const html = renderedHeader + `<main class="article-wrap" style="max-width:1200px;"><h1>Our Team</h1><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:24px;margin-top:32px;">${cards}</div></main>` + footer;
    return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
  }

  const author = await getAuthorBySlug(slug);
  if (!author) return new Response("Author not found", { status: 404 });

  const allArticles = await getAllArticles();
  const articles = allArticles.filter(a => a.author?.toLowerCase().replace(/\s+/g, "-") === slug);

  const name = author.name ?? "";
  const renderedHeader = header
    .replace("{{TITLE}}", escapeHtml(`${name} — Bean Brew Digest`))
    .replace("{{DESCRIPTION}}", escapeHtml(author.description ?? `Articles by ${name}`))
    .replace("{{CANONICAL}}", `https://tabletopcuration.com/author/${slug}`)
    .replace("{{OG_META}}", "");

  const imgBlock = author.img ? `<img src="${escapeHtml(author.img)}" alt="${escapeHtml(name)}" style="width:120px;height:120px;border-radius:50%;object-fit:cover;margin-bottom:16px;">` : "";
  const cards = articles.map(a => {
    const t = escapeHtml(a.title ?? a.short_title ?? "");
    const href = `/${escapeHtml(a.type ?? "")}/${escapeHtml(a.short_title ?? "")}`;
    const img = a.img ? `<img src="${escapeHtml(a.img)}" alt="${t}" loading="lazy">` : `<div style="height:180px;background:#f5f0eb;"></div>`;
    return `<a href="${href}" class="a-card">${img}<div class="a-card-body"><h3>${t}</h3></div></a>`;
  }).join("");

  const html = renderedHeader + `<main class="article-wrap" style="max-width:1200px;"><div style="text-align:center;margin-bottom:40px;">${imgBlock}<h1>${escapeHtml(name)}</h1>${author.description ? `<p style="color:#6b5e53;max-width:600px;margin:12px auto 0;">${escapeHtml(author.description)}</p>` : ""}</div><div class="articles-grid">${cards}</div></main>` + footer;

  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
