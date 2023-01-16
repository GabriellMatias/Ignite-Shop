import { styled } from '../../styles'

export const ProductInCartContainer = styled('div', {
  marginTop: '32px',
  display: 'flex',
  gap: '20px',
})
export const ProductImage = styled('div', {
  width: '101.94px',
  height: '93px',
  background: 'linear-gradient(180deg, #1EA483 0%, #7465D4 100%)',
  borderRadius: '8px',
})
export const ProductDetails = styled('div', {
  display: 'flex',
  width: '260px',
  height: '94px',
  flexDirection: 'column',
  alignItems: 'start',
  gap: '2px',

  h2: {
    color: '$gray300',
    fontWeight: 'normal',
    lineHeight: '160%',
  },
  strong: {
    color: '$gray100',
    lineHeight: '160%',
  },
  button: {
    background: 'transparent',
    border: 'none',
    marginTop: 6,
    strong: {
      fontSize: '16px',
      color: '$green300',
      lineHeight: '160%',
    },
  },
})
