import { Route, Routes } from 'react-router-dom'
import { SiteProvider, useSite } from './lib/SiteContext'
import Home from './pages/Home'
import Store from './pages/Store'
import Wiki from './pages/Wiki'
import HowToJoin from './pages/HowToJoin'
import Login from './pages/Login'
import Account from './pages/Account'
import Staff from './pages/Staff'
import NotFound from './pages/NotFound'

function RoutedApp(){
  const { loading } = useSite()
  if (loading) return <div className="boot-screen"><div className="boot-logo">R</div><span>Carregando RyvexMC</span></div>
  return <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/loja" element={<Store/>}/>
    <Route path="/wiki" element={<Wiki/>}/>
    <Route path="/como-jogar" element={<HowToJoin/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/conta" element={<Account/>}/>
    <Route path="/staff" element={<Staff/>}/>
    <Route path="*" element={<NotFound/>}/>
  </Routes>
}

export default function App(){return <SiteProvider><RoutedApp/></SiteProvider>}
