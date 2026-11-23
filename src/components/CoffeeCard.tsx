import { ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import styled from 'styled-components'
import { useCart } from '../hooks/useCart'
import type { Coffee } from '../types/coffee'
import { formatBRL } from '../utils/currency'
import { QuantityInput } from './QuantityInput'

const Card = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
  height: 100%;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.card};
  text-align: center;
`

const Image = styled.img`
  width: min(100%, 176px);
  height: auto;
  flex-shrink: 0;
`

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.35rem;
`

const Tag = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.brandYellow};
  color: ${({ theme }) => theme.colors.onBrandYellow};
  font-size: 0.75rem;
  font-weight: 700;
`

const Name = styled.h3`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.textTitle};
`

const Description = styled.p`
  flex: 1;
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textSubtitle};
`

const Footer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
  min-width: 0;
`

const Price = styled.strong`
  min-width: 0;
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.textTitle};
`

const AddButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  width: 100%;
  min-height: 2.75rem;
  margin-top: 0.25rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.brandPurple};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.brandPurple};
  color: ${({ theme }) => theme.colors.onBrandPurple};
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.brandPurpleHover};
    background: ${({ theme }) => theme.colors.brandPurpleHover};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: auto;
  }
`

interface CoffeeCardProps {
  coffee: Coffee
}

export function CoffeeCard({ coffee }: CoffeeCardProps) {
  const [quantity, setQuantity] = useState(1)
  // Alias local: a API do contexto chama addCoffee; aqui usamos addItem por clareza.
  const { addCoffee: addItem } = useCart()

  return (
    <Card>
      <Image src={coffee.image} alt={`Ilustração de ${coffee.name}`} />

      <Tags>
        {coffee.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </Tags>

      <Name>{coffee.name}</Name>
      <Description>{coffee.description}</Description>

      <Footer>
        <Price>{formatBRL(coffee.priceInCents)}</Price>
        <QuantityInput
          value={quantity}
          onChange={setQuantity}
          label={`Quantidade de ${coffee.name}`}
        />
      </Footer>

      <AddButton
        type="button"
        onClick={() => addItem(coffee, quantity)}
        aria-label={`Adicionar ${quantity} ${coffee.name} ao carrinho`}
      >
        <ShoppingCart size={16} aria-hidden="true" />
        Adicionar
      </AddButton>
    </Card>
  )
}
