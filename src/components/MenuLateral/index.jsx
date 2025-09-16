import { Link, useLocation } from 'react-router-dom'
import styles from './MenuLateral.module.css'
import { FcHome, FcPlus } from "react-icons/fc";

export default function MenuLateral({ children }) {

    const location = useLocation();

    return (
        <div className={styles.principal}>
            <div className={styles.menu}>
                <ul className={styles.ul}>
                    <Link to='/' className={location.pathname === '/' ? styles.active : ''}> <FcHome size={25} /> Início</Link>
                    <Link to='/novaPostagem' className={location.pathname === '/novaPostagem' ? styles.active : ''}> <FcPlus size={25} />Nova Postagem</Link>
                </ul>
            </div>
            <div className={styles.container}>
                {children}
            </div>
        </div>
    )
}