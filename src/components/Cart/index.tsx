import { CartContainer, CartClose, BuyDetails, BuyButton } from './style'
import * as Dialog from '@radix-ui/react-dialog'
import { CartButton } from '../CartButton'
import { X } from 'phosphor-react'
import { ProductInCart } from '../ProductInCart'

export function Cart() {
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

          <ProductInCart />
          <ProductInCart />
          <ProductInCart />

          <BuyDetails>
            <span>Quantidade</span>
            <span>3 itens</span>
            <strong>Valor Total</strong>
            <strong>R$ 270,00</strong>
          </BuyDetails>
          <BuyButton>Finalizar Compra</BuyButton>

          {/* <section>
            <p>Não há nada em seu carrinho de compras :(</p>
          </section> */}
        </CartContainer>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
