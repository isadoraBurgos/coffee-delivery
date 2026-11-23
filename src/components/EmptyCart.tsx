import { Coffee, ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Panel = styled.section`
  display: grid;
  justify-items: center;
  gap: 0.75rem;
  margin: 2rem auto;
  padding: 2.5rem 1rem;
  max-width: 32rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.surface};
  text-align: center;
`

const IconWrapper = styled.span`
  display: grid;
  place-items: center;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.onAccent};
`

const Title = styled.h2`
  font-size: 1.5rem;
`

const Text = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.5;
`

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.5rem;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  font-weight: 700;
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
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
