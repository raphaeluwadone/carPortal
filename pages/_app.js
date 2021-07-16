import '../styles/globals.css'
import { UserProvider } from '../utils/userContext'
import { CartProvider } from '../utils/CartContext'
import '../styles/nprogress.css'
import nProgress from 'nprogress'
import Router, {useRouter} from 'next/router'
import NavBar from '../components/NavBar'
// import Error from 'next/error'

function MyApp({ Component, pageProps }) {
  
  const router = useRouter()

  const page = router.pathname === '/' ? false : true

  Router.events.on('routeChangeStart', nProgress.start)
  Router.events.on('routeChangeError', nProgress.done)
  Router.events.on('routeChangeComplete', nProgress.done)
  return (
    <UserProvider>
      <CartProvider>
        {page && <NavBar />}
        <Component {...pageProps} />
      </CartProvider>
    </UserProvider>
  )
}

export default MyApp
