require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');
const xlsx = require('xlsx');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const SITE = 'beanbrewdigest';
const CONCURRENCY = 5;

const TOPIC_PROMPTS = {
  'brewing-methods': `You are a specialty coffee expert writing a detailed brewing guide. Write a comprehensive article about: "{title}"

Requirements:
- Cover specific technique, variables, and step-by-step approach
- Include at least 5 specific data points (temperatures, ratios, times, percentages)
- Include at least 2 citations like: "According to [Name], [year], ..."
- Include at least 3 real-world scenarios with named examples
- Use sections covering: what it is, the science behind it, step-by-step method, variables to control, common mistakes, and comparison/context
- Forbidden headings: About, Why X Is Gaining Popularity, Types and Variants, Key Features and Benefits, Pros and Cons, How to Choose, Conclusion, FAQs, The Bottom Line, In Summary
- Forbidden phrases: In conclusion, Comprehensive guide, Ultimate guide, Delve into, Navigating the world of, Unveil the secrets, In today's fast-paced, Look no further, Whether you're a beginner, Dive deep into, Tapestry, Testament to, Embark on a journey
- Minimum 5 h2 headings, 8+ paragraphs, 1+ table, 1+ blockquote
- Write at least 3000 characters of content`,

  'bean-origins': `You are a specialty coffee origin expert and Q Grader. Write a detailed article about: "{title}"

Requirements:
- Cover geography, climate, altitude, processing methods, and flavor profile
- Include at least 5 specific data points (altitudes in masl, temperatures, rainfall mm, harvest months, cup scores)
- Include at least 2 citations like: "According to [researcher/organization], [year], ..."
- Include at least 3 specific farms, cooperatives, or regions with named examples
- Use sections covering: origin geography, growing conditions, varietals, processing, flavor profile, how to buy/brew
- Forbidden headings: About, Why X Is Gaining Popularity, Types and Variants, Key Features and Benefits, Pros and Cons, How to Choose, Conclusion, FAQs, The Bottom Line, In Summary
- Forbidden phrases: In conclusion, Comprehensive guide, Ultimate guide, Delve into, Navigating the world of, Unveil the secrets, In today's fast-paced, Look no further, Whether you're a beginner, Dive deep into, Tapestry, Testament to, Embark on a journey
- Minimum 5 h2 headings, 8+ paragraphs, 1+ table, 1+ blockquote
- Write at least 3000 characters of content`,

  'roasting-craft': `You are a professional coffee roaster with 10+ years of experience. Write a technical article about: "{title}"

Requirements:
- Cover roasting science, technique, equipment, and practical application
- Include at least 5 specific data points (temperatures in °C, percentages, time durations, Agtron scores)
- Include at least 2 citations like: "According to [roaster/researcher], [year], ..."
- Include at least 3 specific roasting examples with named roasters or profiles
- Use sections covering: the science/concept, practical application, variables and control, equipment considerations, troubleshooting, real-world examples
- Forbidden headings: About, Why X Is Gaining Popularity, Types and Variants, Key Features and Benefits, Pros and Cons, How to Choose, Conclusion, FAQs, The Bottom Line, In Summary
- Forbidden phrases: In conclusion, Comprehensive guide, Ultimate guide, Delve into, Navigating the world of, Unveil the secrets, In today's fast-paced, Look no further, Whether you're a beginner, Dive deep into, Tapestry, Testament to, Embark on a journey
- Minimum 5 h2 headings, 8+ paragraphs, 1+ table, 1+ blockquote
- Write at least 3000 characters of content`,

  'cafe-culture': `You are a specialty coffee journalist and café consultant. Write an engaging article about: "{title}"

Requirements:
- Cover the cultural, business, and community dimensions of specialty coffee
- Include at least 5 specific data points (statistics, years, prices, percentages, quantities)
- Include at least 2 citations like: "According to [person/organization], [year], ..."
- Include at least 3 specific real cafés, events, or people with named examples
- Use sections that tell a story while covering history, current state, key players, and practical takeaways
- Forbidden headings: About, Why X Is Gaining Popularity, Types and Variants, Key Features and Benefits, Pros and Cons, How to Choose, Conclusion, FAQs, The Bottom Line, In Summary
- Forbidden phrases: In conclusion, Comprehensive guide, Ultimate guide, Delve into, Navigating the world of, Unveil the secrets, In today's fast-paced, Look no further, Whether you're a beginner, Dive deep into, Tapestry, Testament to, Embark on a journey
- Minimum 5 h2 headings, 8+ paragraphs, 1+ table, 1+ blockquote
- Write at least 3000 characters of content`,

  'equipment-gear': `You are a specialty coffee equipment reviewer with hands-on testing experience. Write a detailed article about: "{title}"

Requirements:
- Cover specifications, real-world performance, comparisons, and buying guidance
- Include at least 5 specific data points (prices, dimensions, RPM, watt ratings, temperature ranges)
- Include at least 2 citations like: "According to [barista/publication], [year], ..."
- Include at least 3 specific product comparisons or real user scenarios
- Use sections covering: what it is, key specs and features, real-world performance, who it's for, alternatives, and value assessment
- Forbidden headings: About, Why X Is Gaining Popularity, Types and Variants, Key Features and Benefits, Pros and Cons, How to Choose, Conclusion, FAQs, The Bottom Line, In Summary
- Forbidden phrases: In conclusion, Comprehensive guide, Ultimate guide, Delve into, Navigating the world of, Unveil the secrets, In today's fast-paced, Look no further, Whether you're a beginner, Dive deep into, Tapestry, Testament to, Embark on a journey
- Minimum 5 h2 headings, 8+ paragraphs, 1+ table, 1+ blockquote
- Write at least 3000 characters of content`,

  'recipes-drinks': `You are a specialty coffee barista and recipe developer. Write a detailed recipe and exploration article about: "{title}"

Requirements:
- Cover recipe details, technique, ingredient ratios, variations, and flavor rationale
- Include at least 5 specific data points (measurements in ml/g/oz, temperatures, brew ratios, timing)
- Include at least 2 citations like: "According to [barista/publication], [year], ..."
- Include at least 3 specific named variations or serving suggestions
- Use sections covering: what it is and its origins, core recipe with exact measurements, technique breakdown, variations, pairing suggestions, and troubleshooting
- Forbidden headings: About, Why X Is Gaining Popularity, Types and Variants, Key Features and Benefits, Pros and Cons, How to Choose, Conclusion, FAQs, The Bottom Line, In Summary
- Forbidden phrases: In conclusion, Comprehensive guide, Ultimate guide, Delve into, Navigating the world of, Unveil the secrets, In today's fast-paced, Look no further, Whether you're a beginner, Dive deep into, Tapestry, Testament to, Embark on a journey
- Minimum 5 h2 headings, 8+ paragraphs, 1+ table, 1+ blockquote
- Write at least 3000 characters of content`,
};

