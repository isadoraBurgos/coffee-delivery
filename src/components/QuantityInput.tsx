import { Minus, Plus } from 'lucide-react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.surfaceAlt};
`

const StepButton = styled.button`
  display: grid;
  place-items: center;
  width: 1.75rem;
  height: 1.75rem;
  padding: 0;
  border: 0;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`

const Value = styled.span`
  min-width: 1.5rem;
  text-align: center;
  font-weight: 700;
`

interface QuantityInputProps {
  value: number
  onChange: (nextValue: number) => void
  label?: string
}

/** Controle local reutilizável: nunca permite quantidade menor que 1 (RN-03). */
export function QuantityInput({ value, onChange, label = 'Quantidade' }: QuantityInputProps) {
  return (
    <Wrapper role="group" aria-label={label}>
      <StepButton
        type="button"
        onClick={() => onChange(Math.max(1, value - 1))}
        disabled={value <= 1}
        aria-label={`Diminuir ${label.toLowerCase()}`}
      >
        <Minus size={14} aria-hidden="true" />
      </StepButton>

      <Value aria-live="polite">{value}</Value>

      <StepButton
        type="button"
        onClick={() => onChange(value + 1)}
        aria-label={`Aumentar ${label.toLowerCase()}`}
      >
        <Plus size={14} aria-hidden="true" />
      </StepButton>
    </Wrapper>
  )
}
