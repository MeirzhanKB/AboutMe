/* ============================================================
   ВСЁ СОДЕРЖИМОЕ САЙТА — ЗДЕСЬ.
   Тексты на трёх языках: ru — русский, en — английский, kz — казахский.
   Слова в *звёздочках* выделяются серым (вторая строка заголовка).
   Ответы демо-чата — в файле demo.js.
   ============================================================ */
window.SITE = {
  name: { ru: "Мейржан", en: "Meirzhan", kz: "Мейіржан" },
  role: { ru: "Разработчик", en: "Developer", kz: "Әзірлеуші" },
  location: { ru: "Казахстан", en: "Kazakhstan", kz: "Қазақстан" },
  email: "mkabylzhanov@bk.ru",
  instagram: { handle: "@nevvspominal", url: "https://instagram.com/nevvspominal" },
  defaultLang: "ru",

  portrait: "photos/me-base.webp",
  helmet: "photos/me-helmet.webp",        // тот же портрет в шлеме — проявляется под курсором

  // --- Первый экран -----------------------------------------
  hero: {
    title: { ru: "AI-отделы продаж *и сайты для бизнеса*", en: "AI sales teams *and websites for business*", kz: "ЖИ сату бөлімдері *және бизнеске сайттар*" },
    lead: {
      ru: "Делаю ботов, которые сами отвечают клиентам в WhatsApp и передают заявки менеджерам, — и сайты, которые продают.",
      en: "I build bots that answer clients on WhatsApp and hand leads to managers — and websites that sell.",
      kz: "WhatsApp-та клиенттерге өзі жауап беретін, өтінімдерді менеджерлерге беретін боттар және сататын сайттар жасаймын."
    },
    status: { ru: "Открыт к проектам", en: "Open to projects", kz: "Жобаларға ашықпын" },
    hint: { ru: "Наведи на лицо — F1 esports, моё хобби", en: "Hover my face — F1 esports, my hobby", kz: "Бетіме апар — F1 esports, хоббиім" },
    hintTouch: { ru: "Шлем — это F1 esports, моё хобби", en: "The helmet is F1 esports, my hobby", kz: "Дулыға — F1 esports, хоббиім" }
  },

  // --- Бегущие строки за карточкой (видны при прокрутке) ---
  marquee: {
    caption: { ru: "6 лет в IT", en: "6 years in IT", kz: "IT-де 6 жыл" },
    row1: { ru: ["Пока ты спишь"], en: ["While you sleep"], kz: ["Сен ұйықтағанда"] },
    row2: { ru: ["твой бизнес продаёт"], en: ["your business sells"], kz: ["бизнесің сатады"] }
  },

  // --- Обо мне ----------------------------------------------
  about: {
    label: { ru: "Обо мне", en: "About", kz: "Мен туралы" },
    text: {
      ru: "Шесть лет в IT. Строю системы, которые работают *без выходных*: бот принимает клиента, подбирает товар, оформляет заявку и отдаёт её менеджеру — *пока команда спит*.",
      en: "Six years in IT. I build systems that work *without days off*: the bot greets the client, picks the product, creates the order and hands it to a manager — *while the team sleeps*.",
      kz: "IT саласында алты жыл. *Демалыссыз* жұмыс істейтін жүйелер жасаймын: бот клиентті қарсы алады, тауар таңдайды, өтінім рәсімдеп, менеджерге береді — *команда ұйықтап жатқанда*."
    },
    facts: [
      { big: "6", label: { ru: "лет в IT", en: "years in IT", kz: "жыл IT-де" } },
      { big: "6+", label: { ru: "запущенных проектов", en: "projects launched", kz: "іске қосылған жоба" } },
      { big: "24/7", label: { ru: "боты на связи", en: "bots online", kz: "боттар байланыста" } },
      { big: "RU · KZ", label: { ru: "языки ботов", en: "bot languages", kz: "бот тілдері" } }
    ],
    hobby: { ru: "Вне работы — Формула 1 и гонки в F1 esports.", en: "Off the clock — Formula 1 and racing in F1 esports.", kz: "Жұмыстан тыс — Формула 1 және F1 esports жарыстары." }
  },

  // --- Проекты (тёмная сетка с фильтрами). cat — id фильтра; link "" — без ссылки ---
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
      image: "photos/projects/aqua-atom-ai.jpg", link: "#demo"
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

  // Фильтры над проектами
  projectFilters: [
    { id: "all", label: { ru: "Все", en: "All", kz: "Барлығы" } },
    { id: "ai", label: { ru: "AI и боты", en: "AI & bots", kz: "ЖИ және боттар" } },
    { id: "web", label: { ru: "Сайты", en: "Websites", kz: "Сайттар" } },
    { id: "shop", label: { ru: "Магазины", en: "Stores", kz: "Дүкендер" } },
    { id: "app", label: { ru: "Приложения", en: "Apps", kz: "Қосымшалар" } }
  ],

  // --- Футер «Всегда в деле» ---------------------------------
  motto: { ru: "Всегда *в* деле.", en: "Always *in* the game.", kz: "Әрқашан *іс* үстінде." },
  stack: ["Python", "OpenAI", "Claude", "WhatsApp API", "Telegram", "Node.js", "React", "FastAPI", "PostgreSQL", "Docker"],
  helmetPortrait: "photos/me-helmet-front.webp",

  // --- Контакты (низ сайта) ---------------------------------
  contact: {
    label: { ru: "Контакты", en: "Contact", kz: "Байланыс" },
    title: { ru: "Есть задача? *Давайте обсудим.*", en: "Have a task? *Let's talk.*", kz: "Тапсырма бар ма? *Талқылайық.*" },
    text: { ru: "Отвечаю в течение дня.", en: "I reply within a day.", kz: "Бір күн ішінде жауап беремін." }
  }
};
