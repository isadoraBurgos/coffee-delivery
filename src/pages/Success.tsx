import { PackageX } from 'lucide-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { OrderSuccess } from '../components/OrderSuccess'
import { useOrder } from '../hooks/useOrder'

const Page = styled.main`
  max-width: 720px;
  min-width: 0;
  margin: 0 auto;
  padding: 1.25rem 1rem 3rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 2rem 1rem 3rem;
  }
`

const EmptyPanel = styled.section`
  display: grid;
  justify-items: center;
  gap: 0.75rem;
  padding: 1.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.card};
  text-align: center;

  svg {
    color: ${({ theme }) => theme.colors.textLabel};
  }

  h1 {
    font-size: 1.5rem;
  }

  p {
    color: ${({ theme }) => theme.colors.textSubtitle};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 2.5rem 1rem;
  }
`

const HomeLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.75rem;
  margin-top: 0.5rem;
  padding: 0.75rem 1.25rem;
  border: 1px solid ${({ theme }) => theme.colors.brandPurple};
  border-radius: 8px;
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

export function Success() {
  const { order } = useOrder()

  if (!order) {
    return (
      <Page>
        <EmptyPanel>
          <PackageX size={40} aria-hidden="true" />
          <h1>Nenhum pedido encontrado</h1>
          <p>
            Não há um pedido confirmado nesta sessão. Escolha seus cafés e finalize um
            pedido para ver os detalhes aqui.
          </p>
          <HomeLink to="/">Voltar para a Home</HomeLink>
        </EmptyPanel>
      </Page>
    )
  }

  return <OrderSuccess order={order} />
}
