import { FormEvent, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Layout from '../components/Layout'
import { ShieldIcon } from '../components/Icons'
import { supabase } from '../lib/supabase'
import { useSite } from '../lib/SiteContext'

export default function Login() {
  const { session, refreshAuth } = useSite()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [mode, setMode] = useState<'login'|'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [saving, setSaving] = useState(false)
  const next = params.get('next') || '/conta'

  if (session) return <Layout><section className="page-width auth-wrap"><div className="auth-card"><ShieldIcon/><h1>Você já está conectado.</h1><Link className="btn primary" to="/conta">Ir para minha conta</Link></div></section></Layout>

  const submit = async (e: FormEvent) => {
    e.preventDefault(); setMessage(''); setSaving(true)
    const result = mode === 'login'
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password })
    setSaving(false)
    if (result.error) return setMessage(result.error.message)
    if (mode === 'signup' && !result.data.session) return setMessage('Conta criada. Confira seu e-mail para confirmar o cadastro.')
    await refreshAuth(); navigate(next)
  }

  const reset = async () => {
    if (!email) return setMessage('Digite seu e-mail primeiro.')
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/login` })
    setMessage(error ? error.message : 'Se existir uma conta com esse e-mail, você receberá as instruções de recuperação.')
  }

  return <Layout>
    <section className="page-width auth-wrap">
      <div className="auth-aside"><span className="eyebrow">CONTA RYVEXMC</span><h1>Uma conta para pedidos e área Staff.</h1><p>Jogadores acompanham pedidos. Membros autorizados da equipe também ganham acesso ao painel de administração.</p><div className="secure-note"><ShieldIcon/><div><strong>Permissões protegidas no Supabase</strong><span>A interface não libera a área Staff só porque alguém está logado.</span></div></div></div>
      <form className="auth-card" onSubmit={submit}><div className="auth-tabs"><button type="button" className={mode==='login'?'active':''} onClick={()=>setMode('login')}>Entrar</button><button type="button" className={mode==='signup'?'active':''} onClick={()=>setMode('signup')}>Criar conta</button></div><label>E-mail<input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="voce@email.com"/></label><label>Senha<input type="password" minLength={6} required value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••"/></label><button className="btn primary full" disabled={saving}>{saving ? 'Aguarde…' : mode==='login' ? 'Entrar na conta' : 'Criar minha conta'}</button>{mode==='login' && <button type="button" className="text-button" onClick={reset}>Esqueci minha senha</button>}{message && <p className="form-message">{message}</p>}</form>
    </section>
  </Layout>
}
