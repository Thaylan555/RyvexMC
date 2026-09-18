import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { LogoutIcon, ShieldIcon, ShopIcon } from '../components/Icons'
import { useSite } from '../lib/SiteContext'
import { supabase } from '../lib/supabase'
import { money } from '../lib/helpers'

type Order = { id:string; status:string; payment_status:string; total_cents:number; currency:string; minecraft_nick:string; created_at:string }

export default function Account() {
  const { session, staffRole, refreshAuth } = useSite()
  const [orders, setOrders] = useState<Order[]>([])
  const navigate = useNavigate()
  useEffect(() => {
    if (session) supabase.from('ryvex_orders').select('id,status,payment_status,total_cents,currency,minecraft_nick,created_at').order('created_at',{ascending:false}).then(({data})=>setOrders((data as Order[])||[]))
  }, [session])
  if (!session) return <Layout><section className="page-width auth-wrap"><div className="auth-card"><h1>Entre para ver sua conta.</h1><Link className="btn primary" to="/login?next=/conta">Entrar</Link></div></section></Layout>
  const logout = async () => { await supabase.auth.signOut(); await refreshAuth(); navigate('/') }
  return <Layout>
    <section className="page-hero compact-hero"><div className="page-width"><span className="eyebrow">MINHA CONTA</span><h1>{session.user.email}</h1><p>Pedidos e acesso da sua conta RyvexMC.</p></div></section>
    <section className="page-width account-grid">
      <aside className="account-side glass-panel"><div className="avatar-letter">{session.user.email?.[0]?.toUpperCase()}</div><strong>{session.user.email}</strong>{staffRole && <span className="role-badge"><ShieldIcon/>{staffRole}</span>}{staffRole && <Link className="btn secondary full" to="/staff">Abrir painel Staff</Link>}<button className="btn ghost full" onClick={logout}><LogoutIcon/> Sair</button></aside>
      <div className="account-main"><div className="section-heading compact"><div><span className="eyebrow">PEDIDOS</span><h2>Histórico da loja</h2></div><Link className="btn small secondary" to="/loja"><ShopIcon/> Loja</Link></div>{orders.length ? <div className="order-list">{orders.map(o => <article className="order-row" key={o.id}><div><span className="order-id">#{o.id.slice(0,8).toUpperCase()}</span><strong>{o.minecraft_nick}</strong><small>{new Date(o.created_at).toLocaleString('pt-BR')}</small></div><div><span className={`order-status ${o.status}`}>{o.status.replace('_',' ')}</span><strong>{money(o.total_cents,o.currency)}</strong><small>Pagamento: {o.payment_status}</small></div></article>)}</div> : <div className="empty-state"><ShopIcon/><div><h3>Você ainda não tem pedidos.</h3><p>Quando comprar algo na loja, o acompanhamento aparece aqui.</p></div></div>}</div>
    </section>
  </Layout>
}
