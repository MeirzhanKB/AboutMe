(() => {
  const S = window.SITE || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const isMobile = () => innerWidth < 992;
  const rem = () => parseFloat(getComputedStyle(document.documentElement).fontSize);
  const ARROW = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 13L13 3M6 3h7v7" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';

  /* ---------- Interface texts ---------- */
  const UI = {
    ru: { cta: 'Написать', discuss: 'Обсудить проект', business: 'Деловые запросы', scroll: 'Листай', pages: 'Страницы', follow: 'Я в сети',
          menu: ['Главная', 'Обо мне', 'Путь', 'Проекты', 'Контакты'] },
    en: { cta: 'Get in touch', discuss: 'Discuss a project', business: 'Business inquiries', scroll: 'Scroll', pages: 'Pages', follow: 'Follow',
          menu: ['Home', 'About', 'Path', 'Projects', 'Contact'] },
    kz: { cta: 'Жазу', discuss: 'Жобаны талқылау', business: 'Іскерлік сұраулар', scroll: 'Айналдыр', pages: 'Беттер', follow: 'Желіде',
          menu: ['Басты бет', 'Мен туралы', 'Жол', 'Жобалар', 'Байланыс'] }
  };
  const MENU_IDS = ['#top', '#about', '#story', '#projects', '#contact'];
  const LANGS = Object.keys(UI);
  const store = {
    get() { try { return localStorage.getItem('lang'); } catch (e) { return null; } },
    set(v) { try { localStorage.setItem('lang', v); } catch (e) { /* storage unavailable */ } }
  };
  let LANG = [new URLSearchParams(location.search).get('lang'), store.get(), S.defaultLang, 'ru'].find((l) => LANGS.includes(l));
  const t = (v) => (v && typeof v === 'object' && !Array.isArray(v) ? (v[LANG] ?? v.ru ?? '') : (v ?? ''));
  const ui = (k) => UI[LANG][k];

  /* ---------- Topographic background (generated, seeded) ---------- */
  function topo(color, opacity) {
    let seed = 11;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const W = 1760, H = 1100;
    const centers = [[260, 260], [1380, 330], [820, 900], [1650, 1050], [-40, 980]];
    let d = '';
    for (const [cx, cy] of centers) {
      const ph = [rnd() * 6, rnd() * 6, rnd() * 6], amp = [0.10 + rnd() * 0.08, 0.05 + rnd() * 0.05, 0.03 + rnd() * 0.03];
      for (let k = 1; k <= 9; k++) {
        const r0 = k * (46 + rnd() * 10);
        const pts = [];
        for (let j = 0; j < 18; j++) {
          const a = (j / 18) * Math.PI * 2;
          const r = r0 * (1 + amp[0] * Math.sin(2 * a + ph[0] + k * 0.15) + amp[1] * Math.sin(3 * a + ph[1]) + amp[2] * Math.sin(5 * a + ph[2] - k * 0.1));
          pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.78]);
        }
        const n = pts.length;
        d += `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
        for (let j = 0; j < n; j++) {
          const p0 = pts[(j - 1 + n) % n], p1 = pts[j], p2 = pts[(j + 1) % n], p3 = pts[(j + 2) % n];
          const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
          const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
          d += `C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
        }
        d += 'Z';
      }
    }
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${W}' height='${H}' viewBox='0 0 ${W} ${H}'><path d='${d}' fill='none' stroke='${color}' stroke-opacity='${opacity}' stroke-width='1.3'/></svg>`;
    return `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}")`;
  }
  document.documentElement.style.setProperty('--topo', topo('#14162B', 0.09));
  document.documentElement.style.setProperty('--topo-dark', topo('#F6F1EA', 0.06));

  /* ---------- Helpers ---------- */
  // "*word*" -> serif accent word; inner=true wraps each word for the line-mask reveal
  function words(s, inner = false) {
    const out = [];
    let prevSpace = true;
    String(s || '').split(/(\*[^*]+\*)/).forEach((part) => {
      if (!part) return;
      const em = part.startsWith('*') && part.endsWith('*');
      const glueFirst = !prevSpace && !/^\s/.test(part);
      (em ? part.slice(1, -1) : part).split(/\s+/).filter(Boolean).forEach((w, i) => out.push({ w, em, glue: i === 0 && glueFirst }));
      prevSpace = /\s$/.test(part);
    });
    return out.map((o, i) => {
      const body = inner ? `<span style="--i:${i}">${esc(o.w)}</span>` : esc(o.w);
      return (i && !o.glue ? ' ' : '') + `<span class="w${o.em ? ' em' : ''}">${body}</span>`;
    }).join('');
  }
  const img = (src, alt = '') => `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy">`;
  const P = S.photos || {};

  /* ---------- Static (language-independent) setup ---------- */
  $('#hpBase').src = P.base; $('#hpAlt').src = P.alt;
  $('#fpBase').src = P.base; $('#fpAlt').src = P.alt;
  $('#pathsImg').src = P.helmet2 || P.alt;
  $('#breakImg').src = P.breakPhoto || P.studio;
  $('#year').textContent = new Date().getFullYear();
  const mailto = S.email ? `mailto:${S.email}` : '#contact';
  $$('.js-mail').forEach((a) => { a.href = mailto; });
  $$('.js-mail-text').forEach((a) => { a.href = mailto; a.textContent = S.email || ''; });
  const insta = S.instagram || {};
  $('#instaBtn').href = insta.url || '#';
  $('#instaHandle1').textContent = $('#instaHandle2').textContent = insta.handle || 'Instagram';
  const socialLinks = [
    insta.url && `<a href="${esc(insta.url)}" target="_blank" rel="noopener">Instagram</a>`,
    S.email && `<a href="${esc(mailto)}">Email</a>`
  ].filter(Boolean).join('');
  $('#menuSocial').innerHTML = socialLinks;
  $('#footSocial').innerHTML = socialLinks;

  const stackHtml = (S.stack || []).map((x) => `<span class="stack-item">${esc(x)}</span>`).join('');
  $('#stTrack').innerHTML = stackHtml + stackHtml;

  // Socials fan: studio portrait in the middle, life photos around it
  const fanPhotos = (P.fan || []).filter(Boolean);
  $('#fan').innerHTML = fanPhotos.map((src) => `<a class="fan-card" href="${esc(insta.url || '#')}" target="_blank" rel="noopener">${img(src)}</a>`).join('');

  /* ---------- Reveal observer ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      io.unobserve(en.target);
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -6% 0px' });
  // clip-path hides [data-draw] completely, so the observer would never see it: watch its parent instead
  const drawIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      let k = 0;
      en.target.querySelectorAll('[data-draw], [data-wipe]').forEach((d) => {
        if (d.parentElement !== en.target || d.classList.contains('in')) return;
        if (d.hasAttribute('data-wipe')) d.style.setProperty('--wd', `${(k++) * 0.12}s`);
        d.classList.add('in');
      });
      drawIO.unobserve(en.target);
    });
  }, { threshold: 0.25 });
  const observe = () => {
    $$('[data-reveal]:not(.in), .mf-text:not(.in), .reveal-img:not(.in)').forEach((el) => io.observe(el));
    $$('[data-draw]:not(.in), [data-wipe]:not(.in)').forEach((el) => drawIO.observe(el.parentElement));
  };

  /* ---------- Language-dependent render ---------- */
  function render() {
    const name = t(S.name);
    document.documentElement.lang = LANG === 'kz' ? 'kk' : LANG;
    document.title = `${name} — ${t(S.role)}`;
    $$('.lang button').forEach((b) => b.classList.toggle('active', b.dataset.lang === LANG));
    $$('[data-ui]').forEach((el) => { el.textContent = ui(el.dataset.ui); });

    $('#wm1').textContent = name;
    $('#wm2').textContent = t(S.role);
    $('#loaderName').textContent = `${name} — ${t(S.role)}`;
    $('#footName').textContent = name;
    $('#footLoc').textContent = t(S.location);

    const menu = ui('menu');
    $('#menuLinks').innerHTML = menu.map((m, i) => `<a href="${MENU_IDS[i]}"><small>0${i + 1}</small><span class="roll"><span>${esc(m)}</span><span>${esc(m)}</span></span></a>`).join('');
    $('#footPages').innerHTML = menu.slice(0, 4).map((m, i) => `<a href="${MENU_IDS[i]}">${esc(m)}</a>`).join('');

    // hero widget
    const W = S.widget || {};
    $('#wEyebrow').textContent = t(W.eyebrow);
    $('#wTitle').textContent = t(W.title);
    $('#wSub').textContent = t(W.sub);
    $('#wStatus').textContent = t(W.status);

    // marquee
    const M = S.marquee || {};
    $('#mqCap').textContent = t(M.caption);
    const row = (items) => { const h = items.map((x) => `<span class="mq-item">${esc(x)}<i class="dot"></i></span>`).join(''); return h + h + h + h; };
    $('#mq1').innerHTML = row(t(M.row1) || []);
    $('#mq2').innerHTML = row(t(M.row2) || []);

    // manifesto
    $('#mfEyebrow').textContent = t(S.manifesto?.eyebrow);
    const mf = $('#mfText');
    mf.innerHTML = words(t(S.manifesto?.text), true);

    // story track (chronological)
    const st = S.story || {};
    const item = (it) => {
      if (it.type === 'chapter') return `<div class="t-chapter"><span class="n">${esc(it.n)}</span><h3 data-wipe>${esc(t(it.title))}</h3></div>`;
      if (it.type === 'text') return `<div class="t-text"><p data-wipe>${words(t(st.text))}</p></div>`;
      if (it.type === 'stats') return `<div class="t-stats">${(st.stats || []).map((x) => `<div class="t-stat" data-reveal><b>${esc(t(x.big))}</b><span class="eyebrow">${esc(t(x.label))}</span></div>`).join('')}</div>`;
      return `<figure class="t-photo" style="width:${it.w}rem;height:${it.h}rem;margin-top:${it.y * 1.1}rem">
        <figcaption class="eyebrow"><span class="cap-bar">${esc(t(it.cap))}</span></figcaption>
        <div class="ph reveal-img" style="height:calc(100% - 1.6rem)">${img(it.src, t(it.cap))}</div></figure>`;
    };
    $('#trackInner').innerHTML = `
      <div class="t-quote"><span class="eyebrow">${esc(t(st.eyebrow))}</span><p data-wipe>${words(t(st.quote))}</p><span class="sig" data-draw></span></div>
      ${(st.items || []).map(item).join('')}`;

    // work / life
    $('#pathsGrid').innerHTML = (S.paths || []).map((p, i) => `
      <div class="path">
        <h3 class="path-title"><span class="p-small" data-wipe>${esc(t(p.small))}</span><span class="p-big" data-wipe>${esc(t(p.big))}</span><span class="script" data-draw>${esc(t(p.script))}</span></h3>
        <p>${esc(t(p.text))}</p>
        <a class="round-btn" href="${esc(p.link)}" aria-label="${esc(t(p.big))}">${ARROW}</a>
      </div>`).join('');

    $('#breakCap').innerHTML = words(t(S.breakCaption));

    // projects
    $('#projTitle').innerHTML = words(t(S.projectsTitle));
    $('#pgrid').innerHTML = (S.projects || []).map((p, i) => {
      const tag = p.link ? 'a' : 'div';
      const href = p.link ? ` href="${esc(p.link)}" target="_blank" rel="noopener"` : '';
      return `<${tag} class="pcard" data-reveal style="--d:${(i % 3) * 0.1}s"${href}><div class="pc-in">
        <span class="eyebrow pc-idx">${String(i + 1).padStart(2, '0')}</span>
        <span class="pc-tags">${(p.tags || []).slice(0, 2).map((x) => `<span>${esc(x)}</span>`).join('')}</span>
        <div class="pc-shot"><div class="reveal-img" style="height:100%">${img(p.image, t(p.title))}</div></div>
        <div class="pc-foot"><h3>${esc(t(p.title))}</h3><p>${esc(t(p.desc))}</p></div>
      </div></${tag}>`;
    }).join('');

    // featured
    const F = S.featured || {};
    $('#ftEyebrow').textContent = t(F.eyebrow);
    $('#ftTitle').innerHTML = words(t(F.title));
    $('#ftText').textContent = t(F.text);
    const shots = F.shots || [];
    $('#ftCollage').innerHTML = `
      ${shots[0] ? `<div class="ft-shot s1" data-speed="-0.08"><div class="reveal-img" style="--blk:var(--cream-3);height:100%">${img(shots[0])}</div></div>` : ''}
      ${shots[1] ? `<div class="ft-shot s2" data-speed="0.12"><div class="reveal-img" style="--blk:var(--cream-3);height:100%">${img(shots[1])}</div></div>` : ''}`;

    // stack + socials + footer
    $('#stTitle').innerHTML = words(t(S.stackTitle));
    $('#stText').textContent = t(S.stackText);
    $('#stScript').textContent = t(S.stackScript);
    $('#socTitle').innerHTML = words(t(S.socialsTitle));
    $('#footTitle').innerHTML = words(t(S.motto));

    parallaxEls = $$('[data-speed]');
    observe();
    layout();
  }

  /* ---------- Layout-dependent sizes ---------- */
  const track = $('#story'), trackInner = $('#trackInner');
  function layout() {
    if (isMobile()) { track.style.height = ''; }
    else { track.style.height = `${trackInner.scrollWidth - innerWidth + innerHeight}px`; }
    const ft = $('#footTitle');
    ft.style.fontSize = '';
    const maxW = ft.parentElement.clientWidth * 0.94;
    if (ft.offsetWidth > maxW) ft.style.fontSize = `${parseFloat(getComputedStyle(ft).fontSize) * maxW / ft.offsetWidth}px`;
  }

  /* ---------- Language switch ---------- */
  document.addEventListener('click', (e) => {
    const b = e.target.closest('.lang button');
    if (!b || b.dataset.lang === LANG) return;
    LANG = b.dataset.lang;
    store.set(LANG);
    render();
  });

  /* ---------- Smooth scroll, anchors, menu ---------- */
  let lenis = null;
  if (window.Lenis && !reduced) { lenis = new window.Lenis({ lerp: 0.09, smoothWheel: true }); lenis.stop(); }
  const closeMenu = () => {
    if (!document.body.classList.contains('menu-open')) return;
    document.body.classList.remove('menu-open');
    lenis && lenis.start();
  };
  $('#menuBtn').addEventListener('click', () => {
    const open = document.body.classList.toggle('menu-open');
    if (lenis) open ? lenis.stop() : lenis.start();
  });
  addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || a.getAttribute('href').length < 2) return;
    const el = document.querySelector(a.getAttribute('href'));
    if (!el) return;
    e.preventDefault();
    closeMenu();
    lenis ? lenis.scrollTo(el, { duration: 1.6 }) : el.scrollIntoView({ behavior: 'smooth' });
  });

  /* ---------- Hero: second look revealed under the cursor ---------- */
  const hero = $('#top'), portrait = $('#heroPortrait'), alt = $('#hpAlt');
  const mouse = { x: innerWidth / 2, y: innerHeight / 2, on: false };
  const trail = Array.from({ length: 7 }, () => ({ x: 0.5, y: 0.35 }));
  let R = 0;
  addEventListener('pointermove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; mouse.on = true; }, { passive: true });
  document.addEventListener('pointerleave', () => { mouse.on = false; });

  /* ---------- Hero: contour lines that slowly flow and bend around the cursor ---------- */
  const topoCv = $('#topoCanvas'), topoCtx = topoCv.getContext('2d');
  const PERM = new Uint8Array(512);
  { let sd = 7; const a = [...Array(256).keys()]; for (let i = 255; i > 0; i--) { sd = (sd * 16807) % 2147483647; const j = sd % (i + 1); [a[i], a[j]] = [a[j], a[i]]; } for (let i = 0; i < 512; i++) PERM[i] = a[i & 255]; }
  const fade = (x) => x * x * (3 - 2 * x);
  const vnoise = (x, y) => {
    const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
    const h = (i, j) => PERM[(PERM[(xi + i) & 255] + yi + j) & 255] / 255;
    const u = fade(xf), v = fade(yf);
    return lerp(lerp(h(0, 0), h(1, 0), u), lerp(h(0, 1), h(1, 1), u), v);
  };
  const topoMouse = { x: -9999, y: -9999 };
  let topoW = 0, topoH = 0, topoDpr = 1, field = null, cols = 0, rows = 0;
  const CELL = 18;
  function topoResize() {
    const r = topoCv.getBoundingClientRect();
    topoDpr = Math.min(devicePixelRatio || 1, 1.5);
    topoW = r.width; topoH = r.height;
    topoCv.width = Math.round(topoW * topoDpr); topoCv.height = Math.round(topoH * topoDpr);
    cols = Math.ceil(topoW / CELL) + 1; rows = Math.ceil(topoH / CELL) + 1;
    field = new Float32Array(cols * rows);
  }
  topoResize();
  addEventListener('resize', topoResize);
  const LEVELS = Array.from({ length: 11 }, (_, i) => 0.18 + i * 0.065);
  function drawTopo(time) {
    const ts = time / 1000;
    const mx = topoMouse.x, my = topoMouse.y, sig2 = 2 * 170 * 170;
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const x = i * CELL, y = j * CELL;
        let v = vnoise(x * 0.0035 + ts * 0.05, y * 0.0035 - ts * 0.035) * 0.7
              + vnoise(x * 0.008 - ts * 0.07 + 40, y * 0.008 + ts * 0.04) * 0.3;
        const dx = x - mx, dy = y - my;
        v += 0.22 * Math.exp(-(dx * dx + dy * dy) / sig2);      // a soft hill under the cursor
        field[j * cols + i] = v;
      }
    }
    const c = topoCtx;
    c.setTransform(topoDpr, 0, 0, topoDpr, 0, 0);
    c.clearRect(0, 0, topoW, topoH);
    c.lineWidth = 1;
    c.strokeStyle = 'rgba(20, 22, 43, 0.13)';
    for (const L of LEVELS) {
      c.beginPath();
      for (let j = 0; j < rows - 1; j++) {
        for (let i = 0; i < cols - 1; i++) {
          const a = field[j * cols + i], b = field[j * cols + i + 1], d = field[(j + 1) * cols + i], e = field[(j + 1) * cols + i + 1];
          const idx = (a > L ? 8 : 0) | (b > L ? 4 : 0) | (e > L ? 2 : 0) | (d > L ? 1 : 0);
          if (idx === 0 || idx === 15) continue;
          const x = i * CELL, y = j * CELL;
          const top = [x + CELL * (L - a) / (b - a), y], right = [x + CELL, y + CELL * (L - b) / (e - b)];
          const bot = [x + CELL * (L - d) / (e - d), y + CELL], left = [x, y + CELL * (L - a) / (d - a)];
          const seg = (p1, p2) => { c.moveTo(p1[0], p1[1]); c.lineTo(p2[0], p2[1]); };
          switch (idx) {
            case 1: case 14: seg(left, bot); break;
            case 2: case 13: seg(bot, right); break;
            case 3: case 12: seg(left, right); break;
            case 4: case 11: seg(top, right); break;
            case 5: seg(left, top); seg(bot, right); break;
            case 6: case 9: seg(top, bot); break;
            case 7: case 8: seg(left, top); break;
            case 10: seg(left, bot); seg(top, right); break;
          }
        }
      }
      c.stroke();
    }
  }

  /* ---------- Main loop ---------- */
  const header = $('#header');
  const intro = $('#top'), heroCard = $('#heroCard'), sigHero = $('#sigHero'), widget = $('#widget'), cue = $('.scroll-cue'), mqRows = $('.mq-rows');
  const NAVY = [20, 22, 43], CREAM2 = [236, 229, 218], CREAM = [246, 241, 234];
  const mix = (a, b, k) => `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * k)).join(',')})`;
  const themed = $$('[data-theme]');
  const breakS = $('#break'), breakFrame = $('#breakFrame'), breakImg = $('#breakImg'), breakCap = $('#breakCap');
  const pathsS = $('#paths'), pathsImg = $('#pathsImg');
  const fanS = $('#socials');
  let parallaxEls = [];

  function tick(time) {
    if (lenis) lenis.raf(time);
    const vh = innerHeight, y = scrollY, mob = isMobile(), u = rem();

    // intro stage: the hero card shrinks to a grey card, the marquee shows around it, the signature is drawn by scroll
    {
      const r = intro.getBoundingClientRect();
      const p = clamp(-r.top / (r.height - vh));
      const shrink = 1 - Math.pow(1 - clamp(p / 0.55), 3);
      const ix = (mob ? 10 : 33) * shrink, iy = (mob ? 24 : 21) * shrink;
      const lift = clamp((p - 0.62) / 0.38);
      heroCard.style.clipPath = `inset(${iy.toFixed(2)}% ${ix.toFixed(2)}% ${iy.toFixed(2)}% ${ix.toFixed(2)}% round ${(shrink * 0.6).toFixed(2)}rem)`;
      heroCard.style.transform = `translate3d(0, ${(-lift * vh * 0.34).toFixed(1)}px, 0) scale(${(1 - lift * 0.35).toFixed(3)})`;
      heroCard.style.filter = `grayscale(${clamp(shrink * 1.2).toFixed(2)})`;
      const fadeUi = clamp(1 - p / 0.06);
      widget.style.opacity = cue.style.opacity = fadeUi;
      widget.style.pointerEvents = fadeUi < 0.5 ? 'none' : '';
      mqRows.style.transform = `translate3d(0, ${(-lift * vh * 0.1).toFixed(1)}px, 0)`;
      const q = clamp((p - 0.42) / 0.36);
      sigHero.style.clipPath = `inset(-10% ${((1 - q) * 100).toFixed(2)}% -10% -5%)`;
      intro.dataset.theme = shrink > 0.04 ? 'dark' : 'light';

      // second look under the cursor (only while the hero is full-screen)
      if (p < 0.08) {
        const pr = portrait.getBoundingClientRect();
        const auto = !fine;
        const ts = time / 1000;
        const tx = auto ? 0.5 + Math.sin(ts * 0.8) * 0.2 : (mouse.x - pr.left) / pr.width;
        const ty = auto ? 0.36 + Math.sin(ts * 1.25) * 0.12 : (mouse.y - pr.top) / pr.height;
        const active = auto || mouse.on;
        R = lerp(R, reduced ? 0 : (active ? pr.width * 0.17 : 0), 0.08);
        trail[0].x = lerp(trail[0].x, tx, 0.22); trail[0].y = lerp(trail[0].y, ty, 0.22);
        for (let i = 1; i < trail.length; i++) {
          trail[i].x = lerp(trail[i].x, trail[i - 1].x, 0.36);
          trail[i].y = lerp(trail[i].y, trail[i - 1].y, 0.36);
        }
        const mask = trail.map((pt, i) => `radial-gradient(circle ${Math.max(0, R * (1 - i * 0.12)).toFixed(1)}px at ${(pt.x * 100).toFixed(2)}% ${(pt.y * 100).toFixed(2)}%, #000 97%, transparent 100%)`).join(',');
        alt.style.webkitMaskImage = mask;
        alt.style.maskImage = mask;
      } else if (R > 0) {
        R = 0;
        alt.style.webkitMaskImage = alt.style.maskImage = 'radial-gradient(circle 0px at 50% 40%, #000 98%, transparent 100%)';
      }

      // contour lines: animate while the card is on screen; they bend around the cursor
      if (p < 0.95 && !reduced) {
        const cr = topoCv.getBoundingClientRect();
        const tmx = fine && mouse.on ? (mouse.x - cr.left) * (topoW / cr.width) : -9999;
        const tmy = fine && mouse.on ? (mouse.y - cr.top) * (topoH / cr.height) : -9999;
        topoMouse.x = topoMouse.x < -9000 ? tmx : lerp(topoMouse.x, tmx, 0.08);
        topoMouse.y = topoMouse.y < -9000 ? tmy : lerp(topoMouse.y, tmy, 0.08);
        drawTopo(time);
      }
    }

    // story track background morphs from the dark manifesto to cream
    {
      const r = track.getBoundingClientRect();
      const k = 1 - Math.pow(1 - clamp(1 - r.top / (vh * 0.9)), 2);
      track.style.setProperty('--tbg', mix(NAVY, CREAM2, k));
      track.style.setProperty('--tink', mix(CREAM, NAVY, k));
      track.dataset.theme = k > 0.5 ? 'light' : 'dark';
    }

    // parallax (desktop)
    for (const el of parallaxEls) {
      if (mob) { el.style.transform = ''; continue; }
      const r = el.parentElement.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) continue;
      el.style.transform = `translate3d(0, ${((r.top + r.height / 2 - vh / 2) * +el.dataset.speed).toFixed(1)}px, 0)`;
    }

    // horizontal story track
    if (!mob) {
      const r = track.getBoundingClientRect();
      const p = clamp(-r.top / (r.height - vh));
      trackInner.style.transform = `translate3d(${(-p * (trackInner.scrollWidth - innerWidth)).toFixed(1)}px, 0, 0)`;
    }

    // full-bleed photo opening up
    {
      const r = breakS.getBoundingClientRect();
      const p = clamp((-r.top + vh * 0.2) / (r.height - vh));
      const e = 1 - Math.pow(1 - p, 3);
      breakFrame.style.clipPath = `inset(${(18 * (1 - e)).toFixed(2)}% ${(32 * (1 - e) * (mob ? 0.3 : 1)).toFixed(2)}% ${(18 * (1 - e)).toFixed(2)}% ${(32 * (1 - e) * (mob ? 0.3 : 1)).toFixed(2)}% round ${(1 - e).toFixed(2)}rem)`;
      breakImg.style.transform = `scale(${(1.25 - 0.25 * e).toFixed(3)})`;
      breakCap.classList.toggle('show', p > 0.6);
    }

    // Work/Life: second look slides in from the left
    {
      const r = pathsS.getBoundingClientRect();
      const p = clamp((vh - r.top) / (vh * 0.9));
      const e = 1 - Math.pow(1 - p, 3);
      pathsImg.style.transform = `translateX(${(-45 * (1 - e)).toFixed(2)}%) rotate(${(-10 * (1 - e)).toFixed(2)}deg)`;
    }

    // socials fan opens as you scroll in
    {
      const r = fanS.getBoundingClientRect();
      const p = clamp((vh - r.top) / (vh * 0.85));
      const e = 1 - Math.pow(1 - p, 3);
      const cards = fanS.querySelectorAll('.fan-card');
      const n = cards.length, step = (mob ? 4.4 : 11.5) * u;
      cards.forEach((c, i) => {
        const o = i - (n - 1) / 2;
        c.style.transform = `translate(${(o * step * e).toFixed(1)}px, ${(Math.abs(o) * 1.4 * u * e + (1 - e) * 4 * u).toFixed(1)}px) rotate(${(o * 6 * e).toFixed(2)}deg) scale(${o === 0 ? 1.08 : 1})`;
        c.style.zIndex = String(20 - Math.round(Math.abs(o) * 2));
      });
    }

    // header colour follows the section under it
    let theme = 'light';
    for (const sct of themed) { const r = sct.getBoundingClientRect(); if (r.top <= 40 && r.bottom > 40) { theme = sct.dataset.theme; break; } }
    header.classList.toggle('on-dark', theme === 'dark');

    requestAnimationFrame(tick);
  }

  render();
  requestAnimationFrame(tick);

  /* ---------- Loader ---------- */
  const countEl = $('#loaderCount');
  const t0 = performance.now();
  const minDur = reduced ? 200 : 1700;
  let fontsReady = false;
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => { fontsReady = true; layout(); });
  setTimeout(() => { fontsReady = true; }, 2400);
  requestAnimationFrame(() => $('.sig-loader').classList.add('in'));
  (function step(now) {
    const k = clamp((now - t0) / minDur);
    const shown = Math.round((fontsReady ? k : Math.min(k, 0.9)) * 100);
    countEl.textContent = shown;
    if (shown < 100) return requestAnimationFrame(step);
    setTimeout(() => {
      $('#loader').classList.add('done');
      document.body.classList.remove('is-loading');
      document.body.classList.add('loaded');
      layout();
      lenis && lenis.start();
    }, 250);
  })(t0);

  let rt;
  addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(layout, 150); });
  addEventListener('load', layout);
})();
