import styles from './Post.module.css'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FcDocument, FcList } from "react-icons/fc";
import { ImExit } from "react-icons/im";

export default function Post() {
    const { id } = useParams()
    const [dados, setDados] = useState([])
    const [carregando, setCarregando] = useState(false)
    const [erro, setErro] = useState(null)

    async function buscarDados(url) {
        try {
            setCarregando(true)
            setErro(null)
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`)
            }
            const data = await response.json()
            // Garante que sempre seja array
            setDados(Array.isArray(data) ? data : [data])
        } catch (err) {
            setErro(err)
            setDados([])
        } finally {
            setCarregando(false)
        }
    }
    useEffect(() => {
        buscarDados(`http://localhost:3000/posts/${id}`)
    }, [])

    return (

        <div className={styles.divPrincipal} >
            <h2><FcList size={25} /> Postagem</h2>
            <Link className={styles.botaoSair} to={'/'}> <ImExit size={25} /> Sair</Link>
            <ul>
                {!carregando && !erro && (
                    dados.length > 0 ? (
                        dados.map(item => (
                            <li key={item.id}>
                                <div className={styles.card}>
                                    <h1 className={styles.titulo} ><FcDocument size={40} /> {item.titulo}</h1>
                                    <div className={styles.autor}>
                                        <p><b>Autor(a) - </b> {item.autor.nome}</p>
                                    </div>
                                    <div
                                        
                                        dangerouslySetInnerHTML={ {__html: item.conteudo}}
                                    />
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>Nenhum resultado encontrado.</p>
                    )
                )}
            </ul>
        </div>
    )
}