import type {
  ModuleItem,
  PhotoItem,
  ProjectItem,
  ServerMetric,
  SkillGroup,
  SocialGroup,
  SocialLink,
  ValueItem,
} from "@/lib/types"

export const siteConfig = {
  name: "Your Name",
  email: "you@example.com",
  phone: "+7 000 000-00-00",
  timezone: "UTC+3",
  availability: "открыт к проектам",
  description:
    "Портфолио инженера-разработчика: код, self-hosting, автоматизация, C/C++ и 3D-печать. Плюс телеметрия домашнего сервера.",
  url: "https://your-domain.example.com",
}

// Account whose public repositories feed the commit section on the homepage.
export const githubOwner = "your-github-username"

export const githubProfile: SocialLink = {
  id: "github",
  label: "GitHub",
  handle: "@your-github-username",
  href: "https://github.com/your-github-username",
  category: "development",
  showInFooter: true,
}

export const personalTelegram: SocialLink = {
  id: "telegram",
  label: "Telegram",
  handle: "@your_telegram",
  href: "https://t.me/your_telegram",
  category: "community",
  showInHeader: true,
  showInFooter: true,
}

export const socialLinks: SocialLink[] = [
  githubProfile,
  {
    id: "thingiverse",
    label: "Thingiverse",
    handle: "your_username",
    href: "https://www.thingiverse.com/your_username/designs",
    category: "development",
  },
  {
    id: "youtube",
    label: "YouTube",
    handle: "@your_channel",
    href: "https://www.youtube.com/@your_channel",
    category: "content",
  },
  {
    id: "twitch",
    label: "Twitch",
    handle: "your_username",
    href: "https://www.twitch.tv/your_username",
    category: "content",
  },
  {
    id: "instagram",
    label: "Instagram",
    handle: "@your_username",
    href: "https://www.instagram.com/your_username/",
    category: "content",
  },
  {
    id: "tiktok",
    label: "TikTok",
    handle: "@your_tiktok",
    href: "https://www.tiktok.com/@your_tiktok",
    category: "content",
  },
  {
    id: "pinterest",
    label: "Pinterest",
    handle: "pin.it/your-pin",
    href: "https://pin.it/your-pin",
    category: "content",
  },
  personalTelegram,
  {
    id: "telegram-channel",
    label: "Telegram-канал",
    handle: "@your_channel",
    href: "https://t.me/your_channel",
    category: "community",
  },
  {
    id: "discord",
    label: "Discord",
    handle: "профиль",
    href: "https://discord.com/users/1234567890123456789",
    category: "community",
  },
  {
    id: "vk",
    label: "VK",
    handle: "your_page",
    href: "https://vk.ru/your_page",
    category: "community",
  },
  {
    id: "reddit",
    label: "Reddit",
    handle: "u/your_reddit",
    href: "https://www.reddit.com/user/your_reddit/",
    category: "community",
  },
  {
    id: "dalink",
    label: "DaLink",
    handle: "dalink.to/your_username",
    href: "https://dalink.to/your_username",
    category: "support",
  },
  {
    id: "boosty",
    label: "Boosty",
    handle: "boosty.to/your_page",
    href: "https://boosty.to/your_page",
    category: "support",
  },
]

export const socialGroups: SocialGroup[] = [
  { id: "development", title: "Разработка и создание" },
  { id: "content", title: "Контент и творческие платформы" },
  { id: "community", title: "Сообщество и связь" },
  { id: "support", title: "Поддержка и дополнительные ссылки" },
]

export const modules: ModuleItem[] = [
  {
    href: "/development",
    index: "01",
    title: "Разработка",
  },
  {
    href: "/design",
    index: "02",
    title: "Проектирование",
  },
  {
    href: githubProfile.href,
    index: "03",
    title: "GitHub",
    external: true,
    icon: "github",
  },
  {
    href: "/personality",
    index: "04",
    title: "Личность",
  },
  {
    href: "/social",
    index: "05",
    title: "Социальное",
  },
]

