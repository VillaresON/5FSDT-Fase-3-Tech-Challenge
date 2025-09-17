import styles from './NovaPostagem.module.css'

import { useState, useEffect } from "react"
import { FcPlus } from "react-icons/fc";
import { Navigate } from 'react-router-dom';

export default function NovaPostagem() {
    const [dados, setDados] = useState([]);
    const [form, setForm] = useState({ titulo: "", conteudo: "", autor_id: "" })
    const [message, setMessage] = useState("")

    async function buscarDados(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            const data = await response.json();
            setDados(data);
        } catch (err) {
            setDados([]);
        }
    }

    // Buscar todos inicialmente
    useEffect(() => {
        buscarDados("http://localhost:3000/autores");
    }, []);

    async function handleSubmit(e) {
        e.preventDefault()
        setMessage("")

        try {
            const res = await fetch("http://localhost:3000/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            })

            if (!res.ok) throw new Error("Erro ao enviar")

            const data = await res.json()
            setMessage("Post criado com sucesso!")
            setForm({ titulo: "", conteudo: "", autor_id: "" })
            setTimeout(() => Navigate("/"), 1500)
        } catch (err) {
            setMessage(err.message)
        }
    }

    return (
        <div className={styles.divPrincipal}>
            <h2><FcPlus size={35} />Criar Postagem</h2>

            <form className={styles.formulario} onSubmit={handleSubmit}>
                <div>
                    <label>Título</label>
                    <input
                        autoComplete='off'
                        required
                        name="titulo"
                        value={form.titulo}
                        onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                    />
                </div>

                <div>
                    <label>Conteúdo</label>
                    <textarea
                        required
                        name="conteudo"
                        value={form.conteudo}
                        onChange={(e) => setForm({ ...form, conteudo: e.target.value })}
                    />
                </div>
                <div>
                    <label>Autores</label>
                    <select
                        required
                        value={form.autor_id}
                        onChange={(e) => setForm({ ...form, autor_id: e.target.value })}
                    >
                        <option key='' value=''>Selecione um Autor</option>
                        {dados.map((autor) => (
                            <option key={autor.id} value={autor.id}>
                                {autor.nome}
                            </option>
                        ))}
                    </select>

                </div>

                <button type="submit">Enviar</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    )
}