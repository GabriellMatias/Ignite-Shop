import { ProductDetails, ProductImage, ProductInCartContainer } from './style'
import Image from 'next/image'
export function ProductInCart() {
  return (
    <ProductInCartContainer>
      <ProductImage>
        <Image src="/camisaTeste.png" width={100} height={100} alt="Camisa" />
      </ProductImage>
      <ProductDetails>
        <h2>Camiseta teste limits</h2>
        <strong>R$ 89,00</strong>
        <button>
          <strong>Remover</strong>
        </button>
      </ProductDetails>
    </ProductInCartContainer>
  )
}
