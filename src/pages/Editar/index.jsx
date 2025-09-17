import { Link, useParams } from 'react-router-dom';
import styles from './Editar.module.css'

import { useState, useEffect } from "react"
import { ImExit } from 'react-icons/im';

export default function Editar() {
    const { id } = useParams()
    const [autores, setAutores] = useState([]);
    const [form, setForm] = useState({ titulo: "", conteudo: "", autor_id: "" })
    const [message, setMessage] = useState("")

    async function buscarAutores(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
            const data = await response.json();
            setAutores(data);
        } catch (err) {
            console.error(err);
            setAutores([]);
        }
    }

    async function buscarDados(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
            const data = await response.json();
            setForm({
                titulo: data.titulo || "",
                conteudo: data.conteudo || "",
                autor_id: data.autor_id || ""
            });
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        buscarDados(`http://localhost:3000/posts/${id}`);
    }, [id]);

    useEffect(() => {
        buscarAutores("http://localhost:3000/autores");
    }, []);

    async function handleSubmit(e) {
        e.preventDefault()
        setMessage("")

        try {
            const res = await fetch(`http://localhost:3000/posts/${id}`, {
                method: "PUT", // usar PUT/PATCH para edição
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            })

            if (!res.ok) throw new Error("Erro ao atualizar")

            const data = await res.json()
            setMessage("Post atualizado com sucesso!")
        } catch (err) {
            setMessage(err.message)
        }
    }

    return (
        <div className={styles.divPrincipal}>
            <h2>Editar Post</h2>
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
                        <option value="">Selecione um Autor</option>
                        {autores.map((autor) => (
                            <option key={autor.id} value={autor.id}>
                                {autor.nome}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit">Atualizar Postagem</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    )
}
