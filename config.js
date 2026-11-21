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
    alt: "photos/me-helmet.webp",        // шлем — проявляется под курсором (совмещён по глазам)
    helmet2: "photos/me-helmet-2.webp",  // шлем с руками — блок «Работа / Жизнь»
    studio: "photos/me-studio.jpg",      // портрет с фоном
    breakPhoto: "photos/life/12-horse.jpg",
    fan: [                               // веер Instagram (центральное — по середине списка)
      "photos/life/09-dinner.jpg", "photos/life/08-kitchen.jpg", "photos/about-4.jpg",
      "photos/me-studio.jpg", "photos/life/07-mountains.jpg", "photos/life/06-steppe.jpg", "photos/life/10-cafe.jpg"
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
    caption: { ru: "В IT много лет", en: "Many years in IT", kz: "IT-де көп жыл" },
    row1: { ru: ["Мейржан", "Разработчик"], en: ["Meirzhan", "Developer"], kz: ["Мейіржан", "Әзірлеуші"] },
    row2: { ru: ["AI", "Боты", "Сайты", "WhatsApp"], en: ["AI", "Bots", "Websites", "WhatsApp"], kz: ["ЖИ", "Боттар", "Сайттар", "WhatsApp"] }
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
      ru: "Много лет в IT. Сегодня запускаю *ИИ*, который сам отвечает клиентам в WhatsApp, передаёт заявки менеджерам и *продаёт* — днём и ночью.",
      en: "Many years in IT. Today I launch *AI* that answers clients on WhatsApp, hands leads to managers and *sells* — day and night.",
      kz: "IT саласында көп жыл. Бүгін WhatsApp-та клиенттерге өзі жауап беретін, өтінімдерді менеджерлерге беретін және күндіз-түні *сататын* *ЖИ* іске қосамын."
    },
    // Лента идёт по хронологии. type: chapter — заголовок главы, photo — фото, text — абзац, stats — цифры.
    // w / h — размер фото (rem), y — сдвиг по вертикали.
    items: [
      { type: "chapter", n: "01", title: { ru: "Детство", en: "Childhood", kz: "Балалық" } },
      { type: "photo", src: "photos/life/01-baby.jpg", w: 17, h: 26, y: -8, cap: { ru: "Самое начало", en: "The very beginning", kz: "Бастауы" } },
      { type: "photo", src: "photos/life/02-bear.jpg", w: 15, h: 24, y: 12, cap: { ru: "Новогодний утренник", en: "New Year party", kz: "Жаңа жыл ертеңгілігі" } },
      { type: "photo", src: "photos/life/03-dance.jpg", w: 21, h: 28, y: -4, cap: { ru: "Первый танец", en: "First dance", kz: "Алғашқы би" } },
      { type: "photo", src: "photos/life/04-family.jpg", w: 22, h: 29, y: 8, cap: { ru: "Семья", en: "Family", kz: "Отбасы" } },
      { type: "text" },
      { type: "chapter", n: "02", title: { ru: "Друзья и дороги", en: "Friends & roads", kz: "Достар мен жолдар" } },
      { type: "photo", src: "photos/life/05-turkestan.jpg", w: 22, h: 29, y: -10, cap: { ru: "Туркестан · ночь", en: "Turkestan · night", kz: "Түркістан · түн" } },
      { type: "photo", src: "photos/life/06-steppe.jpg", w: 15, h: 26, y: 14, cap: { ru: "Степь", en: "The steppe", kz: "Дала" } },
      { type: "photo", src: "photos/life/07-mountains.jpg", w: 20, h: 27, y: -6, cap: { ru: "Горы · дорога", en: "Mountains · road", kz: "Тау · жол" } },
      { type: "photo", src: "photos/about-1.jpg", w: 17, h: 23, y: 12, cap: { ru: "Горы · зима", en: "Mountains · winter", kz: "Таулар · қыс" } },
      { type: "photo", src: "photos/life/08-kitchen.jpg", w: 20, h: 27, y: -12, cap: { ru: "Свои люди", en: "My people", kz: "Өз адамдарым" } },
      { type: "photo", src: "photos/life/09-dinner.jpg", w: 21, h: 28, y: 8, cap: { ru: "Новый год с друзьями", en: "New Year with friends", kz: "Достармен Жаңа жыл" } },
      { type: "photo", src: "photos/life/10-cafe.jpg", w: 16, h: 21, y: -14, cap: { ru: "Вечер в городе", en: "Evening in the city", kz: "Қаладағы кеш" } },
      { type: "photo", src: "photos/life/11-night.jpg", w: 17, h: 22, y: 12, cap: { ru: "Ночная дорога", en: "Night drive", kz: "Түнгі жол" } },
      { type: "chapter", n: "03", title: { ru: "Сейчас", en: "Now", kz: "Қазір" } },
      { type: "stats" },
      { type: "photo", src: "photos/about-2.jpg", w: 18, h: 25, y: -8, cap: { ru: "Ночь · город", en: "Night · city", kz: "Түн · қала" } },
      { type: "photo", src: "photos/about-6.jpg", w: 20, h: 27, y: 10, cap: { ru: "Шаг за шагом", en: "Step by step", kz: "Қадам сайын" } }
    ],
    stats: [
      { big: { ru: "Много", en: "Many", kz: "Көп" }, label: { ru: "лет в IT", en: "years in IT", kz: "жыл IT-де" } },
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
      link: "#socials"
    }
  ],

  breakCaption: { ru: "Выше — это *привычка*", en: "Higher is a *habit*", kz: "Биіктік — *әдет*" },

  // --- Проекты ---------------------------------------------
  projectsTitle: { ru: "Мои *проекты*", en: "My *projects*", kz: "Менің *жобаларым*" },
  projects: [
    {
      title: { ru: "Живая Вода — AI-продажи", en: "Zhivaya Voda — AI Sales", kz: "Живая Вода — ЖИ сату" },
      tags: ["AI", "WhatsApp", "CRM"],
      desc: { ru: "Бот отвечает клиентам в WhatsApp и передаёт лиды менеджерам.", en: "The bot answers clients on WhatsApp and hands leads to managers.", kz: "Бот WhatsApp-та клиенттерге жауап беріп, лидтерді менеджерлерге береді." },
      image: "photos/projects/zhivaya-voda-sales.jpg", link: ""
    },
    {
      title: { ru: "Живая Вода — Техподдержка", en: "Zhivaya Voda — Support", kz: "Живая Вода — Техқолдау" },
      tags: ["AI", "WhatsApp", "Support"],
      desc: { ru: "ИИ разбирает сотни чатов, база знаний и видеоинструкции.", en: "AI handles hundreds of chats, with a knowledge base and video guides.", kz: "ЖИ жүздеген чатты өңдейді, білім базасы мен бейненұсқаулықтар." },
      image: "photos/projects/zhivaya-voda-support.jpg", link: ""
    },
    {
      title: { ru: "Aqua Atom", en: "Aqua Atom", kz: "Aqua Atom" },
      tags: ["Web", "KZ / RU", "B2B"],
      desc: { ru: "Сайт производителя фильтров: каталог и заявки на КП.", en: "Filter manufacturer website: catalog and quote requests.", kz: "Сүзгі өндірушісінің сайты: каталог және КҰ өтінімдері." },
      image: "photos/projects/aqua-atom.jpg", link: ""
    },
    {
      title: { ru: "Живая Вода — Магазин", en: "Zhivaya Voda — Store", kz: "Живая Вода — Дүкен" },
      tags: ["E-commerce", "Online pay"],
      desc: { ru: "Магазин запчастей для водоматов с онлайн-оплатой.", en: "Parts store for water vending machines with online payment.", kz: "Су автоматтарына арналған онлайн-төлемі бар дүкен." },
      image: "photos/projects/zhivaya-voda-shop.jpg", link: ""
    },
    {
      title: { ru: "English с котом Кевином", en: "English with Kevin", kz: "Кевинмен ағылшын" },
      tags: ["EdTech", "Web App"],
      desc: { ru: "Уроки по 5 минут, XP, серии дней и подготовка к ЕГЭ.", en: "5-minute lessons, XP, streaks and exam prep.", kz: "5 минуттық сабақтар, XP, күндер сериясы." },
      image: "photos/projects/english-app.jpg", link: ""
    }
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
