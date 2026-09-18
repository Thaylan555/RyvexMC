import { useState } from 'react'
import Layout from '../components/Layout'
import ServerStatusCard from '../components/ServerStatus'
import { CopyIcon } from '../components/Icons'
import { useSite } from '../lib/SiteContext'

export default function HowToJoin() {
  const { settings } = useSite()
  const [copied, setCopied] = useState(false)
  const address = `${settings.java_host}:${settings.java_port}`
  const copy = async () => { await navigator.clipboard.writeText(address); setCopied(true); setTimeout(()=>setCopied(false),1500) }
  return <Layout>
    <section className="page-hero"><div className="page-width"><span className="eyebrow">COMO JOGAR</span><h1>Entre na RyvexMC em menos de um minuto.</h1><p>Sem launcher próprio e sem enrolação: adicione o servidor e escolha seu modo.</p></div></section>
    <section className="page-width join-layout">
      <div className="steps">
        <div className="step"><span>01</span><div><h2>Abra o Minecraft</h2><p>Use uma versão compatível indicada no status e nas informações oficiais do servidor.</p></div></div>
        <div className="step"><span>02</span><div><h2>Adicione a RyvexMC</h2><button className="ip-copy-large" onClick={copy}><div><small>ENDEREÇO JAVA</small><strong>{address}</strong></div><CopyIcon /></button><p className="success-text">{copied ? 'Endereço copiado para a área de transferência.' : 'Clique no endereço para copiar.'}</p></div></div>
        <div className="step"><span>03</span><div><h2>Entre e escolha o modo</h2><p>{settings.modes.join(' • ')}</p></div></div>
        {settings.bedrock_host && <div className="step"><span>+</span><div><h2>Bedrock</h2><p>Endereço: <b>{settings.bedrock_host}</b> · Porta: <b>{settings.bedrock_port}</b></p></div></div>}
      </div>
      <ServerStatusCard />
    </section>
  </Layout>
}
