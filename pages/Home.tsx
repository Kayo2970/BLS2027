import React, { useEffect, useRef } from 'react';

// Reuses the same CloudFront asset bucket already used elsewhere in this app (see pages/DesignPro.tsx) -
// no new/invented URL, just the hero clip supplied for this page.
const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260818_072341_50851634-bbc3-4c33-9acc-7647d4db44aa.mp4';

const FAVICON_DATA_URI =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cg transform='rotate(-30 12 12)'%3E%3Ccircle cx='7.3' cy='3.2' r='1.45'/%3E%3Crect x='5.5' y='4.7' width='3.6' height='14.6' rx='1.8'/%3E%3Crect x='14.9' y='4.7' width='3.6' height='14.6' rx='1.8'/%3E%3Ccircle cx='16.7' cy='20.8' r='1.45'/%3E%3C/g%3E%3C/svg%3E";

const PAGE_TITLE = 'Vesper.ai — Operational AI Infrastructure';

const STYLES = `
html, body { background: #000000 !important; color: #ffffff; }

@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url("/vesper/inter.woff2") format("woff2");
}
@font-face {
  font-family: "Instrument Serif";
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url("/vesper/instrument-serif-italic.woff2") format("woff2");
}

:root{
  --bg:#000000;
  --text:#ffffff;
  --muted:#9a9a9a;
  --stat:#d8d8d8;
  --border:rgba(255,255,255,0.16);
  --border-soft:rgba(255,255,255,0.12);
  --logo:15.5px;
  --logo-mark:22px;
  --nav:14px;
  --nav-h:40px;
  --btn:13.5px;
  --btn-h:40px;
  --hero-btn-h:42px;
  --h1:48px;
  --lede:15.5px;
  --badge:12.5px;
  --stat-size:13.5px;
  --header-y:22px;
  --header-x:40px;
  --stats-x:72px;
  --stats-y:36px;
  --hero-gap:85px;
  --copy-max:860px;
  --lede-max:470px;
}

html, body { background:#000000; background:var(--bg,#000000); color:#ffffff; color:var(--text,#ffffff); }

.vesper-page, .vesper-page *, .vesper-page *::before, .vesper-page *::after { box-sizing:border-box; }
.vesper-page { margin:0; padding:0; }
html { scroll-behavior:smooth; }
.vesper-page{
  font-family:"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
  text-rendering:optimizeLegibility;
  overflow-x:hidden;
  position:relative;
}
.vesper-page a{ color:inherit; text-decoration:none; margin:0; padding:0; }
.vesper-page button{ font-family:inherit; margin:0; padding:0; }
.vesper-page p, .vesper-page h1, .vesper-page span, .vesper-page div { margin:0; padding:0; }

/* ---------- layer stack ---------- */
.vesper-page .hero-photo{
  position:fixed; inset:0; z-index:0; overflow:hidden;
  opacity:1;
}
.vesper-page .hero-photo video{
  position:absolute; inset:0; width:100%; height:100%; object-fit:cover;
}
.vesper-page .page{
  position:relative; z-index:1;
  display:grid;
  grid-template-rows:auto 1fr auto;
  min-height:100vh;
  min-height:100dvh;
}

.vesper-page .grain{
  position:fixed; inset:0; z-index:100; pointer-events:none;
  opacity:0.035; mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* ---------- header ---------- */
.vesper-page .header{
  display:grid; grid-template-columns:1fr auto 1fr; align-items:center;
  padding:var(--header-y) var(--header-x) 10px;
  z-index:50; position:relative;
}

.vesper-page .logo{
  display:inline-flex; align-items:center; gap:9px; justify-self:start;
  font-size:var(--logo); font-weight:600; letter-spacing:-0.03em; color:#fff;
}
.vesper-page .logo svg{ width:var(--logo-mark); height:var(--logo-mark); flex-shrink:0; }
.vesper-page .logo-suffix{ font-weight:400; }

.vesper-page #site-nav{
  display:flex; align-items:center; gap:8px; justify-self:center;
}
.vesper-page .nav-link{
  height:var(--nav-h); padding:0 18px; border-radius:7px; overflow:hidden; position:relative;
  display:inline-flex; align-items:center; justify-content:center;
  border:1px solid rgba(198,198,198,0.55);
  background:linear-gradient(105deg,#050505 0%,#2a2a2a 48%,#4a4a4a 100%);
  color:#f3f3f3; font-size:var(--nav); font-weight:400; letter-spacing:-0.01em; white-space:nowrap;
  transition:background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
}
.vesper-page .nav-link::before{
  content:""; position:absolute; inset:0;
  background:linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.16) 50%, transparent 70%);
  transform:translateX(-120%);
  transition:transform 0.6s ease;
}
.vesper-page .nav-link:hover::before{ transform:translateX(120%); }
.vesper-page .nav-link:hover{
  border-color:rgba(235,235,235,0.9);
  background:linear-gradient(105deg,#111 0%,#3a3a3a 45%,#6a6a6a 100%);
  box-shadow:0 0 18px rgba(200,210,230,0.18);
}

.vesper-page .header-right{ justify-self:end; display:flex; align-items:center; gap:10px; }

/* ---------- buttons ---------- */
.vesper-page .btn{
  position:relative; isolation:isolate; overflow:hidden;
  display:inline-flex; align-items:center; justify-content:center;
  height:var(--btn-h); padding:0 16px; border-radius:6px;
  font-size:var(--btn); font-weight:500; letter-spacing:-0.02em; line-height:1;
  white-space:nowrap; cursor:pointer;
  transition:background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease, color 0.35s ease, filter 0.35s ease;
}
.vesper-page .btn::after{
  content:""; position:absolute; inset:0;
  background:linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.45) 48%, transparent 76%);
  transform:translateX(-130%);
  transition:transform 0.65s ease;
}
.vesper-page .btn:hover::after{ transform:translateX(130%); }

.vesper-page .btn-solid{
  background:linear-gradient(180deg,#ffffff 0%,#e7e7e7 48%,#cfcfcf 100%);
  color:#111; border:1px solid #fff;
  box-shadow:inset 0 1px 0 rgba(255,255,255,0.95);
}
.vesper-page .btn-solid:hover{
  background:linear-gradient(180deg,#fff 0%,#f3f6ff 42%,#d5def2 100%);
  border-color:#f2f6ff;
  box-shadow:inset 0 1px 0 #fff, 0 0 22px rgba(186,208,255,0.35), 0 8px 18px rgba(255,255,255,0.12);
}
.vesper-page .hero .btn-solid:hover{
  box-shadow:inset 0 1px 0 #fff, 0 0 26px rgba(186,208,255,0.4), 0 8px 18px rgba(255,255,255,0.14);
}

.vesper-page .btn-ghost{
  background:linear-gradient(135deg, rgba(255,255,255,0.1), rgba(0,0,0,0.45) 50%, rgba(160,175,200,0.08));
  color:#fff; border:1px solid rgba(198,198,198,0.45);
  box-shadow:inset 0 1px 0 rgba(255,255,255,0.12);
}
.vesper-page .btn-ghost:hover{
  background:linear-gradient(135deg, rgba(210,225,255,0.18), rgba(0,0,0,0.35) 48%, rgba(180,195,220,0.16));
  border-color:rgba(220,230,255,0.75);
  box-shadow:inset 0 1px 0 rgba(255,255,255,0.22), 0 0 20px rgba(170,200,255,0.22);
}
.vesper-page .hero .btn-ghost{
  background:linear-gradient(135deg, rgba(255,255,255,0.12), rgba(0,0,0,0.5) 46%, rgba(150,170,200,0.1));
  border:1px solid rgba(198,198,198,0.55);
  backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px);
}
.vesper-page .hero .btn-ghost:hover{
  box-shadow:inset 0 1px 0 rgba(255,255,255,0.22), 0 0 24px rgba(170,200,255,0.28);
  border-color:rgba(220,230,255,0.8);
}
.vesper-page .hero-actions .btn{ height:var(--hero-btn-h); padding:0 18px; }

/* burger */
.vesper-page .burger{
  display:none; width:42px; height:42px; border-radius:6px;
  border:1px solid var(--border); background:rgba(8,8,8,0.55);
  z-index:60; align-items:center; justify-content:center;
  flex-direction:column; gap:5px; cursor:pointer;
  transition:border-color 0.25s ease, background 0.25s ease;
}
.vesper-page .burger:hover{ border-color:rgba(255,255,255,0.32); background:rgba(255,255,255,0.05); }
.vesper-page .burger span{ width:16px; height:1.5px; border-radius:1px; background:#fff; transition:transform 0.25s ease, opacity 0.2s ease; }
body.menu-open .vesper-page .burger span:nth-child(1){ transform:translateY(6.5px) rotate(45deg); }
body.menu-open .vesper-page .burger span:nth-child(2){ opacity:0; }
body.menu-open .vesper-page .burger span:nth-child(3){ transform:translateY(-6.5px) rotate(-45deg); }

/* ---------- hero ---------- */
.vesper-page .hero{
  display:flex; align-items:flex-end; justify-content:center;
  padding:8px 24px var(--hero-gap); min-height:0;
}
.vesper-page .hero-copy{
  position:relative; z-index:1; display:flex; flex-direction:column; align-items:center;
  text-align:center; max-width:var(--copy-max); width:100%;
}

.vesper-page .badge{
  display:inline-flex; align-items:center; gap:8px; margin-bottom:22px;
  padding:9px 15px; border:0; border-radius:5px;
  background:linear-gradient(90deg,#7d7d7d 0%,#2a2a2a 52%,#0a0a0a 100%);
  color:#f2f2f2; font-size:var(--badge); font-weight:400; letter-spacing:-0.01em;
}
.vesper-page .badge-star{ width:18px; height:20px; filter:drop-shadow(0 0 3px rgba(255,255,255,0.45)); flex-shrink:0; }

.vesper-page h1{
  font-family:"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-weight:500; letter-spacing:-0.045em; line-height:1.12; color:#fff;
  display:flex; flex-direction:column; align-items:center;
  font-size:var(--h1);
}
.vesper-page .headline-line{ display:block; overflow:hidden; padding:0.06em 0.15em 0.14em; }
.vesper-page h1 em{
  font-family:"Instrument Serif","Times New Roman",Times,serif;
  font-style:italic; font-weight:400; font-size:1.08em; letter-spacing:-0.03em;
  color:#9a9a9a;
}

.vesper-page .lede{
  max-width:var(--lede-max); margin-top:18px; color:#9a9a9a;
  font-size:var(--lede); font-weight:400; line-height:1.55; letter-spacing:-0.015em;
}

.vesper-page .hero-actions{ display:flex; flex-wrap:wrap; align-items:center; justify-content:center; gap:10px; margin-top:26px; }

/* ---------- stats footer ---------- */
.vesper-page .stats{
  display:flex; align-items:center; justify-content:space-between; gap:24px;
  padding:0 var(--stats-x) var(--stats-y);
  padding-bottom:max(var(--stats-y), env(safe-area-inset-bottom));
  color:#d8d8d8; position:relative; z-index:1;
}
.vesper-page .stat{ display:inline-flex; align-items:center; gap:14px; font-size:var(--stat-size); letter-spacing:-0.015em; white-space:nowrap; }
.vesper-page .stat-icon{ width:20px; height:20px; color:#e8e8e8; flex-shrink:0; }
.vesper-page .stat-icon-wide{ width:38px; height:21px; flex-shrink:0; }

/* ---------- menu backdrop ---------- */
.vesper-page .menu-backdrop{
  display:block; position:fixed; inset:0; z-index:40;
  background:rgba(8,8,8,0.42);
  opacity:0; visibility:hidden;
  transition:opacity 0.28s ease, backdrop-filter 0.28s ease;
}
body.menu-open .vesper-page .menu-backdrop{ opacity:1; visibility:visible; backdrop-filter:blur(24px); -webkit-backdrop-filter:blur(24px); }
body.menu-open{ overflow:hidden; }

/* ---------- entrance motion ---------- */
.vesper-page .appear{
  opacity:1;
  animation-duration:1.05s;
  animation-fill-mode:both;
  animation-timing-function:cubic-bezier(0.16,1,0.3,1);
  animation-delay:var(--d,0.08s);
}
.vesper-page .appear.is-in{ animation:none; opacity:1; transform:none; clip-path:none; filter:none; }

.vesper-page .appear--scale{ animation-name:vesper-in-scale; }
.vesper-page .appear--soft{ animation-name:vesper-in-soft; }
.vesper-page .appear--mask{ animation-name:vesper-in-mask; }
.vesper-page .appear--pop{ animation-name:vesper-in-pop; }
.vesper-page .appear--btn{ animation-name:vesper-in-btn; }
.vesper-page .appear--side{ animation-name:vesper-in-side; }
.vesper-page .appear--stat{ animation-name:vesper-in-stat; }

@keyframes vesper-in-scale{ from{ opacity:0; transform:scale(0.84); } to{ opacity:1; transform:scale(1); } }
@keyframes vesper-in-soft{ from{ opacity:0; transform:translateY(14px); } to{ opacity:1; transform:translateY(0); } }
@keyframes vesper-in-mask{ from{ opacity:0; transform:translateY(40%); } to{ opacity:1; transform:translateY(0); } }
@keyframes vesper-in-pop{ 0%{ opacity:0; transform:scale(0.9); } 70%{ opacity:1; transform:scale(1.03); } 100%{ opacity:1; transform:scale(1); } }
@keyframes vesper-in-btn{ from{ opacity:0; transform:translateY(18px) scale(0.94); } to{ opacity:1; transform:translateY(0) scale(1); } }
@keyframes vesper-in-side{ from{ opacity:0; transform:translateX(22px); } to{ opacity:1; transform:translateX(0); } }
@keyframes vesper-in-stat{ from{ opacity:0; transform:translateY(20px); } to{ opacity:1; transform:translateY(0); } }
@keyframes vesper-in-star{ 0%{ transform:scale(0.2) rotate(-50deg); } 65%{ transform:scale(1.2) rotate(8deg); } 100%{ transform:scale(1) rotate(0deg); } }
@keyframes vesper-in-em{ from{ opacity:0.35; filter:blur(4px); } to{ opacity:1; filter:blur(0); } }

.vesper-page .badge-star{ animation:vesper-in-star 0.9s cubic-bezier(0.16,1,0.3,1) 0.28s both; }
.vesper-page h1 em{ animation:vesper-in-em 1.2s cubic-bezier(0.16,1,0.3,1) 0.72s both; }

.vesper-page .logo{ --d:0.08s; }
.vesper-page .nav-link.nav-1{ --d:0.16s; }
.vesper-page .nav-link.nav-2{ --d:0.28s; }
.vesper-page .nav-link.nav-3{ --d:0.40s; }
.vesper-page .nav-link.nav-4{ --d:0.52s; }
.vesper-page .header-cta{ --d:0.34s; }
.vesper-page .burger{ --d:0.34s; }
.vesper-page .badge{ --d:0.22s; }
.vesper-page .headline-line.line-1{ --d:0.42s; }
.vesper-page .headline-line.line-2{ --d:0.62s; }
.vesper-page .lede{ --d:0.82s; animation-duration:1.25s; }
.vesper-page .hero-actions .btn-solid{ --d:0.96s; }
.vesper-page .hero-actions .btn-ghost{ --d:1.10s; }
.vesper-page .stat.stat-1{ --d:1.12s; }
.vesper-page .stat.stat-2{ --d:1.28s; }
.vesper-page .stat.stat-3{ --d:1.44s; }

@media (prefers-reduced-motion: reduce){
  .vesper-page, .vesper-page *, .vesper-page *::before, .vesper-page *::after{ transition:none !important; animation:none !important; }
  .vesper-page .appear, .vesper-page .hero-photo, .vesper-page .hero h1 em, .vesper-page .badge-star{
    opacity:1 !important; transform:none !important; clip-path:none !important; filter:none !important;
  }
}

/* ---------- responsive ---------- */
@media (min-width:1600px){
  .vesper-page{
    --logo:17px; --logo-mark:24px; --nav:15px; --nav-h:44px; --btn:15px; --btn-h:44px;
    --hero-btn-h:48px; --h1:64px; --lede:18px; --badge:13.5px; --stat-size:15px;
    --header-y:28px; --header-x:64px; --stats-x:96px; --stats-y:44px;
    --copy-max:980px; --lede-max:540px;
  }
  .vesper-page .nav-link{ padding:0 20px; }
  .vesper-page .badge{ margin-bottom:26px; }
  .vesper-page .lede{ margin-top:22px; }
  .vesper-page .hero-actions{ margin-top:30px; gap:12px; }
  .vesper-page .stat-icon{ width:22px; height:22px; }
  .vesper-page .stat-icon-wide{ width:45px; height:24px; }
}
@media (min-width:1920px){
  .vesper-page{
    --logo:18px; --logo-mark:26px; --nav:16px; --nav-h:48px; --btn:16px; --btn-h:48px;
    --hero-btn-h:52px; --h1:76px; --lede:20px; --badge:14.5px; --stat-size:16px;
    --header-y:32px; --header-x:80px; --stats-x:120px; --stats-y:52px;
    --copy-max:1120px; --lede-max:620px;
  }
  .vesper-page #site-nav{ gap:10px; }
  .vesper-page .nav-link{ padding:0 22px; }
  .vesper-page .btn{ padding:0 22px; }
  .vesper-page .badge{ padding:10px 15px; }
  .vesper-page .stat-icon-wide{ width:48px; height:26px; }
}
@media (min-width:2560px){
  .vesper-page{ --h1:88px; --lede:22px; --header-x:120px; --stats-x:160px; --copy-max:1280px; --lede-max:680px; }
}
@media (min-width:1280px) and (max-width:1599px){
  .vesper-page{ --h1:54px; --lede:16px; --header-x:48px; --stats-x:80px; --copy-max:900px; }
}
@media (min-width:901px) and (max-width:1279px){
  .vesper-page{
    --logo:15px; --nav:13px; --nav-h:36px; --btn:13px; --btn-h:38px; --hero-btn-h:40px;
    --h1:42px; --lede:15px; --badge:12px; --stat-size:12.5px;
    --header-y:16px; --header-x:28px; --stats-x:36px; --stats-y:28px;
    --hero-gap:64px; --copy-max:760px; --lede-max:440px;
  }
  .vesper-page .nav-link{ padding:0 14px; }
  .vesper-page .badge{ margin-bottom:16px; }
  .vesper-page .lede{ margin-top:14px; }
  .vesper-page .hero-actions{ margin-top:20px; }
}
@media (min-width:901px) and (max-height:850px){
  .vesper-page{ --header-y:14px; --stats-y:24px; --hero-gap:48px; --h1:40px; }
  .vesper-page .badge{ margin-bottom:12px; }
  .vesper-page .lede{ margin-top:12px; }
  .vesper-page .hero-actions{ margin-top:16px; }
}
@media (min-width:901px) and (max-height:720px){
  .vesper-page{ --h1:34px; --lede:14px; --hero-gap:32px; --stats-y:18px; --nav-h:30px; --btn-h:34px; --hero-btn-h:36px; }
  .vesper-page .badge{ margin-bottom:8px; }
}
@media (min-width:901px){
  html.vesper-lock, body.vesper-lock{ height:100%; overflow:hidden; }
  .vesper-page .page{ height:100vh; height:100dvh; overflow:hidden; }
  .vesper-page .burger{ display:none; }
}
@media (max-width:900px){
  .vesper-page .header{
    grid-template-columns:1fr auto auto; gap:8px;
    padding-top:max(var(--header-y), calc(env(safe-area-inset-top) + 10px));
    padding-left:max(var(--header-x), calc(env(safe-area-inset-left) + 14px));
    padding-right:max(var(--header-x), calc(env(safe-area-inset-right) + 14px));
  }
  .vesper-page .logo, .vesper-page .header-right, .vesper-page .burger{ z-index:80; }
  .vesper-page .burger{ display:flex; }
  .vesper-page #site-nav{
    display:none;
  }
  body.menu-open .vesper-page #site-nav{
    display:flex; position:fixed; inset:0; z-index:45; background:transparent;
    flex-direction:column; align-items:center; justify-content:center; text-align:center;
    gap:12px; padding:96px 22px 32px;
    padding-top:max(96px, calc(env(safe-area-inset-top) + 88px));
  }
  body.menu-open .vesper-page #site-nav .nav-link{
    width:100%; height:56px; font-size:19px; border-radius:10px;
  }
  .vesper-page .hero{ padding:20px 20px 64px; align-items:flex-end; }
  .vesper-page .stats{ flex-direction:column; gap:16px; white-space:normal; }
  .vesper-page .stat{ white-space:normal; }
  .vesper-page .hero-copy, .vesper-page .lede{ max-width:100%; }
  .vesper-page{
    --logo:16px; --btn:15px; --btn-h:46px; --hero-btn-h:48px; --h1:36px; --lede:16.5px;
    --badge:13.5px; --stat-size:15px; --header-y:16px; --header-x:18px;
    --stats-x:20px; --stats-y:28px; --hero-gap:36px;
  }
}
@media (max-width:560px){
  .vesper-page{ --h1:34px; --lede:16px; --header-x:16px; }
  .vesper-page .hero-actions{ flex-direction:column; }
  .vesper-page .hero-actions .btn{ width:100%; }
}
`;

