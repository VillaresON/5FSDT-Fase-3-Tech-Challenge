import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import styles from './Login.module.css'
import { IoLogIn } from "react-icons/io5"

export default function Login() {
  const { login } = useContext(AuthContext)
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState(null)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setErro(null)

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      })

      if (!res.ok) {
        const errData = await res.json()
        throw new Error(errData.error || "Erro no login")
      }

      const data = await res.json()
      login({ token: data.token, user: { email } })
      navigate("/")
    } catch (err) {
      setErro(err.message)
    }
  }

  return (
    <div className={styles.divPrincipal}>
      <h2><IoLogIn size={25}/>Formulário de Login</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.container}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
        </div>
      </form>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
    </div>
  )
}
