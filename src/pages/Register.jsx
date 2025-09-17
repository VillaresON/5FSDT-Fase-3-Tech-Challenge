import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(null);
  const [sucesso, setSucesso] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErro(null);
    setSucesso(null);

    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });
      
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao registrar usuário");
      }


      setSucesso("Usuário registrado com sucesso!");
      // Redireciona para login após 1.5s
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setErro(err.message);
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "3rem auto" }}>
      <h2>Registrar Professor</h2>
      <form onSubmit={handleSubmit}>
        <label>Nome</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

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

        <button type="submit">Registrar</button>
      </form>

      {erro && <p style={{ color: "red" }}>{erro}</p>}
      {sucesso && <p style={{ color: "green" }}>{sucesso}</p>}
    </div>
  );
}
