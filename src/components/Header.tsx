import { Coffee as CoffeeIcon, MapPin, ShoppingCart } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useCart } from '../hooks/useCart'
import { ThemeToggle } from './ThemeToggle'

const HeaderBar = styled.header`
  background: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const Container = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 0.75rem 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem 1rem;
`

const Brand = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 2.75rem;
  min-width: 0;
  text-decoration: none;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.125rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.textTitle};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.25rem;
  }
`

const BrandMark = styled.span`
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.brandYellow};
  color: ${({ theme }) => theme.colors.onBrandYellow};
`

const Location = styled.div`
  display: inline-flex;
  flex: 1 1 100%;
  align-items: center;
  gap: 0.4rem;
  min-width: 0;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSubtitle};

  svg {
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.brandPurple};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex: 0 1 auto;
  }
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const CartButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 2.75rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.brandYellowHover};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.brandYellow};
  color: ${({ theme }) => theme.colors.onBrandYellow};
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.brandYellowHover};
  }
`

const Badge = styled.span`
  display: grid;
  place-items: center;
  min-width: 1.25rem;
  height: 1.25rem;
  padding: 0 0.25rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textTitle};
  font-size: 0.75rem;
  font-weight: 700;
`

export function Header() {
  const navigate = useNavigate()
  const { itemCount } = useCart()

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

        <Actions>
          <ThemeToggle />
          <CartButton
            type="button"
            onClick={() => navigate('/checkout')}
            aria-label={`Carrinho ${itemCount} ${itemCount === 1 ? 'item' : 'itens'}`}
          >
            <ShoppingCart size={18} aria-hidden="true" />
            <span>Carrinho</span>{' '}
            <Badge aria-hidden="true">{itemCount}</Badge>
          </CartButton>
        </Actions>
      </Container>
    </HeaderBar>
  )
}
