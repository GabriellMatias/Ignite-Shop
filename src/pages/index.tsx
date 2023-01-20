import Image from 'next/image'
import { HomeContainer, Product } from '../styles/pages/home'
import { useKeenSlider } from 'keen-slider/react'
import Head from 'next/head'
import 'keen-slider/keen-slider.min.css'
import { GetStaticProps } from 'next'
import { stripe } from '../lib/stripe'
import Stripe from 'stripe'
import Link from 'next/link'
import { CartButton } from '../components/CartButton'
import { ProductCartProps, useCart } from '../Hooks/useCart'

interface ProductDataProps {
  productData: {
    id: string
    name: string
    imgUrl: string
    price: string
    numberPrice: number
    description: string
    defaultPriceId: string
  }[]
  /* colchete no final significa que esse dado e um array de produtos, ou seja
  tem varios */
}
export default function Home({ productData }: ProductDataProps) {
  const { addProductToCart } = useCart()

  const [sliderRef] = useKeenSlider({
    /* spacamento deve ser feito por aqui, se for feito pelo css o ultimo produto
    nao vai fechar na pagina */
    slides: {
      perView: 3,
      spacing: 48,
    },
  })
  function handleAddProductToCart(product: ProductCartProps) {
    addProductToCart(product)
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {productData.map((product) => {
          return (
            <Product className="keen-slider__slide" key={product.id}>
              {/* link do next impede que coisas desnecessaria sejam carregadas
              quando o usuario clicar no link */}
              <Link
                href={`/product/${product.id}`}
                /* um complemento para funcionar o getStaticPath, para que ele nao 
            pre Carregue a pagina. Prefetch se deixar isso deixa pesado pois ele pre-carrega a pagina
            automaticamente */
                prefetch={false}
              >
                <Image src={product.imgUrl} width={520} height={480} alt="" />
              </Link>
              <footer>
                <div>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </div>

                <CartButton
                  color={'green'}
                  size="large"
                  onClick={() => handleAddProductToCart(product)}
                />
              </footer>
            </Product>
          )
        })}
      </HomeContainer>
    </>
  )
}
/* se comporta como um getServerSidProps em ambiente de desenvolvimento */
export const getStaticProps: GetStaticProps = async () => {
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
      /* pode ter varias imagens, entao pega a primeira cm o vetor */
      imgUrl: product.images[0],
      /* vem em centavos */
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount! / 100),
      numberPrice: price.unit_amount! / 100,
      defaultPriceId: price.id,
    }
  })

  return { props: { productData }, revalidate: 60 * 60 * 24 /* 24horas */ }
}
