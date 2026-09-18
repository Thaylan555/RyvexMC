import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
export default function NotFound(){return <Layout><section className="page-width not-found"><span>404</span><h1>Essa arena não existe.</h1><p>O caminho que você tentou acessar não foi encontrado.</p><Link className="btn primary" to="/">Voltar ao início</Link></section></Layout>}
