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
  description:
    "Портфолио инженера-разработчика: проекты, self-hosting и телеметрия сервера.",
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

// Random headline on the home page: one is picked per request. An optional
// weight makes a quote rarer (0.5 = half as often as the others).
export const homeQuotes: Array<{
  text: string
  mono?: boolean
  compact?: boolean
  href?: string
  weight?: number
}> = [
  { text: "Заголовок-цитата номер один" },
  { text: "Заголовок-цитата номер два" },
  { text: "type Placeholder =\n  One | Two | Three", mono: true },
  { text: "Цитата со ссылкой", href: "https://example.com/donate", weight: 0.5 },
]

export function pickHomeQuote() {
  const total = homeQuotes.reduce((sum, quote) => sum + (quote.weight ?? 1), 0)
  let roll = Math.random() * total

  for (const quote of homeQuotes) {
    roll -= quote.weight ?? 1
    if (roll < 0) return quote
  }

  return homeQuotes[homeQuotes.length - 1]
}

export const modules: ModuleItem[] = [
  {
    href: "/development",
    index: "01",
    title: "Раздел 1",
  },
  {
    href: "/design",
    index: "02",
    title: "Раздел 2",
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
    slug: "project-1",
    name: "Название проекта",
    subtitle: "Технология · Технология",
    status: "Статус",
    description: "Короткое описание проекта в одну-две строки.",
    details: [
      "Пункт описания: что сделано.",
      "Пункт описания: как проверено.",
      "Пункт описания: ограничения.",
    ],
    stack: ["Технология", "Инструмент", "Платформа"],
    importance: "silver",
  },
  {
    slug: "project-2",
    name: "Название проекта",
    subtitle: "Технология · Технология",
    status: "Статус",
    description: "Короткое описание проекта в одну-две строки.",
    details: ["Пункт описания: что сделано.", "Пункт описания: результат."],
    stack: ["Технология", "Инструмент"],
    importance: "normal",
  },
  {
    slug: "project-3",
    name: "Название проекта",
    subtitle: "Технология · Технология",
    status: "Статус",
    description: "Короткое описание проекта в одну-две строки.",
    details: ["Пункт описания: что сделано.", "Пункт описания: результат."],
    stack: ["Технология", "Инструмент"],
    importance: "silver",
    note: "Примечание к проекту.",
  },
  {
    slug: "project-4",
    name: "Название проекта",
    subtitle: "Технология · Технология",
    status: "Статус",
    description: "Короткое описание проекта в одну-две строки.",
    details: ["Пункт описания: что сделано.", "Пункт описания: результат."],
    stack: ["Технология", "Инструмент"],
    importance: "silver",
  },
  {
    slug: "project-5",
    name: "Название проекта",
    subtitle: "Технология · Технология",
    status: "Статус",
    description: "Короткое описание проекта в одну-две строки.",
    details: ["Пункт описания: что сделано.", "Пункт описания: результат."],
    stack: ["Технология", "Инструмент"],
    importance: "normal",
  },
  {
    slug: "project-6",
    name: "Название проекта",
    subtitle: "Технология · Технология",
    status: "Статус",
    description: "Короткое описание проекта в одну-две строки.",
    details: ["Пункт описания: что сделано.", "Пункт описания: результат."],
    stack: ["Технология", "Инструмент"],
    importance: "silver",
  },
]

export const engineeringProjects: ProjectItem[] = [
  {
    slug: "project-a",
    name: "Название проекта",
    subtitle: "Технология · Технология",
    status: "Статус",
    description: "Короткое описание проекта в одну-две строки.",
    details: ["Пункт описания: что сделано.", "Пункт описания: результат."],
    stack: ["Технология", "Инструмент"],
    importance: "gold",
  },
  {
    slug: "project-b",
    name: "Название проекта",
    subtitle: "Технология · Технология",
    status: "Статус",
    description: "Короткое описание проекта в одну-две строки.",
    details: ["Пункт описания: что сделано.", "Пункт описания: результат."],
    stack: ["Технология", "Инструмент"],
    importance: "gold",
  },
  {
    slug: "project-c",
    name: "Название проекта",
    subtitle: "Технология · Технология",
    status: "Статус",
    description: "Короткое описание проекта в одну-две строки.",
    details: ["Пункт описания: что сделано.", "Пункт описания: результат."],
    stack: ["Технология", "Инструмент"],
    importance: "normal",
    note: "Примечание к проекту.",
  },
  {
    slug: "project-d",
    name: "Название проекта",
    subtitle: "Технология · Технология",
    status: "Статус",
    description: "Короткое описание проекта в одну-две строки.",
    details: ["Пункт описания: что сделано.", "Пункт описания: результат."],
    stack: ["Технология", "Инструмент"],
    importance: "gold",
  },
]

