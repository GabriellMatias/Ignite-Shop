import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'
import logoImg from '../assets/Logo.svg'
import { Container, Header } from '../styles/pages/app'
import Image from 'next/image'
import { Cart } from '../components/Cart'
import { CartContextProvider } from '../Hooks/useCart'
import Link from 'next/link'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
/* estilizacao global no next com stitches */
globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <Container>
        <Header>
          {/* otimiza a imgem para ficar muito mais leve */}
          <Link href={'/'}>
            <Image src={logoImg.src} alt="" width="130" height="52" />
          </Link>
          <Cart />
        </Header>
        <Component {...pageProps} />
      </Container>
      <ToastContainer />
    </CartContextProvider>
  )
}
