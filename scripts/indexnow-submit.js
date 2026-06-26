/**
 * IndexNow batch submission script for beanbrewdigest.com
 * Submits all sitemap URLs to IndexNow API (Bing, Yandex, etc.)
 * 
 * Usage: node scripts/indexnow-submit.js
 */
const https = require('https');
const http = require('http');

const HOST = 'beanbrewdigest.com';
const KEY = '7d7ea334130240240bcd038f3520d9d5';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const BATCH_SIZE = 10000;
const BATCH_PAUSE_MS = 5000;

function fetchURL(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    mod.get(url, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function postJSON(url, body) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const options = {
      hostname: parsed.hostname,
      path: parsed.pathname,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      timeout: 60000
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
    req.write(JSON.stringify(body));
    req.end();
  });
}

async function extractUrlsFromSitemap(sitemapUrl) {
  const xml = await fetchURL(sitemapUrl);
  const urls = [];
  const regex = /<loc>(.*?)<\/loc>/g;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    urls.push(match[1]);
  }
  return urls;
}

(async () => {
  console.log('=== IndexNow Submission for beanbrewdigest.com ===\n');

  // Verify key file is accessible
  try {
    const keyCheck = await fetchURL(KEY_LOCATION);
    if (keyCheck.trim() !== KEY) {
      console.error(`Key verification failed! Expected ${KEY}, got: ${keyCheck.substring(0,50)}`);
      process.exit(1);
    }
    console.log(`✅ Key verified at ${KEY_LOCATION}`);
  } catch (e) {
    console.error(`Key file not accessible at ${KEY_LOCATION}: ${e.message}`);
    process.exit(1);
  }

  // Collect all URLs from sitemaps
  console.log('\nFetching sitemap URLs...');
  let allUrls = [];
  for (let i = 1; i <= 8; i++) {
    const sitemapUrl = `https://${HOST}/sitemap/sitemap${i}.xml`;
    try {
      const urls = await extractUrlsFromSitemap(sitemapUrl);
      console.log(`  sitemap${i}: ${urls.length} URLs`);
      allUrls = allUrls.concat(urls);
    } catch (e) {
      console.error(`  sitemap${i}: ERROR - ${e.message}`);
    }
  }
  console.log(`\nTotal URLs: ${allUrls.length}`);

  // Deduplicate
  allUrls = [...new Set(allUrls)];
  console.log(`Unique URLs: ${allUrls.length}`);

  // Submit in batches
  const totalBatches = Math.ceil(allUrls.length / BATCH_SIZE);
  console.log(`\nSubmitting in ${totalBatches} batches of up to ${BATCH_SIZE}...`);

  let totalSuccess = 0;
  let totalFailed = 0;

  for (let b = 0; b < totalBatches; b++) {
    const batchUrls = allUrls.slice(b * BATCH_SIZE, (b + 1) * BATCH_SIZE);
    const payload = {
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: batchUrls
    };

    console.log(`\n--- Batch ${b + 1}/${totalBatches} (${batchUrls.length} URLs) ---`);
    try {
      const res = await postJSON('https://api.indexnow.org/indexnow', payload);
      if (res.status === 200) {
        console.log(`  ✅ Success (HTTP 200)`);
        totalSuccess += batchUrls.length;
      } else {
        console.log(`  ⚠️ HTTP ${res.status}: ${res.data.substring(0, 200)}`);
        totalFailed += batchUrls.length;
      }
    } catch (e) {
      console.error(`  ❌ Error: ${e.message}`);
      totalFailed += batchUrls.length;
    }

    if (b < totalBatches - 1) {
      console.log(`  Pausing ${BATCH_PAUSE_MS / 1000}s...`);
      await new Promise(r => setTimeout(r, BATCH_PAUSE_MS));
    }
  }

  console.log(`\n========== FINAL ==========`);
  console.log(`Submitted: ${totalSuccess}, Failed: ${totalFailed}`);
  console.log(`\nCheck Bing Webmaster Tools for indexing status.`);
  console.log(`Also check Yandex: https://webmaster.yandex.com/`);
})().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
