export type ProjectImportance = "gold" | "silver" | "normal"

export interface ProjectItem {
  slug: string
  name: string
  subtitle: string
  description: string
  status: string
  details: string[]
  stack: string[]
  note?: string
  href?: string
  importance?: ProjectImportance
}

export interface SkillGroup {
  title: string
  items: string[]
}

export type SocialCategory = "development" | "content" | "community" | "support"

export interface SocialLink {
  id: string
  label: string
  handle: string
  href: string
  category: SocialCategory
  showInHeader?: boolean
  showInFooter?: boolean
}

export interface SocialGroup {
  id: SocialCategory
  title: string
}

export interface ModuleItem {
  href: string
  index: string
  title: string
  external?: boolean
  icon?: "github"
}

export interface ServerMetric {
  label: string
  value: string
  percent: number
  tone: "accent" | "positive" | "warning"
}

export type DashboardStatus = "live" | "offline" | "demo"

export interface DashboardData {
  status: DashboardStatus
  hostname: string
  uptime: string
  networkUp: string
  networkDown: string
  updatedAt: string | null
  metrics: ServerMetric[]
}

// `/api/dashboard` keeps the home-server fields at the top level for backwards
// compatibility and adds the VPS snapshot under `vps`.
export interface DashboardResponse extends DashboardData {
  vps: DashboardData
}

export interface CommitItem {
  repo: string
  sha: string
  message: string
  date: string
  url: string
}

export interface CommitFeed {
  status: "live" | "offline"
  updatedAt: string | null
  commits: CommitItem[]
}

export interface ValueItem {
  index: string
  title: string
  description: string
}

export interface PhotoItem {
  src: string
  alt: string
  caption: string
  width: number
  height: number
}
