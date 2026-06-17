#!/usr/bin/env python3
"""
Batch generate cover images for beanbrewdigest articles.
Qwen image-plus API → urllib download → Vercel Blob upload → DB update.
5 concurrent workers, ~36K articles.
"""

import os, sys, json, time, urllib.request, threading, tempfile
from concurrent.futures import ThreadPoolExecutor, as_completed

SITE = "beanbrewdigest"
PROJECT_DIR = "/root/vercel-projects/beanbrewdigest"
DASHSCOPE_KEY = "sk-b11580cc1fec4c2a814a8a97e3dfd7d1"
QWEN_API = "https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation"
IMAGE_SIZE = "1024*576"
CONCURRENCY = int(sys.argv[1]) if len(sys.argv) > 1 else 5

CATEGORY_THEMES = {
    "brewing-methods": "coffee brewing equipment, pour-over dripper, espresso machine, barista hands, warm cafe lighting",
    "bean-origins": "single origin coffee beans, coffee plantation, green coffee cherries, tropical farm landscape",
    "roasting-craft": "coffee roasting drum, golden brown coffee beans, roaster machine, artisan craft workshop",
    "cafe-culture": "specialty coffee shop interior, latte art, barista counter, cozy third-wave cafe atmosphere",
    "equipment-gear": "coffee grinder, espresso machine, digital scale, gooseneck kettle, professional barista tools",
    "recipes-drinks": "specialty coffee drink, iced latte, coffee cocktail, creative beverage presentation",
}

SAFE_PROMPTS = [
    "freshly roasted coffee beans scattered on rustic wooden table, warm golden light, editorial food photography",
    "steaming cup of specialty coffee on marble countertop, morning sunlight, clean modern aesthetic",
    "coffee brewing setup with pour-over dripper and fresh beans, bright studio lighting, professional style",
    "close-up of coffee crema in ceramic cup, warm tones, artisan cafe atmosphere, editorial photography",
    "minimalist coffee still life, beans and cup on clean surface, soft natural lighting, professional editorial",
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
BLOB_TOKEN = os.environ.get("BLOB_READ_WRITE_TOKEN", "")
DB_URL = os.environ.get("DATABASE_URL") or os.environ.get("POSTGRES_URL")

import psycopg2, psycopg2.pool
pool = psycopg2.pool.SimpleConnectionPool(1, CONCURRENCY + 2, DB_URL, sslmode="require")

stats = {"success": 0, "failed": 0, "content_blocked": 0, "total": 0}
stats_lock = threading.Lock()
start_time = time.time()

def get_articles():
    conn = pool.getconn()
    try:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT id, short_title, title, type FROM articles "
                "WHERE site = %s AND is_online = 'Y' AND (img IS NULL OR img = '') ORDER BY id",
                (SITE,))
            return cur.fetchall()
    finally:
        pool.putconn(conn)

def generate_image(title, category, attempt=0):
    theme = CATEGORY_THEMES.get(category, "professional coffee editorial photography")
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

def download(oss_url, path):
    urllib.request.urlretrieve(oss_url, path)
    if os.path.getsize(path) < 1024:
        raise ValueError(f"File too small ({os.path.getsize(path)}B)")

def upload_blob(path, slug):
    with open(path, "rb") as f:
        data = f.read()
    req = urllib.request.Request(
        f"https://blob.vercel-storage.com/covers/{SITE}/{slug}.png",
        data=data,
        headers={"Authorization": f"Bearer {BLOB_TOKEN}", "x-content-type": "image/png",
                 "x-add-random-suffix": "true"}, method="PUT")
    with urllib.request.urlopen(req, timeout=60) as resp:
        return json.loads(resp.read())["url"]

def update_db(article_id, img_url):
    conn = pool.getconn()
    try:
        with conn.cursor() as cur:
            cur.execute("UPDATE articles SET img = %s WHERE id = %s", (img_url, article_id))
        conn.commit()
    finally:
        pool.putconn(conn)

def process_one(aid, slug, title, article_type):
    thread_id = threading.current_thread().name[-1]
    tmp_path = tempfile.mktemp(suffix=".png", prefix=f"cover-{aid}-t{thread_id}")
    try:
        oss_url = None
        for attempt in range(3):
            try:
                oss_url = generate_image(title, article_type, attempt)
                break
            except Exception as e:
                if "inappropriate" in str(e).lower() or "content" in str(e).lower():
                    continue
                raise
        if not oss_url:
            return (False, "content_blocked")

        download(oss_url, tmp_path)
        blob_url = upload_blob(tmp_path, slug)
        update_db(aid, blob_url)
        return (True, blob_url)
    except Exception as e:
        return (False, str(e)[:120])
    finally:
        if os.path.exists(tmp_path):
            os.remove(tmp_path)

def main():
    print(f"[{time.strftime('%H:%M:%S')}] Site: {SITE}", flush=True)
    print(f"[{time.strftime('%H:%M:%S')}] Connecting to DB...", flush=True)
    articles = get_articles()
    total = len(articles)
    stats["total"] = total
    print(f"[{time.strftime('%H:%M:%S')}] Articles without images: {total}", flush=True)
    print(f"[{time.strftime('%H:%M:%S')}] Concurrency: {CONCURRENCY}", flush=True)
    print(f"[{time.strftime('%H:%M:%S')}] Starting generation...", flush=True)

    with ThreadPoolExecutor(max_workers=CONCURRENCY, thread_name_prefix="gen") as executor:
        futures = {}
        for aid, slug, title, atype in articles:
            f = executor.submit(process_one, aid, slug, title, atype)
            futures[f] = (aid, slug, title, atype)

        for f in as_completed(futures):
            aid, slug, title, atype = futures[f]
            ok, detail = f.result()
            with stats_lock:
                if ok:
                    stats["success"] += 1
                else:
                    stats["failed"] += 1
                    if "content" in detail.lower() or "blocked" in detail.lower():
                        stats["content_blocked"] += 1
                done = stats["success"] + stats["failed"]
                elapsed = time.time() - start_time
                rate = done / elapsed if elapsed > 0 else 0
                remaining = (total - done) / rate if rate > 0 else 0
                status = "✓" if ok else "✗"
                if done % 50 == 0 or done <= 5 or not ok:
                    print(f"[{done}/{total}] {status} {slug[:50]} | "
                          f"OK:{stats['success']} Fail:{stats['failed']} Blocked:{stats['content_blocked']} | "
                          f"Rate:{rate:.2f}/s | ETA:{remaining/3600:.1f}h", flush=True)

    elapsed = time.time() - start_time
    print(f"\n=== COMPLETE ===")
    print(f"Success: {stats['success']}")
    print(f"Failed: {stats['failed']} (content-blocked: {stats['content_blocked']})")
    print(f"Total: {total} | Time: {elapsed/60:.1f}min ({elapsed/3600:.1f}h)")
    pool.closeall()

if __name__ == "__main__":
    main()
