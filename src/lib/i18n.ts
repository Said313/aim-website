export const LANGS = ["en", "kz", "ru"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "en";
export const LANG_LABELS: Record<Lang, string> = { en: "English", kz: "Қазақша", ru: "Русский" };
export const LANG_SHORT: Record<Lang, string> = { en: "EN", kz: "KZ", ru: "RU" };
export const HTML_LANG: Record<Lang, string> = { en: "en", kz: "kk", ru: "ru" };

export function isLang(value: string | undefined): value is Lang {
  return LANGS.some((lang) => lang === value);
}

const en = {
  meta: {
    title: "Aim · Money, in focus",
    description:
      "Aim is building a personal finance app for seeing what you have, understanding what you spend, and saving for what’s next. Starting in Kazakhstan.",
  },
  nav: {
    product: "Product",
    market: "Opportunity",
    team: "Team",
    investors: "Investors",
    waitlist: "Join waitlist",
    language: "Language",
    skip: "Skip to content",
    mainMenu: "Main navigation",
    footerMenu: "Footer navigation",
  },
  hero: {
    stage: "Kazakhstan first",
    title: "Money,",
    accent: "in focus.",
    description:
      "See what you have, understand what you spend, and save for what’s next. Aim brings your everyday finances into one clear view.",
    preview: "Explore the product",
  },
  preview: {
    overview: "Overview",
    balance: "Total balance",
    period: "Last 30 days",
    cashFlow: "Cash flow",
    income: "Income",
    spending: "Spending",
    net: "Net",
    goal: "Emergency fund",
    saved: "62% saved",
  },
  product: {
    eyebrow: "The product",
    title: "Make sense of your money.",
    description:
      "Aim starts with the records you already have. Bring in a statement, see where your money goes, and track the goals that matter to you.",
    steps: [
      {
        title: "Bring your records together",
        text: "Import a bank statement and review the transactions before adding them.",
      },
      {
        title: "Understand your cash flow",
        text: "Compare income and spending over time and find the categories driving the change.",
      },
      {
        title: "See your goals take shape",
        text: "Set a savings target, log contributions, and see how far you’ve come.",
      },
    ],
    tabsLabel: "Explore product examples",
    review: "Review statement",
    groceries: "Groceries",
    salary: "Salary",
    transport: "Transport",
    insights: "Monthly cash flow",
    insightsDetail: "A breakdown of this month’s spending",
    housing: "Housing",
    everyday: "Everyday spending",
    other: "Other",
    goals: "Savings goal",
    goalsDetail: "Progress toward a personal safety net",
    of: "of",
  },
  market: {
    eyebrow: "The opportunity",
    title: "Starting in Kazakhstan.",
    accent: "Built to travel.",
    description:
      "Kazakhstan is where we plan to test whether people will move from checking balances across apps to building a regular habit around their money. The same workflow could travel to markets with similar needs.",
    stats: [
      {
        detail: "of transactions made by people in Kazakhstan were cashless by count in 2024.",
        source: "National Bank of Kazakhstan",
      },
      {
        detail: "of adults worldwide had a financial account in 2024.",
        source: "World Bank · Global Findex",
      },
    ],
    stages: [
      {
        label: "First market",
        title: "Kazakhstan",
        text: "Start with local statement formats, tenge, and users who manage money across several accounts.",
      },
      {
        label: "Regional opportunity",
        title: "Central Asia",
        text: "Explore nearby markets and adapt statement imports, currency, and language support.",
      },
      {
        label: "Longer term",
        title: "Selected global markets",
        text: "Expand where demand, data access, and local requirements make the product viable.",
      },
    ],
    scenarioTitle: "What a subscription could look like",
    scenarioNote:
      "Illustrative assumptions only. Figures show a subscription run rate before costs at the assumed user count, conversion rate, and price.",
    scenarioLabels: ["Monthly active users", "Paid conversion", "Monthly price"],
    scenarioResult: "Illustrative annual run rate",
    scenarioMarkets: ["Kazakhstan example", "International example"],
  },
  team: {
    eyebrow: "The team",
    title: "Meet the founders.",
    names: ["Umidzhan Rakhmankulov", "Saidgaffor Sabyrov"],
    roles: ["Founder & CEO", "Founder & CTO"],
  },
  faq: {
    title: "Good to know.",
    items: [
      {
        question: "Can I use Aim today?",
        answer:
          "Aim is in development. Join the waitlist for updates about early access. Kazakhstan is the intended first market.",
      },
      {
        question: "How will I add my transactions?",
        answer:
          "The current design starts with statement imports and manual entries. You can review imported transactions before adding them. Direct bank connections are a future possibility and would depend on local coverage.",
      },
      {
        question: "Where does AI fit in?",
        answer:
          "The mobile designs include an assistant for exploring spending and voice entry for logging transactions. Both are part of the product design under development.",
      },
      {
        question: "Will Aim be available outside Kazakhstan?",
        answer:
          "We’re starting with Kazakhstani users and local statement formats. Expansion would depend on local demand, data access, and support for each market’s language and currency.",
      },
    ],
  },
  contact: {
    title: "Get early access.",
    description: "Join the waitlist for updates on Aim and the first release in Kazakhstan.",
    investorTitle: "Talk to the founders.",
    investorDescription:
      "Interested in investing in Aim or partnering with us? Tell us a little about yourself.",
    name: "Full name",
    email: "Email address",
    phone: "Phone number",
    message: "Message (optional)",
    waitlistNote:
      "Aim collects these details through Google Apps Script to manage the waitlist and contact you about early access.",
    investorNote:
      "Aim collects these details through Google Apps Script to respond to your inquiry.",
    submit: "Join the waitlist",
    submitInvestor: "Contact the team",
    submitting: "Sending…",
    success: "You’re on the waitlist.",
    successDetail: "We’ll use the email you provided to send early-access updates.",
    successInvestor: "Your message was sent.",
    successInvestorDetail: "The team can follow up using the contact details you provided.",
    error: "We couldn’t send your details. Please check your connection and try again.",
    noScript: "Enable JavaScript to submit this form.",
  },
  footer: "Made in Kazakhstan.",
  feedbackNav: "Aim Feedback links",
  feedbackLinks: {
    support: "Feedback support",
    privacy: "Feedback privacy",
    terms: "Feedback terms",
  },
};

type Dict = typeof en;

const kz: Dict = {
  meta: {
    title: "Aim · Қаржыңыз назарда",
    description:
      "Aim кіріс пен шығысты түсінуге және мақсаттарыңызға ақша жинауға көмектесетін жеке қаржы қолданбасын әзірлеуде. Алғашқы нарық — Қазақстан.",
  },
  nav: {
    product: "Өнім",
    market: "Мүмкіндік",
    team: "Команда",
    investors: "Инвесторларға",
    waitlist: "Кезекке жазылу",
    language: "Тіл",
    skip: "Мазмұнға өту",
    mainMenu: "Негізгі мәзір",
    footerMenu: "Төменгі мәзір",
  },
  hero: {
    stage: "Алдымен Қазақстан",
    title: "Қаржыңыз",
    accent: "назарда.",
    description:
      "Қанша ақшаңыз барын, қайда жұмсайтыныңызды көріңіз және алдағы мақсаттарыңызға жинаңыз. Aim күнделікті қаржыңызды бір жерге жинақтайды.",
    preview: "Өніммен танысу",
  },
  preview: {
    overview: "Шолу",
    balance: "Жалпы қалдық",
    period: "Соңғы 30 күн",
    cashFlow: "Ақша ағыны",
    income: "Кіріс",
    spending: "Шығыс",
    net: "Таза ағын",
    goal: "Төтенше жағдай қоры",
    saved: "62% жиналды",
  },
  product: {
    eyebrow: "Өнім",
    title: "Қаржыңызды жақсырақ түсініңіз.",
    description:
      "Aim қолыңыздағы деректерден бастайды. Банк көшірмесін импорттап, ақшаңыздың қайда жұмсалғанын көріңіз және маңызды мақсаттарыңызды қадағалаңыз.",
    steps: [
      {
        title: "Деректеріңізді жинақтаңыз",
        text: "Банк көшірмесін импорттаңыз және операцияларды қоспас бұрын тексеріңіз.",
      },
      {
        title: "Ақша ағынын түсініңіз",
        text: "Кіріс пен шығысты уақыт бойынша салыстырып, өзгеріске әсер еткен санаттарды анықтаңыз.",
      },
      {
        title: "Мақсатқа бір қадам жақындаңыз",
        text: "Жинақ мақсатын қойыңыз, салымдарыңызды белгілеңіз және қанша жинағаныңызды көріңіз.",
      },
    ],
    tabsLabel: "Өнім үлгілерін көру",
    review: "Көшірмені тексеру",
    groceries: "Азық-түлік",
    salary: "Жалақы",
    transport: "Көлік",
    insights: "Айлық ақша ағыны",
    insightsDetail: "Осы айдағы шығыстардың бөлінісі",
    housing: "Тұрғын үй",
    everyday: "Күнделікті шығын",
    other: "Басқа",
    goals: "Жинақ мақсаты",
    goalsDetail: "Қаржылық қор жинаудағы ілгерілеу",
    of: "/",
  },
  market: {
    eyebrow: "Нарық мүмкіндігі",
    title: "Қазақстаннан бастаймыз.",
    accent: "Көкжиегіміз кең.",
    description:
      "Қазақстанда адамдардың әр қолданбадағы шот қалдығын қарап қана қоймай, жеке қаржысын жүйелі түрде басқаруға дайын екенін тексеруді жоспарлап отырмыз. Ұқсас қажеттіліктері бар елдерде де осы тәсілді қолдануға болады.",
    stats: [
      {
        detail:
          "— 2024 жылы Қазақстан халқы жасаған операциялардың саны бойынша қолма-қол ақшасыз операциялардың үлесі.",
        source: "Қазақстан Ұлттық Банкі",
      },
      {
        detail: "— 2024 жылы әлемде қаржылық шоты бар ересектердің үлесі.",
        source: "Дүниежүзілік банк · Global Findex",
      },
    ],
    stages: [
      {
        label: "Алғашқы нарық",
        title: "Қазақстан",
        text: "Жергілікті банк көшірмелерінен, теңгеден және ақшасын бірнеше шотта ұстайтын пайдаланушылардан бастаймыз.",
      },
      {
        label: "Өңірлік мүмкіндік",
        title: "Орталық Азия",
        text: "Көрші нарықтарды зерттеп, көшірме импортын, валюталар мен тілдерді бейімдейміз.",
      },
      {
        label: "Ұзақ мерзімде",
        title: "Таңдаулы әлемдік нарықтар",
        text: "Сұраныс, деректерге қолжетімділік және жергілікті талаптар мүмкіндік берген елдерге шығуды қарастырамыз.",
      },
    ],
    scenarioTitle: "Жазылым үлгісі",
    scenarioNote:
      "Тек мысалға алынған болжамдар. Жылдық жазылым түсімі пайдаланушылар саны, ақылы жазылым үлесі және шартты баға бойынша есептелген. Шығындар ескерілмеген.",
    scenarioLabels: ["Айлық белсенді қолданушылар", "Ақылы жазылым үлесі", "Айлық баға"],
    scenarioResult: "Мысалдағы жылдық түсім",
    scenarioMarkets: ["Қазақстан мысалы", "Халықаралық мысал"],
  },
  team: {
    eyebrow: "Команда",
    title: "Негізін қалаушылар.",
    names: ["Умиджан Рахманкулов", "Саидгаффор Сабыров"],
    roles: ["Негізін қалаушы және бас директор", "Негізін қалаушы және техникалық директор"],
  },
  faq: {
    title: "Жиі қойылатын сұрақтар.",
    items: [
      {
        question: "Aim-ді қазір қолдана аламын ба?",
        answer:
          "Aim әзірленіп жатыр. Ерте қолжетімділік туралы жаңалық алу үшін кезекке жазылыңыз. Алғашқы нарық ретінде Қазақстанды жоспарлап отырмыз.",
      },
      {
        question: "Операцияларды қалай қосамын?",
        answer:
          "Қазіргі дизайнда банк көшірмесін импорттау және қолмен енгізу қарастырылған. Импортталған операцияларды қоспас бұрын тексеруге болады. Банктерді тікелей қосу мүмкіндігі жергілікті қамтуға байланысты кейін қарастырылады.",
      },
      {
        question: "Жасанды интеллект қалай қолданылады?",
        answer:
          "Мобильді дизайнда шығындарды талдауға арналған көмекші және операцияларды дауыспен енгізу мүмкіндігі бар. Екі мүмкіндік те әлі әзірленіп жатыр.",
      },
      {
        question: "Aim Қазақстаннан тыс жерде қолжетімді бола ма?",
        answer:
          "Қазақстандық пайдаланушылар мен жергілікті көшірме форматтарынан бастаймыз. Кеңею сұранысқа, деректерге қолжетімділікке және әр нарықтың тілі мен валютасын қолдауға байланысты.",
      },
    ],
  },
  contact: {
    title: "Ерте қолжетімділік.",
    description:
      "Aim және Қазақстандағы алғашқы шығарылым туралы жаңалық алу үшін кезекке жазылыңыз.",
    investorTitle: "Командамен байланысыңыз.",
    investorDescription:
      "Aim-ге инвестиция салу немесе серіктес болу қызық па? Өзіңіз туралы қысқаша айтып беріңіз.",
    name: "Аты-жөніңіз",
    email: "Электрондық пошта",
    phone: "Телефон нөмірі",
    message: "Хабарлама (міндетті емес)",
    waitlistNote:
      "Aim бұл деректерді кезекті жүргізу және ерте қолжетімділік туралы хабарлау үшін Google Apps Script арқылы жинайды.",
    investorNote:
      "Aim бұл деректерді өтінішіңізге жауап беру үшін Google Apps Script арқылы жинайды.",
    submit: "Кезекке жазылу",
    submitInvestor: "Хабарлама жіберу",
    submitting: "Жіберілуде…",
    success: "Сіз кезекке жазылдыңыз.",
    successDetail: "Ерте қолжетімділік туралы жаңалықтарды көрсеткен поштаңызға жібереміз.",
    successInvestor: "Хабарламаңыз жіберілді.",
    successInvestorDetail: "Команда көрсеткен байланыс деректеріңізді пайдаланып жауап бере алады.",
    error: "Деректеріңізді жібере алмадық. Байланысты тексеріп, қайта әрекет етіңіз.",
    noScript: "Пішінді жіберу үшін JavaScript қосыңыз.",
  },
  footer: "Қазақстанда жасалған.",
  feedbackNav: "Aim Feedback сілтемелері",
  feedbackLinks: { support: "Қолдау", privacy: "Құпиялық", terms: "Шарттар" },
};

const ru: Dict = {
  meta: {
    title: "Aim · Деньги в фокусе",
    description:
      "Aim разрабатывает приложение для личных финансов, чтобы видеть остатки, понимать расходы и копить на важное. Начинаем с Казахстана.",
  },
  nav: {
    product: "Продукт",
    market: "Возможности",
    team: "Команда",
    investors: "Инвесторам",
    waitlist: "В лист ожидания",
    language: "Язык",
    skip: "К содержанию",
    mainMenu: "Основное меню",
    footerMenu: "Нижнее меню",
  },
  hero: {
    stage: "Сначала Казахстан",
    title: "Деньги",
    accent: "в фокусе.",
    description:
      "Узнайте, сколько у вас денег, куда они уходят и как продвигаются накопления. Aim собирает повседневные финансы в одном месте.",
    preview: "Посмотреть продукт",
  },
  preview: {
    overview: "Обзор",
    balance: "Общий остаток",
    period: "Последние 30 дней",
    cashFlow: "Денежный поток",
    income: "Доходы",
    spending: "Расходы",
    net: "Чистый поток",
    goal: "Финансовая подушка",
    saved: "Накоплено 62%",
  },
  product: {
    eyebrow: "Продукт",
    title: "Разберитесь в своих финансах.",
    description:
      "Aim начинает с данных, которые у вас уже есть. Загрузите выписку, посмотрите, куда уходят деньги, и следите за важными финансовыми целями.",
    steps: [
      {
        title: "Соберите данные в одном месте",
        text: "Импортируйте банковскую выписку и проверьте операции перед добавлением.",
      },
      {
        title: "Разберитесь в движении денег",
        text: "Сравните доходы и расходы за разные периоды и найдите категории, которые повлияли на изменения.",
      },
      {
        title: "Следите за накоплениями",
        text: "Поставьте цель, отмечайте пополнения и смотрите, сколько уже удалось накопить.",
      },
    ],
    tabsLabel: "Примеры работы продукта",
    review: "Проверка выписки",
    groceries: "Продукты",
    salary: "Зарплата",
    transport: "Транспорт",
    insights: "Денежный поток за месяц",
    insightsDetail: "Расходы за месяц по категориям",
    housing: "Жильё",
    everyday: "Повседневные расходы",
    other: "Прочее",
    goals: "Цель накоплений",
    goalsDetail: "Прогресс в накоплении финансовой подушки",
    of: "из",
  },
  market: {
    eyebrow: "Рыночная возможность",
    title: "Начинаем с Казахстана.",
    accent: "Смотрим шире.",
    description:
      "В Казахстане мы хотим выяснить, готовы ли люди перейти от просмотра остатков в нескольких приложениях к регулярному управлению деньгами. Этот подход может работать и в странах с похожими потребностями.",
    stats: [
      {
        detail: "операций населения Казахстана в 2024 году были безналичными по количеству.",
        source: "Национальный Банк Казахстана",
      },
      {
        detail: "взрослых в мире имели финансовый счёт в 2024 году.",
        source: "Всемирный банк · Global Findex",
      },
    ],
    stages: [
      {
        label: "Первый рынок",
        title: "Казахстан",
        text: "Начинаем с местных форматов банковских выписок, тенге и пользователей с несколькими счетами.",
      },
      {
        label: "Региональная возможность",
        title: "Центральная Азия",
        text: "Изучим соседние рынки и адаптируем импорт выписок, валюты и языки.",
      },
      {
        label: "Долгосрочная цель",
        title: "Отдельные мировые рынки",
        text: "Рассмотрим выход на рынки, где есть спрос, доступ к данным и возможность соблюдать местные требования.",
      },
    ],
    scenarioTitle: "Как может выглядеть подписка",
    scenarioNote:
      "Условные допущения. Годовая выручка от подписки рассчитана на основе условного числа пользователей, доли платных подписок и цены. Расходы не учитываются.",
    scenarioLabels: ["Активные пользователи за месяц", "Доля платных подписок", "Цена в месяц"],
    scenarioResult: "Годовая выручка в примере",
    scenarioMarkets: ["Пример для Казахстана", "Международный пример"],
  },
  team: {
    eyebrow: "Команда",
    title: "Основатели Aim.",
    names: ["Умиджан Рахманкулов", "Саидгаффор Сабыров"],
    roles: ["Основатель и генеральный директор", "Основатель и технический директор"],
  },
  faq: {
    title: "Частые вопросы.",
    items: [
      {
        question: "Можно ли пользоваться Aim уже сейчас?",
        answer:
          "Aim в разработке. Запишитесь в лист ожидания, чтобы получать новости о раннем доступе. Первым рынком планируем сделать Казахстан.",
      },
      {
        question: "Как я смогу добавлять операции?",
        answer:
          "В текущем дизайне предусмотрены импорт выписок и ручной ввод. Импортированные операции можно проверить перед добавлением. Возможность прямого подключения банков зависит от доступности в каждом регионе.",
      },
      {
        question: "Как в Aim используется ИИ?",
        answer:
          "В дизайне мобильного приложения есть помощник для анализа расходов и голосовой ввод операций. Обе функции находятся в разработке.",
      },
      {
        question: "Будет ли Aim доступен за пределами Казахстана?",
        answer:
          "Начинаем с казахстанских пользователей и местных форматов выписок. Выход в другие страны зависит от спроса, доступа к данным и поддержки местной валюты и языка.",
      },
    ],
  },
  contact: {
    title: "Получите ранний доступ.",
    description:
      "Запишитесь в лист ожидания, чтобы получать новости об Aim и первом запуске в Казахстане.",
    investorTitle: "Свяжитесь с основателями.",
    investorDescription:
      "Хотите инвестировать в Aim или стать нашим партнёром? Расскажите немного о себе.",
    name: "Имя и фамилия",
    email: "Электронная почта",
    phone: "Номер телефона",
    message: "Сообщение (необязательно)",
    waitlistNote:
      "Aim собирает эти данные через Google Apps Script для ведения листа ожидания и уведомлений о раннем доступе.",
    investorNote:
      "Aim собирает эти данные через Google Apps Script, чтобы ответить на ваше обращение.",
    submit: "Записаться",
    submitInvestor: "Связаться с командой",
    submitting: "Отправляем…",
    success: "Вы в листе ожидания.",
    successDetail: "Мы отправим новости о раннем доступе на указанную почту.",
    successInvestor: "Сообщение отправлено.",
    successInvestorDetail: "Команда сможет ответить по указанным контактам.",
    error: "Не удалось отправить данные. Проверьте соединение и попробуйте снова.",
    noScript: "Включите JavaScript, чтобы отправить форму.",
  },
  footer: "Сделано в Казахстане.",
  feedbackNav: "Ссылки Aim Feedback",
  feedbackLinks: { support: "Поддержка", privacy: "Конфиденциальность", terms: "Условия" },
};

const dictionaries = { en, kz, ru };

export function t(lang: Lang): Dict {
  return dictionaries[lang];
}
