import axios from 'axios'
import { createContext, ReactNode, useContext, useState } from 'react'
import { toast } from 'react-toastify'

export interface ProductCartProps {
  id: string
  name: string
  imgUrl: string
  price: string
  numberPrice?: number
  description: string
  defaultPriceId: string
}

interface CartContextData {
  productInCart: ProductCartProps[]
  isCreatingCheckoutSession: boolean
  cartTotal: number
  addProductToCart: (product: ProductCartProps) => void
  deleteProduct: (id: string) => void
  checkIfItemExists: (productId: string) => boolean
  BuyProduct: () => void
}
interface CartContextProviderProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextData)

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [productInCart, setProductInCartItems] = useState<ProductCartProps[]>(
    [],
  )

  const [isCreatingCheckoutSession, setisCreatingCheckoutSession] =
    useState<boolean>(false)
  const cartTotal = productInCart.reduce((total, product) => {
    return total + product.numberPrice!
  }, 0)

  async function BuyProduct() {
    try {
      setisCreatingCheckoutSession(true)
      /* aqui envia o parametro para a rotA API, desse modo pega o prce id la
      com o req.body */

      const response = await axios.post('/api/checkout', {
        products: productInCart,
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
  function checkIfItemExists(productId: string) {
    return productInCart.some((product) => product.id === productId)
  }

  function addProductToCart(product: ProductCartProps) {
    if (checkIfItemExists(product.id)) {
      toast.error('Product already in cart')
      return
    }
    try {
      setProductInCartItems((state) => [...state, product])
      toast.success('Product added to cart')
    } catch (error) {
      console.log(error)
      toast.error('unable to add, see log')
    }
  }
  function deleteProduct(id: string) {
    try {
      const productsWithoutDeletedOne = productInCart.filter(
        (productToDelete) => {
          return productToDelete.id !== id
        },
      )
      setProductInCartItems(productsWithoutDeletedOne)
      toast.success('Product remove successfully')
    } catch (error) {
      console.log(error)
      toast.error('unable to add, see log')
    }
  }

  return (
    <CartContext.Provider
      value={{
        productInCart,
        addProductToCart,
        deleteProduct,
        checkIfItemExists,
        BuyProduct,
        isCreatingCheckoutSession,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
export function useCart(): CartContextData {
  const context = useContext(CartContext)

  return context
}
