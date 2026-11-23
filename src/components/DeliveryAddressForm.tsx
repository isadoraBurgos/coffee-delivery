import { useCallback, type ReactNode } from 'react'
import { type UseFormReturn } from 'react-hook-form'
import styled from 'styled-components'
import { useCepLookup } from '../hooks/useCepLookup'
import type { CheckoutFormData } from '../schemas/checkoutSchema'
import type { DeliveryAddress } from '../types/address'

const Panel = styled.section`
  padding: 1.25rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.surface};
`

const Title = styled.h2`
  margin-bottom: 1rem;
  font-size: 1.375rem;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 0.875rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

const FieldWrapper = styled.div`
  display: grid;
  gap: 0.3rem;
  min-width: 0;
`

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Input = styled.input`
  width: 100%;
  padding: 0.6rem 0.7rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};

  &[aria-invalid='true'] {
    border-color: ${({ theme }) => theme.colors.error};
  }
`

const ErrorText = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.8125rem;
`

const StatusText = styled.p`
  min-height: 1.1rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.8125rem;
`

interface FieldProps {
  id: string
  label: string
  error?: string
  children: ReactNode
}

function Field({ id, label, error, children }: FieldProps) {
  return (
    <FieldWrapper>
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <ErrorText id={`${id}-error`} role="alert">
          {error}
        </ErrorText>
      )}
    </FieldWrapper>
  )
}

interface DeliveryAddressFormProps {
  form: UseFormReturn<CheckoutFormData>
}

export function DeliveryAddressForm({ form }: DeliveryAddressFormProps) {
  const { register, setValue, watch, formState: { errors } } = form

  const handleAddressFound = useCallback(
    (address: Partial<DeliveryAddress>) => {
      const autoFields = ['street', 'neighborhood', 'city', 'state'] as const

      autoFields.forEach((field) => {
        const value = address[field]

        if (value) {
          // Campos permanecem editáveis: setValue apenas preenche o valor inicial.
          setValue(field, value, { shouldValidate: true, shouldDirty: false })
        }
      })
    },
    [setValue],
  )

  const cepStatus = useCepLookup({
    cep: watch('cep'),
    onAddressFound: handleAddressFound,
  })

  return (
    <Panel aria-labelledby="address-title">
      <Title id="address-title">Endereço de entrega</Title>

      <Grid>
        <Field id="name" label="Nome completo" error={errors.name?.message}>
          <Input
            id="name"
            type="text"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            {...register('name')}
          />
        </Field>

        <Field id="cep" label="CEP" error={errors.cep?.message}>
          <Input
            id="cep"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={9}
            placeholder="00000-000"
            aria-invalid={Boolean(errors.cep)}
            aria-describedby={errors.cep ? 'cep-error' : undefined}
            {...register('cep')}
          />
        </Field>

        <Field id="street" label="Logradouro" error={errors.street?.message}>
          <Input
            id="street"
            type="text"
            autoComplete="street-address"
            aria-invalid={Boolean(errors.street)}
            aria-describedby={errors.street ? 'street-error' : undefined}
            {...register('street')}
          />
        </Field>

        <Field id="number" label="Número" error={errors.number?.message}>
          <Input
            id="number"
            type="text"
            aria-invalid={Boolean(errors.number)}
            aria-describedby={errors.number ? 'number-error' : undefined}
            {...register('number')}
          />
        </Field>

        <Field id="complement" label="Complemento (opcional)" error={errors.complement?.message}>
          <Input id="complement" type="text" {...register('complement')} />
        </Field>

        <Field id="neighborhood" label="Bairro" error={errors.neighborhood?.message}>
          <Input
            id="neighborhood"
            type="text"
            aria-invalid={Boolean(errors.neighborhood)}
            aria-describedby={errors.neighborhood ? 'neighborhood-error' : undefined}
            {...register('neighborhood')}
          />
        </Field>

        <Field id="city" label="Cidade" error={errors.city?.message}>
          <Input
            id="city"
            type="text"
            autoComplete="address-level2"
            aria-invalid={Boolean(errors.city)}
            aria-describedby={errors.city ? 'city-error' : undefined}
            {...register('city')}
          />
        </Field>

        <Field id="state" label="UF" error={errors.state?.message}>
          <Input
            id="state"
            type="text"
            autoComplete="address-level1"
            maxLength={2}
            placeholder="SP"
            aria-invalid={Boolean(errors.state)}
            aria-describedby={errors.state ? 'state-error' : undefined}
            {...register('state')}
          />
        </Field>
      </Grid>

      {cepStatus.message && (
        <StatusText role={cepStatus.status === 'error' ? 'alert' : 'status'}>
          {cepStatus.message}
        </StatusText>
      )}
    </Panel>
  )
}
