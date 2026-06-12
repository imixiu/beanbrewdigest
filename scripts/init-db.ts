import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

const AUTHORS = [
  { name: "Marcus Webb", slug: "marcus-webb", description: "Specialty coffee roaster with 12 years at award-winning roasteries across Portland and Melbourne. Obsessed with Kenyan single-origins and light roast profiles." },
  { name: "Yuki Tanaka", slug: "yuki-tanaka", description: "Japanese barista champion and pour-over specialist. Trained in Tokyo's third-wave scene, now writing about precision brewing and water chemistry." },
  { name: "Sofia Reyes", slug: "sofia-reyes", description: "Colombian coffee farmer turned writer. Brings first-hand knowledge of processing methods from Huila and Nariño regions." },
  { name: "James Okafor", slug: "james-okafor", description: "Certified Q Grader and coffee educator. Leads cupping sessions at specialty cafés and writes about sensory analysis and terroir." },
  { name: "Elena Marchetti", slug: "elena-marchetti", description: "Milan-based espresso purist and coffee historian. Covers Italian café culture, equipment heritage, and the science of extraction." },
  { name: "Theo Christiansen", slug: "theo-christiansen", description: "Danish coffee professional and AeroPress World Championship finalist. Writes about Nordic coffee culture and experimental brewing methods." },
  { name: "Priya Nair", slug: "priya-nair", description: "Food scientist turned coffee researcher. Specializes in the chemistry of roasting, flavor compounds, and fermentation in coffee processing." },
  { name: "Luca Ferreira", slug: "luca-ferreira", description: "São Paulo barista and home roasting enthusiast. Covers budget gear, accessible brewing setups, and Brazilian coffee culture." },
  { name: "Amara Hassan", slug: "amara-hassan", description: "Ethiopian coffee ceremony practitioner and origin journalist. Reports from Yirgacheffe, Sidama, and Guji growing regions." },
  { name: "Daniel Park", slug: "daniel-park", description: "Seoul café owner and specialty latte artist. Writes about coffee recipes, seasonal drinks, and the intersection of coffee and food culture." },
];

async function main() {
  await sql`CREATE TABLE IF NOT EXISTS articles (
    id SERIAL PRIMARY KEY,
    site TEXT, type TEXT, short_title TEXT, language TEXT,
    published_time TIMESTAMPTZ, modified_time TIMESTAMPTZ,
    author TEXT, img TEXT, title TEXT, description TEXT,
    url TEXT, body TEXT, tag TEXT, is_online TEXT DEFAULT 'Y'
  )`;

  await sql`CREATE TABLE IF NOT EXISTS authors (
    id SERIAL PRIMARY KEY,
    site TEXT, name TEXT, slug TEXT,
    img TEXT, description TEXT, language TEXT
  )`;
  await sql`CREATE UNIQUE INDEX IF NOT EXISTS authors_site_slug_idx ON authors(site, slug)`;

  const SITE = "beanbrewdigest";
  for (const a of AUTHORS) {
    await sql`
      INSERT INTO authors (site, name, slug, description, language)
      VALUES (${SITE}, ${a.name}, ${a.slug}, ${a.description}, 'en')
      ON CONFLICT (site, slug) DO UPDATE SET name=${a.name}, description=${a.description}
    `;
  }
  console.log(`Inserted ${AUTHORS.length} authors.`);
}

main().catch(console.error);
