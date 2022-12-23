/* useRouter tem acesso aos parametros que vem de [id] que e o que vem depois de 
product por exemplo na URL */

import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import Stripe from 'stripe'
import { stripe } from '../../lib/stripe'
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '../../styles/pages/product'

interface ProductProps {
  product: {
    id: string
    name: string
    imgUrl: string
    price: string
    description: string
  }
}

export default function Product({ product }: ProductProps) {
  // const { isFallback } = useRouter() retorna se a pagina ta sendo carregada caso o fallback seja true

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imgUrl} alt="" width={520} height={480} />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>{product.description}</p>

        <button>Buy now</button>
      </ProductDetails>
    </ProductContainer>
  )
}

/* paginas dinamicas sao obrigatorias o getStaticPath */
/* dizer quais parametros vao vim pra gerar as paginas staticas quando a aplicacao
comeca */
export const getStaticPath: GetStaticPaths = async () => {
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
    },
    revalidate: 60 * 60 * 4, // 4horas
  }
}
