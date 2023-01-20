import { styled } from '../../styles'
import * as Dialog from '@radix-ui/react-dialog'

export const CartContainer = styled(Dialog.Content, {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  width: '30rem',
  background: '$gray800',
  padding: '3rem',
  paddingTop: '4.5rem',
  boxShadow: '-4px 0px 3px rgba(0, 0, 0, 0.8)',

  h2: {
    fontWeight: 'bold',
    color: '$gray100',
    fontSize: '$lg',
  },
  section: {
    fontWeight: 'bold',
    color: '$gray100',
    justifySelf: 'center',
    marginTop: '3rem',
  },
})

export const CartClose = styled(Dialog.Close, {
  position: 'absolute',
  width: '24px',
  height: '24px',
  left: '432px',
  top: '24px',
  background: 'transparent',
  border: 'none',
  color: '$gray400',
})

export const BuyDetails = styled('footer', {
  marginTop: '6rem',
  marginBottom: '57px',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '0.75rem',
  color: '$gray100',
  span: {
    justifySelf: 'end',
  },
  strong: {
    fontSize: '$xl',
    '&:last-child': {
      justifySelf: 'end',
      fontSize: '32px',
    },
  },
})
export const BuyButton = styled('button', {
  width: '384px',
  height: '69px',
  background: '$green500',
  padding: '20px 32px',
  borderRadius: 8,
  border: 'none',

  fontWeight: 'bold',
  fontSize: '$lg',
  lineHeight: '160%',
  color: '$gray100',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '48px',
  '&:hover': {
    background: '$green300',
  },
})
