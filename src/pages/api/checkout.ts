import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '../../lib/stripe'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  /* paarametro vem da pagina produtc/[id] */
  const { priceId } = req.body

  /* evitar que o usuario acesse  pagna pela barra de pesqusa com o metodo GET,
  entao aqui so aceita metodo post */
  if (req.method !== 'POST') {
    return res.status(405)
  }

  if (!priceId) {
    return res.status(400).json({ error: 'price not found' })
  }

  /* criando uma sessao de checkout, quando o usuario for comprar o produto, ai 
 vc passa as url de onde ele vai ser redirecionado e os items, com o preco e quantidade
 PS: poderia passar o produto inteiro ao inves do preco mas como no stripe o preco 
 e uma entidade diferente e melhor passar apenas o preco e linkar com o restante das 
 informaces do produto */

  /* id da sessao enviando pela url para pegar na pagina de sucesso e fazer uma requisicao
  com as informacoes da compra */
  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}/`
  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  })
}
