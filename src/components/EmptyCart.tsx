import { Coffee, ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Panel = styled.section`
  display: grid;
  justify-items: center;
  gap: 0.75rem;
  margin: 1.5rem auto;
  padding: 1.75rem 1rem;
  max-width: 32rem;
  min-width: 0;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.card};
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin: 2rem auto;
    padding: 2.5rem 1rem;
  }
`

const IconWrapper = styled.span`
  display: grid;
  place-items: center;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.brandYellow};
  color: ${({ theme }) => theme.colors.onBrandYellow};
`

const Title = styled.h2`
  font-size: 1.5rem;
`

const Text = styled.p`
  color: ${({ theme }) => theme.colors.textSubtitle};
  line-height: 1.5;
`

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  min-height: 2.75rem;
  margin-top: 0.5rem;
  padding: 0.6rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.brandPurple};
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.brandPurple};
  color: ${({ theme }) => theme.colors.onBrandPurple};
  font-weight: 700;
  text-decoration: none;

  &:hover {
    border-color: ${({ theme }) => theme.colors.brandPurpleHover};
    background: ${({ theme }) => theme.colors.brandPurpleHover};
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focusRing};
    outline-offset: 2px;
  }
`

export function EmptyCart() {
  return (
    <Panel>
      <IconWrapper aria-hidden="true">
        <ShoppingCart size={28} />
      </IconWrapper>
      <Title>Seu carrinho está vazio</Title>
      <Text>Escolha seus cafés favoritos no catálogo para montar seu pedido.</Text>
      <BackLink to="/">
        <Coffee size={16} aria-hidden="true" />
        Voltar ao catálogo
      </BackLink>
    </Panel>
  )
}
