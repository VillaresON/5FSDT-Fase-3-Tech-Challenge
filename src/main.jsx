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
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/login.jsx";
import Register from './pages/Register.jsx'



createRoot(document.getElementById('root')).render(
    <AuthProvider>
      <BrowserRouter>
        <MenuLateral>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path={"/"} element={<Inicio />} />
            <Route path={"/post/:id"} element={<Post />} />
            <Route path={"/editar/:id"} element={<ProtectedRoute><Editar /></ProtectedRoute>} />
            <Route path={"/excluir/:id"} element={<ProtectedRoute><Excluir /></ProtectedRoute>} />
            <Route path={"/novaPostagem/"} element={<ProtectedRoute><NovaPostagem /></ProtectedRoute>} />
            <Route path={"/editarPostagem/"} element={<ProtectedRoute><EditarPostagem /></ProtectedRoute>} />
            <Route path={"*"} element={<p>oi</p>} />
          </Routes>
        </MenuLateral>
      </BrowserRouter>
    </AuthProvider>,
)
