import next from 'next'
import React from 'react'
import styles from '../styles/Nav.module.css'
import Link from 'next/link'

function NavBar() {
    return (
        <>
            <nav className={styles.nav}>
              <div className={styles.nav_brand}>
                  {/* <Link href='/'>
                      <img src="../../assets/" alt="" width="200px"/>
                  </Link> */}
              </div>
                <ul className={styles.nav_links}>
                    <li><Link href='/about'><a>About</a></Link></li>
                    <li><Link href='/affiliat'><a>Affiliates</a></Link></li>
                    <li><Link href='/events'><a>Events</a></Link></li>
                    <li><Link href='/stores'><a>Store</a></Link></li>
                    <li className={styles.auth_btn}><Link href="/login"><a>Login</a></Link></li>
                </ul>
            </nav>  
        </>
    )
}

export default NavBar
