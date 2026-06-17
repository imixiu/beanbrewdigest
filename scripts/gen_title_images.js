const { neon } = require('@neondatabase/serverless');
const https = require('https');
const fs = require('fs');

const DATABASE_URL = process.env.DATABASE_URL || fs.readFileSync('.env.local', 'utf8').match(/DATABASE_URL=(.+)/)?.[1];
const sql = neon(DATABASE_URL);

const auth = JSON.parse(fs.readFileSync('/root/.hermes/auth.json', 'utf8'));
const API_KEYS = auth.credential_pool.alibaba.filter(c => c.access_token.startsWith('sk-')).map(c => c.access_token);

const STYLE_SUFFIX = {
  'brewing-methods': ', coffee brewing equipment, pour over, espresso machine, warm kitchen lighting, coffee shop atmosphere',
  'equipment-gear': ', coffee grinder, espresso machine, professional coffee equipment, product photography, clean background',
  'bean-origins': ', fresh coffee beans, coffee plantation, coffee cherries, natural lighting, earthy tones',
  'recipes-drinks': ', latte art, cappuccino, specialty coffee drinks, overhead shot, cafe style presentation',
  'roasting-craft': ', coffee roasting process, coffee roaster, fresh roasted beans, warm amber lighting',
  'cafe-culture': ', cozy coffee shop interior, barista at work, coffee cups on table, warm atmosphere, lifestyle photography'
};

function buildPrompt(title, type) {
  const suffix = STYLE_SUFFIX[type] || ', professional coffee photography';
  return title.replace(/[^\w\s,.]/g, '').substring(0, 120) + suffix;
}

function fetchJSON(url, options = {}) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const opts = {
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      method: options.method || 'GET',
      headers: options.headers || {},
      timeout: 30000
    };
    const req = https.request(opts, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(data) }); }
        catch(e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
    if (options.body) req.write(options.body);
    req.end();
  });
}

async function generateImage(prompt, keyIndex) {
  const key = API_KEYS[0];
  const res = await fetchJSON(
    'https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation',
    {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'qwen-image-plus',
        input: { messages: [{ role: 'user', content: [{ text: prompt }] }] },
        parameters: { size: '1024*576' }
      })
    }
  );
  if (res.status === 429) throw new Error('Rate limited');
  if (res.status !== 200) throw new Error(`API ${res.status}`);
  return res.data.output?.choices?.[0]?.message?.content?.[0]?.image;
}

async function uploadToCDN(imageUrl) {
  const encoded = encodeURIComponent(imageUrl);
  const result = await fetchJSON(
    `https://ranking.alibaba.com/verticalSite/image2cdn.json?url=${encoded}&token=alibaba-icbu-seo-image-to-alicdn-verify`
  );
  if (result.data.code === 200 && result.data.cdn_url) return result.data.cdn_url;
  throw new Error('CDN upload failed');
}

async function processOne(article, keyIndex) {
  const prompt = buildPrompt(article.title, article.type);
  const ossUrl = await generateImage(prompt, keyIndex);
  if (!ossUrl) throw new Error('No image URL');
  const cdnUrl = await uploadToCDN(ossUrl);
  await sql`UPDATE articles SET img = ${cdnUrl} WHERE id = ${article.id}`;
  return cdnUrl;
}

(async () => {
  console.log('=== beanbrewdigest 标题生图任务 ===');
  
  const allArticles = await sql`
    SELECT id, type, title FROM articles 
    WHERE site = 'beanbrewdigest' AND is_online = 'Y' AND img IS NULL
    ORDER BY id
  `;
  
  const total = allArticles.length;
  console.log(`无图文章: ${total} 篇`);
  
  let success = 0, failed = 0;
  const BATCH_SIZE = 1000;
  
  for (let i = 0; i < total; i += BATCH_SIZE) {
    const batch = allArticles.slice(i, i + BATCH_SIZE);
    console.log(`\n--- Batch ${Math.floor(i/BATCH_SIZE) + 1}/${Math.ceil(total/BATCH_SIZE)} (${batch.length} articles) ---`);
    
    for (let j = 0; j < batch.length; j += 4) {
      const group = batch.slice(j, j + 4);
      const promises = group.map(async (article, idx) => {
        try {
          await new Promise(r => setTimeout(r, idx * 1000));
          const cdnUrl = await processOne(article, (i + j + idx) % API_KEYS.length);
          success++;
          if (success % 50 === 0) {
            console.log(`[进度] ${success}/${total} 完成, ${failed} 失败`);
          }
        } catch(err) {
          failed++;
          if (failed <= 10) console.error(`失败 #${article.id}: ${err.message.substring(0,80)}`);
        }
      });
      await Promise.all(promises);
      await new Promise(r => setTimeout(r, 5000));
    }
  }
  
  console.log(`\n========== 完成 ==========`);
  console.log(`成功: ${success}, 失败: ${failed}`);
})();
