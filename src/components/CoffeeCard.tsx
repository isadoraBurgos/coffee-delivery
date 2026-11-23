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
  padding: 1.25rem 1rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.surface};
  text-align: center;
`

const Image = styled.img`
  width: min(100%, 176px);
  height: auto;
`

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.35rem;
`

const Tag = styled.span`
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.onAccent};
  font-size: 0.7rem;
  font-weight: 700;
`

const Name = styled.h3`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.text};
`

const Description = styled.p`
  flex: 1;
  font-size: 0.875rem;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Footer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
`

const Price = styled.strong`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.text};
`

const AddButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.6rem;
  border: 0;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
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
        <ShoppingCart size={15} aria-hidden="true" />
        Adicionar
      </AddButton>
    </Card>
  )
}