function slugToTitle(slug) {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

async function generateArticle(type, shortTitle) {
  const title = slugToTitle(shortTitle);
  const promptTemplate = TOPIC_PROMPTS[type] || TOPIC_PROMPTS['brewing-methods'];
  const prompt = promptTemplate.replace('{title}', title);

  const resp = await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.DASHSCOPE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'qwen-plus',
      messages: [
        {
          role: 'system',
          content: 'You are a specialty coffee expert. Write article body HTML only — no <!DOCTYPE>, no <html>, no <head>, no <body> tags. Start directly with <h2> or <p>. Use proper HTML: <h2>, <h3>, <p>, <ul>, <ol>, <li>, <strong>, <em>, <blockquote>, <table>, <thead>, <tbody>, <tr>, <th>, <td>. No markdown.',
        },
        { role: 'user', content: prompt },
      ],
      max_tokens: 4000,
    }),
  });

  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`API error ${resp.status}: ${err}`);
  }

  const data = await resp.json();
  const body = data.choices?.[0]?.message?.content ?? '';

  // Generate description from first paragraph
  const descMatch = body.match(/<p>(.*?)<\/p>/);
  const description = descMatch
    ? descMatch[1].replace(/<[^>]+>/g, '').slice(0, 160)
    : `${title} — in-depth specialty coffee guide.`;

  return { title, body, description };
}

async function upsertArticle(client, { shortTitle, title, body, description, type }) {
  const existing = await client.query(
    'SELECT id FROM articles WHERE site=$1 AND short_title=$2 LIMIT 1',
    [SITE, shortTitle]
  );
  if (existing.rows[0]) {
    await client.query(
      `UPDATE articles SET title=$1, body=$2, description=$3, modified_time=NOW()
       WHERE site=$4 AND short_title=$5`,
      [title, body, description, SITE, shortTitle]
    );
  } else {
    await client.query(
      `INSERT INTO articles (site, type, short_title, title, body, description, language, is_online)
       VALUES ($1,$2,$3,$4,$5,$6,'en','Y')`,
      [SITE, type, shortTitle, title, body, description]
    );
  }
}

async function run() {
  const wb = xlsx.readFile('article_ideas.xlsx');
  const ws = wb.Sheets[wb.SheetNames[0]];
  const rows = xlsx.utils.sheet_to_json(ws);

  // Check which are already done
  const client = await pool.connect();
  try {
    await client.query(`CREATE TABLE IF NOT EXISTS articles (
      id SERIAL PRIMARY KEY, site TEXT, type TEXT, short_title TEXT, language TEXT,
      published_time TIMESTAMPTZ, modified_time TIMESTAMPTZ, author TEXT, img TEXT,
      title TEXT, description TEXT, url TEXT, body TEXT, tag TEXT, is_online TEXT DEFAULT 'Y'
    )`);
    await client.query(`CREATE TABLE IF NOT EXISTS authors (
      id SERIAL PRIMARY KEY, site TEXT, name TEXT, slug TEXT UNIQUE,
      img TEXT, description TEXT, language TEXT
    )`);

    const done = await client.query('SELECT short_title FROM articles WHERE site=$1', [SITE]);
    const doneSet = new Set(done.rows.map(r => r.short_title));
    const todo = rows.filter(r => !doneSet.has(r.short_title));
    console.log(`Total: ${rows.length}, Done: ${doneSet.size}, Todo: ${todo.length}`);

    let success = 0, failed = 0;
    for (let i = 0; i < todo.length; i += CONCURRENCY) {
      const batch = todo.slice(i, i + CONCURRENCY);
      await Promise.all(batch.map(async (row) => {
        try {
          const { title, body, description } = await generateArticle(row.type, row.short_title);
          await upsertArticle(client, { shortTitle: row.short_title, title, body, description, type: row.type });
          success++;
          if (success % 10 === 0) console.log(`Progress: ${success + doneSet.size}/${rows.length}`);
        } catch (e) {
          failed++;
          console.error(`FAIL ${row.short_title}: ${e.message}`);
        }
      }));
    }
    console.log(`Done. Success: ${success}, Failed: ${failed}`);
  } finally {
    client.release();
    await pool.end();
  }
}

run().catch(console.error);
