import { MdOutlineDoneOutline } from 'react-icons/md'
import styles from './Mensagem.module.css'

export default function Mensagem({children}){
    return (
        <span className={styles.mensagem}>
           <MdOutlineDoneOutline size={25} color='white'/> {children}
        </span>
    )
}