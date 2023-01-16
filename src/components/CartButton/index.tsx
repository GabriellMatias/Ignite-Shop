import { Handbag } from 'phosphor-react'
import { ComponentProps } from 'react'
import { CartButtonContainer } from './style'

type CartButtonProps = ComponentProps<typeof CartButtonContainer>

export function CartButton({ ...rest }: CartButtonProps) {
  return (
    <CartButtonContainer {...rest}>
      <Handbag size={24} color={'white'} weight="bold" />
    </CartButtonContainer>
  )
}