export const developmentProjects: ProjectItem[] = [
  {
    slug: "home-lab",
    name: "Домашняя серверная инфраструктура",
    subtitle: "Home-Lab · self-hosted services",
    status: "Работает",
    description:
      "Домашний сервер на базе старого ноутбука: локальные сервисы, хостинг портфолио и доступ через reverse proxy.",
    details: [
      "Хостинг сайта-портфолио и внутренних сервисов на Debian 13.",
      "Резервные копии данных и конфигураций в приватный репозиторий по расписанию и при изменениях.",
      "Контейнеризация сервисов через Docker и Docker Compose для изоляции и быстрого развёртывания.",
      "Внешний доступ через NPM: reverse proxy, Let's Encrypt и DuckDNS.",
    ],
    stack: ["Debian 13", "Docker", "Docker Compose", "NPM", "Git", "Bash", "SSH"],
    importance: "silver",
  },
  {
    slug: "automation",
    name: "Автоматизация и интеграции",
    subtitle: "Python · Telegram · AI-агенты",
    status: "Практика",
    description:
      "Скрипты и интеграции для автоматизации задач: Telegram-боты, подключение AI-агентов, резервное копирование и мониторинг.",
    details: [
      "Подключение AI-агентов openClaw и Hermes к Telegram-ботам и настройка каналов связи.",
      "Ранние учебные Telegram-боты на Python.",
      "Автоматизация резервного копирования и мониторинга состояния сервера.",
    ],
    stack: ["Python", "Telegram", "AI-агенты", "Git"],
    importance: "normal",
  },
  {
    slug: "c-cpp",
    name: "C/C++ и микроконтроллеры",
    subtitle: "C/C++ · Arduino · база",
    status: "База",
    description:
      "C/C++ с олимпиадной и графической практикой, макеты на Arduino и база для будущих устройств.",
    details: [
      "4 года C/C++: олимпиадное программирование, самостоятельные проекты и курс CGSG по компьютерной графике.",
      "Arduino: макетные схемы и навесной монтаж.",
      "ESP32, умный дом и законченные устройства — в планах.",
    ],
    stack: ["C", "C++", "Arduino", "макетные платы"],
    importance: "silver",
    note: "Законченных устройств на Arduino/ESP пока нет: только макеты.",
  },
  {
    slug: "portfolio-upgrade",
    name: "Развитие сайта-портфолио",
    subtitle: "Next.js 14 → 16 · React 19 · Node.js",
    status: "В проде",
    description:
      "Сопровождение собственного сайта на домашнем сервере с обновлением технологического стека и проверкой совместимости перед публикацией.",
    details: [
      "Миграция с Next.js 14 на Next.js 16, React 18 на React 19 и обновление Node.js.",
      "Локально выполнены npm ci, lint, typecheck и production build.",
      "Проверены standalone-сборка, API, security headers и GitHub feed в online- и offline-сценариях.",
      "Исправление совместимости сборки с более старым CPU сервера; публикация fast-forward с проверкой SHA коммита.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Node.js", "npm", "Git", "GitHub", "Linux"],
    importance: "silver",
  },
  {
    slug: "beszel-monitoring",
    name: "Мониторинг домашнего сервера",
    subtitle: "Beszel · Docker · HTTP API",
    status: "Работает",
    description:
      "Подключение мониторинга домашней инфраструктуры и вывод статуса системы на сайт-портфолио.",
    details: [
      "Развёрнут beszel-agent в Docker и проверено его состояние после запуска.",
      "API Beszel отвечает HTTP 200, система отображается на сайте как online.",
      "Данные агента вынесены в постоянный каталог, Docker socket подключён только read-only.",
      "Старый нативный агент отключён, но сохранён как вариант отката.",
    ],
    stack: ["Debian 13", "Docker", "Beszel", "HTTP API", "Linux services"],
    importance: "normal",
  },
  {
    slug: "backups",
    name: "Резервное копирование сервера",
    subtitle: "systemd · Git · Bash",
    status: "Работает",
    description:
      "Регулярное резервное копирование конфигураций и данных с контролем состояния через systemd.",
    details: [
      "Таймер homelab-backup.timer и сервис homelab-backup.service работают по расписанию.",
      "Журнал выполнения проверяется через systemctl и journalctl.",
      "Восстановление из резервной копии проверено; ключ сохранён.",
    ],
    stack: ["Linux", "systemd", "Git", "Bash"],
    importance: "normal",
  },
  {
    slug: "vps-security",
    name: "Linux VPS и сетевой доступ",
    subtitle: "SSH · Tailscale · AmneziaWG",
    status: "Работает",
    description:
      "Практическая работа с Debian 13 VPS, SSH-доступом, Tailscale, Docker и VPN-сервисом AmneziaWG.",
    details: [
      "Аудит SSH-доступа, сетевой конфигурации, Docker и правил фильтрации трафика.",
      "Ограничение публичного SSH и проверка подключения администратора через Tailscale.",
      "Проверка, что после сетевых изменений VPN-клиенты и Tailscale Exit Node продолжили работать.",
      "Разбор прохождения трафика через Docker DNAT/FORWARD и host firewall, чтобы не нарушить работу VPN.",
      "Fail2ban установлен и работает на VPS.",
    ],
    stack: ["Debian 13", "SSH", "Tailscale", "Docker", "AmneziaWG", "nftables", "Fail2ban"],
    importance: "silver",
  },
  {
    slug: "agent-workflow",
    name: "Инструкции и безопасная автоматизация",
    subtitle: "OpenCode · AGENTS.md · SSH",
    status: "Практика",
    description:
      "Рабочий процесс для AI-агента, который сопровождает код и инфраструктуру, при этом действия на сервере ограничены явными правилами.",
    details: [
      "Структура проекта с AGENTS.md, описанием инфраструктуры и отдельными сессиями под разные задачи.",
      "Правила read-only preflight, проверки состояния до изменений, безопасного SSH-доступа и обязательного подтверждения результата.",
      "Разделены задачи локальной сборки, деплоя, GitHub-операций и администрирования через SSH.",
      "Запреты на рискованные действия без проверки, сохранение возможности отката и явная маркировка непроверенных результатов.",
    ],
    stack: ["OpenCode", "Markdown", "SSH", "Git/GitHub", "Linux"],
    importance: "normal",
  },
]

