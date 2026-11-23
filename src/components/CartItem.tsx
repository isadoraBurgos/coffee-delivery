import { Minus, Plus, Trash2 } from 'lucide-react'
import styled from 'styled-components'
import { coffeeById } from '../data/coffees'
import { useCart } from '../hooks/useCart'
import type { CartItem as CartItemData } from '../types/cart'
import { formatBRL } from '../utils/currency'

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: 0;
  }
`

const Image = styled.img`
  width: 64px;
  height: 64px;
  object-fit: contain;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.surfaceAlt};
`

const Info = styled.div`
  flex: 1 1 9rem;
  min-width: 0;
`

const Name = styled.strong`
  display: block;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1rem;
`

const UnitPrice = styled.span`
  display: block;
  margin: 0.15rem 0 0.5rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Controls = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`

const StepButton = styled.button`
  display: grid;
  place-items: center;
  width: 1.75rem;
  height: 1.75rem;
  padding: 0;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.surfaceAlt};
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
  }
`

const Quantity = styled.span`
  min-width: 1.5rem;
  text-align: center;
  font-weight: 700;
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const Subtotal = styled.strong`
  font-size: 1rem;
`

const RemoveButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

interface CartItemProps {
  item: CartItemData
}

export function CartItem({ item }: CartItemProps) {
  const { incrementItem, decrementItem, removeItem } = useCart()
  const coffee = coffeeById.get(item.coffeeId)

  if (!coffee) {
    return null
  }

  return (
    <Row>
      <Image src={coffee.image} alt="" />

      <Info>
        <Name>{coffee.name}</Name>
        <UnitPrice>{formatBRL(coffee.priceInCents)} cada</UnitPrice>

        <Controls role="group" aria-label={`Quantidade de ${coffee.name}`}>
          <StepButton
            type="button"
            onClick={() => decrementItem(item.coffeeId)}
            aria-label={`Diminuir quantidade de ${coffee.name}`}
          >
            <Minus size={14} aria-hidden="true" />
          </StepButton>

          <Quantity aria-live="polite">{item.quantity}</Quantity>

          <StepButton
            type="button"
            onClick={() => incrementItem(item.coffeeId)}
            aria-label={`Aumentar quantidade de ${coffee.name}`}
          >
            <Plus size={14} aria-hidden="true" />
          </StepButton>
        </Controls>
      </Info>

      <Actions>
        <Subtotal>{formatBRL(coffee.priceInCents * item.quantity)}</Subtotal>
        <RemoveButton
          type="button"
          onClick={() => removeItem(item.coffeeId)}
          aria-label={`Remover ${coffee.name} do carrinho`}
        >
          <Trash2 size={14} aria-hidden="true" />
          Remover
        </RemoveButton>
      </Actions>
    </Row>
  )
}
