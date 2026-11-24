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
    const projects = S.projects || [];
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
  $('#fpImg').src = S.helmetPortrait || S.portrait;

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

  /* ---------- Helmet under the cursor: a soft liquid blob cut out of the helmet photo ---------- */
  const portraitBox = $('#heroPortrait');
  const altCv = $('#altCanvas'), altCtx = altCv.getContext('2d');
  const maskCv = document.createElement('canvas'), maskCtx = maskCv.getContext('2d');
  const altImg = new Image(); altImg.src = S.helmet || S.portrait;
  let cvW = 0, cvH = 0, cvDpr = 1, speed = 0, lastMx = 0, lastMy = 0;
  // The cursor works like a brush: it paints the helmet into a low-res field (1/SC of the size).
  // The paint slowly evaporates; a noisy threshold makes the edges ragged and lets the strokes
  // break into pieces as they melt — the way the helmet shows through on landonorris.com.
  const SC = 4;
  const fieldCv = document.createElement('canvas'), fieldCtx = fieldCv.getContext('2d');
  let fW = 1, fH = 1, fImg = null, fPix = null, F = null, painted = false;
  let bx = null, by = null;                      // previous brush position (grid px)
  function altSize() {
    cvDpr = Math.min(devicePixelRatio || 1, 1.5); cvW = portraitBox.offsetWidth; cvH = portraitBox.offsetHeight;
    altCv.width = maskCv.width = Math.max(1, Math.round(cvW * cvDpr)); altCv.height = maskCv.height = Math.max(1, Math.round(cvH * cvDpr));
    fW = Math.max(1, Math.ceil(cvW / SC)); fH = Math.max(1, Math.ceil(cvH / SC));
    fieldCv.width = fW; fieldCv.height = fH;
    fImg = fieldCtx.createImageData(fW, fH); fPix = new Uint32Array(fImg.data.buffer);
    F = new Float32Array(fW * fH); bx = by = null;
  }
  altSize(); addEventListener('resize', altSize);

  function stamp(cx, cy, sig, amt) {
    const rad = Math.ceil(sig * 2.6), inv = 1 / (2 * sig * sig);
    const x0 = Math.max(0, Math.floor(cx - rad)), x1 = Math.min(fW - 1, Math.ceil(cx + rad));
    const y0 = Math.max(0, Math.floor(cy - rad)), y1 = Math.min(fH - 1, Math.ceil(cy + rad));
    for (let y = y0; y <= y1; y++) {
      const dy = y - cy, row = y * fW;
      for (let x = x0; x <= x1; x++) {
        const dx = x - cx, i = row + x;
        const v = F[i] + amt * Math.exp(-(dx * dx + dy * dy) * inv);
        F[i] = v > 1.9 ? 1.9 : v;
      }
    }
    painted = true;
  }
  // brush: cx, cy in portrait px (or null = not painting), spd = cursor speed (px / frame)
  function paintHelmet(ts, cx, cy, spd) {
    if (!F || !altImg.naturalWidth) return;
    // 1) the paint evaporates
    if (painted) { let any = false; for (let i = 0; i < F.length; i++) { const v = F[i] * 0.979; F[i] = v < 0.02 ? 0 : v; if (v >= 0.02) any = true; } painted = any; }
    // 2) new strokes along the path since the last frame
    if (cx != null) {
      const gx = cx / SC, gy = cy / SC;
      const sig = (cvW * 0.062 / SC) * (1 + Math.min(spd / 35, 1.1));
      if (bx == null || Math.hypot(gx - bx, gy - by) > fW * 0.6) { bx = gx; by = gy; }
      const dist = Math.hypot(gx - bx, gy - by), steps = Math.max(1, Math.ceil(dist / (sig * 0.45)));
      for (let k = 1; k <= steps; k++) stamp(bx + (gx - bx) * k / steps, by + (gy - by) * k / steps, sig, 0.55);
      stamp(gx, gy, sig, 0.11);                 // resting cursor keeps a patch open
      bx = gx; by = gy;
    } else { bx = by = null; }

    altCtx.setTransform(1, 0, 0, 1, 0, 0); altCtx.clearRect(0, 0, altCv.width, altCv.height);
    if (!painted) return;
    // 3) ragged, liquid edge: the field is compared with a moving noise threshold
    fPix.fill(0);
    for (let y = 0; y < fH; y++) {
      const row = y * fW;
      for (let x = 0; x < fW; x++) {
        const f = F[row + x];
        if (f < 0.12) continue;
        const v = f + (noise(x * 0.085 + ts * 0.22, y * 0.085 - ts * 0.18) - 0.5) * 0.95
                    + (noise(x * 0.23 - ts * 0.45 + 40, y * 0.23 + ts * 0.3) - 0.5) * 0.4;
        if (v < 0.5) continue;
        const a = v >= 0.64 ? 255 : Math.round(255 * (v - 0.5) / 0.14);
        fPix[row + x] = (a << 24) >>> 0;
      }
    }
    fieldCtx.putImageData(fImg, 0, 0);
    const m = maskCtx;
    m.setTransform(1, 0, 0, 1, 0, 0); m.clearRect(0, 0, maskCv.width, maskCv.height);
    m.imageSmoothingEnabled = true; m.imageSmoothingQuality = 'high';
    m.drawImage(fieldCv, 0, 0, fW * SC * cvDpr, fH * SC * cvDpr);
    altCtx.drawImage(altImg, 0, 0, altCv.width, altCv.height);
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

      // helmet: the cursor paints it on desktop; on phones an invisible brush paints around the face, rests, and paints again
      if (p < 0.08 && !reduced) {
        const pr = portraitBox.getBoundingClientRect();
        const ts = time / 1000;
        speed = lerp(speed, Math.hypot(ptr.x - lastMx, ptr.y - lastMy), 0.25); lastMx = ptr.x; lastMy = ptr.y;
        let cx = null, cy = null;
        if (fine) {
          if (ptr.on) { cx = ptr.x - pr.left; cy = ptr.y - pr.top; }
        } else if (((ts + 1) % 5.5) < 2.6) {
          cx = pr.width * (0.5 + Math.sin(ts * 1.7) * 0.2);
          cy = pr.height * (0.4 + Math.sin(ts * 3.4) * 0.12);
        }
        paintHelmet(ts, cx, cy, fine ? speed : 14);
      } else if (painted) { F.fill(0); painted = false; altCtx.setTransform(1, 0, 0, 1, 0, 0); altCtx.clearRect(0, 0, altCv.width, altCv.height); }
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