const Home: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = PAGE_TITLE;

    const faviconEl = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    const previousFavicon = faviconEl?.getAttribute('href') ?? null;
    if (faviconEl) faviconEl.setAttribute('href', FAVICON_DATA_URI);

    // Self-hosted Inter/Instrument Serif woff2 files aren't present, so load the documented
    // Google Fonts fallback for this page only.
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900&family=Instrument+Serif:ital@1&display=swap';
    document.head.appendChild(fontLink);

    // Lock scroll on desktop, matching the standalone spec (html/body height:100%; overflow:hidden at >=901px)
    document.documentElement.classList.add('vesper-lock');
    document.body.classList.add('vesper-lock');

    const root = rootRef.current;
    const cleanups: Array<() => void> = [];
    if (root) {
      const appearEls: HTMLElement[] = [];
      root.querySelectorAll('.appear').forEach((el) => appearEls.push(el as HTMLElement));
      const heroPhoto = root.querySelector<HTMLElement>('.hero-photo');

      appearEls.forEach((el) => {
        const handler = () => el.classList.add('is-in');
        el.addEventListener('animationend', handler, { once: true });
        cleanups.push(() => el.removeEventListener('animationend', handler));
      });

      const raf1 = requestAnimationFrame(() => {
        const raf2 = requestAnimationFrame(() => {
          let stillNeedsFallback = false;
          appearEls.forEach((el) => {
            const anims = el.getAnimations ? el.getAnimations() : [];
            const running = anims.some((a) => a.playState === 'running' || a.playState === 'finished');
            if (!running) stillNeedsFallback = true;
          });
          if (stillNeedsFallback) {
            appearEls.forEach((el) => el.classList.add('is-in'));
            if (heroPhoto) heroPhoto.classList.add('is-in');
          }
        });
        cleanups.push(() => cancelAnimationFrame(raf2));
      });
      cleanups.push(() => cancelAnimationFrame(raf1));

      const burger = root.querySelector<HTMLButtonElement>('#burger');
      const nav = root.querySelector<HTMLElement>('#site-nav');

      const openMenu = () => {
        document.body.classList.add('menu-open');
        burger?.setAttribute('aria-expanded', 'true');
        burger?.setAttribute('aria-label', 'Close menu');
      };
      const closeMenu = () => {
        document.body.classList.remove('menu-open');
        burger?.setAttribute('aria-expanded', 'false');
        burger?.setAttribute('aria-label', 'Open menu');
      };
      const toggleMenu = () => {
        if (document.body.classList.contains('menu-open')) closeMenu();
        else openMenu();
      };

      if (burger) {
        burger.addEventListener('click', toggleMenu);
        cleanups.push(() => burger.removeEventListener('click', toggleMenu));
      }

      const handleNavClick = (e: MouseEvent) => {
        if ((e.target as HTMLElement).closest('a')) closeMenu();
      };
      if (nav) {
        nav.addEventListener('click', handleNavClick);
        cleanups.push(() => nav.removeEventListener('click', handleNavClick));
      }

      const handleKeydown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') closeMenu();
      };
      document.addEventListener('keydown', handleKeydown);
      cleanups.push(() => document.removeEventListener('keydown', handleKeydown));

      const mq = window.matchMedia('(min-width: 901px)');
      const handleResize = () => {
        if (mq.matches) closeMenu();
      };
      mq.addEventListener?.('change', handleResize);
      window.addEventListener('resize', handleResize);
      cleanups.push(() => {
        mq.removeEventListener?.('change', handleResize);
        window.removeEventListener('resize', handleResize);
      });
    }

    return () => {
      cleanups.forEach((fn) => fn());
      document.body.classList.remove('menu-open');
      document.documentElement.classList.remove('vesper-lock');
      document.body.classList.remove('vesper-lock');
      document.title = previousTitle;
      if (faviconEl && previousFavicon !== null) faviconEl.setAttribute('href', previousFavicon);
      fontLink.remove();
    };
  }, []);

  return (
    <div className="vesper-page" ref={rootRef}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div className="grain" aria-hidden="true" />

      <div className="hero-photo" aria-hidden="true">
        <video autoPlay muted loop playsInline src={VIDEO_URL} />
      </div>

      <div className="page">
        <div className="menu-backdrop" aria-hidden="true" />

        <header className="header">
          <a className="logo appear appear--scale" href="#top" aria-label="Vesper.ai">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <g transform="rotate(-30 12 12)">
                <circle cx="7.3" cy="3.2" r="1.45" />
                <rect x="5.5" y="4.7" width="3.6" height="14.6" rx="1.8" />
                <rect x="14.9" y="4.7" width="3.6" height="14.6" rx="1.8" />
                <circle cx="16.7" cy="20.8" r="1.45" />
              </g>
            </svg>
            <span>
              Vesper<span className="logo-suffix">.ai</span>
            </span>
          </a>

          <nav id="site-nav" aria-label="Primary">
            <a className="nav-link nav-1 appear appear--scale" href="#benefits">Benefits</a>
            <a className="nav-link nav-2 appear appear--soft" href="#how-it-works">How It Works</a>
            <a className="nav-link nav-3 appear appear--scale" href="#faqs">FAQs</a>
            <a className="nav-link nav-4 appear appear--soft" href="#pricing">Pricing</a>
          </nav>

          <div className="header-right">
            <a className="btn btn-solid header-cta appear appear--scale" href="#start">Start for Free</a>
            <button className="burger appear appear--scale" id="burger" aria-controls="site-nav" aria-expanded="false" aria-label="Open menu">
              <span></span><span></span><span></span>
            </button>
          </div>
        </header>

        <main className="hero" id="top">
          <div className="hero-copy">
            <div className="badge appear appear--pop">
              <svg className="badge-star" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <path d="M12 2.6C12.55 2.6 12.88 3.15 13.08 4.7c.62 4.7 1.52 5.6 6.22 6.22 1.55.2 2.1.53 2.1 1.08s-.55.88-2.1 1.08c-4.7.62-5.6 1.52-6.22 6.22-.2 1.55-.53 2.1-1.08 2.1s-.88-.55-1.08-2.1c-.62-4.7-1.52-5.6-6.22-6.22C3.15 12.88 2.6 12.55 2.6 12s.55-.88 2.1-1.08c4.7-.62 5.6-1.52 6.22-6.22C11.12 3.15 11.45 2.6 12 2.6Z" />
              </svg>
              <span>Operational AI Infrastructure</span>
            </div>

            <h1>
              <span className="headline-line line-1 appear appear--mask">Train <em>AI agents</em> on your</span>
              <span className="headline-line line-2 appear appear--mask">workflows in minutes.</span>
            </h1>

            <p className="lede appear appear--soft">Deploy adaptive AI agents that learn, execute, and scale operational tasks across your business.</p>

            <div className="hero-actions">
              <a className="btn btn-solid appear appear--btn" href="#start">Start for Free</a>
              <a className="btn btn-ghost appear appear--side" href="#demo">See it in action</a>
            </div>
          </div>
        </main>

        <footer className="stats">
          <div className="stat stat-1 appear appear--stat">
            <svg className="stat-icon" viewBox="0 0 24 24" aria-hidden="true">
              <defs>
                <linearGradient id="vesperPillA" x1="3" y1="2" x2="14" y2="22">
                  <stop offset="0" stopColor="#ffffff" stopOpacity="0.38" />
                  <stop offset="1" stopColor="#3a3a3a" stopOpacity="0.62" />
                </linearGradient>
                <linearGradient id="vesperPillB" x1="3" y1="2" x2="14" y2="22">
                  <stop offset="0" stopColor="#3a3a3a" stopOpacity="0.38" />
                  <stop offset="1" stopColor="#ffffff" stopOpacity="0.62" />
                </linearGradient>
              </defs>
              <rect x="3.4" y="2.6" width="7.2" height="18.8" rx="3.6" fill="url(#vesperPillA)" />
              <rect x="13.4" y="2.6" width="7.2" height="18.8" rx="3.6" fill="url(#vesperPillB)" />
              <rect x="9.2" y="10.9" width="5.6" height="2.2" rx="1.1" fill="#4a4a4a" />
            </svg>
            <span>4.2M+ workflows automated</span>
          </div>

          <div className="stat stat-2 appear appear--stat">
            <svg className="stat-icon" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="2.4" y="2.4" width="19.2" height="19.2" rx="6.2" fill="#ffffff" />
              <path d="M12 7.1v7.4" stroke="#111" strokeWidth="1.85" strokeLinecap="round" />
              <path d="M8.15 12.35L12 16.2l3.85-3.85" stroke="#111" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            <span>92% reduction in manual operations</span>
          </div>

          <div className="stat stat-3 appear appear--stat">
            <svg className="stat-icon-wide" viewBox="0 0 40 22" aria-hidden="true">
              <circle cx="10.2" cy="11" r="9.2" fill="#2b2b2b" />
              <polygon points="4.4,6.4 7,3.4 7.6,7.6" fill="#2b2b2b" />
              <polygon points="16,6.4 13.4,3.4 12.8,7.6" fill="#2b2b2b" />
              <ellipse cx="10.2" cy="12.1" rx="4.15" ry="3.7" fill="#f4f4f4" />
              <circle cx="8.5" cy="11.6" r="0.7" fill="#1a1a1a" />
              <circle cx="11.9" cy="11.6" r="0.7" fill="#1a1a1a" />

              <circle cx="20.2" cy="11" r="9.2" fill="#ffffff" />
              <circle cx="17.6" cy="10.4" r="1.7" fill="#111111" />
              <circle cx="22.8" cy="10.4" r="1.7" fill="#111111" />
              <ellipse cx="20.2" cy="13.1" rx="1.2" ry="0.9" fill="#c9c9c9" />
              <path d="M17.2 15.4 Q20.2 17.4 23.2 15.4" stroke="#111111" strokeWidth="1.2" fill="none" strokeLinecap="round" />

              <circle cx="30.2" cy="11" r="9.2" fill="#f26b1d" />
              <text x="30.2" y="15.1" fontFamily="Inter, sans-serif" fontSize="12.5" fontWeight="700" fill="#ffffff" textAnchor="middle">e</text>
            </svg>
            <span>180+ operational teams onboarded</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
