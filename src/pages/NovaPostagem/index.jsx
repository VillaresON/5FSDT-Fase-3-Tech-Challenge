import styles from './NovaPostagem.module.css'

import { useState, useEffect, useContext } from "react"
import { FcPlus } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import Mensagem from '../../components/Mensagem'
import { Editor } from "@tinymce/tinymce-react"

export default function NovaPostagem() {
    const { token } = useContext(AuthContext);
    const [dados, setDados] = useState([]);
    const [form, setForm] = useState({ titulo: "", conteudo: "", autor_id: "" })
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

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
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(form),
            })

            if (!res.ok) throw new Error("Erro ao enviar")

            const data = await res.json()
            setMessage(<Mensagem>Postagem criada com sucesso!</Mensagem>)
            setForm({ titulo: "", conteudo: "", autor_id: "" })
            setTimeout(() => navigate("/"), 1500)
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
                        <option key='' value=''>Selecione um Autor</option>
                        {dados.map((autor) => (
                            <option key={autor.id} value={autor.id}>
                                {autor.nome}
                            </option>
                        ))}
                    </select>

                </div>

                <button type="submit">Criar</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    )
}