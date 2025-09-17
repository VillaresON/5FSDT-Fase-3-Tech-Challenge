import 'normalize.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Inicio from './pages/Inicio/Inicio'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MenuLateral from './components/MenuLateral'
import Post from './pages/Post'
import NovaPostagem from './pages/NovaPostagem'
import EditarPostagem from './pages/EditarPostagem'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <MenuLateral>
        <Routes>
          <Route path={"/"} element={<Inicio />} />
          <Route path={"/post/:id"} element={<Post />} />
          <Route path={"/novaPostagem/"} element={<NovaPostagem />} />
          <Route path={"/editarPostagem/"} element={<EditarPostagem />} />
          <Route path={"*"} element={<h1 style={{ paddingLeft: 10 }}>Error 404, Página não encontrada!</h1>} />
        </Routes>
      </MenuLateral>
    </BrowserRouter>

  </StrictMode>,
)
