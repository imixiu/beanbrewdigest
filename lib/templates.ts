// Auto-generated: inline templates for Cloudflare Workers compatibility
// Source: templates/header.html, templates/footer.html, public/index.html

export const HEADER_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{{TITLE}}</title>
<meta name="description" content="{{DESCRIPTION}}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
:root {
  --espresso: #2c1810;
  --roast: #5c3317;
  --caramel: #c8860a;
  --latte: #d4a96a;
  --cream: #fdf6ee;
  --milk: #f9f0e3;
  --bark: #8b6347;
  --slate: #3d3530;
  --muted: #7a6a60;
  --white: #ffffff;
  --radius: 16px;
  --radius-sm: 10px;
  --shadow: 0 4px 20px rgba(44,24,16,0.08);
  --shadow-lg: 0 16px 48px rgba(44,24,16,0.14);
}
*{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{font-family:'Inter',system-ui,sans-serif;color:var(--slate);background:var(--cream);line-height:1.6;overflow-x:hidden;}
a{color:inherit;text-decoration:none;}
img{max-width:100%;display:block;}
ul{list-style:none;}
.container{max-width:1200px;margin:0 auto;padding:0 24px;}

.header{position:fixed;top:0;left:0;right:0;z-index:1000;background:rgba(253,246,238,0.93);backdrop-filter:blur(16px);border-bottom:1px solid rgba(200,134,10,0.15);}
.header-inner{display:flex;align-items:center;justify-content:space-between;height:70px;}
.logo{font-family:'Playfair Display',serif;font-size:24px;font-weight:700;color:var(--roast);letter-spacing:-0.3px;}
.nav{display:flex;gap:24px;align-items:center;}
.nav a{font-size:14px;font-weight:500;color:var(--muted);transition:color 0.2s;}
.nav a:hover{color:var(--roast);}
.nav-cta{padding:9px 20px;background:var(--caramel);color:var(--white)!important;border-radius:24px;font-weight:600!important;transition:all 0.2s;}
.nav-cta:hover{background:var(--roast);transform:translateY(-1px);}
.mobile-btn{display:none;background:none;border:none;cursor:pointer;padding:8px;}
.mobile-btn svg{width:24px;height:24px;stroke:var(--slate);}

.footer{background:var(--espresso);padding:56px 0 24px;}
.footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:40px;margin-bottom:40px;}
.footer-brand{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:var(--white);margin-bottom:12px;}
.footer p{font-size:14px;color:rgba(255,255,255,0.45);line-height:1.6;}
.footer-col-title{font-size:12px;font-weight:600;color:var(--latte);text-transform:uppercase;letter-spacing:1.2px;margin-bottom:16px;}
.footer ul{list-style:none;}
.footer li{margin-bottom:9px;}
.footer a{font-size:14px;color:rgba(255,255,255,0.45);transition:color 0.2s;}
.footer a:hover{color:var(--white);}
.footer-bottom{border-top:1px solid rgba(255,255,255,0.07);padding-top:24px;display:flex;justify-content:space-between;align-items:center;}
.footer-bottom p{font-size:13px;color:rgba(255,255,255,0.3);}
.heart{color:var(--caramel);}

.article-wrap{max-width:760px;margin:90px auto 60px;padding:0 24px;}
.article-cover{width:100%;border-radius:var(--radius);margin-bottom:28px;max-height:420px;object-fit:cover;}
.article-wrap h1{font-family:'Playfair Display',serif;font-size:clamp(26px,4vw,42px);font-weight:700;line-height:1.2;margin-bottom:12px;color:var(--espresso);}
.article-meta{font-size:13px;color:var(--muted);margin-bottom:32px;padding-bottom:20px;border-bottom:1px solid rgba(200,134,10,0.2);}
.meta-author{color:var(--caramel);}
.meta-author:hover{text-decoration:underline;}
.article-wrap h2{font-family:'Playfair Display',serif;font-size:clamp(20px,3vw,28px);font-weight:700;color:var(--espresso);margin:40px 0 14px;padding-bottom:8px;border-bottom:2px solid rgba(200,134,10,0.25);}
.article-wrap h3{font-family:'Playfair Display',serif;font-size:clamp(17px,2.5vw,22px);font-weight:700;color:var(--roast);margin:28px 0 10px;}
.article-wrap h4{font-family:'Playfair Display',serif;font-size:18px;font-weight:700;color:var(--roast);margin:22px 0 8px;}
.article-wrap p{margin:0 0 18px;line-height:1.8;color:var(--slate);font-size:17px;}
.article-wrap ul,.article-wrap ol{margin:0 0 20px 22px;}
.article-wrap li{margin-bottom:9px;line-height:1.7;color:var(--slate);}
.article-wrap li::marker{color:var(--caramel);}
.article-wrap strong{color:var(--espresso);font-weight:600;}
.article-wrap blockquote{margin:24px 0;padding:16px 22px;border-left:4px solid var(--caramel);background:var(--milk);border-radius:0 10px 10px 0;font-style:italic;color:var(--slate);}
.article-wrap blockquote p:last-child{margin-bottom:0;}
.article-wrap table{width:100%;border-collapse:collapse;margin:24px 0;font-size:15px;border-radius:10px;overflow:hidden;box-shadow:var(--shadow);}
.article-wrap th{background:var(--roast);font-weight:600;color:var(--white);padding:11px 15px;text-align:left;font-size:13px;text-transform:uppercase;letter-spacing:0.04em;}
.article-wrap td{padding:11px 15px;border-bottom:1px solid rgba(200,134,10,0.12);color:var(--slate);vertical-align:top;}
.article-wrap tr:last-child td{border-bottom:none;}
.article-wrap tr:nth-child(even) td{background:var(--milk);}
.article-wrap hr{border:0;border-top:1px solid rgba(200,134,10,0.18);margin:32px 0;}

