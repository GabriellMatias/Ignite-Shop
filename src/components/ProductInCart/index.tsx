import { ProductDetails, ProductImage, ProductInCartContainer } from './style'
import Image from 'next/image'
import { useCart } from '../../Hooks/useCart'
interface ProductInCartProps {
  name: string
  price: string
  id: string
  imgUrl: string
}

export function ProductInCart({ name, price, id, imgUrl }: ProductInCartProps) {
  const { deleteProduct } = useCart()

  function handleDeleteProduct(id: string) {
    deleteProduct(id)
  }

  return (
    <ProductInCartContainer>
      <ProductImage>
        <Image src={imgUrl} width={100} height={100} alt="Camisa" />
      </ProductImage>
      <ProductDetails>
        <h2>{name}</h2>
        <strong>{price}</strong>
        <button onClick={() => handleDeleteProduct(id)}>
          <strong>Remover</strong>
        </button>
      </ProductDetails>
    </ProductInCartContainer>
  )
}
