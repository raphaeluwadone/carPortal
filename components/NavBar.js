import next from 'next'
import React from 'react'
import styles from '../styles/Nav.module.css'
import Link from 'next/link'
import { useJwt } from 'react-jwt'
import Cookies from 'js-cookie'

function NavBar() {
    
    
    return (
        <>
            <nav className={styles.nav}>
                <Link href="/">
                <div className={styles.nav_brand}>  
                </div>
              </Link>
                <ul className={styles.nav_links}>
                    <li><Link href='/about'><a>About</a></Link></li>
                    <li><Link href='/affiliate'><a>Affiliates</a></Link></li>
                    <li><Link href='/events'><a>Events</a></Link></li>
                    <li><Link href='/stores'><a>Store</a></Link></li>
                    <li className={styles.auth_btn}><Link href="/login"><a>Login</a></Link></li>
                    {/* <li className={styles.auth_btn} style={{display: `${isExpired ? `none` : 'inlineBlock'}`}}><Link href="/logout"><a>Logout</a></Link></li> */}
                </ul>
            </nav>  
        </>
    )
}

export default NavBar
