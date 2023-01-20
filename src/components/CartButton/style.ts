import { styled } from '../../styles'

export const CartButtonContainer = styled('button', {
  width: '48px',
  height: '48px',
  borderRadius: 6,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  variants: {
    color: {
      gray: {
        background: '$gray800',
        color: '$gray500',
        '&:not(:disabled):hover': {
          background: '$gray800',
        },
      },
      green: {
        background: '$green500',
        color: 'white',
        '&:not(:disabled):hover': {
          background: '$green300',
        },
      },
    },
    size: {
      medium: {
        width: '3rem',
        height: '3rem',
        svg: {
          fontSize: 24,
        },
      },
      large: {
        width: '3.5rem',
        height: '3.5rem',
        svg: {
          fontSize: 32,
        },
      },
    },
  },
  defaultVariants: {
    color: 'gray',
    size: 'medium',
  },
})
