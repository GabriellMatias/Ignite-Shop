import Image from 'next/image'
import { HomeContainer, Product } from '../styles/pages/home'
import { useKeenSlider } from 'keen-slider/react'

import 'keen-slider/keen-slider.min.css'
import { GetServerSideProps } from 'next'
import { stripe } from '../lib/stripe'
import Stripe from 'stripe'

interface ProductDataProps {
  productData: {
    id: string
    name: string
    imgUrl: string
    price: number
  }[]
  /* colchete no final significa que esse dado e um array de produtos, ou seja
  tem varios */
}
export default function Home({ productData }: ProductDataProps) {
  const [sliderRef] = useKeenSlider({
    /* spacamento deve ser feito por aqui, se for feito pelo css o ultimo produto
    nao vai fechar na pagina */
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {productData.map((product) => {
        return (
          <Product className="keen-slider__slide" key={product.id}>
            <Image src={product.imgUrl} width={520} height={480} alt="" />
            <footer>
              <strong>{product.name}</strong>
              <span>{product.price}</span>
            </footer>
          </Product>
        )
      })}
    </HomeContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  /* pegando o preco e nao seu ID */
  const stripeResponse = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const productData = stripeResponse.data.map((product) => {
    /* pegando o preco e tipando ele */
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imgUrl: product.images[0],
      /* vem em centavos */
      price: price.unit_amount,
    }
  })

  return { props: { productData } }
}
