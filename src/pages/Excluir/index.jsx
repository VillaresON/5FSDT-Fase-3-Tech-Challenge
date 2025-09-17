import { useParams, useNavigate } from 'react-router-dom';
import styles from './Excluir.module.css'
import { useState, useEffect } from "react"

export default function Excluir() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [autores, setAutores] = useState([]);
    const [form, setForm] = useState({ titulo: "", conteudo: "", autor_id: "" })
    const [message, setMessage] = useState("")
    const [showModal, setShowModal] = useState(false)

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

    async function handleDelete() {
        setMessage("")
        try {
            const res = await fetch(`http://localhost:3000/posts/${id}`, {
                method: "DELETE"
            })

            if (!res.ok) throw new Error("Erro ao excluir")

            setMessage("Post excluído com sucesso!")
            setShowModal(false)

            // Redirecionar após excluir
            setTimeout(() => navigate("/"), 1500)
        } catch (err) {
            setMessage(err.message)
        }
    }

    return (
        <div className={styles.divPrincipal}>
            <h2>Visualizar Post</h2>

            <div className={styles.formulario}>
                <div>
                    <label>Título</label>
                    <input
                        value={form.titulo}
                        readOnly
                        disabled
                    />
                </div>

                <div>
                    <label>Conteúdo</label>
                    <textarea
                        value={form.conteudo}
                        readOnly
                        disabled
                    />
                </div>

                <div>
                    <label>Autor</label>
                    <input
                        value={autores.find(a => a.id === form.autor_id)?.nome || ""}
                        readOnly
                        disabled
                    />
                </div>

                <button onClick={() => setShowModal(true)} className={styles.btnExcluir}>
                    Excluir Postagem
                </button>
            </div>

            {message && <p>{message}</p>}

            {/* Modal de confirmação */}
            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h3>Tem certeza que deseja excluir?</h3>
                        <div className={styles.modalActions}>
                            <button onClick={handleDelete} className={styles.btnConfirmar}>Sim, excluir</button>
                            <button onClick={() => setShowModal(false)} className={styles.btnCancelar}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