export const engineeringSkills: SkillGroup[] = [
  {
    title: "Навык 1",
    items: ["Инструмент", "Инструмент", "Инструмент"],
  },
  {
    title: "Навык 2",
    items: ["Инструмент", "Инструмент", "Инструмент"],
  },
  {
    title: "Навык 3",
    items: ["Инструмент", "Инструмент", "Инструмент"],
  },
  {
    title: "Навык 4",
    items: ["Инструмент", "Инструмент", "Инструмент"],
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
  "Инструмент",
  "Инструмент",
  "Инструмент",
  "Инструмент",
]

export const values: ValueItem[] = [
  {
    index: "01",
    title: "Первая ценность",
    description: "Короткое описание ценности в одну-две строки.",
  },
  {
    index: "02",
    title: "Вторая ценность",
    description: "Короткое описание ценности в одну-две строки.",
  },
  {
    index: "03",
    title: "Третья ценность",
    description: "Короткое описание ценности в одну-две строки.",
  },
]

export const approach: ValueItem[] = [
  {
    index: "01",
    title: "Первый принцип",
    description: "Короткое описание принципа работы.",
  },
  {
    index: "02",
    title: "Второй принцип",
    description: "Короткое описание принципа работы.",
  },
  {
    index: "03",
    title: "Третий принцип",
    description: "Короткое описание принципа работы.",
  },
  {
    index: "04",
    title: "Четвёртый принцип",
    description: "Короткое описание принципа работы.",
  },
]

export const interests = [
  "Интерес 1",
  "Интерес 2",
  "Интерес 3",
  "Интерес 4",
  "Интерес 5",
  "Интерес 6",
  "Интерес 7",
  "Интерес 8",
]

export const currently = [
  { label: "Фокус", value: "Основное занятие" },
  { label: "В планах", value: "Следующая цель" },
  { label: "Вне работы", value: "Хобби и увлечения" },
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
  hostname: "SERVER-01",
  uptime: "23д 14ч",
  networkDown: "184 Mbps",
  networkUp: "42 Mbps",
}

export const navLinks = [
  { href: "/development", label: "Раздел 1" },
  { href: "/design", label: "Раздел 2" },
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
  {
    src: "/photos/placeholder-3.webp",
    alt: "Описание фотографии",
    caption: "подпись",
    width: 904,
    height: 1200,
  },
  {
    src: "/photos/placeholder-1.webp",
    alt: "Описание фотографии",
    caption: "подпись",
    width: 1200,
    height: 904,
  },
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
    width: 904,
    height: 1200,
  },
  {
    src: "/photos/placeholder-2.webp",
    alt: "Описание фотографии",
    caption: "подпись",
    width: 1200,
    height: 800,
  },
  {
    src: "/photos/placeholder-3.webp",
    alt: "Описание фотографии",
    caption: "подпись",
    width: 904,
    height: 1200,
  },
  {
    src: "/photos/placeholder-1.webp",
    alt: "Описание фотографии",
    caption: "подпись",
    width: 904,
    height: 1200,
  },
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
  {
    src: "/photos/placeholder-1.webp",
    alt: "Описание фотографии",
    caption: "подпись",
    width: 904,
    height: 1200,
  },
]

export const workspacePhotos: PhotoItem[] = [
  {
    src: "/photos/placeholder-1.webp",
    alt: "Описание фотографии",
    caption: "подпись",
    width: 904,
    height: 1200,
  },
  {
    src: "/photos/placeholder-2.webp",
    alt: "Описание фотографии",
    caption: "подпись",
    width: 1200,
    height: 904,
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
