import styled from 'styled-components'
import { useCart } from '../hooks/useCart'

const Panel = styled.section`
  min-width: 0;
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.surfaceAlt};
  color: ${({ theme }) => theme.colors.textTitle};
`

const Title = styled.h3`
  margin-bottom: 0.75rem;
  font-size: 1.125rem;
`

const List = styled.dl`
  display: grid;
  gap: 0.5rem;
  margin: 0;
`

const Line = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;

  dt {
    color: ${({ theme }) => theme.colors.textSubtitle};
  }

  dd {
    margin: 0;
    font-weight: 700;
  }
`

const TotalLine = styled(Line)`
  margin-top: 0.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  dt {
    color: ${({ theme }) => theme.colors.textTitle};
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.125rem;
  }

  dd {
    color: ${({ theme }) => theme.colors.brandPurple};
    font-size: 1.25rem;
  }
`

export function CartSummary() {
  const {
    subtotalFormatted,
    deliveryFeeFormatted,
    totalFormatted,
  } = useCart()

  return (
    <Panel aria-label="Resumo financeiro">
      <Title>Resumo do pedido</Title>

      <List>
        <Line>
          <dt>Subtotal</dt>
          <dd>{subtotalFormatted}</dd>
        </Line>
        <Line>
          <dt>Taxa de entrega</dt>
          <dd>{deliveryFeeFormatted}</dd>
        </Line>
        <TotalLine>
          <dt>Total</dt>
          <dd>{totalFormatted}</dd>
        </TotalLine>
      </List>
    </Panel>
  )
}
