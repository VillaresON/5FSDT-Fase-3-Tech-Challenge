import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import styles from './Header.module.css'
import { ImExit } from "react-icons/im"

export default function Header() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate("/login")
  }

  return (
    <header className={styles.divPrincipal} >
      <div><b>Bem-vindo,</b></div>
      <p>{user?.nome || user?.email}</p>
        <button>
          <ImExit /> Logout
        </button>
    </header>
  )
}
