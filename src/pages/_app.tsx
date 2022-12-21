
import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'
import logoImg from '../assets/Logo.svg'
import { Container, Header } from '../styles/pages/app'
import Image from 'next/image'
/* estilizacao global no next com stitches*/
globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  

  return (
    <Container>
      <Header>
        {/* otimiza a imgem para ficar muito mais leve */}
          <Image src={logoImg.src} alt="" />
      </Header>
  <Component {...pageProps} />
  </Container>)
}
