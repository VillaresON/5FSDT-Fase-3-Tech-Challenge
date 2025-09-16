import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Inicio from './pages/Inicio/Inicio'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MenuLateral from './components/MenuLateral'

import 'normalize.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <MenuLateral>
          <Routes>
            <Route path={'/'} element={<Inicio />} />
          </Routes>
        </MenuLateral>
    </BrowserRouter>

  </StrictMode>,
)
