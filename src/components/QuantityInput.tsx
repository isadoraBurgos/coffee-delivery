import { Minus, Plus } from 'lucide-react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.15rem;
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.input};
`

const StepButton = styled.button`
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0;
  border: 0;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.surfaceAlt};
  color: ${({ theme }) => theme.colors.brandPurple};
  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.brandPurpleSubtle};
    color: ${({ theme }) => theme.colors.brandPurpleHover};
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focusRing};
    outline-offset: 1px;
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`

const Value = styled.span`
  min-width: 1.5rem;
  text-align: center;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textTitle};
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
        <Minus size={16} aria-hidden="true" />
      </StepButton>

      <Value aria-live="polite">{value}</Value>

      <StepButton
        type="button"
        onClick={() => onChange(value + 1)}
        aria-label={`Aumentar ${label.toLowerCase()}`}
      >
        <Plus size={16} aria-hidden="true" />
      </StepButton>
    </Wrapper>
  )
}