export const engineeringProjects: ProjectItem[] = [
  {
    slug: "3d-print",
    name: "3D-моделирование и печать",
    subtitle: "Fusion 360 · Компас-3D · FDM",
    status: "Практика",
    description:
      "Моделирование под печать и полный цикл: от идеи в САПР до готовой детали.",
    details: [
      "Fusion 360 и Компас-3D: корпуса, крепёж, органайзеры и функциональные детали.",
      "Печать PETG и PLA, калибровка под катушку, Orca Slicer.",
      "Корпус для переноса платы мыши под самодельный фингертип, Gridfinity, вазы и бытовые мелочи.",
    ],
    stack: ["Fusion 360", "Компас-3D", "Orca Slicer", "PETG", "PLA"],
    importance: "gold",
  },
  {
    slug: "printer-kp3s",
    name: "Кастомный 3D-принтер",
    subtitle: "Kingroon KP3S · Klipper · Linux",
    status: "Работает",
    description:
      "Kingroon KP3S первой ревизии, доведённый до стабильной печати: железо, прошивка и сервер управления.",
    details: [
      "Замена сопла, калибровка геометрии, центровка оси Z, стеклянный стол и обслуживание механики.",
      "Смена стека Marlin → OctoPrint → Klipper; Moonraker и Mainsail на старом ноутбуке ASUS X56V.",
      "Камера на напечатанной стойке, таймлапсы, Wake-on-LAN и печать по сети из Orca Slicer.",
      "В планах: герметичная сушилка для катушек с контролем температуры и влажности, корпус с подогревом.",
    ],
    stack: ["Klipper", "Moonraker", "Mainsail", "Orca Slicer", "Linux"],
    importance: "gold",
  },
  {
    slug: "electronics",
    name: "Электроника и пайка",
    subtitle: "Arduino · макеты · начало",
    status: "База",
    description:
      "Макетирование на Arduino, схемы подключения и пайка начального уровня.",
    details: [
      "Схемы подключения и макетные платы, навесной монтаж.",
      "Пайка паяльником Alientech T90A: начальный уровень, без SMD и фена.",
      "Мультиметр: проверка аккумуляторов, проводки и мелкая диагностика.",
    ],
    stack: ["Arduino", "макетные платы", "пайка", "мультиметр"],
    importance: "normal",
    note: "Печатные платы не проектировались и не заказывались.",
  },
  {
    slug: "hardware-build",
    name: "Сборка и ремонт техники",
    subtitle: "ПК · ноутбуки · обслуживание",
    status: "Практика",
    description:
      "Сборка ПК, замена термоинтерфейсов, чистка и ремонт электроники на уровне съёмных компонентов.",
    details: [
      "Собрано больше пяти ПК: подбор комплектующих, сборка и охлаждение.",
      "Замена термопасты и термопрокладок, физическая и программная чистка.",
      "Семейный ремонт: аккумуляторы телефонов, ноутбуков, фонариков и бытовой техники.",
      "Компонентный ремонт плат не делал: только замена съёмных модулей.",
    ],
    stack: ["hardware", "диагностика", "термоинтерфейсы"],
    importance: "gold",
  },
]

export const engineeringSkills: SkillGroup[] = [
  {
    title: "CAD",
    items: ["Компас-3D", "Fusion 360", "моделирование под печать", "чертежи"],
  },
  {
    title: "3D-печать",
    items: ["FDM", "PLA и PETG", "Orca Slicer", "Klipper / Moonraker / Mainsail", "калибровка и обслуживание"],
  },
  {
    title: "Электроника",
    items: [
      "макетные платы",
      "схемы подключения",
      "пайка (начальный уровень)",
      "мультиметр",
    ],
  },
  {
    title: "Железо",
    items: ["сборка ПК", "диагностика и ремонт", "термоинтерфейсы", "замена аккумуляторов"],
  },
]

