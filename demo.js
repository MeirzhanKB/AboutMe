/* ============================================================
   Живое демо AI-менеджера (без сервера: сценарии записаны здесь).
   Тексты на трёх языках. Чтобы поменять ответы бота — правь DEMO ниже.
   ============================================================ */
(() => {
  const root = document.getElementById('demo');
  if (!root) return;

  const DEMO = {
    ru: {
      eyebrow: 'Живое демо',
      title: 'Поговори с моим *AI-менеджером*',
      text: 'Так работает AI-менеджер продаж, которого я делаю для бизнеса: подбирает товар, говорит на русском и казахском и сам передаёт готовые заявки менеджерам. Это демо на примере магазина фильтров — нажимайте варианты или пишите сами.',
      crmTitle: 'За кадром · CRM',
      fields: { client: 'Клиент', lang: 'Язык', need: 'Запрос', reco: 'Подбор', status: 'Статус' },
      empty: '—',
      langName: 'Русский',
      stats: [['24/7', 'без выходных'], ['RU · KZ', 'два языка'], ['CRM', 'заявки сразу менеджеру']],
      note: 'Демо: имена и номера заявок вымышленные.',
      name: 'AI-менеджер', online: 'демо · онлайн', typing: 'печатает…',
      placeholder: 'Напишите сообщение…', photo: 'Фото фильтра',
      restart: 'Начать заново',
      status: { new: 'Новый диалог', qual: 'Уточняем', hot: 'Горячий лид → менеджеру', mgr: 'Передан менеджеру', remind: 'Напоминание через 6 мес.' },
      nodes: {
        start: { bot: ['Здравствуйте! Я AI-менеджер магазина фильтров. Подберу фильтр для воды, картриджи или оформлю заявку на установку.', 'Что вас интересует?'],
          chips: [['Фильтр для квартиры', 'f1'], ['Нужны картриджи', 'c1'], ['Қазақша сөйлесесіз бе?', 'other']] },
        other: { bot: ['Әрине! Мен қазақша да, орысша да жауап беремін. Сізге не керек: сүзгі ме, әлде картридж бе?'], crm: { lang: 'Қазақша + Русский' },
          chips: [['Сүзгі керек', 'f1'], ['Картридж керек', 'c1']] },
        f1: { bot: ['Отлично, подберу за минуту. Вода у вас из городского водопровода или из скважины?'], crm: { need: 'Фильтр для воды', status: 'qual' },
          chips: [['Городская', 'f2', { water: 'city' }], ['Скважина', 'f2', { water: 'well' }]] },
        f2: { bot: ['Сколько человек живёт дома?'], chips: [['1–2', 'f3', { size: '1–2' }], ['3–4', 'f3', { size: '3–4' }], ['5 и больше', 'f3', { size: '5+' }]] },
        f3: { bot: (v) => [v.water === 'well'
            ? `Для воды из скважины сначала нужна очистка от железа, затем осмос. Для семьи ${v.size} чел. советую комплект «Скважина + осмос».`
            : `Для городской воды и семьи ${v.size} чел. советую обратный осмос на 5 ступеней: убирает хлор, жёсткость и запах.`,
            { card: true }, 'Оформить заявку на установку?'],
          crm: (v) => ({ reco: v.water === 'well' ? 'Скважина + осмос' : 'Осмос · 5 ступеней' }),
          chips: [['Да, оформить', 'f4'], ['Позвать менеджера', 'mgr']] },
        f4: { bot: ['Как к вам обращаться и в каком вы городе?'], ask: 'f5', chips: [['Айдос, Алматы', 'f5', { client: 'Айдос, Алматы' }]] },
        f5: { bot: (v) => [`Спасибо, ${v.first}! Заявка A-1042 создана и уже у менеджера. Он перезвонит в течение 15 минут и согласует время установки.`],
          crm: (v) => ({ client: v.client, status: 'hot' }), chips: [] },
        mgr: { bot: ['Подключаю менеджера. Всё, что вы рассказали, я уже ему передал — повторять не придётся.'], crm: { status: 'mgr' }, chips: [] },
        c1: { bot: ['Какая у вас система? Если не знаете — просто пришлите фото фильтра, я узнаю модель.'], crm: { need: 'Картриджи', status: 'qual' },
          chips: [['Осмос, 5 ступеней', 'c2'], ['Отправить фото', 'c1p']] },
        c1p: { user: 'photo', bot: ['Вижу на фото обратный осмос на 5 ступеней.'], next: 'c2', chips: [] },
        c2: { bot: [{ card: 'cart' }, 'Комплект есть на складе. Картриджи меняют раз в 6 месяцев — напомнить вам в следующий раз?'], crm: { reco: 'Картриджи · осмос 5 ст.' },
          chips: [['Да, напомните', 'c3'], ['Оформить заказ', 'f4']] },
        c3: { bot: ['Готово, напишу вам через 6 месяцев. Оформить комплект сейчас?'], crm: { status: 'remind' }, chips: [['Да, оформить', 'f4']] },
        fallback: { bot: ['Это демо-версия, поэтому я разбираюсь только в фильтрах и картриджах. Настоящий бот отвечает по всему каталогу.'], chips: [['Фильтр для квартиры', 'f1'], ['Нужны картриджи', 'c1']] }
      },
      card: { title: 'Обратный осмос · 5 ступеней', well: 'Скважина + осмос', cart: 'Картриджи для осмоса · 5 шт.', stock: 'В наличии · Алматы', install: 'Установка — завтра' }
    },

    kz: {
      eyebrow: 'Тірі демо',
      title: 'Менің *ЖИ-менеджеріммен* сөйлесіп көр',
      text: 'Бизнеске жасайтын ЖИ сату менеджері осылай жұмыс істейді: тауар таңдайды, қазақша және орысша сөйлейді, дайын өтінімдерді менеджерлерге өзі береді. Бұл сүзгі дүкені мысалындағы демо — нұсқаларды басыңыз немесе өзіңіз жазыңыз.',
      crmTitle: 'Сахна артында · CRM',
      fields: { client: 'Клиент', lang: 'Тіл', need: 'Сұраныс', reco: 'Таңдау', status: 'Мәртебе' },
      empty: '—',
      langName: 'Қазақша',
      stats: [['24/7', 'демалыссыз'], ['KZ · RU', 'екі тіл'], ['CRM', 'өтінім бірден менеджерге']],
      note: 'Демо: аттар мен өтінім нөмірлері ойдан алынған.',
      name: 'ЖИ-менеджер', online: 'демо · желіде', typing: 'жазып жатыр…',
      placeholder: 'Хабарлама жазыңыз…', photo: 'Сүзгінің фотосы',
      restart: 'Қайта бастау',
      status: { new: 'Жаңа диалог', qual: 'Нақтылаудамыз', hot: 'Ыстық лид → менеджерге', mgr: 'Менеджерге берілді', remind: '6 айдан кейін еске салу' },
      nodes: {
        start: { bot: ['Сәлеметсіз бе! Мен сүзгі дүкенінің ЖИ-менеджерімін. Су сүзгісін, картридж таңдап немесе орнатуға өтінім рәсімдеймін.', 'Сізді не қызықтырады?'],
          chips: [['Пәтерге сүзгі', 'f1'], ['Картридж керек', 'c1'], ['А по-русски можно?', 'other']] },
        other: { bot: ['Конечно! Я отвечаю и на русском, и на казахском. Что вам нужно: фильтр или картриджи?'], crm: { lang: 'Русский + Қазақша' },
          chips: [['Нужен фильтр', 'f1'], ['Нужны картриджи', 'c1']] },
        f1: { bot: ['Керемет, бір минутта таңдап беремін. Су қалалық құбырдан ба, әлде ұңғымадан ба?'], crm: { need: 'Су сүзгісі', status: 'qual' },
          chips: [['Қалалық', 'f2', { water: 'city' }], ['Ұңғыма', 'f2', { water: 'well' }]] },
        f2: { bot: ['Үйде неше адам тұрады?'], chips: [['1–2', 'f3', { size: '1–2' }], ['3–4', 'f3', { size: '3–4' }], ['5 және көп', 'f3', { size: '5+' }]] },
        f3: { bot: (v) => [v.water === 'well'
            ? `Ұңғыма суы үшін алдымен темірден тазалау, содан кейін осмос керек. ${v.size} адамдық отбасыға «Ұңғыма + осмос» жинағын ұсынамын.`
            : `Қалалық су және ${v.size} адамдық отбасы үшін 5 сатылы кері осмосты ұсынамын: хлорды, кермектікті және иісті кетіреді.`,
            { card: true }, 'Орнатуға өтінім рәсімдейік пе?'],
          crm: (v) => ({ reco: v.water === 'well' ? 'Ұңғыма + осмос' : 'Осмос · 5 саты' }),
          chips: [['Иә, рәсімдеу', 'f4'], ['Менеджерді шақыру', 'mgr']] },
        f4: { bot: ['Сізге қалай жүгінейін және қай қаладасыз?'], ask: 'f5', chips: [['Айдос, Алматы', 'f5', { client: 'Айдос, Алматы' }]] },
        f5: { bot: (v) => [`Рахмет, ${v.first}! A-1042 өтінімі жасалып, менеджерге берілді. Ол 15 минут ішінде хабарласып, орнату уақытын келіседі.`],
          crm: (v) => ({ client: v.client, status: 'hot' }), chips: [] },
        mgr: { bot: ['Менеджерді қосып жатырмын. Айтқаныңыздың бәрін оған жібердім — қайталаудың қажеті жоқ.'], crm: { status: 'mgr' }, chips: [] },
        c1: { bot: ['Сізде қандай жүйе? Білмесеңіз — сүзгінің фотосын жіберіңіз, моделін өзім анықтаймын.'], crm: { need: 'Картридждер', status: 'qual' },
          chips: [['Осмос, 5 саты', 'c2'], ['Фото жіберу', 'c1p']] },
        c1p: { user: 'photo', bot: ['Фотода 5 сатылы кері осмос көрініп тұр.'], next: 'c2', chips: [] },
        c2: { bot: [{ card: 'cart' }, 'Жинақ қоймада бар. Картридждер 6 айда бір ауыстырылады — келесі жолы еске салайын ба?'], crm: { reco: 'Картридж · осмос 5 саты' },
          chips: [['Иә, еске салыңыз', 'c3'], ['Тапсырыс беру', 'f4']] },
        c3: { bot: ['Дайын, 6 айдан кейін жазамын. Жинақты қазір рәсімдейік пе?'], crm: { status: 'remind' }, chips: [['Иә, рәсімдеу', 'f4']] },
        fallback: { bot: ['Бұл демо-нұсқа, сондықтан мен тек сүзгілер мен картридждерді түсінемін. Нағыз бот бүкіл каталог бойынша жауап береді.'], chips: [['Пәтерге сүзгі', 'f1'], ['Картридж керек', 'c1']] }
      },
      card: { title: 'Кері осмос · 5 саты', well: 'Ұңғыма + осмос', cart: 'Осмосқа картридждер · 5 дана', stock: 'Қоймада бар · Алматы', install: 'Орнату — ертең' }
    },

    en: {
      eyebrow: 'Live demo',
      title: 'Talk to my *AI sales manager*',
      text: 'This is how the AI sales manager I build for businesses works: it picks products, speaks Russian and Kazakh and hands ready orders to the sales team by itself. A demo on the example of a filter store — tap the options or type your own message.',
      crmTitle: 'Behind the scenes · CRM',
      fields: { client: 'Client', lang: 'Language', need: 'Request', reco: 'Match', status: 'Status' },
      empty: '—',
      langName: 'English',
      stats: [['24/7', 'no days off'], ['RU · KZ', 'two languages'], ['CRM', 'leads go straight to sales']],
      note: 'Demo: names and order numbers are made up.',
      name: 'AI manager', online: 'demo · online', typing: 'typing…',
      placeholder: 'Type a message…', photo: 'Photo of the filter',
      restart: 'Start over',
      status: { new: 'New chat', qual: 'Qualifying', hot: 'Hot lead → sales', mgr: 'Handed to a manager', remind: 'Reminder in 6 months' },
      nodes: {
        start: { bot: ['Hi! I am the AI manager of a filter store. I can pick a water filter, cartridges or book an installation.', 'What are you looking for?'],
          chips: [['A filter for my flat', 'f1'], ['Replacement cartridges', 'c1'], ['Можно на русском?', 'other']] },
        other: { bot: ['Конечно! Я отвечаю на русском и казахском. Что вам нужно: фильтр или картриджи?'], crm: { lang: 'Русский + English' },
          chips: [['Нужен фильтр', 'f1'], ['Нужны картриджи', 'c1']] },
        f1: { bot: ['Great, this takes a minute. Is your water from the city supply or from a well?'], crm: { need: 'Water filter', status: 'qual' },
          chips: [['City supply', 'f2', { water: 'city' }], ['Well', 'f2', { water: 'well' }]] },
        f2: { bot: ['How many people live at home?'], chips: [['1–2', 'f3', { size: '1–2' }], ['3–4', 'f3', { size: '3–4' }], ['5 or more', 'f3', { size: '5+' }]] },
        f3: { bot: (v) => [v.water === 'well'
            ? `Well water needs iron removal first, then reverse osmosis. For ${v.size} people I recommend the “Well + osmosis” kit.`
            : `For city water and ${v.size} people I recommend a 5-stage reverse osmosis system: it removes chlorine, hardness and odour.`,
            { card: true }, 'Shall I book an installation?'],
          crm: (v) => ({ reco: v.water === 'well' ? 'Well + osmosis' : 'Osmosis · 5 stages' }),
          chips: [['Yes, book it', 'f4'], ['Call a manager', 'mgr']] },
        f4: { bot: ['What is your name and which city are you in?'], ask: 'f5', chips: [['Aidos, Almaty', 'f5', { client: 'Aidos, Almaty' }]] },
        f5: { bot: (v) => [`Thank you, ${v.first}! Order A-1042 is created and already with a manager. They will call you within 15 minutes to agree on the installation time.`],
          crm: (v) => ({ client: v.client, status: 'hot' }), chips: [] },
        mgr: { bot: ['Connecting a manager. I have already passed on everything you told me — no need to repeat it.'], crm: { status: 'mgr' }, chips: [] },
        c1: { bot: ['Which system do you have? If you are not sure, just send a photo of the filter and I will recognise the model.'], crm: { need: 'Cartridges', status: 'qual' },
          chips: [['Osmosis, 5 stages', 'c2'], ['Send a photo', 'c1p']] },
        c1p: { user: 'photo', bot: ['I can see a 5-stage reverse osmosis system in the photo.'], next: 'c2', chips: [] },
        c2: { bot: [{ card: 'cart' }, 'The kit is in stock. Cartridges are changed every 6 months — shall I remind you next time?'], crm: { reco: 'Cartridges · osmosis 5 st.' },
          chips: [['Yes, remind me', 'c3'], ['Order now', 'f4']] },
        c3: { bot: ['Done, I will message you in 6 months. Shall I order the kit now?'], crm: { status: 'remind' }, chips: [['Yes, order it', 'f4']] },
        fallback: { bot: ['This is a demo, so I only know about filters and cartridges. The real bot answers about the whole catalogue.'], chips: [['A filter for my flat', 'f1'], ['Replacement cartridges', 'c1']] }
      },
      card: { title: 'Reverse osmosis · 5 stages', well: 'Well + osmosis', cart: 'Osmosis cartridges · 5 pcs', stock: 'In stock · Almaty', install: 'Installation — tomorrow' }
    }
  };

  const $ = (s) => root.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const mixed = (s) => esc(s).replace(/\*(.+?)\*/g, '<span class="em">$1</span>');
  const lang = () => { const l = document.documentElement.lang; return l === 'kk' ? 'kz' : (DEMO[l] ? l : 'ru'); };
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const now = () => { const d = new Date(); return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`; };

  const body = $('.dm-body'), chipsEl = $('.dm-chips'), form = $('.dm-input'), input = form.querySelector('input'), sub = $('.dm-sub');
  let D, T, vars, run = 0, busy = false, askNode = null, started = false;
  // T = language the bot is talking in (can switch mid-chat to show RU/KZ), D = interface language
  const OTHER = { ru: 'kz', kz: 'ru', en: 'ru' };

  function fillStatic() {
    $('#dmEyebrow').textContent = D.eyebrow;
    $('#dmTitle').innerHTML = mixed(D.title);
    $('#dmText').textContent = D.text;
    $('#dmCrmTitle').textContent = D.crmTitle;
    $('#dmStats').innerHTML = D.stats.map(([b, s]) => `<div><b>${esc(b)}</b><span>${esc(s)}</span></div>`).join('');
    $('#dmNote').textContent = D.note;
    $('.dm-name').textContent = D.name;
    sub.textContent = D.online;
    input.placeholder = D.placeholder;
  }
  function crmReset() {
    const f = D.fields;
    $('#dmCrm').innerHTML = Object.keys(f).map((k) => `<div class="dm-row" data-k="${k}"><span>${esc(f[k])}</span><b>${esc(k === 'lang' ? D.langName : k === 'status' ? D.status.new : D.empty)}</b></div>`).join('');
  }
  function crmSet(obj) {
    Object.entries(obj).forEach(([k, v]) => {
      const row = root.querySelector(`.dm-row[data-k="${k}"]`);
      if (!row) return;
      row.querySelector('b').textContent = k === 'status' ? (D.status[v] || v) : v;
      row.classList.remove('flash'); void row.offsetWidth; row.classList.add('flash');
      if (k === 'status') row.dataset.s = v;
    });
  }
  const scrollDown = () => { body.scrollTo({ top: body.scrollHeight, behavior: reduced ? 'auto' : 'smooth' }); };

  function cardHtml(kind) {
    const c = T.card;
    const title = kind === 'cart' ? c.cart : (vars.water === 'well' ? c.well : c.title);
    return `<div class="dm-card"><div class="dm-card-img"><svg viewBox="0 0 64 64" aria-hidden="true"><rect x="10" y="14" width="10" height="38" rx="5"/><rect x="27" y="14" width="10" height="38" rx="5"/><rect x="44" y="14" width="10" height="38" rx="5"/><path d="M8 12h48M15 52v4M32 52v4M49 52v4"/></svg></div>
      <div class="dm-card-t"><b>${esc(title)}</b><span class="ok">${esc(c.stock)}</span>${kind === 'cart' ? '' : `<span>${esc(c.install)}</span>`}</div></div>`;
  }
  function bubble(who, html, extra = '') {
    const el = document.createElement('div');
    el.className = `dm-msg ${who} ${extra}`;
    el.innerHTML = `${html}<i class="dm-time">${now()}${who === 'me' ? '<svg viewBox="0 0 18 10" aria-hidden="true"><path d="M1 5l3 3 6-7M7 8l1 1 6-8"/></svg>' : ''}</i>`;
    body.appendChild(el);
    requestAnimationFrame(() => el.classList.add('in'));
    scrollDown();
    return el;
  }
  function showChips(list) {
    chipsEl.innerHTML = '';
    const all = list.length ? list : [[D.restart, 'start', null, true]];
    all.forEach(([label, next, set, restart]) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'dm-chip' + (restart ? ' ghost' : ''); b.textContent = label;
      b.addEventListener('click', () => choose(label, next, set, restart));
      chipsEl.appendChild(b);
    });
  }
  async function botSay(items, id) {
    for (const it of items) {
      if (id !== run) return;
      sub.textContent = D.typing; sub.classList.add('typing');
      const typing = bubble('bot', '<span class="dm-dots"><i></i><i></i><i></i></span>', 'is-typing');
      const len = typeof it === 'string' ? it.length : 60;
      await sleep(reduced ? 150 : Math.min(500 + len * 14, 1700));
      typing.remove();
      if (id !== run) return;
      sub.textContent = D.online; sub.classList.remove('typing');
      bubble('bot', typeof it === 'string' ? `<p>${esc(it)}</p>` : cardHtml(it.card), typeof it === 'string' ? '' : 'has-card');
      await sleep(reduced ? 50 : 260);
    }
  }
  async function go(key, id = run) {
    const n = T.nodes[key] || T.nodes.fallback;
    busy = true; chipsEl.innerHTML = ''; askNode = n.ask || null;
    if (n.crm) crmSet(typeof n.crm === 'function' ? n.crm(vars) : n.crm);
    await botSay(typeof n.bot === 'function' ? n.bot(vars) : n.bot, id);
    if (id !== run) return;
    if (key === 'other') T = DEMO[OTHER[lang()]];
    if (n.next) return go(n.next, id);
    busy = false;
    showChips(n.chips || []);
  }
  function choose(label, next, set, restart) {
    if (busy && !restart) return;
    if (restart) return start(true);
    const n = (next === 'other' ? D : T).nodes[next];
    if (n && n.user === 'photo') bubble('me', `<div class="dm-photo"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="12" cy="12" r="3.5"/></svg><span>${esc(D.photo)}</span></div>`, 'has-card');
    else bubble('me', `<p>${esc(label)}</p>`);
    if (set) Object.assign(vars, set);
    if (vars.client) vars.first = vars.client.split(/[ ,]/)[0];
    go(next);
  }
  function route(text) {
    const s = text.toLowerCase();
    if (askNode) { vars.client = text.trim().slice(0, 40); vars.first = vars.client.split(/[ ,]/)[0]; return askNode; }
    if (/картридж|cartridge/.test(s)) return 'c1';
    if (/менеджер|manager|позвон|звон|call/.test(s)) return 'mgr';
    if (/фильтр|осмос|вод|filter|water|osmos|сүзгі|су\b/.test(s)) return 'f1';
    if (/привет|здрав|сәлем|салам|hello|^hi\b|hey/.test(s)) return 'start';
    return 'fallback';
  }
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text || busy) return;
    input.value = '';
    bubble('me', `<p>${esc(text)}</p>`);
    go(route(text));
  });

  function start(restart = false) {
    run++;
    D = DEMO[lang()]; T = D;
    vars = { water: 'city', size: '3–4', client: '', first: '' };
    busy = false; askNode = null;
    body.innerHTML = ''; chipsEl.innerHTML = '';
    if (!restart) fillStatic();
    crmReset();
    go('start', run);
  }

  // first message arrives when the phone scrolls into view
  D = DEMO[lang()]; fillStatic(); crmReset();
  new IntersectionObserver((es, io) => {
    if (es.some((e) => e.isIntersecting)) { io.disconnect(); started = true; start(); }
  }, { threshold: 0.35 }).observe($('.dm-phone'));
  // language switch: restart the conversation in the new language
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.lang button')) return;
    setTimeout(() => { D = DEMO[lang()]; fillStatic(); if (started) start(); else crmReset(); }, 30);
  });
})();
