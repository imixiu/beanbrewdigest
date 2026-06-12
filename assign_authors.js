require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const SITE = 'beanbrewdigest';

const AUTHORS = [
  'Marcus Webb','Yuki Tanaka','Sofia Reyes','James Okafor','Elena Marchetti',
  'Theo Christiansen','Priya Nair','Luca Ferreira','Amara Hassan','Daniel Park',
];

// Assign dates: from 2025-05-12 backwards, 2-3 articles per author per weekday
function genPublishDates(count) {
  const dates = [];
  let d = new Date('2025-05-12');
  while (dates.length < count) {
    const day = d.getDay();
    if (day !== 0 && day !== 6) {
      dates.push(new Date(d));
      dates.push(new Date(d));
      if (dates.length < count) dates.push(new Date(d));
    }
    d.setDate(d.getDate() - 1);
  }
  return dates.slice(0, count);
}

async function run() {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      `SELECT id FROM articles WHERE site=$1 AND (author IS NULL OR published_time IS NULL) ORDER BY id`,
      [SITE]
    );
    console.log(`Assigning authors/dates to ${rows.length} articles`);

    const dates = genPublishDates(rows.length);
    for (let i = 0; i < rows.length; i++) {
      const author = AUTHORS[i % AUTHORS.length];
      await client.query(
        `UPDATE articles SET author=$1, published_time=$2 WHERE id=$3`,
        [author, dates[i], rows[i].id]
      );
    }
    console.log(`Done. Assigned ${rows.length} articles.`);
  } finally {
    client.release();
    await pool.end();
  }
}

run().catch(console.error);
