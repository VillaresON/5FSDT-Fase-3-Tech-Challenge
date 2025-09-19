import { useParams } from 'react-router-dom';
import styles from './Editar.module.css'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react"
import Mensagem from '../../components/Mensagem'
import { Editor } from "@tinymce/tinymce-react"

export default function Editar() {
    const { id } = useParams()
    const [autores, setAutores] = useState([]);
    const [form, setForm] = useState({ titulo: "", conteudo: "", autor_id: "" })
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

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
            setMessage(<Mensagem>Postagem atualizada com sucesso!</Mensagem>)
            setTimeout(() => navigate("/"), 1500)
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
                    <Editor
                        apiKey="h2gkodfjriz7xmvqlm5nakg8hcitofdkcft4awxokaf361n2"
                        value={form.conteudo}
                        init={{
                            height: 300,
                            menubar: false,
                            plugins: "lists link image code",
                            toolbar:
                                "undo redo | formatselect | bold italic | bullist numlist | link image | code",
                        }}
                        onEditorChange={(e) => setForm({ ...form, conteudo: e })}
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
