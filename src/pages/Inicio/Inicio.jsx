import { useState, useEffect } from 'react';
import styles from './inicio.module.css'
import { FcAbout, FcReading, FcDocument, FcList } from "react-icons/fc";

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
        <div>
            <h2><FcList size={25} /> Lista de Postagens</h2>

            {/* Input de busca */}
            <input
                autoFocus
                type="text"
                placeholder="Buscar postagens..."
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
                className={styles.input}
            />


            <ul>
                {!carregando && !erro && (
                    dados.length > 0 ? (
                        dados.map(item => (
                            <li key={item.id}>
                                <div className={styles.card}>
                                    <h1><FcDocument size={40} /> {item.titulo}</h1>
                                    <p><FcAbout size={25} /> {item.conteudo}</p>
                                    <h5><FcReading size={25} /> {item.autor?.nome}</h5>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>Nenhum resultado encontrado.</p>
                    )
                )}
            </ul>
        </div>
    );
}
