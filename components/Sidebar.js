import React from 'react'
import Link from 'next/link'
import styles from '../styles/Sidebar.module.css'
import { GrClose } from 'react-icons/gr'

function Sidebar({isOpen, toggle}) {
    return (
        <>
        <div className={`${styles.menu_container} ${isOpen ? styles.side__bar : ''}`}>
            <div className={styles.cancel__icon}>
                <GrClose onClick={toggle} />
            </div>
            <ul>
                <li><Link href="/"><a>Home</a></Link></li>
                <li><Link href="/about"><a>About</a></Link></li>
                <li><Link href="/affiliate"><a>Affiliate</a></Link></li>
                <li><Link href="/stores"><a>Store</a></Link></li>
                <li className={styles.login}><Link href="/login"><a>Login</a></Link></li>
            </ul>     
        </div>   
        </>
    )
}

export default Sidebar
