import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from './supabase'
import type { ContentSection, NavigationItem, SiteSettings, StaffRole, StoreCategory, StoreProduct } from './types'

const fallback: SiteSettings = {
  site_key: 'main', site_name: 'RyvexMC', tagline: 'PvP competitivo. Survival sem limites.', hero_title: 'Entre. Lute. Evolua.',
  hero_subtitle: 'Duelos, BedWars e Survival semi-anarquia em uma experiência feita para Java e Bedrock.',
  hero_banner_url: null, logo_url: null, favicon_url: null, discord_url: null, wiki_url: null, vote_url: null, support_url: null,
  java_host: 'ryvexmc.pvp.srv.br', java_port: 21403, bedrock_host: null, bedrock_port: null, edition_label: 'Java & Bedrock', version_label: '1.21+',
  modes: ['Duels', 'BedWars', 'Survival'], accent_color: '#ff6a1a', accent_secondary: '#29d3ff', announcement_enabled: false,
  announcement_text: '', checkout_mode: 'orders', checkout_url: null, footer_text: 'RyvexMC — uma nova arena começa aqui.'
}

type State = {
  loading: boolean
  settings: SiteSettings
  nav: NavigationItem[]
  sections: ContentSection[]
  categories: StoreCategory[]
  products: StoreProduct[]
  session: Session | null
  staffRole: StaffRole | null
  refresh: () => Promise<void>
  refreshAuth: () => Promise<void>
}

const SiteContext = createContext<State | null>(null)

export function SiteProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [settings, setSettings] = useState<SiteSettings>(fallback)
  const [nav, setNav] = useState<NavigationItem[]>([])
  const [sections, setSections] = useState<ContentSection[]>([])
  const [categories, setCategories] = useState<StoreCategory[]>([])
  const [products, setProducts] = useState<StoreProduct[]>([])
  const [session, setSession] = useState<Session | null>(null)
  const [staffRole, setStaffRole] = useState<StaffRole | null>(null)

  const refreshAuth = async () => {
    const { data } = await supabase.auth.getSession()
    setSession(data.session)
    if (!data.session?.user) return setStaffRole(null)
    const { data: staff } = await supabase.from('ryvex_staff_roles').select('role').eq('user_id', data.session.user.id).maybeSingle()
    setStaffRole((staff?.role as StaffRole | undefined) ?? null)
  }

  const refresh = async () => {
    const [s, n, c, cats, p] = await Promise.all([
      supabase.from('ryvex_site_settings').select('*').eq('site_key', 'main').maybeSingle(),
      supabase.from('ryvex_navigation').select('*').order('sort_order'),
      supabase.from('ryvex_content_sections').select('*').order('sort_order'),
      supabase.from('ryvex_store_categories').select('*').order('sort_order'),
      supabase.from('ryvex_store_products').select('*').order('featured', { ascending: false }).order('sort_order')
    ])
    if (s.data) setSettings(s.data as SiteSettings)
    if (n.data) setNav(n.data as NavigationItem[])
    if (c.data) setSections(c.data as ContentSection[])
    if (cats.data) setCategories(cats.data as StoreCategory[])
    if (p.data) setProducts(p.data as StoreProduct[])
  }

  useEffect(() => {
    Promise.all([refresh(), refreshAuth()]).finally(() => setLoading(false))
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      queueMicrotask(() => refreshAuth())
    })
    return () => data.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', settings.accent_color)
    document.documentElement.style.setProperty('--accent2', settings.accent_secondary)
    document.title = settings.site_name
  }, [settings])

  const value = useMemo(() => ({ loading, settings, nav, sections, categories, products, session, staffRole, refresh, refreshAuth }), [loading, settings, nav, sections, categories, products, session, staffRole])
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
}

export const useSite = () => {
  const ctx = useContext(SiteContext)
  if (!ctx) throw new Error('useSite precisa de SiteProvider')
  return ctx
}
