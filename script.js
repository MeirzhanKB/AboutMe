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
    ru: { loading: 'Загрузка', projectsN: 'проектов', nextTitle: 'Следующий *проект* — ваш', interestsN: 'увлечений', cta: 'Написать', discuss: 'Обсудить проект', business: 'Деловые запросы', scroll: 'Листай', pages: 'Страницы', follow: 'Я в сети',
          menu: ['Главная', 'Обо мне', 'Путь', 'Проекты', 'Контакты'] },
    en: { loading: 'Loading', projectsN: 'projects', nextTitle: 'Your project *could be* next', interestsN: 'interests', cta: 'Get in touch', discuss: 'Discuss a project', business: 'Business inquiries', scroll: 'Scroll', pages: 'Pages', follow: 'Follow',
          menu: ['Home', 'About', 'Path', 'Projects', 'Contact'] },
    kz: { loading: 'Жүктелуде', projectsN: 'жоба', nextTitle: 'Келесі *жоба* — сіздікі', interestsN: 'қызығушылық', cta: 'Жазу', discuss: 'Жобаны талқылау', business: 'Іскерлік сұраулар', scroll: 'Айналдыр', pages: 'Беттер', follow: 'Желіде',
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
  $('#hpBase').src = P.base;
  $('#fpImg').src = P.helmetOn || P.base;
  $('#pathsHelmet').src = P.helmetCut || P.helmet2;
  $('#pathsFace').src = P.base;
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
  const logosHtml = (S.stack || []).map((x) => `<span class="lg">${esc(x)}</span>`).join('');
  $('#footLogos').innerHTML = logosHtml + logosHtml + logosHtml;
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

  /* ---------- Project filter ---------- */
  let curFilter = 'all';
  function applyFilter() {
    $$('#pgrid .pcard').forEach((c) => c.classList.toggle('hide', !(curFilter === 'all' || c.dataset.cat === curFilter || c.dataset.cat === '*')));
    $$('#pfilters button').forEach((b) => b.classList.toggle('active', b.dataset.f === curFilter));
    requestAnimationFrame(layout);
  }
  document.addEventListener('click', (e) => {
    const b = e.target.closest('#pfilters button');
    if (!b) return;
    curFilter = b.dataset.f;
    applyFilter();
  });

  /* ---------- Interests: photo follows the cursor over the rows ---------- */
  const intFloat = $('#intFloat'), intImg = intFloat.querySelector('img');
  const fl = { x: 0, y: 0, tx: 0, ty: 0, on: false };
  document.addEventListener('pointerover', (e) => {
    const row = e.target.closest && e.target.closest('.int-row');
    if (row && fine) {
      if (intImg.getAttribute('src') !== row.dataset.img) intImg.src = row.dataset.img;
      fl.on = true; intFloat.classList.add('show');
    } else if (fl.on && !(e.target.closest && e.target.closest('.int-list'))) {
      fl.on = false; intFloat.classList.remove('show');
    }
  });
  addEventListener('scroll', () => { if (fl.on) { fl.on = false; intFloat.classList.remove('show'); } }, { passive: true });

  /* ---------- Language-dependent render ---------- */
  function render() {
    const name = t(S.name);
    document.documentElement.lang = LANG === 'kz' ? 'kk' : LANG;
    document.title = `${name} — ${t(S.role)}`;
    $$('.lang button').forEach((b) => b.classList.toggle('active', b.dataset.lang === LANG));
    $$('[data-ui]').forEach((el) => { el.textContent = ui(el.dataset.ui); });

    $('#wm1').textContent = name;
    $('#wm2').textContent = t(S.role);
    $('#loaderName').textContent = `${ui('loading')} · ${name}`;
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
      if (it.type === 'cluster') return `<div class="t-cluster">${it.items.map((m) => `<figure class="t-mini"><figcaption class="eyebrow"><span class="cap-bar">${esc(t(m.cap))}</span></figcaption><div class="ph reveal-img">${img(m.src, t(m.cap))}</div></figure>`).join('')}</div>`;
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
    const projects = S.projects || [];
    const filters = (S.projectFilters || []).filter((f) => f.id === 'all' || projects.some((pr) => pr.cat === f.id));
    $('#pfilters').innerHTML = filters.map((f) => {
      const n = f.id === 'all' ? projects.length : projects.filter((pr) => pr.cat === f.id).length;
      return `<button role="tab" data-f="${esc(f.id)}" class="${f.id === curFilter ? 'active' : ''}">${esc(t(f.label))}<sup>${String(n).padStart(2, '0')}</sup></button>`;
    }).join('');
    const catLabel = (id) => t(((S.projectFilters || []).find((f) => f.id === id) || {}).label) || '';
    $('#pgrid').innerHTML = projects.map((pr, i) => {
      const tag = pr.link ? 'a' : 'div';
      const href = pr.link ? ` href="${esc(pr.link)}" target="_blank" rel="noopener"` : '';
      return `<${tag} class="pcard hcard" data-cat="${esc(pr.cat || '')}" data-reveal style="--d:${(i % 4) * 0.08}s"${href}><div class="hc-in">
        <span class="eyebrow hc-idx">${String(i + 1).padStart(2, '0')}</span>
        <span class="hc-tags">${(pr.tags || []).slice(0, 2).map((x) => `<span>${esc(x)}</span>`).join('')}</span>
        <div class="hc-obj"><div class="device"><div class="screen" style="background-image:url('${esc(pr.image)}')"></div></div></div>
        <div class="hc-photo" style="background-image:url('${esc(pr.image)}')"></div>
        <div class="hc-desc">${esc(t(pr.desc))}</div>
        <div class="hc-cap"><b>${esc(t(pr.title))}</b><em>${esc(catLabel(pr.cat))}</em></div>
      </div></${tag}>`;
    }).join('') + (S.ndaCard ? `<div class="pcard hcard nda" data-cat="*" data-reveal><div class="hc-in">
        <span class="eyebrow hc-idx">NDA</span>
        <div class="hc-obj"><svg class="lock" viewBox="0 0 64 64" aria-hidden="true"><rect x="14" y="28" width="36" height="26" rx="5"/><path d="M22 28v-8a10 10 0 0 1 20 0v8"/><circle cx="32" cy="40" r="3.5"/><path d="M32 43.5v5"/></svg></div>
        <div class="hc-desc nda-desc">${esc(t(S.ndaCard.desc))}</div>
        <div class="hc-cap"><b>${esc(t(S.ndaCard.title))}</b><em>NDA</em></div>
      </div></div>` : '') + `<div class="pcard hcard cta" data-cat="*" data-reveal><div class="hc-in">
        <span class="eyebrow hc-idx">${String(projects.length + 1).padStart(2, '0')}</span>
        <div class="pc-big">${words(ui('nextTitle'))}</div>
        <a href="${esc(mailto)}" class="btn"><span class="roll"><span>${esc(ui('discuss'))}</span><span>${esc(ui('discuss'))}</span></span></a>
      </div></div>`;
    applyFilter();

    // interests
    const ints = S.interests || [];
    $('#intTitle').innerHTML = words(t(S.interestsTitle));
    $('#intCount').textContent = `${String(ints.length).padStart(2, '0')} ${ui('interestsN')}`;
    $('#intList').innerHTML = ints.map((it, i) => `<li class="int-row" data-img="${esc(it.img)}" data-reveal>
      <img class="int-thumb" src="${esc(it.img)}" alt="" loading="lazy">
      <span class="n">${String(i + 1).padStart(2, '0')}</span>
      <h3>${esc(t(it.title))}</h3>
      <p>${esc(t(it.text))}</p>
      <i class="dot"></i></li>`).join('');

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
  const hero = $('#top'), portrait = $('#heroPortrait');
  // liquid blob: the helmet is drawn into a canvas and cut by a soft, merging trail of circles
  const altCv = $('#altCanvas'), altCtx = altCv.getContext('2d');
  const maskCv = document.createElement('canvas'), maskCtx = maskCv.getContext('2d');
  const altImg = new Image(); altImg.src = P.alt;
  let cvW = 0, cvH = 0, cvDpr = 1, lastMx = 0, lastMy = 0, speed = 0, blobInit = false;
  function altResize() {
    cvDpr = Math.min(devicePixelRatio || 1, 1.5);
    cvW = portrait.offsetWidth; cvH = portrait.offsetHeight;
    altCv.width = maskCv.width = Math.max(1, Math.round(cvW * cvDpr));
    altCv.height = maskCv.height = Math.max(1, Math.round(cvH * cvDpr));
  }
  altResize();
  addEventListener('resize', altResize);
  function drawBlob(ts, tx, ty, targetR) {
    if (!blobInit) { trail.forEach((q) => { q.x = tx; q.y = ty; }); blobInit = true; }
    trail[0].x = lerp(trail[0].x, tx, 0.2); trail[0].y = lerp(trail[0].y, ty, 0.2);
    for (let i = 1; i < trail.length; i++) {
      trail[i].x = lerp(trail[i].x, trail[i - 1].x, 0.42);
      trail[i].y = lerp(trail[i].y, trail[i - 1].y, 0.42);
    }
    R = lerp(R, targetR, 0.07);
    const a = altCtx;
    a.setTransform(1, 0, 0, 1, 0, 0);
    a.clearRect(0, 0, altCv.width, altCv.height);
    if (R < 0.6 || !altImg.naturalWidth) return;
    const m = maskCtx;
    m.setTransform(cvDpr, 0, 0, cvDpr, 0, 0);
    m.clearRect(0, 0, cvW, cvH);
    m.filter = 'blur(7px)';
    m.fillStyle = '#000';
    m.beginPath();
    trail.forEach((q, i) => {
      const k = 1 - i / trail.length;
      const r = R * (0.3 + 0.7 * Math.pow(k, 0.7)) * (1 + 0.07 * Math.sin(ts * 2.3 + i * 0.9));
      m.moveTo(q.x + r, q.y);
      m.arc(q.x, q.y, r, 0, Math.PI * 2);
    });
    m.fill();
    m.filter = 'none';
    const ar = altImg.naturalWidth / altImg.naturalHeight;
    let dw, dh;
    if (cvW / cvH > ar) { dh = cvH; dw = dh * ar; } else { dw = cvW; dh = dw / ar; }
    a.drawImage(altImg, ((cvW - dw) / 2) * cvDpr, (cvH - dh) * cvDpr, dw * cvDpr, dh * cvDpr);
    a.globalCompositeOperation = 'destination-in';
    a.drawImage(maskCv, 0, 0);
    a.globalCompositeOperation = 'source-over';
  }
  const mouse = { x: innerWidth / 2, y: innerHeight / 2, on: false };
  const trail = Array.from({ length: 14 }, () => ({ x: 0, y: 0 }));
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
  const header = $('#header'), footPanel = $('.foot-panel'), footerEl = $('#contact');
  const intro = $('#top'), heroCard = $('#heroCard'), sigHero = $('#sigHero'), widget = $('#widget'), cue = $('.scroll-cue'), mqRows = $('.mq-rows');
  const NAVY = [20, 22, 43], CREAM2 = [236, 229, 218], CREAM = [246, 241, 234];
  const mix = (a, b, k) => `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * k)).join(',')})`;
  const themed = $$('[data-theme]');
  const breakS = $('#break'), breakFrame = $('#breakFrame'), breakImg = $('#breakImg'), breakCap = $('#breakCap');
  const pathsS = $('#paths'), pathsHelmet = $('#pathsHelmet'), pathsFace = $('#pathsFace');
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
        const tx = auto ? pr.width * (0.5 + Math.sin(ts * 0.8) * 0.2) : mouse.x - pr.left;
        const ty = auto ? pr.height * (0.36 + Math.sin(ts * 1.25) * 0.12) : mouse.y - pr.top;
        const v = Math.hypot(mouse.x - lastMx, mouse.y - lastMy);
        lastMx = mouse.x; lastMy = mouse.y;
        speed = lerp(speed, v, 0.12);
        const active = auto || mouse.on;
        const targetR = reduced ? 0 : (active ? pr.width * 0.21 * (1 + Math.min(speed / 40, 0.45)) : 0);
        drawBlob(ts, tx, ty, targetR);
      } else if (R > 0) {
        R = 0;
        altCtx.setTransform(1, 0, 0, 1, 0, 0);
        altCtx.clearRect(0, 0, altCv.width, altCv.height);
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

    // things inside the sliding track: reveal by position (observers can miss transformed items)
    trackInner.querySelectorAll('.reveal-img:not(.in), [data-wipe]:not(.in), [data-draw]:not(.in), [data-reveal]:not(.in)').forEach((el) => {
      const rr = el.getBoundingClientRect();
      if (rr.left < innerWidth * 0.95 && rr.right > 0 && rr.top < vh && rr.bottom > 0) el.classList.add('in');
    });

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
      pathsHelmet.style.transform = `translateX(${(-40 * (1 - e)).toFixed(2)}%) rotate(${(-8 * (1 - e)).toFixed(2)}deg)`;
      pathsFace.style.transform = `translateX(${(40 * (1 - e)).toFixed(2)}%)`;
    }

    // interests: floating photo trails the cursor and tilts with speed
    if (fine) {
      fl.tx = mouse.x + 24; fl.ty = mouse.y - 140;
      const vx = fl.tx - fl.x;
      fl.x = lerp(fl.x, fl.tx, 0.16); fl.y = lerp(fl.y, fl.ty, 0.16);
      intFloat.style.transform = `translate3d(${fl.x.toFixed(1)}px, ${fl.y.toFixed(1)}px, 0) rotate(${clamp(vx * 0.05, -12, 12).toFixed(2)}deg)`;
    }

    // socials fan opens as you scroll in
    {
      const r = fanS.getBoundingClientRect();
      const p = clamp((vh - r.top) / (vh * 0.85));
      const e = 1 - Math.pow(1 - p, 3);
      const cards = fanS.querySelectorAll('.fan-card');
      const n = cards.length;
      // the whole arc keeps rolling while you scroll; the card nearest the centre comes forward
      const spin = (0.5 - clamp((vh - r.top) / (r.height + vh))) * (mob ? 26 : 34);
      const stepA = mob ? 9 : 11;
      cards.forEach((c, i) => {
        const o = i - (n - 1) / 2;
        const ang = o * stepA * e + spin;
        const near = Math.max(0, 1 - Math.abs(ang) / (stepA * 1.6));
        c.style.transform = `translateY(${((1 - e) * 5 * u - near * 1.2 * u).toFixed(1)}px) rotate(${ang.toFixed(2)}deg) scale(${(0.94 + near * 0.12).toFixed(3)})`;
        c.style.zIndex = String(100 - Math.round(Math.abs(ang) * 2));
      });
    }

    // header colour follows the section under it
    let theme = 'light';
    for (const sct of themed) { const r = sct.getBoundingClientRect(); if (r.top <= 40 && r.bottom > 40) { theme = sct.dataset.theme; break; } }
    header.classList.toggle('on-dark', theme === 'dark');
    // over the orange frame of the footer the orange button would vanish -> switch the header to navy
    const fpr = footPanel.getBoundingClientRect(), ftr = footerEl.getBoundingClientRect();
    header.classList.toggle('on-accent', ftr.top <= 40 && fpr.top > 40);

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
