import { Clock, CreditCard, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { PAYMENT_OPTIONS } from '../data/constants'
import type { Order } from '../types/order'
import { formatBRL } from '../utils/currency'

const Page = styled.main`
  max-width: 720px;
  margin: 0 auto;
  padding: 2rem 1rem 3rem;
`

const Heading = styled.header`
  margin-bottom: 1.5rem;
  text-align: center;

  h1 {
    color: ${({ theme }) => theme.colors.primary};
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: clamp(2rem, 6vw, 2.75rem);
    line-height: 1.15;
  }

  p {
    margin-top: 0.35rem;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`

const GradientBorder = styled.div`
  padding: 1px;
  border-radius: 12px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.accentHover} 55%,
    ${({ theme }) => theme.colors.primaryHover}
  );
`

const Card = styled.section`
  padding: 1.5rem;
  border-radius: 11px;
  background: ${({ theme }) => theme.colors.surface};
`

const InfoGrid = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.5;

  svg {
    flex-shrink: 0;
    margin-top: 0.15rem;
    color: ${({ theme }) => theme.colors.primary};
  }

  div span {
    display: block;
  }
`

const InfoLabel = styled.span`
  display: block;
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
`

const Divider = styled.hr`
  margin: 1.5rem 0;
  border: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

const ItemsTitle = styled.h2`
  margin-bottom: 0.75rem;
  font-size: 1.125rem;
`

const ItemLine = styled.p`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.4rem;
  color: ${({ theme }) => theme.colors.textMuted};

  strong {
    color: ${({ theme }) => theme.colors.text};
  }
`

const Totals = styled.dl`
  display: grid;
  gap: 0.4rem;
  margin: 1rem 0 0;
  padding-top: 0.9rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  div {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }

  dt {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  dd {
    margin: 0;
    font-weight: 700;
  }

  div:last-child dt {
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.heading};
    font-size: 1.125rem;
  }

  div:last-child dd {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.25rem;
  }
`

const Meta = styled.p`
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 0.75rem;
`

const HomeLink = styled(Link)`
  display: inline-flex;
  justify-content: center;
  width: 100%;
  margin-top: 1.5rem;
  padding: 0.85rem 1rem;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  font-weight: 700;
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`

interface OrderSuccessProps {
  order: Order
}

/** Card de confirmação: lê somente o snapshot do pedido, nunca o carrinho. */
export function OrderSuccess({ order }: OrderSuccessProps) {
  const paymentLabel =
    PAYMENT_OPTIONS.find((option) => option.value === order.paymentMethod)?.label ??
    'Não informado'

  const placedAt = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(order.createdAt))

  return (
    <Page>
      <Heading>
        <h1>Uhu! Pedido confirmado</h1>
        <p>Seu pedido foi recebido e já está sendo preparado.</p>
      </Heading>

      <GradientBorder>
        <Card aria-label="Resumo do pedido confirmado">
          <InfoGrid>
            <InfoItem>
              <MapPin size={20} aria-hidden="true" />
              <div>
                <InfoLabel>Entrega em</InfoLabel>
                <span>{order.address.street}, {order.address.number}</span>
                {order.address.complement && <span>{order.address.complement}</span>}
                <span>
                  {order.address.neighborhood} - {order.address.city}, {order.address.state}
                </span>
              </div>
            </InfoItem>

            <InfoItem>
              <Clock size={20} aria-hidden="true" />
              <div>
                <InfoLabel>Previsão de entrega</InfoLabel>
                <span>20 min - 30 min</span>
              </div>
            </InfoItem>

            <InfoItem>
              <CreditCard size={20} aria-hidden="true" />
              <div>
                <InfoLabel>Pagamento</InfoLabel>
                <span>{paymentLabel}</span>
              </div>
            </InfoItem>
          </InfoGrid>

          <Divider />

          <ItemsTitle>Itens do pedido</ItemsTitle>
          {order.items.map((item) => (
            <ItemLine key={item.coffeeId}>
              <span>
                {item.quantity}× {item.name}
              </span>
              <strong>{formatBRL(item.unitPriceInCents * item.quantity)}</strong>
            </ItemLine>
          ))}

          <Totals>
            <div>
              <dt>Subtotal</dt>
              <dd>{formatBRL(order.subtotalInCents)}</dd>
            </div>
            <div>
              <dt>Taxa de entrega</dt>
              <dd>{formatBRL(order.deliveryFeeInCents)}</dd>
            </div>
            <div>
              <dt>Total</dt>
              <dd>{formatBRL(order.totalInCents)}</dd>
            </div>
          </Totals>

          <Meta>
            Pedido #{order.id.slice(0, 8).toUpperCase()} · {placedAt}
          </Meta>
        </Card>
      </GradientBorder>

      <HomeLink to="/">Voltar para a Home</HomeLink>
    </Page>
  )
}
