import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useSite } from '../lib/SiteContext'
import { MenuIcon, ShieldIcon, SwordIcon, UserIcon, XIcon } from './Icons'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { settings, nav, session, staffRole } = useSite()
  const [open, setOpen] = useState(false)
  const location = useLocation()
  useEffect(() => setOpen(false), [location.pathname])

  return <div className="site-shell">
    {settings.announcement_enabled && settings.announcement_text && <div className="announcement"><span>✦</span>{settings.announcement_text}</div>}
    <header className="topbar">
      <Link to="/" className="brand" aria-label="RyvexMC início">
        {settings.logo_url ? <img src={settings.logo_url} alt="" /> : <span className="brand-mark"><SwordIcon /></span>}
        <span className="brand-name">RYVEX<span>MC</span></span>
      </Link>
      <nav className="desktop-nav">
        {nav.filter(x => x.visible).map(item => item.external ?
          <a key={item.id} href={item.href} target="_blank" rel="noreferrer">{item.label}</a> :
          <NavLink key={item.id} to={item.href} className={({isActive}) => isActive ? 'active' : ''}>{item.label}</NavLink>
        )}
      </nav>
      <div className="header-actions">
        {staffRole && <Link className="staff-pill" to="/staff"><ShieldIcon /> Staff</Link>}
        <Link className="login-button" to={session ? '/conta' : '/login'}><UserIcon />{session ? 'Minha conta' : 'Entrar'}</Link>
        <button className="mobile-menu" onClick={() => setOpen(v => !v)} aria-label="Menu">{open ? <XIcon/> : <MenuIcon/>}</button>
      </div>
    </header>
    {open && <div className="mobile-drawer">
      {nav.filter(x => x.visible).map(item => item.external ? <a key={item.id} href={item.href}>{item.label}</a> : <Link key={item.id} to={item.href}>{item.label}</Link>)}
      {staffRole && <Link to="/staff">Painel Staff</Link>}
    </div>}
    <main>{children}</main>
    <footer className="footer">
      <div><div className="brand-name small">RYVEX<span>MC</span></div><p>{settings.footer_text}</p></div>
      <div className="footer-links"><Link to="/como-jogar">Como jogar</Link><Link to="/wiki">Wiki</Link><Link to="/loja">Loja</Link>{settings.discord_url && <a href={settings.discord_url}>Discord</a>}</div>
      <div className="footer-copy">© {new Date().getFullYear()} RyvexMC</div>
    </footer>
  </div>
}
