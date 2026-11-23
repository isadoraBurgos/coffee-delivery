import { Coffee as CoffeeIcon, MapPin, ShoppingCart } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const HeaderBar = styled.header`
  background: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 0.875rem 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem 1rem;
`

const Brand = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.25rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`

const BrandMark = styled.span`
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.onAccent};
`

const Location = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textMuted};

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const CartButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border: 0;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.onAccent};
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.accentHover};
  }
`

export function Header() {
  const navigate = useNavigate()

  return (
    <HeaderBar>
      <Container>
        <Brand to="/" aria-label="Coffee Delivery — página inicial">
          <BrandMark aria-hidden="true">
            <CoffeeIcon size={18} />
          </BrandMark>
          <span>Coffee Delivery</span>
        </Brand>

        <Location>
          <MapPin size={16} aria-hidden="true" />
          <span>
            Entregar em <strong>São Paulo, SP</strong>
          </span>
        </Location>

        <CartButton
          type="button"
          onClick={() => navigate('/checkout')}
          aria-label="Ir para o carrinho"
        >
          <ShoppingCart size={18} aria-hidden="true" />
          <span>Carrinho</span>
        </CartButton>
      </Container>
    </HeaderBar>
  )
}