.related-articles{margin-top:48px;padding-top:32px;border-top:1px solid rgba(200,134,10,0.2);}
.related-articles h3{font-family:'Playfair Display',serif;font-size:22px;margin-bottom:20px;color:var(--espresso);}
.related-list{display:flex;flex-direction:column;gap:10px;}
.related-list a{display:flex;align-items:center;gap:12px;padding:10px;border-radius:8px;transition:background 0.15s;}
.related-list a:hover{background:var(--milk);}
.related-list img{width:64px;height:48px;object-fit:cover;border-radius:6px;flex-shrink:0;}
.related-list span{font-size:.9rem;line-height:1.4;color:var(--slate);}

.articles-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
.a-card{border-radius:var(--radius-sm);overflow:hidden;background:var(--white);box-shadow:var(--shadow);transition:box-shadow 0.3s,transform 0.3s;}
.a-card:hover{box-shadow:var(--shadow-lg);transform:translateY(-4px);}
.a-card img{width:100%;height:200px;object-fit:cover;}
.a-card-body{padding:18px;}
.a-card h3{font-size:15px;font-weight:600;line-height:1.4;margin-bottom:7px;color:var(--espresso);}
.a-card p{font-size:13px;color:var(--muted);line-height:1.6;}

.breadcrumb{font-size:13px;color:var(--muted);margin-bottom:18px;padding:10px 0;}
.breadcrumb a{color:var(--caramel);transition:color 0.2s;}
.breadcrumb a:hover{text-decoration:underline;}
.pagination{display:flex;gap:16px;justify-content:center;align-items:center;margin-top:40px;font-size:14px;}
.pagination a{color:var(--caramel);font-weight:500;}
.pagination span{color:var(--muted);}

@media(max-width:768px){
  .nav{display:none;}
  .nav.open{display:flex;flex-direction:column;position:absolute;top:70px;left:0;right:0;background:var(--cream);padding:24px;border-bottom:1px solid rgba(200,134,10,0.15);gap:16px;}
  .mobile-btn{display:block;}
  .footer-grid{grid-template-columns:repeat(2,1fr);}
  .footer-bottom{flex-direction:column;gap:8px;text-align:center;}
  .articles-grid{grid-template-columns:1fr;}
  .article-wrap{margin-top:70px;}
  .article-wrap p{font-size:16px;}
}
@media(max-width:480px){.footer-grid{grid-template-columns:1fr;}}
</style>
<link rel="canonical" href="{{CANONICAL}}">
{{OG_META}}
<script>window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments)};</script>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-95PY8PSZ0Y"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-95PY8PSZ0Y');</script>
</head>
<body>
<a href="#main-content" style="position:absolute;left:-9999px;top:auto;">Skip to content</a>
<header class="header" role="banner">
  <div class="container header-inner">
    <a href="/" class="logo">Bean Brew Digest</a>
    <nav class="nav" id="mainNav" aria-label="Main">
      <a href="/brewing-methods">Brewing</a>
      <a href="/bean-origins">Origins</a>
      <a href="/roasting-craft">Roasting</a>
      <a href="/cafe-culture">Café Culture</a>
      <a href="/equipment-gear">Gear</a>
      <a href="/recipes-drinks">Recipes</a>
      <a href="/author/team" class="nav-cta">Our Team</a>
    </nav>
    <button class="mobile-btn" aria-label="Menu" onclick="document.getElementById('mainNav').classList.toggle('open')">
      <svg fill="none" viewBox="0 0 24 24" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
    </button>
  </div>
</header>
<div id="main-content">`;

export const FOOTER_TEMPLATE = `</div>
<footer class="footer" role="contentinfo">
  <div class="container">
    <div class="footer-grid">
      <div>
        <div class="footer-brand">Bean Brew Digest</div>
        <p>Your definitive guide to specialty coffee — from farm to cup. Brewing methods, bean origins, roasting science, and café culture.</p>
      </div>
      <div>
        <div class="footer-col-title">Explore</div>
        <ul>
          <li><a href="/brewing-methods">Brewing Methods</a></li>
          <li><a href="/bean-origins">Bean Origins</a></li>
          <li><a href="/roasting-craft">Roasting Craft</a></li>
          <li><a href="/cafe-culture">Café Culture</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-title">Resources</div>
        <ul>
          <li><a href="/equipment-gear">Equipment & Gear</a></li>
          <li><a href="/recipes-drinks">Recipes & Drinks</a></li>
          <li><a href="/sitemap/sitemapindex.xml">Sitemap</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-title">Company</div>
        <ul>
          <li><a href="/author/team">About Us</a></li>
          <li><a href="/">Contact</a></li>
          <li><a href="/">Privacy Policy</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 Bean Brew Digest. All rights reserved.</p>
      <p>Made with <span class="heart">&hearts;</span> for coffee lovers</p>
    </div>
  </div>
