import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { token } = useContext(AuthContext);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/auth/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setMensagem(data.message))
      .catch((err) => setMensagem("Erro ao acessar dashboard"));
  }, [token]);

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h2>Dashboard</h2>
      <p>{mensagem}</p>
    </div>
  );
}
