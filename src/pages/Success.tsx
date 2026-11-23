import { PackageX } from 'lucide-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { OrderSuccess } from '../components/OrderSuccess'
import { useOrder } from '../hooks/useOrder'

const Page = styled.main`
  max-width: 720px;
  margin: 0 auto;
  padding: 2rem 1rem 3rem;
`

const EmptyPanel = styled.section`
  display: grid;
  justify-items: center;
  gap: 0.75rem;
  padding: 2.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.surface};
  text-align: center;

  svg {
    color: ${({ theme }) => theme.colors.textSubtle};
  }

  h1 {
    font-size: 1.5rem;
  }

  p {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`

const HomeLink = styled(Link)`
  display: inline-flex;
  justify-content: center;
  margin-top: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  font-weight: 700;
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
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
