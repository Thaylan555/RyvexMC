import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import ServerStatusCard from '../components/ServerStatus'
import { ArrowUpRightIcon, ChevronIcon, ShieldIcon, ShopIcon, SwordIcon } from '../components/Icons'
import { useSite } from '../lib/SiteContext'

export default function Home() {
  const { settings, sections, products } = useSite()
  const featureSection = sections.find(s => s.section_key === 'features')
  const items = (featureSection?.payload?.items as Array<{title:string,text:string}> | undefined) ?? [
    { title: 'Duels', text: 'Combate rápido e competitivo.' },
    { title: 'BedWars', text: 'Partidas intensas com crossplay.' },
    { title: 'Survival', text: 'Liberdade, progressão e economia.' }
  ]
  const activeProducts = products.filter(p => p.active).slice(0, 3)

  return <Layout>
    <section className="hero" style={settings.hero_banner_url ? { backgroundImage: `linear-gradient(90deg, rgba(8,6,12,.96) 0%, rgba(8,6,12,.76) 46%, rgba(8,6,12,.48) 100%), url(${settings.hero_banner_url})` } : undefined}>
      <div className="hero-grid-overlay" />
      <div className="hero-content page-width">
        <div className="hero-copy">
          <span className="eyebrow"><span className="live-pulse" /> RYVEXMC • JAVA & BEDROCK</span>
          <h1>{settings.hero_title}</h1>
          <p>{settings.hero_subtitle}</p>
          <div className="mode-pills">{settings.modes.map(mode => <span key={mode}>{mode}</span>)}</div>
          <div className="hero-actions">
            <Link to="/como-jogar" className="btn primary"><SwordIcon /> Jogar agora <ChevronIcon /></Link>
            <Link to="/loja" className="btn secondary"><ShopIcon /> Ver loja</Link>
          </div>
        </div>
        <ServerStatusCard />
      </div>
      <div className="hero-bottom-line" />
    </section>

    <section className="section page-width why-section">
      <div className="section-heading">
        <div><span className="eyebrow">{featureSection?.eyebrow || 'POR QUE RYVEXMC'}</span><h2>{featureSection?.title || 'Uma rede feita para jogar de verdade.'}</h2></div>
        <p>{featureSection?.body}</p>
      </div>
      <div className="feature-grid">
        {items.map((item, i) => <article className="feature-card" key={item.title}>
          <div className="feature-number">0{i + 1}</div>
          <div className="feature-icon">{i === 0 ? <SwordIcon/> : i === 1 ? <ShieldIcon/> : <span>◆</span>}</div>
          <h3>{item.title}</h3><p>{item.text}</p>
        </article>)}
      </div>
    </section>

    <section className="section band">
      <div className="page-width split-highlight">
        <div>
          <span className="eyebrow">UM SERVIDOR, VÁRIAS EXPERIÊNCIAS</span>
          <h2>Troque de modo sem trocar de comunidade.</h2>
          <p>RyvexMC nasce com foco em PvP e Survival: filas claras, entrada rápida e identidade visual única em todo o ecossistema.</p>
          <Link to="/wiki" className="text-link">Conhecer a RyvexMC <ArrowUpRightIcon /></Link>
        </div>
        <div className="mode-showcase">
          {settings.modes.map((mode, i) => <div className="mode-tile" key={mode}><span>0{i+1}</span><strong>{mode}</strong><small>{i === 0 ? '1.21+ e combate competitivo' : i === 1 ? 'Partidas rápidas e ranqueadas' : 'Semi-anarquia com progressão'}</small></div>)}
        </div>
      </div>
    </section>

    <section className="section page-width store-preview">
      <div className="section-heading compact"><div><span className="eyebrow">LOJA OFICIAL</span><h2>Itens, ranks e vantagens.</h2></div><Link to="/loja" className="btn small secondary">Abrir loja <ChevronIcon /></Link></div>
      {activeProducts.length ? <div className="mini-products">{activeProducts.map(p => <Link to="/loja" className="mini-product" key={p.id}>{p.image_url ? <img src={p.image_url} alt=""/> : <div className="product-placeholder">R</div>}<div><span>{p.badge || 'RyvexMC'}</span><h3>{p.name}</h3><p>{p.short_description}</p></div><ChevronIcon /></Link>)}</div> : <div className="empty-state premium"><ShopIcon /><div><h3>A loja está sendo preparada.</h3><p>A equipe pode publicar produtos, preços e imagens direto pelo painel Staff, sem novo deploy.</p></div></div>}
    </section>

    <section className="cta page-width">
      <div><span className="eyebrow">PRONTO PARA ENTRAR?</span><h2>O próximo duelo pode começar agora.</h2><p>{settings.java_host}:{settings.java_port}</p></div>
      <Link to="/como-jogar" className="btn primary">Como jogar <ArrowUpRightIcon /></Link>
    </section>
  </Layout>
}
