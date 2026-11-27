/* Extras: cursor spotlight, "system start" boot screen, lost-leads calculator.
   Texts live in config.js (calc, boot). */
(() => {
  const S = window.SITE || {};
  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const lang = () => { const l = document.documentElement.lang; return l === 'kk' ? 'kz' : (['ru', 'en', 'kz'].includes(l) ? l : 'ru'); };
  const t = (v) => (v && typeof v === 'object' ? (v[lang()] ?? v.ru ?? '') : (v ?? ''));
  const two = (s) => esc(s).replace(/\*(.+?)\*/g, '<span class="g">$1</span>');
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Soft spotlight that follows the cursor (desktop) ---------- */
  const spot = $('#spot');
  if (spot && fine && !reduced) {
    let x = innerWidth / 2, y = innerHeight / 2, tx = x, ty = y, on = false;
    addEventListener('pointermove', (e) => { tx = e.clientX; ty = e.clientY; if (!on) { on = true; spot.classList.add('on'); } }, { passive: true });
    document.addEventListener('pointerleave', () => { on = false; spot.classList.remove('on'); });
    (function loop() {
      x += (tx - x) * 0.14; y += (ty - y) * 0.14;
      spot.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      requestAnimationFrame(loop);
    })();
  } else if (spot) spot.remove();

  /* ---------- 2. "System start" boot screen — once per visit ---------- */
  const boot = $('#boot');
  if (boot) {
    if (document.documentElement.classList.contains('booted')) boot.remove();
    else {
      const lines = (S.boot && (S.boot[lang()] || S.boot.ru)) || [];
      const log = $('#bootLog'), bar = $('#bootBar');
      document.documentElement.classList.add('booting');
      let i = 0;
      const step = () => {
        if (i < lines.length) {
          const last = i === lines.length - 1;
          log.innerHTML += `<span class="${last ? 'ok' : ''}">&gt; ${esc(lines[i])}</span>\n`;
          i++;
          bar.style.transform = `scaleX(${(i / lines.length).toFixed(3)})`;
          setTimeout(step, last ? 260 : 170);
        } else {
          boot.classList.add('done');
          document.documentElement.classList.remove('booting');
          try { sessionStorage.setItem('booted', '1'); } catch (e) { /* storage blocked */ }
          setTimeout(() => boot.remove(), 900);
        }
      };
      setTimeout(step, 120);
    }
  }

  /* ---------- 3. Calculator: how many leads are lost outside working hours ---------- */
  const C = S.calc;
  const box = $('#calc');
  if (!C || !box) return;
  const vals = {};
  (C.fields || []).forEach((f) => { vals[f.id] = f.value; });
  const fmt = (n) => Math.round(n).toLocaleString('ru-RU').replace(/ /g, ' ');
  let shown = 0, target = 0, anim = 0;

  function renderCalc() {
    $('#calcLabel').textContent = t(C.label);
    $('#calcTitle').innerHTML = two(t(C.title));
    $('#calcText').textContent = t(C.text);
    $('#calcResLabel').textContent = t(C.resultLabel);
    $('#calcPer').textContent = t(C.perMonth);
    $('#calcClientsText').textContent = t(C.clients);
    $('#calcCta').textContent = t(C.cta);
    $('#calcNote').textContent = t(C.note);
    box.querySelector('.calc-cta').href = `mailto:${S.email}`;
    $('#calcFields').innerHTML = (C.fields || []).map((f) => `
      <label class="cf">
        <span class="cf-top"><span>${esc(t(f.label))}</span><b id="cfv-${f.id}"></b></span>
        <input type="range" min="${f.min}" max="${f.max}" step="${f.step}" value="${vals[f.id]}" data-id="${f.id}">
      </label>`).join('');
    $('#calcFields').querySelectorAll('input').forEach((inp) => inp.addEventListener('input', () => { vals[inp.dataset.id] = +inp.value; update(); }));
    update(true);
  }
  function update(instant) {
    (C.fields || []).forEach((f) => {
      const v = vals[f.id];
      $(`#cfv-${f.id}`).textContent = f.unit === '₸' ? `${fmt(v)} ₸` : `${fmt(v)}${f.unit}`;
      const inp = $(`#calcFields input[data-id="${f.id}"]`);
      inp.style.setProperty('--p', `${((v - f.min) / (f.max - f.min) * 100).toFixed(1)}%`);
    });
    const lostClients = vals.leads * (vals.off / 100) * (vals.lost / 100) * 30;
    const money = lostClients * (vals.conv / 100) * vals.check;
    $('#calcClients').textContent = fmt(lostClients);
    target = money;
    if (instant) { shown = money; $('#calcSum').textContent = `${fmt(money)} ₸`; }
    else if (!anim) anim = requestAnimationFrame(tick);
  }
  function tick() {
    shown += (target - shown) * 0.18;
    if (Math.abs(target - shown) < 1) shown = target;
    $('#calcSum').textContent = `${fmt(shown)} ₸`;
    anim = shown === target ? 0 : requestAnimationFrame(tick);
  }
  renderCalc();
  // language switch → re-render the texts
  document.addEventListener('click', (e) => { if (e.target.closest('.lang button')) setTimeout(renderCalc, 30); });
})();
