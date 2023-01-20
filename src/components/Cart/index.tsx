import { CartContainer, CartClose, BuyDetails, BuyButton } from './style'
import * as Dialog from '@radix-ui/react-dialog'
import { CartButton } from '../CartButton'
import { X } from 'phosphor-react'
import { ProductInCart } from '../ProductInCart'
import { useCart } from '../../Hooks/useCart'

export function Cart() {
  const { productInCart, BuyProduct, cartTotal, isCreatingCheckoutSession } =
    useCart()
  const isCartEmpty = productInCart.length !== 0
  const formattedTotalPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(cartTotal)

  async function handleBuyProducts() {
    BuyProduct()
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <CartButton />
      </Dialog.Trigger>
      <Dialog.Portal>
        <CartContainer>
          <CartClose>
            <X size={24} weight="bold" />
          </CartClose>
          <h2>Sacola de Compras</h2>
          {!isCartEmpty && (
            <section>
              <p>Não há nada em seu carrinho de compras 🤥 </p>
            </section>
          )}

          {productInCart.map((product) => {
            return (
              <ProductInCart
                key={product.id}
                name={product.name}
                price={product.price}
                id={product.id}
                imgUrl={product.imgUrl}
              />
            )
          })}
          {isCartEmpty && (
            <>
              <BuyDetails>
                <p>Quantidade</p>
                <span>
                  {productInCart.length}{' '}
                  {productInCart.length > 1 ? 'itens' : 'item'}
                </span>
                <strong>Valor Total</strong>
                <strong>{formattedTotalPrice}</strong>
              </BuyDetails>
              <BuyButton
                onClick={handleBuyProducts}
                disabled={isCreatingCheckoutSession}
              >
                Finalizar Compra
              </BuyButton>
            </>
          )}
        </CartContainer>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
