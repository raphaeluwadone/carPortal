import '../styles/globals.css'
import { UserProvider } from '../utils/userContext'
import { CartProvider } from '../utils/cartContext'
import '../styles/nprogress.css'
import nProgress from 'nprogress'
import Router from 'next/router'
// import Error from 'next/error'

function MyApp({ Component, pageProps }) {

  Router.events.on('routeChangeStart', nProgress.start)
  Router.events.on('routeChangeError', nProgress.done)
  Router.events.on('routeChangeComplete', nProgress.done)

  return (
    <UserProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </UserProvider>
  )
}

export default MyApp
