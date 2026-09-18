import { useEffect, useState } from 'react'
import { CopyIcon, UsersIcon, WifiIcon } from './Icons'
import type { ServerStatus } from '../lib/types'
import { useSite } from '../lib/SiteContext'

export default function ServerStatusCard() {
  const { settings } = useSite()
  const [status, setStatus] = useState<ServerStatus | null>(null)
  const [copied, setCopied] = useState(false)
  const address = `${settings.java_host}:${settings.java_port}`

  useEffect(() => {
    const load = () => fetch('/api/status').then(r => r.json()).then(setStatus).catch(() => setStatus(null))
    load()
    const id = setInterval(load, 60000)
    return () => clearInterval(id)
  }, [])

  const copy = async () => {
    await navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  return <aside className="server-card glass-panel">
    <div className="status-row"><span className={status?.online ? 'status-dot online' : 'status-dot'} /> <b>{status?.online ? 'Servidor online' : status?.unavailable ? 'Status indisponível' : 'Servidor offline'}</b></div>
    <div className="server-address" onClick={copy} role="button" tabIndex={0}><span>{address}</span><CopyIcon /></div>
    <span className="copy-hint">{copied ? 'IP copiado!' : 'Toque para copiar o endereço'}</span>
    <div className="server-grid">
      <div><span>Edição</span><strong>{settings.edition_label}</strong></div>
      <div><span>Versão</span><strong>{status?.version || settings.version_label}</strong></div>
      <div><span>Jogadores</span><strong><UsersIcon /> {status?.players?.online ?? '—'} / {status?.players?.max || '—'}</strong></div>
      <div><span>Rede</span><strong><WifiIcon /> {status?.online ? 'Estável' : '—'}</strong></div>
    </div>
  </aside>
}
