export type SiteSettings = {
  site_key: 'main'
  site_name: string
  tagline: string
  hero_title: string
  hero_subtitle: string
  hero_banner_url: string | null
  logo_url: string | null
  favicon_url: string | null
  discord_url: string | null
  wiki_url: string | null
  vote_url: string | null
  support_url: string | null
  java_host: string
  java_port: number
  bedrock_host: string | null
  bedrock_port: number | null
  edition_label: string
  version_label: string
  modes: string[]
  accent_color: string
  accent_secondary: string
  announcement_enabled: boolean
  announcement_text: string
  checkout_mode: 'orders' | 'external' | 'disabled'
  checkout_url: string | null
  footer_text: string
}

export type NavigationItem = {
  id: string
  label: string
  href: string
  sort_order: number
  visible: boolean
  external: boolean
}

export type ContentSection = {
  section_key: string
  eyebrow: string
  title: string
  body: string
  payload: Record<string, unknown>
  visible: boolean
  sort_order: number
}

export type StoreCategory = {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  sort_order: number
  active: boolean
}

export type StoreProduct = {
  id: string
  category_id: string | null
  name: string
  slug: string
  short_description: string
  description: string
  price_cents: number
  compare_at_price_cents: number | null
  currency: string
  image_url: string | null
  badge: string | null
  features: string[]
  stock: number | null
  active: boolean
  featured: boolean
  sort_order: number
}

export type ServerStatus = {
  online: boolean
  host: string
  port: number
  players: { online: number; max: number }
  version: string | null
  software: string | null
  motd: string[]
  checkedAt: string
  unavailable?: boolean
}

export type StaffRole = 'owner' | 'admin' | 'store_manager' | 'editor' | 'support'