</footer>
</body>
</html>`;

export const INDEX_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Bean Brew Digest — Specialty Coffee Knowledge, Brewed Deep</title>
<meta name="description" content="Your definitive guide to specialty coffee — brewing methods, bean origins, roasting craft, café culture, and expert gear reviews.">
<meta name="msvalidate.01" content="C396E9907374E29FB46754412E4E3FB7">
<meta property="og:title" content="Bean Brew Digest — Specialty Coffee Knowledge, Brewed Deep">
<meta property="og:description" content="Your definitive guide to specialty coffee — brewing methods, bean origins, roasting craft, café culture, and expert gear reviews.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://beanbrewdigest.com/">
<meta property="og:site_name" content="Bean Brew Digest">
<meta name="twitter:card" content="summary_large_image">
<link rel="canonical" href="https://beanbrewdigest.com/">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebSite","name":"Bean Brew Digest","url":"https://beanbrewdigest.com","description":"Your definitive guide to specialty coffee","publisher":{"@type":"Organization","name":"Bean Brew Digest","url":"https://beanbrewdigest.com"}}</script>
<script>window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments)};</script>
<style>
:root{
  --espresso:#2c1810;
  --roast:#5c3317;
  --caramel:#c8860a;
  --latte:#d4a96a;
  --cream:#fdf6ee;
  --milk:#f9f0e3;
  --bark:#8b6347;
  --slate:#3d3530;
  --muted:#7a6a60;
  --white:#ffffff;
  --r:16px;--rs:10px;
  --sh:0 4px 20px rgba(44,24,16,.08);
  --shl:0 16px 48px rgba(44,24,16,.16);
}
*{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{font-family:'Inter',system-ui,sans-serif;color:var(--slate);background:var(--cream);overflow-x:hidden;}
a{color:inherit;text-decoration:none;}
img{max-width:100%;display:block;}
ul{list-style:none;}
.container{max-width:1200px;margin:0 auto;padding:0 24px;}

/* HEADER */
.hdr{position:fixed;top:0;left:0;right:0;z-index:1000;background:rgba(253,246,238,.94);backdrop-filter:blur(18px);border-bottom:1px solid rgba(200,134,10,.15);}
.hdr-in{display:flex;align-items:center;justify-content:space-between;height:70px;}
.logo{font-family:'Playfair Display',serif;font-size:24px;font-weight:700;color:var(--roast);}
.nav{display:flex;gap:24px;align-items:center;}
.nav a{font-size:14px;font-weight:500;color:var(--muted);transition:color .2s;}
.nav a:hover{color:var(--roast);}
.nav-cta{padding:9px 22px;background:var(--caramel);color:var(--white)!important;border-radius:24px;font-weight:600!important;transition:all .2s;}
.nav-cta:hover{background:var(--roast);transform:translateY(-1px);}
.mbtn{display:none;background:none;border:none;cursor:pointer;padding:8px;}
.mbtn svg{width:24px;height:24px;stroke:var(--slate);}

/* HERO */
.hero{position:relative;height:100vh;min-height:600px;display:flex;align-items:center;overflow:hidden;}
.hero-bg{position:absolute;inset:0;background:url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&q=80') center/cover no-repeat;}
.hero-overlay{position:absolute;inset:0;background:linear-gradient(135deg,rgba(44,24,16,.82) 0%,rgba(92,51,23,.6) 50%,rgba(200,134,10,.25) 100%);}
.hero-content{position:relative;z-index:1;max-width:700px;padding:0 24px;}
.hero-badge{display:inline-block;padding:6px 16px;background:rgba(200,134,10,.25);border:1px solid rgba(200,134,10,.5);border-radius:20px;font-size:12px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--latte);margin-bottom:24px;}
.hero h1{font-family:'Playfair Display',serif;font-size:clamp(42px,6vw,76px);font-weight:700;line-height:1.08;color:var(--white);margin-bottom:20px;}
.hero h1 em{color:var(--latte);font-style:italic;}
.hero-sub{font-size:clamp(16px,2vw,19px);color:rgba(255,255,255,.78);line-height:1.6;margin-bottom:36px;max-width:520px;}
.hero-btns{display:flex;gap:16px;flex-wrap:wrap;}
.btn-primary{padding:14px 32px;background:var(--caramel);color:var(--white);border-radius:28px;font-weight:600;font-size:15px;transition:all .2s;}
.btn-primary:hover{background:var(--white);color:var(--caramel);transform:translateY(-2px);}
.btn-secondary{padding:14px 32px;border:2px solid rgba(255,255,255,.5);color:var(--white);border-radius:28px;font-weight:500;font-size:15px;transition:all .2s;}
.btn-secondary:hover{border-color:var(--white);background:rgba(255,255,255,.1);}

/* TRUST BAR */
.trust{background:var(--espresso);padding:36px 0;}
.trust-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0;text-align:center;}
.trust-item{padding:16px 24px;border-right:1px solid rgba(255,255,255,.08);}
.trust-item:last-child{border-right:none;}
.trust-num{font-family:'Playfair Display',serif;font-size:38px;font-weight:700;color:var(--caramel);line-height:1;}
.trust-label{font-size:13px;color:rgba(255,255,255,.5);margin-top:6px;letter-spacing:.5px;}

/* TOPIC TABS */
.topics{padding:80px 0;}
.section-label{font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:var(--caramel);margin-bottom:10px;}
.section-title{font-family:'Playfair Display',serif;font-size:clamp(28px,4vw,40px);font-weight:700;color:var(--espresso);margin-bottom:40px;}
.tab-btns{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:36px;}
.tab-btn{padding:10px 22px;border:2px solid rgba(200,134,10,.25);border-radius:24px;font-size:14px;font-weight:500;color:var(--muted);cursor:pointer;background:transparent;transition:all .2s;}
.tab-btn.active,.tab-btn:hover{border-color:var(--caramel);color:var(--roast);background:rgba(200,134,10,.08);}
.tab-panel{display:none;grid-template-columns:repeat(3,1fr);gap:24px;}
.tab-panel.active{display:grid;}
.t-card{border-radius:var(--rs);overflow:hidden;background:var(--white);box-shadow:var(--sh);transition:all .25s;}
.t-card:hover{box-shadow:var(--shl);transform:translateY(-4px);}
.t-card img{width:100%;height:200px;object-fit:cover;}
.t-card-body{padding:20px;}
.t-card-cat{font-size:11px;font-weight:600;letter-spacing:1.2px;text-transform:uppercase;color:var(--caramel);margin-bottom:8px;}
.t-card h3{font-family:'Playfair Display',serif;font-size:17px;font-weight:600;line-height:1.35;color:var(--espresso);margin-bottom:8px;}
.t-card p{font-size:13px;color:var(--muted);line-height:1.6;}

/* MASONRY */
.masonry-section{padding:0 0 80px;}
.masonry-grid{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:180px;gap:16px;}
.m-item{border-radius:var(--rs);overflow:hidden;position:relative;cursor:pointer;}
.m-item.large{grid-column:span 2;grid-row:span 2;}
.m-item.wide{grid-column:span 2;}
.m-item.tall{grid-row:span 2;}
.m-item img{width:100%;height:100%;object-fit:cover;transition:transform .4s;}
.m-item:hover img{transform:scale(1.05);}
.m-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(44,24,16,.75) 0%,transparent 50%);display:flex;align-items:flex-end;padding:16px;}
.m-label{font-family:'Playfair Display',serif;font-size:14px;font-weight:600;color:var(--white);line-height:1.3;}

/* SPOTLIGHT */
.spotlight{background:var(--milk);padding:80px 0;}
.spotlight-inner{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;}
.spot-badge{display:inline-block;padding:5px 14px;background:rgba(200,134,10,.15);border-radius:12px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--caramel);margin-bottom:20px;}
.spotlight h2{font-family:'Playfair Display',serif;font-size:clamp(28px,3.5vw,38px);font-weight:700;color:var(--espresso);line-height:1.2;margin-bottom:18px;}
.spotlight-desc{font-size:16px;color:var(--muted);line-height:1.7;margin-bottom:24px;}
.spot-bullets{margin-bottom:28px;}
.spot-bullets li{display:flex;align-items:flex-start;gap:10px;margin-bottom:12px;font-size:15px;color:var(--slate);}
.spot-bullets li::before{content:"✦";color:var(--caramel);font-size:12px;margin-top:3px;flex-shrink:0;}
.spot-cta{display:inline-flex;align-items:center;gap:8px;padding:12px 28px;background:var(--espresso);color:var(--white);border-radius:24px;font-weight:600;font-size:14px;transition:all .2s;}
.spot-cta:hover{background:var(--roast);transform:translateY(-2px);}
.spot-img{border-radius:var(--r);overflow:hidden;height:420px;}
.spot-img img{width:100%;height:100%;object-fit:cover;}

/* SCROLL ARTICLES */
.scroll-section{padding:80px 0;}
.scroll-track{display:flex;gap:20px;overflow-x:auto;padding-bottom:16px;-webkit-overflow-scrolling:touch;scrollbar-width:thin;scrollbar-color:var(--latte) transparent;}
.scroll-track::-webkit-scrollbar{height:4px;}
.scroll-track::-webkit-scrollbar-track{background:transparent;}
.scroll-track::-webkit-scrollbar-thumb{background:var(--latte);border-radius:2px;}
.sc-card{flex:0 0 280px;border-radius:var(--rs);overflow:hidden;background:var(--white);box-shadow:var(--sh);transition:all .25s;}
.sc-card:hover{box-shadow:var(--shl);transform:translateY(-4px);}
.sc-card img{width:100%;height:168px;object-fit:cover;}
.sc-card-body{padding:16px;}
.sc-cat{font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--caramel);margin-bottom:7px;}
.sc-card h3{font-family:'Playfair Display',serif;font-size:15px;font-weight:600;line-height:1.35;color:var(--espresso);}

/* CTA + FOOTER */
.cta-section{padding:80px 24px;text-align:center;background:var(--roast);position:relative;overflow:hidden;}
.cta-section::before{content:'';position:absolute;inset:0;background:conic-gradient(from 0deg at 50% 50%,var(--caramel),var(--roast),var(--espresso),var(--caramel));opacity:.25;animation:spin 12s linear infinite;}
@keyframes spin{to{transform:rotate(360deg);}}
.cta-section>*{position:relative;z-index:1;}
.cta-section h2{font-family:'Playfair Display',serif;font-size:clamp(28px,4vw,44px);color:var(--white);margin-bottom:16px;}
.cta-section p{font-size:17px;color:rgba(255,255,255,.7);margin-bottom:32px;max-width:480px;margin-left:auto;margin-right:auto;}
.cta-btns{display:flex;gap:16px;justify-content:center;flex-wrap:wrap;}
.cta-btn1{padding:14px 34px;background:var(--caramel);color:var(--white);border-radius:28px;font-weight:600;font-size:15px;transition:all .2s;}
.cta-btn1:hover{background:var(--white);color:var(--caramel);}
.cta-btn2{padding:14px 34px;border:2px solid rgba(255,255,255,.4);color:var(--white);border-radius:28px;font-weight:500;font-size:15px;transition:all .2s;}
.cta-btn2:hover{border-color:var(--white);}

.footer{background:var(--espresso);padding:56px 0 24px;}
.footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:40px;margin-bottom:40px;}
.footer-brand{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:var(--white);margin-bottom:12px;}
.footer>div>div p{font-size:14px;color:rgba(255,255,255,.45);line-height:1.6;}
.fcol-title{font-size:12px;font-weight:600;color:var(--latte);text-transform:uppercase;letter-spacing:1.2px;margin-bottom:16px;}
.footer ul{list-style:none;}
.footer li{margin-bottom:9px;}
.footer a{font-size:14px;color:rgba(255,255,255,.45);transition:color .2s;}
.footer a:hover{color:var(--white);}
.f-bottom{border-top:1px solid rgba(255,255,255,.07);padding-top:24px;display:flex;justify-content:space-between;align-items:center;}
.f-bottom p{font-size:13px;color:rgba(255,255,255,.3);}
.heart{color:var(--caramel);}

@media(max-width:768px){
  .nav{display:none;}
  .nav.open{display:flex;flex-direction:column;position:absolute;top:70px;left:0;right:0;background:var(--cream);padding:24px;border-bottom:1px solid rgba(200,134,10,.15);gap:16px;}
  .mbtn{display:block;}
  .trust-grid{grid-template-columns:repeat(2,1fr);}
  .tab-panel.active{grid-template-columns:1fr;}
  .masonry-grid{grid-template-columns:repeat(2,1fr);}
  .m-item.large,.m-item.wide{grid-column:span 2;}
  .spotlight-inner{grid-template-columns:1fr;gap:32px;}
  .spot-img{height:280px;order:-1;}
  .footer-grid{grid-template-columns:repeat(2,1fr);}
  .f-bottom{flex-direction:column;gap:8px;text-align:center;}
}
@media(max-width:480px){
  .footer-grid{grid-template-columns:1fr;}
  .masonry-grid{grid-template-columns:1fr;}
  .m-item.large,.m-item.wide,.m-item.tall{grid-column:span 1;grid-row:span 1;}
}
@media(prefers-reduced-motion:reduce){
  .cta-section::before{animation:none;}
  *{transition:none!important;transform:none!important;}
}
</style>
<script>window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments)};</script>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-95PY8PSZ0Y"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-95PY8PSZ0Y');</script>
</head>
<body>
<a href="#main-content" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;">Skip to content</a>

<!-- HEADER -->
<header class="hdr" role="banner">
  <div class="container hdr-in">
    <a href="/" class="logo" aria-label="Bean Brew Digest home">Bean Brew Digest</a>
    <nav class="nav" id="mainNav" aria-label="Main navigation">
      <a href="/brewing-methods">Brewing</a>
      <a href="/bean-origins">Origins</a>
      <a href="/roasting-craft">Roasting</a>
      <a href="/cafe-culture">Café Culture</a>
      <a href="/equipment-gear">Gear</a>
      <a href="/recipes-drinks">Recipes</a>
      <a href="/author/team" class="nav-cta">Our Team</a>
    </nav>
    <button class="mbtn" aria-label="Open menu" onclick="document.getElementById('mainNav').classList.toggle('open');this.setAttribute('aria-expanded',this.getAttribute('aria-expanded')==='true'?'false':'true')" aria-expanded="false">
      <svg fill="none" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
    </button>
  </div>
</header>

<main id="main-content">

<!-- HERO -->
<section class="hero" aria-label="Hero">
  <div class="hero-bg" role="img" aria-label="Barista pouring specialty coffee"></div>
  <div class="hero-overlay"></div>
  <div class="container hero-content">
    <div class="hero-badge">Specialty Coffee Intelligence</div>
    <h1>Where <em>Every Cup</em><br>Tells a Story</h1>
    <p class="hero-sub">From Ethiopian highlands to your morning ritual — deep dives into brewing science, roast profiles, and the culture that makes specialty coffee extraordinary.</p>
    <div class="hero-btns">
      <a href="/brewing-methods" class="btn-primary">Explore Brewing Methods</a>
      <a href="/bean-origins" class="btn-secondary">Discover Bean Origins</a>
    </div>
  </div>
</section>

<!-- TRUST BAR -->
<section class="trust" aria-label="Site statistics">
  <div class="container">
    <div class="trust-grid">
      <div class="trust-item"><div class="trust-num" data-target="1000">0</div><div class="trust-label">In-Depth Articles</div></div>
      <div class="trust-item"><div class="trust-num" data-target="6">0</div><div class="trust-label">Specialty Topics</div></div>
      <div class="trust-item"><div class="trust-num" data-target="10">0</div><div class="trust-label">Expert Authors</div></div>
      <div class="trust-item"><div class="trust-num" data-target="50000">0</div><div class="trust-label">Monthly Readers</div></div>
    </div>
  </div>
</section>

<!-- TOPIC TABS -->
<section class="topics" aria-label="Topics">
  <div class="container">
    <div class="section-label">What We Cover</div>
    <h2 class="section-title">Explore by Topic</h2>
    <div class="tab-btns" role="tablist" aria-label="Coffee topics">
      <button class="tab-btn active" role="tab" aria-selected="true" aria-controls="tab-brewing" onclick="switchTab(this,'tab-brewing')">Brewing Methods</button>
      <button class="tab-btn" role="tab" aria-selected="false" aria-controls="tab-origins" onclick="switchTab(this,'tab-origins')">Bean Origins</button>
      <button class="tab-btn" role="tab" aria-selected="false" aria-controls="tab-roasting" onclick="switchTab(this,'tab-roasting')">Roasting Craft</button>
      <button class="tab-btn" role="tab" aria-selected="false" aria-controls="tab-cafe" onclick="switchTab(this,'tab-cafe')">Café Culture</button>
      <button class="tab-btn" role="tab" aria-selected="false" aria-controls="tab-gear" onclick="switchTab(this,'tab-gear')">Gear</button>
      <button class="tab-btn" role="tab" aria-selected="false" aria-controls="tab-recipes" onclick="switchTab(this,'tab-recipes')">Recipes</button>
    </div>

    <div id="tab-brewing" class="tab-panel active" role="tabpanel">
      <a href="/brewing-methods" class="t-card"><img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80" alt="Pour-over coffee brewing" width="600" height="400" loading="lazy"><div class="t-card-body"><div class="t-card-cat">Brewing Methods</div><h3>The Science of Pour-Over: Flow Rate, Bloom, and Extraction</h3><p>Why slowing your pour transforms a flat cup into layered complexity.</p></div></a>
      <a href="/brewing-methods" class="t-card"><img src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80" alt="Espresso machine extraction" width="600" height="400" loading="lazy"><div class="t-card-body"><div class="t-card-cat">Brewing Methods</div><h3>Espresso Pressure Profiling: A Barista's Deep Dive</h3><p>How pre-infusion and declining pressure curves shape flavor.</p></div></a>
      <a href="/brewing-methods" class="t-card"><img src="https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80" alt="Cold brew coffee concentrate" width="600" height="400" loading="lazy"><div class="t-card-body"><div class="t-card-cat">Brewing Methods</div><h3>Cold Brew vs. Iced Coffee: Chemistry, Not Just Temperature</h3><p>The organic acids that disappear in cold extraction — and why it matters.</p></div></a>
    </div>

    <div id="tab-origins" class="tab-panel" role="tabpanel">
      <a href="/bean-origins" class="t-card"><img src="https://images.unsplash.com/photo-1500353391678-d7b57979d6d2?w=600&q=80" alt="Ethiopian coffee farm" width="600" height="400" loading="lazy"><div class="t-card-body"><div class="t-card-cat">Bean Origins</div><h3>Yirgacheffe: Why Ethiopia Produces the World's Most Complex Coffees</h3><p>Elevation, soil, and ancient heirloom varieties that define floral brightness.</p></div></a>
      <a href="/bean-origins" class="t-card"><img src="https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?w=600&q=80" alt="Colombian coffee plantation" width="600" height="400" loading="lazy"><div class="t-card-body"><div class="t-card-cat">Bean Origins</div><h3>Colombia's Huila Region: Terroir Above 1800 Meters</h3><p>How volcanic soil and two harvest seasons create year-round freshness.</p></div></a>
      <a href="/bean-origins" class="t-card"><img src="https://images.unsplash.com/photo-1498804103079-a6351b050096?w=600&q=80" alt="Yemen coffee port" width="600" height="400" loading="lazy"><div class="t-card-body"><div class="t-card-cat">Bean Origins</div><h3>Yemen's Lost Coffees: Rediscovering the Birthplace of Café Culture</h3><p>Ancient dry-process traditions and wild heirloom trees on ancient terraces.</p></div></a>
    </div>

    <div id="tab-roasting" class="tab-panel" role="tabpanel">
      <a href="/roasting-craft" class="t-card"><img src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80" alt="Coffee roasting drum" width="600" height="400" loading="lazy"><div class="t-card-body"><div class="t-card-cat">Roasting Craft</div><h3>Maillard Reaction in Coffee: What Happens Between 150°C and 180°C</h3><p>The flavor-building chemistry happening inside every roasting drum.</p></div></a>
      <a href="/roasting-craft" class="t-card"><img src="https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=600&q=80" alt="Roast color comparison" width="600" height="400" loading="lazy"><div class="t-card-body"><div class="t-card-cat">Roasting Craft</div><h3>Development Time Ratio: The Number That Separates Good from Great Roasts</h3><p>Why DTR between 20–25% is the sweet spot for light specialty roasting.</p></div></a>
      <a href="/roasting-craft" class="t-card"><img src="https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=600&q=80" alt="Home coffee roaster" width="600" height="400" loading="lazy"><div class="t-card-body"><div class="t-card-cat">Roasting Craft</div><h3>Home Roasting in 2025: Which Machines Actually Deliver Consistent Profiles</h3><p>Tested reviews of drum, fluid-bed, and stovetop roasters.</p></div></a>
    </div>

    <div id="tab-cafe" class="tab-panel" role="tabpanel">
      <a href="/cafe-culture" class="t-card"><img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=80" alt="Specialty cafe interior" width="600" height="400" loading="lazy"><div class="t-card-body"><div class="t-card-cat">Café Culture</div><h3>Tokyo's Third-Wave Coffee Scene: 12 Cafés Redefining Precision</h3><p>From Shimokitazawa to Nakameguro — the obsessive attention to every variable.</p></div></a>
      <a href="/cafe-culture" class="t-card"><img src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=600&q=80" alt="Nordic coffee bar" width="600" height="400" loading="lazy"><div class="t-card-body"><div class="t-card-cat">Café Culture</div><h3>The Nordic Light Roast Revolution That Conquered the World</h3><p>How Copenhagen and Oslo redefined what specialty coffee could taste like.</p></div></a>
      <a href="/cafe-culture" class="t-card"><img src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600&q=80" alt="Cafe barista" width="600" height="400" loading="lazy"><div class="t-card-body"><div class="t-card-cat">Café Culture</div><h3>What Makes a Café "Specialty"? The SCA Standards Explained</h3><p>Cupping scores, traceability requirements, and the 80-point threshold.</p></div></a>
    </div>

    <div id="tab-gear" class="tab-panel" role="tabpanel">
      <a href="/equipment-gear" class="t-card"><img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80" alt="Coffee grinder burrs" width="600" height="400" loading="lazy"><div class="t-card-body"><div class="t-card-cat">Equipment</div><h3>Flat vs. Conical Burrs: Which Grinder Architecture Suits Your Brew Style</h3><p>The physics of particle distribution and its impact on cup clarity.</p></div></a>
      <a href="/equipment-gear" class="t-card"><img src="https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&q=80" alt="Coffee scale" width="600" height="400" loading="lazy"><div class="t-card-body"><div class="t-card-cat">Equipment</div><h3>The Best Coffee Scales Under $100 — Tested with 40+ Brews</h3><p>Response time, accuracy at 0.1g, and auto-tare performance ranked.</p></div></a>
      <a href="/equipment-gear" class="t-card"><img src="https://images.unsplash.com/photo-1521302080334-4bebac2763a6?w=600&q=80" alt="Gooseneck kettle" width="600" height="400" loading="lazy"><div class="t-card-body"><div class="t-card-cat">Equipment</div><h3>Variable Temperature Kettles: Why ±1°C Precision Matters More Than You Think</h3><p>Green tea at 70°C, white tea at 80°C, pourover coffee at 93°C — dialed in.</p></div></a>
    </div>

    <div id="tab-recipes" class="tab-panel" role="tabpanel">
      <a href="/recipes-drinks" class="t-card"><img src="https://images.unsplash.com/photo-1561047029-3000c68339ca?w=600&q=80" alt="Coffee cocktail" width="600" height="400" loading="lazy"><div class="t-card-body"><div class="t-card-cat">Recipes</div><h3>Espresso Martini Evolved: 5 Variations Using Single-Origin Shots</h3><p>Match spirit profiles to roast character for intentional complexity.</p></div></a>
      <a href="/recipes-drinks" class="t-card"><img src="https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=600&q=80" alt="Dalgona coffee" width="600" height="400" loading="lazy"><div class="t-card-body"><div class="t-card-cat">Recipes</div><h3>Seasonal Latte Syrups You Can Make in 10 Minutes</h3><p>Cardamom-brown sugar, roasted hazelnut, lavender honey — from scratch.</p></div></a>
      <a href="/recipes-drinks" class="t-card"><img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80" alt="Coffee food pairing" width="600" height="400" loading="lazy"><div class="t-card-body"><div class="t-card-cat">Recipes</div><h3>Coffee and Food Pairing Principles: A Sommelier's Approach</h3><p>Acidity, body, and sweetness — the same rules that govern wine also apply here.</p></div></a>
    </div>
  </div>
</section>

<!-- MASONRY GALLERY -->
<section class="masonry-section" aria-label="Featured imagery">
  <div class="container">
    <div class="section-label">Visual Stories</div>
    <h2 class="section-title" style="margin-bottom:24px;">Coffee from Every Angle</h2>
    <div class="masonry-grid">
      <a href="/bean-origins" class="m-item large"><img src="https://images.unsplash.com/photo-1500353391678-d7b57979d6d2?w=800&q=80" alt="Ethiopian coffee cherries on the branch" width="800" height="533" loading="lazy"><div class="m-overlay"><span class="m-label">Ethiopian Heirloom Cherries</span></div></a>
      <a href="/brewing-methods" class="m-item"><img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80" alt="Pour-over coffee" width="600" height="400" loading="lazy"><div class="m-overlay"><span class="m-label">Pour-Over Precision</span></div></a>
      <a href="/roasting-craft" class="m-item"><img src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80" alt="Coffee roasting" width="600" height="400" loading="lazy"><div class="m-overlay"><span class="m-label">Roasting Science</span></div></a>
      <a href="/cafe-culture" class="m-item wide"><img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80" alt="Specialty café interior" width="800" height="533" loading="lazy"><div class="m-overlay"><span class="m-label">Third-Wave Spaces</span></div></a>
      <a href="/equipment-gear" class="m-item tall"><img src="https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&q=80" alt="Coffee brewing equipment" width="600" height="400" loading="lazy"><div class="m-overlay"><span class="m-label">Precision Gear</span></div></a>
      <a href="/recipes-drinks" class="m-item"><img src="https://images.unsplash.com/photo-1561047029-3000c68339ca?w=600&q=80" alt="Coffee cocktail drinks" width="600" height="400" loading="lazy"><div class="m-overlay"><span class="m-label">Creative Recipes</span></div></a>
      <a href="/bean-origins" class="m-item"><img src="https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?w=600&q=80" alt="Coffee plantation" width="600" height="400" loading="lazy"><div class="m-overlay"><span class="m-label">Origin Journeys</span></div></a>
    </div>
  </div>
</section>

<!-- SPOTLIGHT -->
<section class="spotlight" aria-label="Featured story">
  <div class="container">
    <div class="spotlight-inner">
      <div>
        <div class="spot-badge">Editor's Spotlight</div>
        <h2>Why Water Chemistry Is the Most Underrated Variable in Specialty Coffee</h2>
        <p class="spotlight-desc">The same bag of Ethiopian Yirgacheffe tastes completely different brewed with London tap water versus filtered water versus Third Wave Water mineral packets. We ran 60 controlled brews to understand why.</p>
        <ul class="spot-bullets">
          <li>Magnesium extracts brightness and fruit; calcium extracts body and sweetness</li>
          <li>Total dissolved solids between 75–150 ppm is the SCA sweet spot</li>
          <li>Chlorine above 0.1 ppm actively suppresses delicate floral notes</li>
          <li>Carbonate hardness above 100 ppm flattens acidity in light roasts</li>
        </ul>
        <a href="/brewing-methods" class="spot-cta">Read the Full Investigation →</a>
      </div>
      <div class="spot-img">
        <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80" alt="Coffee brewing with precise water measurement" width="800" height="533" loading="lazy">
      </div>
    </div>
  </div>
</section>

<!-- HORIZONTAL SCROLL -->
<section class="scroll-section" aria-label="Recent articles">
  <div class="container">
    <div class="section-label">Recently Published</div>
    <h2 class="section-title">Fresh From Our Writers</h2>
    <div class="scroll-track" role="list">
      <a href="/roasting-craft" class="sc-card" role="listitem"><img src="https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=560&q=80" alt="Roast degree comparison" width="560" height="373" loading="lazy"><div class="sc-card-body"><div class="sc-cat">Roasting Craft</div><h3>First Crack Timing: The 30-Second Window That Defines Your Roast Profile</h3></div></a>
      <a href="/equipment-gear" class="sc-card" role="listitem"><img src="https://images.unsplash.com/photo-1521302080334-4bebac2763a6?w=560&q=80" alt="Coffee kettle" width="560" height="373" loading="lazy"><div class="sc-card-body"><div class="sc-cat">Equipment</div><h3>Hario V60 vs. Chemex vs. Kalita Wave: A Controlled Extraction Comparison</h3></div></a>
      <a href="/bean-origins" class="sc-card" role="listitem"><img src="https://images.unsplash.com/photo-1498804103079-a6351b050096?w=560&q=80" alt="Yemen coffee" width="560" height="373" loading="lazy"><div class="sc-card-body"><div class="sc-cat">Bean Origins</div><h3>Natural vs. Washed Processing: How Post-Harvest Method Shapes Your Cup</h3></div></a>
      <a href="/cafe-culture" class="sc-card" role="listitem"><img src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=560&q=80" alt="Nordic cafe" width="560" height="373" loading="lazy"><div class="sc-card-body"><div class="sc-cat">Café Culture</div><h3>The 15 Most Influential Specialty Roasters That Shaped Modern Coffee Culture</h3></div></a>
      <a href="/recipes-drinks" class="sc-card" role="listitem"><img src="https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=560&q=80" alt="Coffee drinks" width="560" height="373" loading="lazy"><div class="sc-card-body"><div class="sc-cat">Recipes</div><h3>Cascara: Brewing the Cherry Husk Tea That's Been in Yemen for Centuries</h3></div></a>
      <a href="/brewing-methods" class="sc-card" role="listitem"><img src="https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=560&q=80" alt="Cold brew" width="560" height="373" loading="lazy"><div class="sc-card-body"><div class="sc-cat">Brewing Methods</div><h3>AeroPress World Championship Recipes: 8 Winning Techniques Decoded</h3></div></a>
    </div>
  </div>
</section>

<!-- ANIMATED CTA -->
<section class="cta-section" aria-label="Newsletter signup">
  <h2>Deepen Your Coffee Knowledge</h2>
  <p>Join 50,000+ coffee lovers reading in-depth guides every week. No ads, no fluff — just serious specialty coffee content.</p>
  <div class="cta-btns">
    <a href="/brewing-methods" class="cta-btn1">Start with Brewing Methods</a>
    <a href="/author/team" class="cta-btn2">Meet Our Experts</a>
  </div>
</section>

<!-- FOOTER -->
<footer class="footer" role="contentinfo">
  <div class="container">
    <div class="footer-grid">
      <div>
        <div class="footer-brand">Bean Brew Digest</div>
        <p>Your definitive guide to specialty coffee — from farm to cup. We cover brewing science, origin stories, roasting craft, and the culture behind every great cup.</p>
      </div>
      <div>
        <div class="fcol-title">Explore</div>
        <ul>
          <li><a href="/brewing-methods">Brewing Methods</a></li>
          <li><a href="/bean-origins">Bean Origins</a></li>
          <li><a href="/roasting-craft">Roasting Craft</a></li>
          <li><a href="/cafe-culture">Café Culture</a></li>
        </ul>
      </div>
      <div>
        <div class="fcol-title">Resources</div>
        <ul>
          <li><a href="/equipment-gear">Equipment & Gear</a></li>
          <li><a href="/recipes-drinks">Recipes & Drinks</a></li>
          <li><a href="/sitemap/sitemapindex.xml">Sitemap</a></li>
        </ul>
      </div>
      <div>
        <div class="fcol-title">Company</div>
        <ul>
          <li><a href="/author/team">About Us</a></li>
          <li><a href="/">Contact</a></li>
        </ul>
      </div>
    </div>
    <div class="f-bottom">
      <p>&copy; 2026 Bean Brew Digest. All rights reserved.</p>
      <p>Made with <span class="heart">&hearts;</span> for coffee lovers</p>
    </div>
  </div>
</footer>

</main>

<script>
function switchTab(btn, panelId) {
  document.querySelectorAll('.tab-btn').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  btn.setAttribute('aria-selected','true');
  document.getElementById(panelId).classList.add('active');
}

// Counter animation
function animateCounters() {
  document.querySelectorAll('[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = target >= 1000 ? (current >= 1000 ? Math.floor(current/1000)+'K+' : Math.floor(current).toLocaleString()) : Math.floor(current)+(target > 6 ? '+' : '');
      if (current >= target) clearInterval(timer);
    }, 16);
  });
}

const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { animateCounters(); obs.disconnect(); } });
}, { threshold: 0.3 });
const trust = document.querySelector('.trust');
if (trust) obs.observe(trust);
</script>
</body>
</html>`;
