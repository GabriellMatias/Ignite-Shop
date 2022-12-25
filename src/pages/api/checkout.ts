import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '../../lib/stripe'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const priceId = 'price_1MHrsvExk0ULRmvXvpT4ntCE'
  /* criando uma sessao de checkout, quando o usuario for comprar o produto, ai 
 vc passa as url de onde ele vai ser redirecionado e os items, com o preco e quantidade
 PS: poderia passar o produto inteiro ao inves do preco mas como no stripe o preco 
 e uma entidade diferente e melhor passar apenas o preco e linkar com o restante das 
 informaces do produto */

  const successUrl = `${process.env.NEXT_URL}/success`
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
