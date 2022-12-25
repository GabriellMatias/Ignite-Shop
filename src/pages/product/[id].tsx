/* useRouter tem acesso aos parametros que vem de [id] que e o que vem depois de 
product por exemplo na URL */

import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import Stripe from 'stripe'
import { stripe } from '../../lib/stripe'
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '../../styles/pages/product'

interface ProductProps {
  id: string
  name: string
  imgUrl: string
  price: string
  description: string
  defaultPriceId: string
}

export default function Product(props: ProductProps) {
  // const { isFallback } = useRouter() retorna se a pagina ta sendo carregada caso o fallback seja true

  const [isCreatingCheckoutSession, setisCreatingCheckoutSession] =
    useState<boolean>(false)

  async function handleBuyProduct() {
    try {
      setisCreatingCheckoutSession(true)
      /* aqui envia o parametro para a rotA API, desse modo pega o prce id la
      com o req.body */
      const response = await axios.post('/api/checkout', {
        priceId: props.defaultPriceId,
      })
      const { checkoutUrl } = response.data

      /* redirecionando o usuario pra uma rota que nao e nossaa, e do stripe. Se fosse uma rota
      do nosso aplicativo, usariamos o userouter */
      window.location.href = checkoutUrl
    } catch (error) {
      setisCreatingCheckoutSession(false)
      console.log(error)
      alert(error)
    }
  }

  return (
    <>
      <Head>
        <title>{Product.name} | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={props.imgUrl} alt="" width={520} height={480} />
        </ImageContainer>

        <ProductDetails>
          <h1>{props.name}</h1>
          <span>{props.price}</span>
          <p>{props.description}</p>

          <button
            onClick={handleBuyProduct}
            disabled={isCreatingCheckoutSession}
          >
            Buy now
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

/* paginas dinamicas sao obrigatorias o getStaticPath */
/* dizer quais parametros vao vim pra gerar as paginas staticas quando a aplicacao
comeca */
export const getStaticPaths: GetStaticPaths = async () => {
  /* busca os produtos mais acessados e passa em paths os produtos mais acessados
  pois essa paginas serao geradas no momento da build */

  /* passa o fallback true para quando o usuario acessar uma pagina que nao passei em paths
  nao da erro 404 */
  /* fallback: true > tenta executar o getStaticProps antes de renderizar as paginas
  que nao foram passadas no path, no entanto nesse metodo precisa de uma tela de carreegamento */

  return {
    paths: [{ params: { id: 'prod_N1vkwmgVKKQQjJ' } }],
    fallback: true,
  }
}

/* pode pegar as propriedades que sao passadas para o componente, desestruturando os 
params por aqui, assim fica mais facil de fazer a requisicao de acordo com o produto */
export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params?.id
  const product = await stripe.products.retrieve(productId!, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      id: product.id,
      name: product.name,
      /* pode ter varias imagens, entao pega a primeira cm o vetor */
      imgUrl: product.images[0],
      /* vem em centavos */
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount! / 100),
      description: product.description,
      /* para puxar o produtoo na checkout session */
      defaultPriceId: price.id,
    },
    revalidate: 60 * 60 * 4, // 4horas
  }
}
