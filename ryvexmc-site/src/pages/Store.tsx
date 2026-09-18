import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { ChevronIcon, ShopIcon, TrashIcon } from '../components/Icons'
import { useSite } from '../lib/SiteContext'
import { money } from '../lib/helpers'
import { supabase } from '../lib/supabase'
import type { StoreProduct } from '../lib/types'

type CartItem = { product: StoreProduct; quantity: number }

export default function Store() {
  const { settings, categories, products, session } = useSite()
  const [category, setCategory] = useState('all')
  const [cart, setCart] = useState<CartItem[]>([])
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [form, setForm] = useState({ name: '', email: session?.user.email || '', nick: '', notes: '' })
  const [message, setMessage] = useState('')
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()
  const active = products.filter(p => p.active)
  const filtered = category === 'all' ? active : active.filter(p => p.category_id === category)
  const total = useMemo(() => cart.reduce((sum, i) => sum + i.product.price_cents * i.quantity, 0), [cart])

  const add = (product: StoreProduct) => setCart(prev => {
    const found = prev.find(i => i.product.id === product.id)
    if (found) return prev.map(i => i.product.id === product.id ? {...i, quantity: Math.min(i.quantity + 1, product.stock ?? 50)} : i)
    return [...prev, { product, quantity: 1 }]
  })

  const remove = (id: string) => setCart(prev => prev.filter(i => i.product.id !== id))

  const checkout = async () => {
    setMessage('')
    if (!session) return navigate('/login?next=/loja')
    if (!cart.length) return
    if (settings.checkout_mode === 'disabled') return setMessage('O checkout está temporariamente desativado.')
    if (settings.checkout_mode === 'external' && settings.checkout_url) return window.location.assign(settings.checkout_url)
    if (!form.name.trim() || !form.nick.trim() || !form.email.trim()) return setMessage('Preencha nome, e-mail e nick do Minecraft.')

    setSaving(true)
    const { data: order, error } = await supabase.from('ryvex_orders').insert({
      user_id: session.user.id,
      customer_name: form.name.trim(),
      customer_email: form.email.trim(),
      minecraft_nick: form.nick.trim(),
      notes: form.notes.trim(),
      status: 'pending',
      payment_status: 'unpaid',
      total_cents: 0,
      currency: 'BRL'
    }).select('id').single()
    if (error || !order) { setSaving(false); return setMessage(error?.message || 'Não foi possível criar o pedido.') }

    const { error: itemError } = await supabase.from('ryvex_order_items').insert(cart.map(i => ({ order_id: order.id, product_id: i.product.id, quantity: i.quantity })))
    if (itemError) { setSaving(false); return setMessage(itemError.message) }
    setCart([])
    setSaving(false)
    setCheckoutOpen(false)
    navigate(`/conta?pedido=${order.id}`)
  }

  return <Layout>
    <section className="page-hero compact-hero"><div className="page-width"><span className="eyebrow">LOJA OFICIAL RYVEXMC</span><h1>Escolha como você quer se destacar.</h1><p>Catálogo controlado pela equipe em tempo real pelo painel Staff.</p></div></section>
    <section className="page-width store-layout">
      <div className="store-main">
        <div className="category-tabs"><button className={category === 'all' ? 'active' : ''} onClick={() => setCategory('all')}>Tudo</button>{categories.filter(c=>c.active).map(c => <button className={category === c.id ? 'active' : ''} onClick={() => setCategory(c.id)} key={c.id}>{c.icon} {c.name}</button>)}</div>
        {filtered.length ? <div className="product-grid">{filtered.map(p => <article className="product-card" key={p.id}>
          <div className="product-image">{p.image_url ? <img src={p.image_url} alt={p.name}/> : <div className="product-placeholder large">R</div>}{p.badge && <span className="badge">{p.badge}</span>}</div>
          <div className="product-body"><span className="product-meta">{categories.find(c=>c.id===p.category_id)?.name || 'RyvexMC'}</span><h2>{p.name}</h2><p>{p.short_description}</p>
            {p.features?.length > 0 && <div className="features-list">{p.features.slice(0,4).map(f => <span key={f}>✓ {f}</span>)}</div>}
            <div className="price-line"><div>{p.compare_at_price_cents ? <del>{money(p.compare_at_price_cents,p.currency)}</del> : null}<strong>{p.price_cents ? money(p.price_cents,p.currency) : 'Configure o preço'}</strong></div><button className="btn primary small" disabled={!p.price_cents || p.stock === 0} onClick={() => add(p)}>{p.stock === 0 ? 'Esgotado' : 'Adicionar'}</button></div>
          </div>
        </article>)}</div> : <div className="empty-state premium"><ShopIcon/><div><h3>Nenhum produto publicado ainda.</h3><p>Os produtos rascunho já estão no painel Staff. Basta configurar preço, imagem e ativar.</p></div></div>}
      </div>
      <aside className="cart-panel glass-panel"><div className="cart-title"><div><span className="eyebrow">SEU CARRINHO</span><h2>{cart.length} {cart.length === 1 ? 'item' : 'itens'}</h2></div><ShopIcon /></div>
        <div className="cart-items">{cart.length ? cart.map(i => <div className="cart-item" key={i.product.id}><div><strong>{i.product.name}</strong><span>{i.quantity} × {money(i.product.price_cents,i.product.currency)}</span></div><button onClick={() => remove(i.product.id)} aria-label="Remover"><TrashIcon/></button></div>) : <p className="muted">Seu carrinho está vazio.</p>}</div>
        <div className="cart-total"><span>Total</span><strong>{money(total)}</strong></div>
        <button className="btn primary full" disabled={!cart.length} onClick={() => setCheckoutOpen(true)}>Continuar <ChevronIcon /></button>
        {message && <p className="form-message error">{message}</p>}
      </aside>
    </section>

    {checkoutOpen && <div className="modal-backdrop" onMouseDown={() => setCheckoutOpen(false)}><div className="modal" onMouseDown={e=>e.stopPropagation()}><div className="modal-head"><div><span className="eyebrow">CHECKOUT</span><h2>Finalizar pedido</h2></div><button onClick={()=>setCheckoutOpen(false)}>×</button></div>
      {!session ? <div className="empty-state"><div><h3>Entre na sua conta para continuar.</h3><p>Isso permite acompanhar o pedido depois.</p><Link to="/login?next=/loja" className="btn primary">Entrar</Link></div></div> : <div className="form-grid"><label>Nome<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label><label>E-mail<input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label><label>Nick no Minecraft<input value={form.nick} onChange={e=>setForm({...form,nick:e.target.value})}/></label><label className="span-2">Observações<textarea rows={3} value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})}/></label><div className="span-2 checkout-summary"><span>Total calculado pelo catálogo</span><strong>{money(total)}</strong></div><button className="btn primary span-2" onClick={checkout} disabled={saving}>{saving ? 'Criando pedido…' : 'Criar pedido'}</button>{message && <p className="form-message error span-2">{message}</p>}</div>}
    </div></div>}
  </Layout>
}