export const developmentStack = [
  "Python",
  "C/C++",
  "TypeScript",
  "Next.js",
  "Docker",
  "Linux",
  "Git",
]

export const engineeringToolkit = [
  "Компас-3D",
  "Fusion 360",
  "Orca Slicer",
  "Klipper",
  "PETG / PLA",
  "пайка",
]

export const values: ValueItem[] = [
  {
    index: "01",
    title: "Полный цикл",
    description:
      "Спроектировать вещь от и до: концепт, модель в САПР, печать и сборка — и подключить к своему серверу.",
  },
  {
    index: "02",
    title: "Разбираюсь в причине",
    description:
      "Баг в коде, сбой Linux-демона, помехи в схеме или капризы 3D-принтера — сначала диагноз по данным.",
  },
  {
    index: "03",
    title: "Свой сервер, свои правила",
    description:
      "Развиваю self-hosting: приватность данных, безопасность и полный контроль над сервисами.",
  },
]

export const approach: ValueItem[] = [
  {
    index: "01",
    title: "Диагностика по данным",
    description:
      "Журналы systemd, HTTP-ответы, Git-история, статические проверки и трассы производительности вместо визуальных симптомов.",
  },
  {
    index: "02",
    title: "Изменения с контролем риска",
    description:
      "Сначала фиксирую исходное состояние, затем вношу небольшие изменения и проверяю, что не задеты SSH, маршрутизация, VPN и контейнеры.",
  },
  {
    index: "03",
    title: "Воспроизводимость",
    description:
      "Оформляю процедуры, инструкции и отчёты так, чтобы результат можно было проверить повторно, а не только пересказать словами.",
  },
  {
    index: "04",
    title: "Честный статус",
    description:
      "Отделяю подготовленный сценарий от выполненного, локальную сборку от production-проверки, работающий сервис от проверенного восстановления.",
  },
]

export const interests = [
  "Self-hosting и домашняя лаборатория",
  "3D-моделирование и DIY",
  "Ремонт и компьютерное железо",
  "Гейминг: миры, симуляторы, стратегии",
  "Гитара",
  "Фотография",
  "BMX",
  "Рисование",
]

export const currently = [
  { label: "Фокус", value: "домашний сервер и 3D-печать" },
  { label: "В планах", value: "умный дом на ESP32" },
  { label: "Вне работы", value: "гитара, фотография, BMX, рисование" },
]

export const serverMetrics: ServerMetric[] = [
  {
    label: "CPU",
    value: "34%",
    percent: 34,
    tone: "accent",
  },
  {
    label: "RAM",
    value: "9.9 GB",
    percent: 62,
    tone: "accent",
  },
  {
    label: "Disk",
    value: "1.9 TB",
    percent: 48,
    tone: "positive",
  },
  {
    label: "Temp",
    value: "47°C",
    percent: 47,
    tone: "positive",
  },
]

export const serverInfo = {
  hostname: "HOME-SERVER-01",
  uptime: "23д 14ч",
  networkDown: "184 Mbps",
  networkUp: "42 Mbps",
}

export const navLinks = [
  { href: "/development", label: "Разработка" },
  { href: "/design", label: "Проектирование" },
  { href: "/personality", label: "Личность" },
  { href: "/social", label: "Социальное" },
]

export const personalPhotos: PhotoItem[] = [
  {
    src: "/photos/placeholder-2.webp",
    alt: "Описание фотографии",
    caption: "подпись",
    width: 904,
    height: 1200,
  },
]


export const engineeringPhotos: PhotoItem[] = [
  {
    src: "/photos/placeholder-1.webp",
    alt: "Описание фотографии",
    caption: "подпись",
    width: 1200,
    height: 800,
  },
]


export const workspacePhotos: PhotoItem[] = [
  {
    src: "/photos/placeholder-2.webp",
    alt: "Описание фотографии",
    caption: "подпись",
    width: 904,
    height: 1200,
  },
  {
    src: "/photos/placeholder-3.webp",
    alt: "Описание фотографии",
    caption: "подпись",
    width: 904,
    height: 1200,
  },
]


const months = [
  "янв",
  "фев",
  "мар",
  "апр",
  "мая",
  "июн",
  "июл",
  "авг",
  "сен",
  "окт",
  "ноя",
  "дек",
]

export function formatDate(value: string) {
  const [year, month, day] = value.split("-")
  return `${day} ${months[Number(month) - 1]} ${year}`
}
