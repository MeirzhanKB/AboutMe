/* Meirzhan — portfolio. Content lives in config.js, the chat demo in demo.js. */
(() => {
  const S = window.SITE || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const mixed = (s) => esc(s).replace(/\*(.+?)\*/g, '<span class="em">$1</span>');   // grotesk caps + *serif accent*
  const two = (s) => esc(s).replace(/\*(.+?)\*/g, '<span class="g">$1</span>');   // *grey part* of a headline
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- Language ---------- */
  const UI = {
    ru: { cta: 'Написать', scroll: 'Листай вниз', visit: 'Открыть сайт', discuss: 'Обсудить проект', business: 'Деловые запросы', pages: 'Страницы', follow: 'Я в сети',
          nextTitle: 'Следующий *проект* — ваш', menu: ['Главная', 'Обо мне', 'Проекты', 'AI-демо'] },
    kz: { cta: 'Жазу', scroll: 'Төмен айналдыр', visit: 'Сайтты ашу', discuss: 'Жобаны талқылау', business: 'Іскерлік сұраулар', pages: 'Беттер', follow: 'Желіде',
          nextTitle: 'Келесі *жоба* — сіздікі', menu: ['Басты бет', 'Мен туралы', 'Жобалар', 'AI-демо'] },
    en: { cta: 'Get in touch', scroll: 'Scroll down', visit: 'Visit site', discuss: 'Discuss a project', business: 'Business inquiries', pages: 'Pages', follow: 'Follow',
          nextTitle: 'Your project *could be* next', menu: ['Home', 'About', 'Projects', 'AI demo'] }
  };
  const LANGS = Object.keys(UI);
  const store = { get() { try { return localStorage.getItem('lang'); } catch (e) { return null; } }, set(v) { try { localStorage.setItem('lang', v); } catch (e) { /* storage blocked */ } } };
  let LANG = [new URLSearchParams(location.search).get('lang'), store.get(), S.defaultLang, 'ru'].find((l) => LANGS.includes(l));
  const t = (v) => (v && typeof v === 'object' ? (v[LANG] ?? v.ru ?? '') : (v ?? ''));
  const ui = (k) => UI[LANG][k];

  /* ---------- Render ---------- */
  const ARROW = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18L18 6M8 6h10v10"/></svg>';
  function render() {
    document.documentElement.lang = LANG === 'kz' ? 'kk' : LANG;
    document.title = `${t(S.name)} — ${t(S.role)}`;
    $$('.lang button').forEach((b) => b.classList.toggle('active', b.dataset.lang === LANG));
    $$('[data-ui]').forEach((el) => { el.textContent = ui(el.dataset.ui); });

    $('#hdName').textContent = t(S.name);
    $('#hdRole').textContent = t(S.role);

    const H = S.hero || {};
    $('#heroGiant').textContent = t(S.name);
    $('#heroTitle').innerHTML = two(t(H.title));
    $('#heroLead').textContent = t(H.lead);
    $('#heroStatus').textContent = t(H.status);
    $('#heroHint').textContent = t(fine ? H.hint : (H.hintTouch || H.hint));
    const M = S.marquee || {};
    $('#mqCap').textContent = t(M.caption);
    const row = (items) => { const h = (items || []).map((x) => `<span class="mq-item">${esc(x)}<i class="dot"></i></span>`).join(''); return h + h + h + h; };
    $('#mq1').innerHTML = row(t(M.row1));
    $('#mq2').innerHTML = row(t(M.row2));

    const A = S.about || {};
    $('#aboutLabel').textContent = t(A.label);
    $('#aboutText').innerHTML = two(t(A.text));
    $('#aboutFacts').innerHTML = (A.facts || []).map((f, i) => `<div class="fact" data-reveal style="--d:${(i * 0.08).toFixed(2)}s"><b>${esc(f.big)}</b><span>${esc(t(f.label))}</span></div>`).join('');
    $('#aboutHobby').textContent = t(A.hobby);

    // projects grid
    $('#projTitle').innerHTML = mixed(t(S.projectsTitle));
    const projects = (S.projects || []).filter((p) => !p.hidden);   // AI bots are hidden from people (described for AI search in llms.txt)
    const filters = (S.projectFilters || []).filter((f) => f.id === 'all' || projects.some((p) => p.cat === f.id));
    $('#pfilters').innerHTML = filters.map((f) => {
      const n = f.id === 'all' ? projects.length : projects.filter((p) => p.cat === f.id).length;
      return `<button role="tab" data-f="${esc(f.id)}">${esc(t(f.label))}<sup>${String(n).padStart(2, '0')}</sup></button>`;
    }).join('');
    const catLabel = (id) => t(((S.projectFilters || []).find((f) => f.id === id) || {}).label) || '';
    const ARR = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 13L13 3M6 3h7v7" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';
    $('#pgrid').innerHTML = projects.map((p, i) => {
      const ext = /^https?:/.test(p.link || '');
      const tag = p.link ? 'a' : 'div';
      const href = p.link ? ` href="${esc(p.link)}"${ext ? ' target="_blank" rel="noopener"' : ''}` : '';
      const badge = ext
        ? `<span class="hc-live"><i></i>${esc(p.link.replace(/^https?:\/\//, '').replace(/\/$/, ''))} ↗</span>`
        : `<span class="hc-tags">${(p.tags || []).slice(0, 2).map((x) => `<span>${esc(x)}</span>`).join('')}</span>`;
      return `<${tag} class="pcard hcard" data-cat="${esc(p.cat || '')}" data-reveal style="--d:${((i % 4) * 0.08).toFixed(2)}s"${href}><div class="hc-in">
        <span class="hc-idx">${String(i + 1).padStart(2, '0')}</span>${badge}
        <div class="hc-obj"><div class="device"><div class="screen" style="background-image:url('${esc(p.image)}')"></div></div></div>
        <div class="hc-photo" style="background-image:url('${esc(p.image)}')"></div>
        <div class="hc-desc">${esc(t(p.desc))}</div>
        <div class="hc-cap"><em>${esc(catLabel(p.cat))}</em><b>${esc(t(p.title))}</b></div>
      </div></${tag}>`;
    }).join('') + (S.ndaCard ? `<div class="pcard hcard nda" data-cat="*" data-reveal><div class="hc-in">
        <span class="hc-idx">NDA</span>
        <div class="hc-obj"><svg class="lock" viewBox="0 0 64 64" aria-hidden="true"><rect x="14" y="28" width="36" height="26" rx="5"/><path d="M22 28v-8a10 10 0 0 1 20 0v8"/><circle cx="32" cy="40" r="3.5"/><path d="M32 43.5v5"/></svg></div>
        <div class="hc-desc nda-desc">${esc(t(S.ndaCard.desc))}</div>
        <div class="hc-cap"><em>NDA</em><b>${esc(t(S.ndaCard.title))}</b></div>
      </div></div>` : '') + `<div class="pcard hcard cta" data-cat="*" data-reveal><div class="hc-in">
        <span class="hc-idx">${String(projects.length + 1).padStart(2, '0')}</span>
        <div class="pc-big">${mixed(ui('nextTitle'))}</div>
        <a class="btn btn-ink js-mail"><span>${esc(ui('discuss'))}</span>${ARR}</a>
      </div></div>`;
    applyFilter();

    // footer
    $('#footTitle').innerHTML = mixed(t(S.motto));
    const ids = ['#top', '#about', '#projects', '#demo'];
    $('#footPages').innerHTML = ui('menu').map((m, i) => `<a href="${ids[i]}">${esc(m)}</a>`).join('');
    $('#footSocial').innerHTML = [S.instagram && S.instagram.url && `<a href="${esc(S.instagram.url)}" target="_blank" rel="noopener">Instagram</a>`, S.email && `<a href="mailto:${esc(S.email)}">Email</a>`].filter(Boolean).join('');
    const logos = (S.stack || []).map((x) => `<span class="lg">${esc(x)}</span>`).join('');
    $('#footLogos').innerHTML = logos + logos + logos + logos;
    $('#footName').textContent = t(S.name);
    $('#footLoc').textContent = t(S.location);
    $$('.js-mail').forEach((a) => { a.href = `mailto:${S.email}`; });
    $$('.js-mail-text').forEach((a) => { a.href = `mailto:${S.email}`; a.textContent = S.email; });
    $('#year').textContent = new Date().getFullYear();
    fitFootTitle(); fitGiant();

    observe();
  }

  /* projects filter */
  let curFilter = 'all';
  function applyFilter() {
    $$('#pgrid .pcard').forEach((c) => c.classList.toggle('hide', !(curFilter === 'all' || c.dataset.cat === curFilter || c.dataset.cat === '*')));
    $$('#pfilters button').forEach((b) => b.classList.toggle('active', b.dataset.f === curFilter));
  }
  document.addEventListener('click', (e) => {
    const b = e.target.closest('#pfilters button');
    if (!b) return;
    curFilter = b.dataset.f; applyFilter();
  });
  /* footer title always fits in one line */
  function fitFootTitle() {
    const ft = $('#footTitle');
    ft.style.fontSize = '';
    const maxW = ft.parentElement.clientWidth * 0.94;
    if (ft.offsetWidth > maxW) ft.style.fontSize = `${parseFloat(getComputedStyle(ft).fontSize) * maxW / ft.offsetWidth}px`;
  }
  /* the giant name behind the portrait always spans ~90% of the screen, whatever the language */
  function fitGiant() {
    const g = $('#heroGiant');
    g.style.fontSize = '100px';
    const w = g.scrollWidth || 1;
    const target = innerWidth * (innerWidth < 992 ? 0.92 : 0.88);
    g.style.fontSize = `${(100 * target / w).toFixed(2)}px`;
  }
  const fitAll = () => { fitFootTitle(); fitGiant(); };
  addEventListener('resize', fitAll);
  if (document.fonts) document.fonts.ready.then(fitAll);

  $('#hpBase').src = S.portrait;
  $('#fpImg').src = S.footPortrait || S.portrait;

  document.addEventListener('click', (e) => {
    const b = e.target.closest('.lang button');
    if (!b || b.dataset.lang === LANG) return;
    LANG = b.dataset.lang; store.set(LANG); render();
  });

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });
  // a clip-pathed [data-draw] (the signature) is invisible to the observer, so watch its parent instead
  const drawIO = new IntersectionObserver((es) => {
    es.forEach((e) => { if (e.isIntersecting) { e.target.querySelectorAll(':scope > [data-draw]').forEach((d) => d.classList.add('in')); drawIO.unobserve(e.target); } });
  }, { threshold: 0.3 });
  function observe() {
    $$('[data-reveal]:not(.in)').forEach((el) => io.observe(el));
    $$('[data-draw]:not(.in)').forEach((el) => drawIO.observe(el.parentElement));
  }

  /* ---------- Smooth scroll ---------- */
  let lenis = null;
  if (window.Lenis && !reduced) lenis = new window.Lenis({ lerp: 0.1, smoothWheel: true });
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || a.getAttribute('href').length < 2) return;
    const el = document.querySelector(a.getAttribute('href'));
    if (!el) return;
    e.preventDefault();
    lenis ? lenis.scrollTo(el, { duration: 1.4 }) : el.scrollIntoView({ behavior: 'smooth' });
  });

  /* ---------- Hero contour lines (quiet, bend around the cursor) ---------- */
  const cv = $('#heroLines'), cx = cv.getContext('2d');
  const PERM = new Uint8Array(512);
  { let sd = 11; const a = [...Array(256).keys()]; for (let i = 255; i > 0; i--) { sd = (sd * 16807) % 2147483647; const j = sd % (i + 1); [a[i], a[j]] = [a[j], a[i]]; } for (let i = 0; i < 512; i++) PERM[i] = a[i & 255]; }
  const lerp = (a, b, k) => a + (b - a) * k;
  const fade = (x) => x * x * (3 - 2 * x);
  const noise = (x, y) => {
    const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
    const h = (i, j) => PERM[(PERM[(xi + i) & 255] + yi + j) & 255] / 255;
    return lerp(lerp(h(0, 0), h(1, 0), fade(xf)), lerp(h(0, 1), h(1, 1), fade(xf)), fade(yf));
  };
  const CELL = 20, LEVELS = Array.from({ length: 9 }, (_, i) => 0.2 + i * 0.075);
  let W = 0, Hh = 0, dpr = 1, cols = 0, rows = 0, field = null;
  const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
  function size() {
    const r = cv.getBoundingClientRect();
    dpr = Math.min(devicePixelRatio || 1, 1.5); W = r.width; Hh = r.height;
    cv.width = Math.round(W * dpr); cv.height = Math.round(Hh * dpr);
    cols = Math.ceil(W / CELL) + 1; rows = Math.ceil(Hh / CELL) + 1; field = new Float32Array(cols * rows);
  }
  size(); addEventListener('resize', size);
  const ptr = { x: innerWidth / 2, y: innerHeight / 2, on: false };
  addEventListener('pointermove', (e) => { ptr.x = e.clientX; ptr.y = e.clientY; ptr.on = true; if (fine) { const r = cv.getBoundingClientRect(); mouse.tx = e.clientX - r.left; mouse.ty = e.clientY - r.top; } }, { passive: true });
  document.addEventListener('pointerleave', () => { ptr.on = false; });

  /* ---------- Under the cursor: the portrait rebuilt from code characters ("how AI sees me") ---------- */
  const portraitBox = $('#heroPortrait');
  const altCv = $('#altCanvas'), altCtx = altCv.getContext('2d');
  const maskCv = document.createElement('canvas'), maskCtx = maskCv.getContext('2d');
  // "How AI sees me": the portrait is rebuilt from code characters; the cursor ribbon reveals it
  const altImg = new Image(); altImg.src = S.portrait;
  const asciiCv = document.createElement('canvas'), asciiCtx = asciiCv.getContext('2d');
  const asciiBase = document.createElement('canvas'), asciiBaseCtx = asciiBase.getContext('2d');
  const RAMP = '.:-=+*x#%@';                     // dark → bright
  const CODE = '01<>/{}[]=+;:$#*';
  let aCols = 0, aRows = 0, aCell = 8, aLum = null, aAlpha = null, asciiReady = false, lastScramble = 0;
  function buildAscii() {
    if (!altImg.naturalWidth || !cvW) return;
    aCell = cvW < 560 ? 7 : 9;
    aCols = Math.ceil(cvW / aCell); aRows = Math.ceil(cvH / aCell);
    const sm = document.createElement('canvas'); sm.width = aCols; sm.height = aRows;
    const sc = sm.getContext('2d', { willReadFrequently: true });
    // the portrait is drawn the same way as the <img> (contain, bottom) so the characters line up with the face
    const ar = altImg.naturalWidth / altImg.naturalHeight;
    let dw = aCols, dh = aCols / ar; if (dh > aRows) { dh = aRows; dw = dh * ar; }
    sc.drawImage(altImg, (aCols - dw) / 2, aRows - dh, dw, dh);
    const d = sc.getImageData(0, 0, aCols, aRows).data;
    aLum = new Float32Array(aCols * aRows); aAlpha = new Uint8Array(aCols * aRows);
    for (let i = 0; i < aCols * aRows; i++) {
      aLum[i] = (0.299 * d[i * 4] + 0.587 * d[i * 4 + 1] + 0.114 * d[i * 4 + 2]) / 255;
      aAlpha[i] = d[i * 4 + 3];
    }
    // contrast stretch so the face reads well in characters
    let lo = 1, hi = 0;
    for (let i = 0; i < aLum.length; i++) if (aAlpha[i] > 128) { lo = Math.min(lo, aLum[i]); hi = Math.max(hi, aLum[i]); }
    for (let i = 0; i < aLum.length; i++) { const v = Math.min(1, Math.max(0, (aLum[i] - lo) / Math.max(0.01, hi - lo))); aLum[i] = Math.pow(v, 1.7); }
    asciiBase.width = asciiCv.width = altCv.width; asciiBase.height = asciiCv.height = altCv.height;
    const c = asciiBaseCtx;
    c.setTransform(cvDpr, 0, 0, cvDpr, 0, 0);
    // underneath: the real face, darkened and washed in electric blue — the characters sit on top of it
    { const ar2 = altImg.naturalWidth / altImg.naturalHeight; let w2 = cvW, h2 = cvW / ar2; if (h2 > cvH) { h2 = cvH; w2 = h2 * ar2; }
      c.drawImage(altImg, (cvW - w2) / 2, cvH - h2, w2, h2); }
    c.globalCompositeOperation = 'source-atop';
    c.fillStyle = 'rgba(22,28,96,0.58)'; c.fillRect(0, 0, cvW, cvH);
    c.fillStyle = 'rgba(140,149,255,0.07)';                // faint scanlines, only on the silhouette
    for (let y = 0; y < cvH; y += 3) c.fillRect(0, y, cvW, 1);
    c.globalCompositeOperation = 'source-over';
    c.font = `700 ${aCell * 1.3}px ui-monospace, "SFMono-Regular", Consolas, monospace`;
    c.textAlign = 'center'; c.textBaseline = 'middle';
    for (let y = 0; y < aRows; y++) for (let x = 0; x < aCols; x++) drawCell(c, x, y, false);
    asciiReady = true;
  }
  function drawCell(c, x, y, scramble) {
    const i = y * aCols + x;
    if (aAlpha[i] < 60) return;
    const L = aLum[i];
    if (!scramble && L < 0.08) return;
    const ch = scramble ? CODE[(Math.random() * CODE.length) | 0] : RAMP[Math.min(RAMP.length - 1, Math.round(L * (RAMP.length - 1)))];
    if (ch === ' ') return;
    // colour: deep blue in the shadows → electric blue → warm white in the highlights, a few orange sparks
    const k = L;
    const r = Math.round(77 + (246 - 77) * k), g = Math.round(91 + (241 - 91) * k), b = Math.round(255 + (234 - 255) * k);
    c.fillStyle = scramble ? '#FF5A1F' : `rgba(${r},${g},${b},${0.6 + 0.4 * k})`;
    c.fillText(ch, x * aCell + aCell / 2, y * aCell + aCell / 2 + 0.5);
  }
  function frameAscii(now) {
    if (!asciiReady) buildAscii();
    if (!asciiReady) return false;
    const c = asciiCtx;
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.drawImage(asciiBase, 0, 0);
    // a few characters flicker into code every frame — it feels alive, like data streaming
    if (now - lastScramble > 60) {
      lastScramble = now;
      c.setTransform(cvDpr, 0, 0, cvDpr, 0, 0);
      c.font = `700 ${aCell * 1.3}px ui-monospace, "SFMono-Regular", Consolas, monospace`;
      c.textAlign = 'center'; c.textBaseline = 'middle';
      for (let n = 0; n < 60; n++) {
        const x = (Math.random() * aCols) | 0, y = (Math.random() * aRows) | 0;
        if (aAlpha[y * aCols + x] < 60) continue;
        c.drawImage(asciiBase, x * aCell * cvDpr, y * aCell * cvDpr, aCell * cvDpr, aCell * cvDpr, x * aCell, y * aCell, aCell, aCell);
        drawCell(c, x, y, true);
      }
    }
    return true;
  }
  altImg.addEventListener('load', () => { asciiReady = false; });
  let cvW = 0, cvH = 0, cvDpr = 1;
  function altSize() {
    cvDpr = Math.min(devicePixelRatio || 1, 2); cvW = portraitBox.offsetWidth; cvH = portraitBox.offsetHeight;
    altCv.width = maskCv.width = Math.max(1, Math.round(cvW * cvDpr)); altCv.height = maskCv.height = Math.max(1, Math.round(cvH * cvDpr));
  }
  altSize(); addEventListener('resize', () => { altSize(); asciiReady = false; });

  // Like landonorris.com: the cursor leaves a thick ribbon with round ends and razor-sharp edges.
  // The ribbon follows the exact path of the mouse; its tail gets shorter as old points expire.
  const LIFE = 1.05;                         // seconds a point of the ribbon lives
  const ribbon = [];                         // { x, y, t } in portrait px
  let sx = null, sy = null, headR = 0, wasOn = false;
  function paintHelmet(now, cx, cy) {
    const t = now / 1000;
    const W = cvW * 0.15;                    // ribbon width ≈ 40% of the face
    if (cx != null) {
      if (sx == null || !wasOn) { sx = cx; sy = cy; }
      sx += (cx - sx) * 0.38; sy += (cy - sy) * 0.38;     // a touch of smoothing, the ribbon stays glued to the cursor
      const last = ribbon[ribbon.length - 1];
      if (!last || Math.hypot(sx - last.x, sy - last.y) > 3) ribbon.push({ x: sx, y: sy, t });
      else last.t = t;                                     // resting cursor: the head stays open
      headR += (W / 2 - headR) * 0.25;
    } else {
      headR += (0 - headR) * 0.12;
    }
    wasOn = cx != null;
    while (ribbon.length && t - ribbon[0].t > LIFE) ribbon.shift();

    altCtx.setTransform(1, 0, 0, 1, 0, 0); altCtx.clearRect(0, 0, altCv.width, altCv.height);
    if (!altImg.naturalWidth || (!ribbon.length && headR < 0.5)) return;
    if (!frameAscii(now)) return;

    const m = maskCtx;
    m.setTransform(cvDpr, 0, 0, cvDpr, 0, 0); m.clearRect(0, 0, cvW, cvH);
    m.fillStyle = m.strokeStyle = '#000'; m.lineCap = 'round'; m.lineJoin = 'round';
    // the ribbon: constant width, the very end gets a little thinner as it expires
    for (let i = 1; i < ribbon.length; i++) {
      const p0 = ribbon[i - 1], p1 = ribbon[i];
      const age = Math.min(1, (t - p0.t) / LIFE);
      m.lineWidth = W * (age < 0.75 ? 1 : 1 - (age - 0.75) / 0.25 * 0.6);
      m.beginPath(); m.moveTo(p0.x, p0.y); m.lineTo(p1.x, p1.y); m.stroke();
    }
    // the head under the cursor (also after the mouse stops) — melts away when the cursor leaves
    const h = ribbon[ribbon.length - 1];
    if (h && headR > 0.5) { m.beginPath(); m.arc(h.x, h.y, headR, 0, Math.PI * 2); m.fill(); }

    altCtx.drawImage(asciiCv, 0, 0, altCv.width, altCv.height);
    altCtx.globalCompositeOperation = 'destination-in'; altCtx.drawImage(maskCv, 0, 0); altCtx.globalCompositeOperation = 'source-over';
  }
  function lines(time) {
    const ts = time / 1000;
    mouse.x = lerp(mouse.x < -999 ? mouse.tx : mouse.x, mouse.tx, 0.08); mouse.y = lerp(mouse.y < -999 ? mouse.ty : mouse.y, mouse.ty, 0.08);
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const x = i * CELL, y = j * CELL;
      let v = noise(x * 0.003 + ts * 0.04, y * 0.003 - ts * 0.03) * 0.75 + noise(x * 0.007 - ts * 0.05 + 30, y * 0.007) * 0.25;
      const dx = x - mouse.x, dy = y - mouse.y;
      v += 0.18 * Math.exp(-(dx * dx + dy * dy) / (2 * 160 * 160));
      field[j * cols + i] = v;
    }
    cx.setTransform(dpr, 0, 0, dpr, 0, 0); cx.clearRect(0, 0, W, Hh);
    cx.lineWidth = 1; cx.strokeStyle = 'rgba(246, 241, 234, 0.07)';
    for (const L of LEVELS) {
      cx.beginPath();
      for (let j = 0; j < rows - 1; j++) for (let i = 0; i < cols - 1; i++) {
        const a = field[j * cols + i], b = field[j * cols + i + 1], d = field[(j + 1) * cols + i], e = field[(j + 1) * cols + i + 1];
        const idx = (a > L ? 8 : 0) | (b > L ? 4 : 0) | (e > L ? 2 : 0) | (d > L ? 1 : 0);
        if (idx === 0 || idx === 15) continue;
        const x = i * CELL, y = j * CELL;
        const T = [x + CELL * (L - a) / (b - a), y], R = [x + CELL, y + CELL * (L - b) / (e - b)];
        const B = [x + CELL * (L - d) / (e - d), y + CELL], Lf = [x, y + CELL * (L - a) / (d - a)];
        const s = (p, q) => { cx.moveTo(p[0], p[1]); cx.lineTo(q[0], q[1]); };
        switch (idx) {
          case 1: case 14: s(Lf, B); break; case 2: case 13: s(B, R); break; case 3: case 12: s(Lf, R); break;
          case 4: case 11: s(T, R); break; case 5: s(Lf, T); s(B, R); break; case 6: case 9: s(T, B); break;
          case 7: case 8: s(Lf, T); break; case 10: s(Lf, B); s(T, R); break;
        }
      }
      cx.stroke();
    }
  }

  /* ---------- Main loop ---------- */
  const header = $('#header'), intro = $('#top'), card = $('#heroCard'), sig = $('#sigHero'), mqRows = $('.mq-rows');
  const fadeEls = [$('#heroLeft'), $('#heroRight'), $('#heroGiant')];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const themed = $$('[data-theme]');
  let lastY = scrollY;
  function tick(time) {
    if (lenis) lenis.raf(time);
    const y = scrollY, vh = innerHeight, mob = innerWidth < 992;

    // intro: the poster shrinks into a grey card, the marquee shows around it, the signature is drawn by scroll
    const ir = intro.getBoundingClientRect();
    if (ir.bottom > 0) {
      const p = clamp(-ir.top / (ir.height - vh));
      const shrink = 1 - Math.pow(1 - clamp(p / 0.55), 3);
      const ix = (mob ? 17 : 33) * shrink, iy = (mob ? 23 : 20) * shrink;
      if (!mob) portraitBox.style.left = `${(62 - 12 * shrink).toFixed(2)}%`; else portraitBox.style.left = '';
      const lift = mob ? 0 : clamp((p - 0.62) / 0.38);
      card.style.clipPath = `inset(${iy.toFixed(2)}% ${ix.toFixed(2)}% ${iy.toFixed(2)}% ${ix.toFixed(2)}% round ${(shrink * 1.2).toFixed(2)}rem)`;
      card.style.transform = `translate3d(0, ${(-lift * vh * 0.3).toFixed(1)}px, 0) scale(${(1 - lift * 0.3).toFixed(3)})`;
      card.style.filter = `grayscale(${clamp(shrink * 1.2).toFixed(2)})`;
      const fade = clamp(1 - p / 0.12);
      fadeEls.forEach((el) => { el.style.opacity = fade; });
      mqRows.style.transform = `translate3d(0, ${(-lift * vh * 0.1).toFixed(1)}px, 0)`;
      const q = clamp((p - 0.4) / 0.36);
      sig.style.clipPath = `inset(-10% ${((1 - q) * 100).toFixed(2)}% -10% -5%)`;

      // code-portrait ribbon: follows the cursor on desktop; on phones an invisible finger draws loops over the face, rests, and draws again
      if (p < 0.08 && !reduced) {
        const pr = portraitBox.getBoundingClientRect();
        const ts = time / 1000;
        let cx = null, cy = null;
        if (fine) {
          if (ptr.on) { cx = ptr.x - pr.left; cy = ptr.y - pr.top; }
        } else if (((ts + 1) % 5) < 2.6) {
          cx = pr.width * (0.5 + Math.sin(ts * 2.1) * 0.17);
          cy = pr.height * (0.4 + Math.sin(ts * 4.2) * 0.1);
        }
        paintHelmet(time, cx, cy);
      } else if (ribbon.length || headR > 0.5) { ribbon.length = 0; headR = 0; altCtx.setTransform(1, 0, 0, 1, 0, 0); altCtx.clearRect(0, 0, altCv.width, altCv.height); }
      if (p < 0.95 && !reduced) lines(time);
    }

    // header: colour follows the section under it; hides while scrolling down on phones
    let theme = 'light';
    for (const s of themed) { const r = s.getBoundingClientRect(); if (r.top <= 40 && r.bottom > 40) { theme = s.dataset.theme; break; } }
    header.classList.toggle('on-dark', theme === 'dark');
    header.classList.toggle('scrolled', y > 40);
    // over the orange frame of the footer the header switches to dark ink
    const fr = $('#contact').getBoundingClientRect(), pr = $('.foot-panel').getBoundingClientRect();
    header.classList.toggle('on-accent', fr.top <= 40 && pr.top > 40);
    if (mob) {
      const dy = y - lastY;
      if (y < vh * 0.3 || dy < -6) header.classList.remove('hide');
      else if (dy > 6) header.classList.add('hide');
    } else header.classList.remove('hide');
    lastY = y;
    requestAnimationFrame(tick);
  }

  render();
  requestAnimationFrame(() => document.body.classList.add('ready'));
  requestAnimationFrame(tick);
})();
