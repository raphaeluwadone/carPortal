import '../styles/globals.css'
import React, {useState} from 'react'
import { UserProvider } from '../utils/userContext'
import { CartProvider } from '../utils/CartContext'
import '../styles/nprogress.css'
import nProgress from 'nprogress'
import Router, {useRouter} from 'next/router'
import NavBar from '../components/NavBar'
import Sidebar from '../components/Sidebar'
import { HiOutlineMenuAlt3 } from 'react-icons/hi'
import Footer from '../components/Footer'
// import Error from 'next/error'

function MyApp({ Component, pageProps }) {
  
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  const page = router.pathname === '/' ? false : true

  Router.events.on('routeChangeStart', nProgress.start)
  Router.events.on('routeChangeError', nProgress.done)
  Router.events.on('routeChangeComplete', nProgress.done)
  return (
    <UserProvider>
      <CartProvider>
        {page && <NavBar className='nav__bar'/>}
        {page && <HiOutlineMenuAlt3 className="nav__menu" onClick={toggleOpen}/>}
        {page && <Sidebar isOpen={isOpen} toggle={toggleOpen}/>}
        {page && <div className="nav__brand"></div>}
        <Component {...pageProps} />
        {page && <Footer />}
      </CartProvider>
    </UserProvider>
  )
}

export default MyApp
