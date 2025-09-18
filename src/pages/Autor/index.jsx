import styles from './Autor.module.css'

import { useState, useContext } from "react"
import {  FcReading } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import Mensagem from '../../components/Mensagem'

export default function Autor() {
    const { token } = useContext(AuthContext);
    const [form, setForm] = useState({ nome: ""})
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        setMessage("")

        try {
            const res = await fetch("http://localhost:3000/autores", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(form),
            })

            if (!res.ok) throw new Error("Erro ao enviar")

                
            setMessage(<Mensagem>Autor Cadastrado Com Sucesso!</Mensagem>)
            setForm({ nome: ""})
            setTimeout(() => navigate("/"), 1500)
        } catch (err) {
            setMessage(err.message)
        }
    }

    return (
        <div className={styles.divPrincipal}>
            <h2><FcReading size={35} />Criar Autores</h2>

            <form className={styles.formulario} onSubmit={handleSubmit}>
                <div>
                    <label>Nome do Autor(a)</label>
                    <input
                        autoComplete='off'
                        required
                        name="titulo"
                        value={form.nome}
                        onChange={(e) => setForm({ ...form, nome: e.target.value })}
                    />
                </div>
                <button type="submit">Criar</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    )
}