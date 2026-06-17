#!/usr/bin/env python3
"""Generate cover images for bakewisehub's 10 no-img articles.
Qwen API → alicdn (image2cdn) → DB update.
"""
import os, sys, json, time, urllib.request, urllib.parse

SITE = "bakewisehub"
PROJECT_DIR = "/root/vercel-projects/beanbrewdigest"
DASHSCOPE_KEY = "sk-b11580cc1fec4c2a814a8a97e3dfd7d1"
QWEN_API = "https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation"
CDN_API = "https://ranking.alibaba.com/verticalSite/image2cdn.json"
CDN_TOKEN = "alibaba-icbu-seo-image-to-alicdn-verify"
IMAGE_SIZE = "1024*576"

CATEGORY_THEMES = {
    "pies-tarts": "quiche, pie, tart, pastry, baked goods, golden crust",
    "bread-baking": "freshly baked bread, artisan loaf, focaccia, bakery",
    "cakes-pastries": "decorated cake, pastry, frosting, baking artistry",
    "baking-science": "baking ingredients, flour, chemistry, kitchen science",
    "cookies-bars": "cookies, gingerbread, icing, decorated cookies, baking",
}

SAFE_PROMPTS = [
    "freshly baked pastry on rustic wooden table, warm golden light, editorial food photography",
    "artisan baked goods display, clean marble countertop, morning sunlight, professional style",
    "baking setup with fresh ingredients, bright studio lighting, editorial quality",
    "close-up of freshly baked dessert, warm tones, bakery atmosphere, professional photography",
    "minimalist baking still life, clean surface, soft natural lighting, food editorial",
]

def load_env():
    env_path = os.path.join(PROJECT_DIR, ".env.local")
    with open(env_path) as f:
        for line in f:
            line = line.strip()
            if "=" in line and not line.startswith("#"):
                k, v = line.split("=", 1)
                os.environ[k] = v.strip().strip('"').strip("'")

load_env()
DB_URL = os.environ.get("DATABASE_URL") or os.environ.get("POSTGRES_URL")

import psycopg2
conn = psycopg2.connect(DB_URL, sslmode="require")

def get_articles():
    with conn.cursor() as cur:
        cur.execute(
            "SELECT id, short_title, title, type FROM articles "
            "WHERE site = %s AND is_online = 'Y' AND (img IS NULL OR img = '') ORDER BY id",
            (SITE,))
        return cur.fetchall()

def generate_image(title, category, attempt=0):
    theme = CATEGORY_THEMES.get(category, "professional baking editorial photography")
    if attempt == 0:
        prompt = f"Professional editorial blog cover: {title[:100]}. Theme: {theme}. Clean modern style, no text overlay, bright lighting."
    else:
        prompt = SAFE_PROMPTS[attempt % len(SAFE_PROMPTS)]

    payload = json.dumps({
        "model": "qwen-image-plus",
        "input": {"messages": [{"role": "user", "content": [{"text": prompt}]}]},
        "parameters": {"size": IMAGE_SIZE}
    }).encode()
    req = urllib.request.Request(QWEN_API, data=payload,
        headers={"Authorization": f"Bearer {DASHSCOPE_KEY}", "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=120) as resp:
        data = json.loads(resp.read())
    return data["output"]["choices"][0]["message"]["content"][0]["image"]

def transfer_to_cdn(oss_url):
    encoded = urllib.parse.quote(oss_url, safe="")
    url = f"{CDN_API}?url={encoded}&token={CDN_TOKEN}"
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req, timeout=60) as resp:
        data = json.loads(resp.read())
    if data.get("code") != 200:
        raise ValueError(f"CDN error: {data}")
    return data["cdn_url"]

def update_db(article_id, img_url):
    with conn.cursor() as cur:
        cur.execute("UPDATE articles SET img = %s WHERE id = %s", (img_url, article_id))
    conn.commit()

def main():
    articles = get_articles()
    total = len(articles)
    print(f"[{time.strftime('%H:%M:%S')}] Site: {SITE}")
    print(f"[{time.strftime('%H:%M:%S')}] Articles without images: {total}")
    print(f"[{time.strftime('%H:%M:%S')}] Starting...", flush=True)

    success = 0
    failed = 0

    for aid, slug, title, atype in articles:
        try:
            oss_url = None
            for attempt in range(3):
                try:
                    oss_url = generate_image(title, atype, attempt)
                    break
                except Exception as e:
                    if "inappropriate" in str(e).lower() or "content" in str(e).lower():
                        print(f"  Retry {attempt+1} (content block), rotating prompt...", flush=True)
                        continue
                    raise
            if not oss_url:
                failed += 1
                print(f"[{success+failed}/{total}] ✗ {title[:50]} | content_blocked", flush=True)
                continue

            cdn_url = transfer_to_cdn(oss_url)
            update_db(aid, cdn_url)
            success += 1
            print(f"[{success+failed}/{total}] ✓ {title[:50]} | {cdn_url}", flush=True)

        except Exception as e:
            failed += 1
            print(f"[{success+failed}/{total}] ✗ {title[:50]} | {str(e)[:100]}", flush=True)

    print(f"\n=== COMPLETE ===")
    print(f"Success: {success}")
    print(f"Failed: {failed}")
    print(f"Total: {total}")
    conn.close()

if __name__ == "__main__":
    main()
