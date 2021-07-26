import React from 'react'
import Link from 'next/link'
import styles from '../styles/Sidebar.module.css'
import { FaTimes } from 'react-icons/fa'

function Sidebar({isOpen, toggle}) {
    return (
        <>
        <div className={`${styles.menu_container} ${isOpen ? styles.side__bar : ''}`} onClick={toggle}>
            <div className={styles.cancel__icon}>
                <FaTimes onClick={toggle} />
            </div>
            <ul>
                <li><Link href="/"><a>Home</a></Link></li>
                <li><Link href="/about"><a>About</a></Link></li>
                <li><Link href="/affiliate"><a>Affiliate</a></Link></li>
                <li><Link href='/events'><a>Events</a></Link></li>
                <li><Link href="/stores"><a>Store</a></Link></li>
                <li className={styles.login}><span><Link href="/login"><a>Login</a></Link></span> | <span><Link href="/signup"><a>Sign Up</a></Link></span></li>
            </ul>     
        </div>   
        </>
    )
}

export default Sidebar
