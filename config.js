/* ============================================================
   ВСЁ СОДЕРЖИМОЕ САЙТА — ЗДЕСЬ.
   Тексты на трёх языках: ru — русский, en — английский, kz — казахский.
   Слова в *звёздочках* набираются вторым (антиквенным) шрифтом и цветом-акцентом.
   ============================================================ */
window.SITE = {
  name: { ru: "Мейржан", en: "Meirzhan", kz: "Мейіржан" },
  role: { ru: "Разработчик", en: "Developer", kz: "Әзірлеуші" },
  location: { ru: "Казахстан", en: "Kazakhstan", kz: "Қазақстан" },
  email: "mkabylzhanov@bk.ru",
  instagram: { handle: "@nevvspominal", url: "https://instagram.com/nevvspominal" },
  defaultLang: "ru",

  photos: {
    base: "photos/me-base.webp",         // главный портрет (без фона)
    alt: "photos/me-helmet.webp",
    helmetOn: "photos/me-helmet-front.webp",   // ты в шлеме (футер)
    helmet2: "photos/me-helmet-2.jpg",
    helmetCut: "photos/me-helmet-cut.webp",   // шлем с руками без фона — край блока «Работа / Жизнь»  // шлем с руками — блок «Работа / Жизнь»
    studio: "photos/me-studio.jpg",      // портрет с фоном
    breakPhoto: "photos/life/12-horse.jpg",
    fan: [                               // веер Instagram (центральное — по середине списка)
      "photos/about-4.jpg",
      "photos/about-1.jpg",
      "photos/me-helmet-2.jpg",
      "photos/me-studio.jpg",
      "photos/about-2.jpg",
      "photos/life/07-mountains.jpg",
      "photos/life/12-horse.jpg"
    ]
  },

  // --- Плашка на первом экране -----------------------------
  widget: {
    eyebrow: { ru: "Сейчас в работе", en: "Currently building", kz: "Қазір жасап жатырмын" },
    title: { ru: "AI-отдел продаж", en: "AI sales team", kz: "ЖИ сату бөлімі" },
    sub: { ru: "для «Живой Воды»", en: "for Zhivaya Voda", kz: "«Живая Вода» үшін" },
    status: { ru: "Открыт к проектам", en: "Open to projects", kz: "Жобаларға ашықпын" }
  },

  // --- Бегущие строки --------------------------------------
  marquee: {
    caption: { ru: "6 лет в IT", en: "6 years in IT", kz: "IT-де 6 жыл" },
    row1: { ru: ["Пока ты спишь"], en: ["While you sleep"], kz: ["Сен ұйықтағанда"] },
    row2: { ru: ["твой бизнес продаёт"], en: ["your business sells"], kz: ["бизнесің сатады"] }
  },

  // --- Манифест --------------------------------------------
  manifesto: {
    eyebrow: { ru: "Обо мне", en: "About me", kz: "Мен туралы" },
    text: {
      ru: "Строю *AI-отделы продаж*, сайты и *ботов*, которые работают *24/7* и приносят бизнесу *деньги*.",
      en: "I build *AI sales teams*, websites and *bots* that work *24/7* and bring businesses *money*.",
      kz: "Бизнеске *табыс* әкелетін, *24/7* жұмыс істейтін *ЖИ сату бөлімдерін*, сайттар мен *боттарды* жасаймын."
    }
  },

  // --- Горизонтальная лента «Путь» -------------------------
  story: {
    eyebrow: { ru: "Мой путь", en: "My path", kz: "Менің жолым" },
    quote: {
      ru: "Код — это *инструмент*. Результат — это *цель*.",
      en: "Code is the *tool*. Results are the *goal*.",
      kz: "Код — *құрал*. Нәтиже — *мақсат*."
    },
    text: {
      ru: "6 лет в IT. Сегодня запускаю *ИИ*, который сам отвечает клиентам в WhatsApp, передаёт заявки менеджерам и *продаёт* — днём и ночью.",
      en: "6 years in IT. Today I launch *AI* that answers clients on WhatsApp, hands leads to managers and *sells* — day and night.",
      kz: "IT саласында 6 жыл. Бүгін WhatsApp-та клиенттерге өзі жауап беретін, өтінімдерді менеджерлерге беретін және күндіз-түні *сататын* *ЖИ* іске қосамын."
    },
    // Лента идёт по хронологии. type: chapter — заголовок главы, photo — фото, text — абзац, stats — цифры.
    // w / h — размер фото (rem), y — сдвиг по вертикали.
    items: [
      { type: "chapter", n: "01", title: { ru: "Детство", en: "Childhood", kz: "Балалық" } },
      { type: "cluster", items: [
        { src: "photos/life/02-bear.jpg", cap: { ru: "Утренник", en: "New Year party", kz: "Ертеңгілік" } },
        { src: "photos/life/04-family.jpg", cap: { ru: "Семья", en: "Family", kz: "Отбасы" } }
      ] },
      { type: "text" },
      { type: "chapter", n: "02", title: { ru: "Друзья и дороги", en: "Friends & roads", kz: "Достар мен жолдар" } },
      { type: "photo", src: "photos/life/05-turkestan.jpg", w: 22, h: 29, y: -10, cap: { ru: "Туркестан · ночь", en: "Turkestan · night", kz: "Түркістан · түн" } },
      { type: "photo", src: "photos/life/07-mountains.jpg", w: 20, h: 27, y: -6, cap: { ru: "Горы · дорога", en: "Mountains · road", kz: "Тау · жол" } },
      { type: "photo", src: "photos/about-1.jpg", w: 17, h: 23, y: 12, cap: { ru: "Горы · зима", en: "Mountains · winter", kz: "Таулар · қыс" } },
      { type: "chapter", n: "03", title: { ru: "Сейчас", en: "Now", kz: "Қазір" } },
      { type: "stats" },
      { type: "photo", src: "photos/about-2.jpg", w: 18, h: 25, y: -8, cap: { ru: "Ночь · город", en: "Night · city", kz: "Түн · қала" } }
    ],
    stats: [
      { big: "6", label: { ru: "лет в IT", en: "years in IT", kz: "жыл IT-де" } },
      { big: "5+", label: { ru: "проектов в работе", en: "projects live", kz: "іске қосылған жоба" } },
      { big: "24/7", label: { ru: "боты на связи", en: "bots online", kz: "боттар байланыста" } }
    ]
  },

  // --- Работа / Жизнь --------------------------------------
  paths: [
    {
      small: { ru: "Моя", en: "My", kz: "Менің" },
      big: { ru: "Работа", en: "Work", kz: "Жұмысым" },
      script: { ru: "проекты", en: "projects", kz: "жобалар" },
      text: { ru: "AI-боты, сайты и магазины, которые я запустил.", en: "AI bots, websites and stores I've launched.", kz: "Мен іске қосқан ЖИ-боттар, сайттар мен дүкендер." },
      link: "#projects"
    },
    {
      small: { ru: "Моя", en: "My", kz: "Менің" },
      big: { ru: "Жизнь", en: "Life", kz: "Өмірім" },
      script: { ru: "вне кода", en: "off code", kz: "кодтан тыс" },
      text: { ru: "Горы, друзья, путешествия — то, что заряжает.", en: "Mountains, friends, trips — what keeps me going.", kz: "Таулар, достар, саяхат — күш беретін нәрселер." },
      link: "#interests"
    }
  ],

  // --- Чем я живу (интересы). Черновик по твоим фото — поправь под себя ---
  interestsTitle: { ru: "Чем я *живу*", en: "What I'm *into*", kz: "Немен *өмір сүремін*" },
  interests: [
    { title: { ru: "Машины", en: "Cars", kz: "Көліктер" },
      text: { ru: "Двигатели, дизайн, дорога — всё, что едет и звучит.", en: "Engines, design, the road — anything that drives and sounds right.", kz: "Қозғалтқыш, дизайн, жол — жүретін және дыбысы бар бәрі." },
      img: "photos/about-2.jpg" },
    { title: { ru: "Болиды Формулы-1", en: "Formula 1 cars", kz: "Формула-1 болидтері" },
      text: { ru: "Аэродинамика, телеметрия и инженерия на пределе.", en: "Aerodynamics, telemetry and engineering at the limit.", kz: "Аэродинамика, телеметрия және шектегі инженерия." },
      img: "photos/me-helmet-2.jpg" },
    { title: { ru: "Технологии", en: "Technology", kz: "Технологиялар" },
      text: { ru: "Новые гаджеты, AI и всё, что меняет правила игры.", en: "New gadgets, AI and anything that changes the game.", kz: "Жаңа гаджеттер, ЖИ және ойын ережесін өзгертетін бәрі." },
      img: "photos/int-tech.jpg" },
    { title: { ru: "IT и разработка", en: "IT & development", kz: "IT және әзірлеу" },
      text: { ru: "Строю системы, которые работают без меня — 24/7.", en: "I build systems that work without me — 24/7.", kz: "Менсіз де жұмыс істейтін жүйелер жасаймын — 24/7." },
      img: "photos/int-it.jpg" }
  ],

  breakCaption: { ru: "Мои корни — *в степи*", en: "My roots are *in the steppe*", kz: "Тамырым — *далада*" },

  // --- Проекты ---------------------------------------------
  projectsTitle: { ru: "Мои *проекты*", en: "My *projects*", kz: "Менің *жобаларым*" },
  projects: [
    {
      title: { ru: "Aqua Atom — AI-менеджер продаж", en: "Aqua Atom — AI Sales Manager", kz: "Aqua Atom — ЖИ сату менеджері" },
      cat: "ai", tags: ["AI", "WhatsApp", "Sales"],
      desc: {
        ru: "ИИ-менеджер отвечает клиентам в WhatsApp 24/7: подбирает фильтры и комплектующие, проверяет наличие и оформляет заявки.",
        en: "An AI manager answers clients on WhatsApp 24/7: picks filters and parts, checks stock and creates orders.",
        kz: "ЖИ-менеджер WhatsApp-та клиенттерге 24/7 жауап береді: сүзгілер мен бөлшектерді таңдайды, қоймадағы барын тексеріп, өтінім рәсімдейді."
      },
      image: "photos/projects/aqua-atom-ai.jpg", link: ""
    },
    {
      title: { ru: "Живая Вода — AI-продажи", en: "Zhivaya Voda — AI Sales", kz: "Живая Вода — ЖИ сату" },
      cat: "ai", tags: ["AI", "WhatsApp", "CRM"],
      desc: { ru: "Бот отвечает клиентам в WhatsApp и передаёт лиды менеджерам.", en: "The bot answers clients on WhatsApp and hands leads to managers.", kz: "Бот WhatsApp-та клиенттерге жауап беріп, лидтерді менеджерлерге береді." },
      image: "photos/projects/zhivaya-voda-sales.jpg", link: ""
    },
    {
      title: { ru: "Живая Вода — Техподдержка", en: "Zhivaya Voda — Support", kz: "Живая Вода — Техқолдау" },
      cat: "ai", tags: ["AI", "WhatsApp", "Support"],
      desc: { ru: "ИИ разбирает сотни чатов, база знаний и видеоинструкции.", en: "AI handles hundreds of chats, with a knowledge base and video guides.", kz: "ЖИ жүздеген чатты өңдейді, білім базасы мен бейненұсқаулықтар." },
      image: "photos/projects/zhivaya-voda-support.jpg", link: ""
    },
    {
      title: { ru: "Aqua Atom", en: "Aqua Atom", kz: "Aqua Atom" },
      cat: "web", tags: ["Web", "KZ / RU", "B2B"],
      desc: { ru: "Сайт производителя фильтров: каталог и заявки на КП.", en: "Filter manufacturer website: catalog and quote requests.", kz: "Сүзгі өндірушісінің сайты: каталог және КҰ өтінімдері." },
      image: "photos/projects/aqua-atom.jpg", link: "https://aquaatom.kz/"
    },
    {
      title: { ru: "Живая Вода — Магазин", en: "Zhivaya Voda — Store", kz: "Живая Вода — Дүкен" },
      cat: "shop", tags: ["E-commerce", "Online pay"],
      desc: { ru: "Магазин запчастей для водоматов с онлайн-оплатой.", en: "Parts store for water vending machines with online payment.", kz: "Су автоматтарына арналған онлайн-төлемі бар дүкен." },
      image: "photos/projects/zhivaya-voda-shop.jpg", link: "https://filterstore.kz/"
    },
    {
      title: { ru: "English с котом Кевином", en: "English with Kevin", kz: "Кевинмен ағылшын" },
      cat: "app", tags: ["EdTech", "Web App"],
      desc: { ru: "Уроки по 5 минут, XP, серии дней и подготовка к ЕГЭ.", en: "5-minute lessons, XP, streaks and exam prep.", kz: "5 минуттық сабақтар, XP, күндер сериясы." },
      image: "photos/projects/english-app.jpg", link: ""
    }
  ],

  // Закрытые проекты (NDA) — без названий и скриншотов
  ndaCard: {
    title: { ru: "Закрытые проекты", en: "Private projects", kz: "Жабық жобалар" },
    desc: {
      ru: "Внутренние системы и автоматизация для компаний — под NDA. Подробности при личной встрече.",
      en: "Internal systems and automation for companies — under NDA. Details in person.",
      kz: "Компанияларға арналған ішкі жүйелер мен автоматтандыру — NDA бойынша. Толығырақ — жеке кездесуде."
    }
  },

  // --- Как я работаю (4 шага) -----------------------------
  process: {
    eyebrow: { ru: "Как я работаю", en: "How I work", kz: "Қалай жұмыс істеймін" },
    title: { ru: "От идеи до *заявок* — четыре шага", en: "From idea to *leads* — four steps", kz: "Идеядан *өтінімдерге* дейін — төрт қадам" },
    steps: [
      { title: { ru: "Знакомство", en: "Discovery", kz: "Танысу" },
        text: { ru: "Разбираемся, где теряются клиенты и заявки, и решаем, что именно должен делать бот или сайт.", en: "We find where clients and leads get lost and decide exactly what the bot or site should do.", kz: "Клиенттер мен өтінімдер қай жерде жоғалатынын анықтап, бот не сайт нақты не істеуі керегін шешеміз." } },
      { title: { ru: "Прототип", en: "Prototype", kz: "Прототип" },
        text: { ru: "Показываю рабочую версию на ваших реальных вопросах и товарах — как в демо выше, только про ваш бизнес.", en: "I show a working version on your real questions and products — like the demo above, but about your business.", kz: "Нақты сұрақтарыңыз бен тауарларыңызда жұмыс істейтін нұсқаны көрсетемін — жоғарыдағы демо сияқты, бірақ сіздің бизнесіңіз туралы." } },
      { title: { ru: "Запуск", en: "Launch", kz: "Іске қосу" },
        text: { ru: "Подключаю к WhatsApp, сайту и вашей CRM, показываю менеджерам, как принимать заявки от бота.", en: "I connect it to WhatsApp, your site and CRM, and show managers how to take leads from the bot.", kz: "WhatsApp-қа, сайтқа және CRM-ге қосып, менеджерлерге боттан өтінім қабылдауды көрсетемін." } },
      { title: { ru: "Поддержка", en: "Support", kz: "Қолдау" },
        text: { ru: "Слежу за диалогами, дообучаю бота и улучшаю ответы, чтобы он продавал всё лучше.", en: "I watch the conversations, retrain the bot and improve its answers so it sells better and better.", kz: "Диалогтарды қадағалап, ботты қайта үйретемін және жауаптарын жақсартамын — ол барған сайын жақсы сатады." } }
    ]
  },

  // --- Частые вопросы (без цен) ---------------------------
  faq: {
    eyebrow: { ru: "Вопросы", en: "Questions", kz: "Сұрақтар" },
    title: { ru: "Частые *вопросы*", en: "Frequent *questions*", kz: "Жиі қойылатын *сұрақтар*" },
    items: [
      { q: { ru: "Бот говорит на казахском?", en: "Does the bot speak Kazakh?", kz: "Бот қазақша сөйлей ме?" },
        a: { ru: "Да. Бот отвечает на русском и казахском и сам понимает, на каком языке пишет клиент. Если нужно — добавлю английский.", en: "Yes. The bot answers in Russian and Kazakh and detects which language the client writes in. English can be added if needed.", kz: "Иә. Бот орысша және қазақша жауап береді, клиенттің қай тілде жазғанын өзі түсінеді. Қажет болса, ағылшын тілін қосамын." } },
      { q: { ru: "Что будет, если бот не знает ответа?", en: "What if the bot does not know the answer?", kz: "Бот жауапты білмесе не болады?" },
        a: { ru: "Он не выдумывает, а передаёт диалог менеджеру вместе со всей историей переписки — клиенту не придётся повторять.", en: "It does not make things up — it hands the chat to a manager with the full history, so the client never has to repeat themselves.", kz: "Ол ойдан шығармайды — диалогты бүкіл хат алмасу тарихымен бірге менеджерге береді, клиентке қайталаудың қажеті жоқ." } },
      { q: { ru: "Мне нужен свой программист или сервер?", en: "Do I need my own developer or server?", kz: "Маған өз бағдарламашым не серверім керек пе?" },
        a: { ru: "Нет. Я всё настраиваю, запускаю и поддерживаю сам. От вас — доступы, товары и ответы на частые вопросы клиентов.", en: "No. I set up, launch and maintain everything myself. From you I only need access, your products and answers to common client questions.", kz: "Жоқ. Бәрін өзім баптап, іске қосып, қолдаймын. Сізден — қолжетімділік, тауарлар және клиенттердің жиі сұрақтарына жауаптар." } },
      { q: { ru: "Куда попадают заявки?", en: "Where do the leads go?", kz: "Өтінімдер қайда түседі?" },
        a: { ru: "Туда, где вам удобно: в CRM, в Google Таблицу или сообщением менеджеру в WhatsApp — с именем, городом и тем, что нужно клиенту.", en: "Wherever suits you: your CRM, a Google Sheet or a WhatsApp message to a manager — with the client's name, city and what they need.", kz: "Өзіңізге ыңғайлы жерге: CRM-ге, Google кестеге немесе менеджерге WhatsApp хабарламасымен — клиенттің аты, қаласы және не керегімен." } },
      { q: { ru: "Вы работаете под NDA?", en: "Do you work under NDA?", kz: "NDA бойынша жұмыс істейсіз бе?" },
        a: { ru: "Да. Часть моих проектов — закрытые внутренние системы компаний, поэтому их нет в портфолио. Ваши данные остаются только у вас.", en: "Yes. Some of my projects are private internal company systems, which is why they are not in the portfolio. Your data stays yours.", kz: "Иә. Жобаларымның бір бөлігі — компаниялардың жабық ішкі жүйелері, сондықтан олар портфолиода жоқ. Деректеріңіз тек сізде қалады." } },
      { q: { ru: "Можно начать с маленькой задачи?", en: "Can we start with something small?", kz: "Кішкентай тапсырмадан бастауға бола ма?" },
        a: { ru: "Конечно. Часто начинаем с одного сценария — например, отвечать на вопросы о наличии, — а дальше растём, когда видно результат.", en: "Of course. We often start with one scenario — say, answering stock questions — and grow once the results are visible.", kz: "Әрине. Көбіне бір сценарийден бастаймыз — мысалы, тауардың бар-жоғы туралы сұрақтарға жауап беру — нәтиже көрінгенде кеңейтеміз." } }
    ]
  },

  // Фильтры над проектами (cat у проекта = id фильтра)
  projectFilters: [
    { id: "all", label: { ru: "Все", en: "All", kz: "Барлығы" } },
    { id: "ai", label: { ru: "AI и боты", en: "AI & bots", kz: "ЖИ және боттар" } },
    { id: "web", label: { ru: "Сайты", en: "Websites", kz: "Сайттар" } },
    { id: "shop", label: { ru: "Магазины", en: "Stores", kz: "Дүкендер" } },
    { id: "app", label: { ru: "Приложения", en: "Apps", kz: "Қосымшалар" } }
  ],

  // --- Главный проект --------------------------------------
  featured: {
    eyebrow: { ru: "Главный проект", en: "Featured project", kz: "Басты жоба" },
    title: { ru: "AI-отдел *продаж*", en: "AI sales *team*", kz: "ЖИ сату *бөлімі*" },
    text: {
      ru: "Для «Живой Воды» собрал отдел продаж на ИИ: бот отвечает клиентам в WhatsApp на русском и казахском, ведёт каталог, передаёт горячие заявки менеджерам и собирает отчёты.",
      en: "For Zhivaya Voda I built an AI sales team: the bot answers clients on WhatsApp in Russian and Kazakh, keeps the catalog, passes hot leads to managers and builds reports.",
      kz: "«Живая Вода» үшін ЖИ сату бөлімін жасадым: бот WhatsApp-та клиенттерге орыс және қазақ тілдерінде жауап береді, каталогты жүргізеді, ыстық өтінімдерді менеджерлерге береді және есеп жинайды."
    },
    shots: ["photos/projects/zhivaya-voda-sales.jpg", "photos/projects/zhivaya-voda-support.jpg"]
  },

  // --- Стек ------------------------------------------------
  stackTitle: { ru: "Технологии *& инструменты*", en: "Tech *& tools*", kz: "Технологиялар *& құралдар*" },
  stackScript: { ru: "стек", en: "stack", kz: "стек" },
  stackText: { ru: "То, на чём работают мои проекты каждый день.", en: "What my projects run on every day.", kz: "Жобаларым күнде жұмыс істейтін құралдар." },
  stack: ["Python", "OpenAI", "Claude", "WhatsApp API", "Telegram", "Node.js", "React", "FastAPI", "PostgreSQL", "Docker"],

  // --- Соцсети и футер -------------------------------------
  socialsTitle: { ru: "Что нового *в Instagram*", en: "What's new *on Instagram*", kz: "Instagram-да *не жаңалық*" },
  motto: { ru: "Всегда *в* деле.", en: "Always *in* the game.", kz: "Әрқашан *іс* үстінде." }
};
