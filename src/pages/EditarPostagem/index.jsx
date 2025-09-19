import styles from './EditarPostagem.module.css'
import { useState, useEffect } from 'react';
import { FcDocument, FcList } from "react-icons/fc";
import { Link } from 'react-router-dom';
import { FaPencilRuler } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import { IoSearchOutline } from 'react-icons/io5';
import { FiAlertOctagon } from 'react-icons/fi';


export default function Inicio() {
    const [dados, setDados] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState(null);
    const [termoBusca, setTermoBusca] = useState("");

    async function buscarDados(url) {
        try {
            setCarregando(true);
            setErro(null);
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            const data = await response.json();
            // Garante que sempre seja array
            setDados(Array.isArray(data) ? data : [data]);
        } catch (err) {
            setErro(err);
            setDados([]);
        } finally {
            setCarregando(false);
        }
    }

    // Buscar todos inicialmente
    useEffect(() => {
        buscarDados("http://localhost:3000/posts/autores");
    }, []);

    // Buscar por filtro quando o termo mudar
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (termoBusca.trim() !== "") {
                buscarDados(`http://localhost:3000/posts/search/${encodeURIComponent(termoBusca)}`);
            } else {
                buscarDados("http://localhost:3000/posts/autores");
            }
        }, 1);

        return () => clearTimeout(delayDebounce);
    }, [termoBusca]);

    return (
        <div className={styles.divPrincipal} >
            <h2 className={styles.tituloPagina}><FcList size={25} /> Lista de Postagens</h2>

            <div style={{ position: 'relative', display: 'inline-block' }}>
                <input
                    autoFocus
                    type="text"
                    placeholder="Buscar postagens..."
                    value={termoBusca}
                    onChange={(e) => setTermoBusca(e.target.value)}
                    className={styles.input}
                />
                <IoSearchOutline size={25} className={styles.Search} />
            </div>

            <ul>
                {!carregando && !erro && (
                    dados.length > 0 ? (
                        dados.map(item => (
                            <li key={item.id}>
                                <div className={styles.card}>
                                    <h1 className={styles.titulo}><FcDocument size={40} /> {item.titulo}
                                        <div>
                                            <Link className={styles.botaoEditar} to={`/editar/${item.id}`}>
                                                <FaPencilRuler color='yellow' /> Editar
                                            </Link>
                                            <Link className={styles.botaoExcluir} to={`/excluir/${item.id}`}>
                                                <RiDeleteBinFill color='red' /> Excluir
                                            </Link>
                                        </div>
                                    </h1>

                                </div>
                            </li>
                        ))
                    ) : (
                        <p className={styles.mensagemResultado}><FiAlertOctagon size={25} />  Nenhum resultado encontrado.</p>
                    )
                )}
            </ul>
        </div>
    );
}
