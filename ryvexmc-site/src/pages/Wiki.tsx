import Layout from '../components/Layout'
import { useSite } from '../lib/SiteContext'

export default function Wiki() {
  const { sections, settings } = useSite()
  const section = sections.find(s => s.section_key === 'wiki')
  const cards = (section?.payload?.cards as Array<{title:string,text:string}> | undefined) ?? []
  return <Layout>
    <section className="page-hero"><div className="page-width"><span className="eyebrow">{section?.eyebrow || 'WIKI'}</span><h1>{section?.title || 'Central de conhecimento RyvexMC'}</h1><p>{section?.body || 'Tudo que você precisa para começar.'}</p></div></section>
    <section className="page-width docs-layout">
      <aside className="docs-sidebar"><span>GUIA RÁPIDO</span><a href="#primeiros-passos">Primeiros passos</a><a href="#modos">Modos</a><a href="#regras">Regras</a><a href="#conexao">Conexão</a></aside>
      <div className="docs-content">
        <article id="primeiros-passos"><span className="eyebrow">COMECE AQUI</span><h2>Primeiros passos</h2><p>Abra o Minecraft, adicione o servidor <b>{settings.java_host}:{settings.java_port}</b> e entre. A equipe pode atualizar este conteúdo pelo painel Staff sem mexer no código.</p></article>
        <div className="docs-card-grid">{cards.map(c => <article className="docs-card" key={c.title}><h3>{c.title}</h3><p>{c.text}</p></article>)}</div>
        <article id="modos"><span className="eyebrow">MODOS</span><h2>Escolha sua experiência</h2>{settings.modes.map(m => <div className="rule-row" key={m}><span>◆</span><div><h3>{m}</h3><p>Informações detalhadas podem ser publicadas aqui pela staff conforme o modo evolui.</p></div></div>)}</article>
        <article id="regras"><span className="eyebrow">REGRAS</span><h2>Jogue limpo, respeite a comunidade.</h2><p>A versão final das regras deve ser definida pela equipe. O painel permite editar os textos do site para manter tudo alinhado com o servidor.</p></article>
        <article id="conexao"><span className="eyebrow">CONEXÃO</span><h2>Java & Bedrock</h2><p>Java: <b>{settings.java_host}:{settings.java_port}</b>. {settings.bedrock_host ? <>Bedrock: <b>{settings.bedrock_host}:{settings.bedrock_port}</b>.</> : <>A equipe pode cadastrar endereço e porta Bedrock na área Staff quando estiverem prontos.</>}</p></article>
      </div>
    </section>
  </Layout>
}
