import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Stripe from 'stripe'
import { stripe } from '../lib/stripe'
import { ImageContainer, SuccessContainer } from '../styles/pages/success'

interface SuccessProps {
  customerName: string
  Product: {
    name: string
    imgUrl: string
  }
}

export default function Success({ customerName, Product }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra Efetuada | Ignite Shop</title>
        {/* PARA IMPEDIR QUE OS CROWLES PEGUEM ESSA PAGINA */}
        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <h1>Compra Efetuada</h1>

        <ImageContainer>
          <Image src={Product.imgUrl} alt="" width={120} height={110} />
        </ImageContainer>

        <p>
          Uhu! <strong>{customerName}</strong>, sua{' '}
          <strong>{Product.name}</strong> já está a caminho da sua casa
        </p>

        <Link href="/">Voltar ao catalogo</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    /* redirecionndo o usurio para a home se nao tiver session ID */
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = String(query.session_id)

  /* tras todos os dados da sessao */
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const customerName = session.customer_details?.name
  const product = session.line_items?.data[0].price!.product as Stripe.Product
  return {
    props: {
      customerName,
      Product: {
        name: product.name,
        imgUrl: product.images[0],
      },
    },
  }
}
