const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false }
});

const AUTHORS = [
  'Elena Rossi',
  'Marcus Chen',
  'Sofia Andersson',
  'James Okafor',
  'Yuki Tanaka',
  'Isabella Moreno',
  'Oliver Schmidt',
  'Priya Sharma'
];

const BATCH = 200;

async function main() {
  const start = Date.now();

  // Fetch all article IDs for beanbrewdigest
  const res = await pool.query(
    "SELECT id FROM articles WHERE site='beanbrewdigest' ORDER BY id ASC"
  );
  const ids = res.rows.map(r => r.id);
  console.log(`Total articles: ${ids.length}`);

  // Build assignment array: {id, author, date}
  // Work backward from 2026-06-16
  const endDate = new Date('2026-06-16T00:00:00Z');
  const assignments = [];

  let currentDate = new Date(endDate);
  let articleIdx = 0;

  while (articleIdx < ids.length) {
    // For each day, each author gets 3-5 articles
    for (let a = 0; a < AUTHORS.length && articleIdx < ids.length; a++) {
      const count = 3 + Math.floor(Math.random() * 3); // 3, 4, or 5
      for (let c = 0; c < count && articleIdx < ids.length; c++) {
        // Spread articles across hours within the day
        const hour = 6 + Math.floor(Math.random() * 14); // 6am-8pm
        const minute = Math.floor(Math.random() * 60);
        const pubDate = new Date(currentDate);
        pubDate.setUTCHours(hour, minute, 0, 0);

        assignments.push({
          id: ids[articleIdx],
          author: AUTHORS[a],
          published_time: pubDate
        });
        articleIdx++;
      }
    }
    // Move to previous day
    currentDate.setDate(currentDate.getDate() - 1);
  }

  const startDate = assignments[assignments.length - 1].published_time;
  console.log(`Date range: ${startDate.toISOString().split('T')[0]} → ${endDate.toISOString().split('T')[0]}`);
  console.log(`Days span: ${Math.ceil((endDate - startDate) / 86400000)}`);

  // Show author distribution
  const authorCounts = {};
  AUTHORS.forEach(a => authorCounts[a] = 0);
  assignments.forEach(a => authorCounts[a.author]++);
  console.log('\nAuthor distribution:');
  Object.entries(authorCounts).forEach(([a, c]) => console.log(`  ${a}: ${c}`));

  // Update in batches
  console.log(`\nUpdating ${assignments.length} articles in batches of ${BATCH}...`);
  let updated = 0;

  for (let i = 0; i < assignments.length; i += BATCH) {
    const batch = assignments.slice(i, i + BATCH);
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      for (const row of batch) {
        await client.query(
          'UPDATE articles SET author=$1, published_time=$2, modified_time=$2 WHERE id=$3',
          [row.author, row.published_time, row.id]
        );
      }
      await client.query('COMMIT');
      updated += batch.length;
    } catch(e) {
      await client.query('ROLLBACK');
      console.error('BATCH ERR:', e.message);
    } finally {
      client.release();
    }

    if (updated % 2000 === 0 || i + BATCH >= assignments.length) {
      const elapsed = ((Date.now() - start) / 1000).toFixed(1);
      console.log(`  [${updated}/${assignments.length}] (${elapsed}s)`);
    }
  }

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`\n=== DONE ===`);
  console.log(`Updated: ${updated}`);
  console.log(`Time: ${elapsed}s`);

  await pool.end();
}

main().catch(e => { console.error('FATAL:', e.message); process.exit(1); });
