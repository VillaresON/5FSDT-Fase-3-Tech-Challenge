import 'normalize.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Inicio from './pages/Inicio/Inicio'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MenuLateral from './components/MenuLateral'
import Post from './pages/Post'
import NovaPostagem from './pages/NovaPostagem'
import EditarPostagem from './pages/EditarPostagem'
import Editar from './pages/Editar'
import Excluir from './pages/Excluir'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <MenuLateral>
        <Routes>
          <Route path={"/"} element={<Inicio />} />
          <Route path={"/post/:id"} element={<Post />} />
          <Route path={"/editar/:id"} element={<Editar />} />
          <Route path={"/excluir/:id"} element={<Excluir />} />
          <Route path={"/novaPostagem/"} element={<NovaPostagem />} />
          <Route path={"/editarPostagem/"} element={<EditarPostagem />} />
          <Route path={"*"} element={<p>oi</p>} />
        </Routes>
      </MenuLateral>
    </BrowserRouter>

  </StrictMode>,
)
