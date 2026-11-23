import { Controller, type UseFormReturn } from 'react-hook-form'
import styled from 'styled-components'
import { PAYMENT_OPTIONS } from '../data/constants'
import type { CheckoutFormData } from '../schemas/checkoutSchema'

const Fieldset = styled.fieldset`
  margin: 0;
  padding: 0;
  border: 0;
`

const Legend = styled.legend`
  margin-bottom: 0.75rem;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.textTitle};
`

const Options = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 0.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: row;
  }
`

const Option = styled.label`
  display: inline-flex;
  align-items: center;
  min-height: 2.75rem;
  gap: 0.4rem;
  padding: 0.6rem 0.8rem;
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.input};
  color: ${({ theme }) => theme.colors.textTitle};
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.brandPurple};
    background: ${({ theme }) => theme.colors.brandPurpleSubtle};
  }

  &:has(input:checked) {
    border-color: ${({ theme }) => theme.colors.brandPurple};
    background: ${({ theme }) => theme.colors.brandPurpleSubtle};
    color: ${({ theme }) => theme.colors.textTitle};
    font-weight: 700;
  }

  &:has(input:focus-visible) {
    outline: 3px solid ${({ theme }) => theme.colors.focusRing};
    outline-offset: 2px;
  }
`

const HiddenInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
`

const ErrorText = styled.span`
  display: block;
  margin-top: 0.4rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.feedbackErrorSubtle};
  color: ${({ theme }) => theme.colors.feedbackError};
  font-size: 0.875rem;
`

interface PaymentMethodSelectorProps {
  form: UseFormReturn<CheckoutFormData>
}

export function PaymentMethodSelector({ form }: PaymentMethodSelectorProps) {
  return (
    <Controller
      control={form.control}
      name="paymentMethod"
      render={({ field, fieldState }) => (
        <Fieldset>
          <Legend>Forma de pagamento</Legend>

          <Options role="radiogroup" aria-invalid={Boolean(fieldState.error)} aria-describedby="paymentMethod-error">
            {PAYMENT_OPTIONS.map((option) => (
              <Option key={option.value}>
                <HiddenInput
                  ref={field.ref}
                  type="radio"
                  name={field.name}
                  value={option.value}
                  checked={field.value === option.value}
                  onChange={() => field.onChange(option.value)}
                  onBlur={field.onBlur}
                />
                {option.label}
              </Option>
            ))}
          </Options>

          {fieldState.error?.message && (
            <ErrorText id="paymentMethod-error" role="alert">
              {fieldState.error.message}
            </ErrorText>
          )}
        </Fieldset>
      )}
    />
  )
}
