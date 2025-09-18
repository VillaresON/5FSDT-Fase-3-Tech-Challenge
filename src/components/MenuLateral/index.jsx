import { Link, useLocation } from 'react-router-dom'
import styles from './MenuLateral.module.css'
import { FcHome, FcPlus } from "react-icons/fc";
import { FaPencilRuler } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Header from '../Header';
import { IoLogIn } from 'react-icons/io5';
import { IoIosSave } from 'react-icons/io';


export default function MenuLateral({ children }) {
    const { user } = useContext(AuthContext);
    const location = useLocation();

    return (
        <div className={styles.principal}>
            <div className={styles.menu}>
                {user && (
                    <ul className={styles.separador}>
                        <div>
                            <ul className={styles.ul}>
                                <Link to='/' className={location.pathname === '/' ? styles.active : ''}> <FcHome size={25} /> Início</Link>
                                <Link to='/novoAutor' className={location.pathname === '/novoAutor' ? styles.active : ''}> <FcPlus size={25} />Novo Autor(a)</Link>
                                <Link to='/novaPostagem' className={location.pathname === '/novaPostagem' ? styles.active : ''}> <FcPlus size={25} />Nova Postagem</Link>
                                <Link to='/editarPostagem' className={location.pathname === '/editarPostagem' ? styles.active : ''}> <FaPencilRuler color='yellow' size={25} />Editar Postagem</Link>
                            </ul>
                        </div>
                        <div>
                            <ul className={styles.separador}>
                                <Header />
                            </ul>
                        </div>
                    </ul>
                )}
                {!user && (
                    <ul className={styles.ul}>
                        <Link to='/' className={location.pathname === '/' ? styles.active : ''}> <FcHome size={25} /> Início</Link>
                        <Link to="/login" className={location.pathname === '/login' ? styles.active : ''} ><IoLogIn size={25} color='green' />Login</Link>
                        <Link to="/register" className={location.pathname === '/register' ? styles.active : ''} > <IoIosSave size={25} color='#3285a8' /> Registrar</Link>
                    </ul>
                )}
            </div>
            <div className={styles.container}>
                {children}
            </div>
        </div>
    )
}