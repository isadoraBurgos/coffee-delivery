import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { CartItem } from '../components/CartItem'
import { CartSummary } from '../components/CartSummary'
import { DeliveryAddressForm } from '../components/DeliveryAddressForm'
import { EmptyCart } from '../components/EmptyCart'
import { PaymentMethodSelector } from '../components/PaymentMethodSelector'
import { useCart } from '../hooks/useCart'
import { useOrder } from '../hooks/useOrder'
import { checkoutSchema, type CheckoutFormData } from '../schemas/checkoutSchema'
import type { DeliveryAddress } from '../types/address'

const Page = styled.main`
  max-width: 1120px;
  margin: 0 auto;
  padding: 1.5rem 1rem 3rem;
`

const Title = styled.h1`
  margin-bottom: 1.25rem;
  font-size: clamp(1.5rem, 4vw, 2rem);
`

const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1rem;
  align-items: start;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
  }
`

const Column = styled.div`
  display: grid;
  gap: 1rem;
  min-width: 0;
`

const ItemsPanel = styled.section`
  padding: 1.25rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.surface};
`

const SectionTitle = styled.h2`
  margin-bottom: 0.5rem;
  font-size: 1.375rem;
`

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.85rem 1rem;
  border: 0;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  font-weight: 700;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`

const Note = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.8125rem;
  line-height: 1.5;
  text-align: center;
`

export function Checkout() {
  const { items, itemCount, subtotalInCents, deliveryFeeInCents, totalInCents, clearCart } =
    useCart()
  const { createOrder } = useOrder()
  const navigate = useNavigate()

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      cep: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
    },
  })

  function handleValidSubmit(data: CheckoutFormData) {
    if (items.length === 0) {
      return
    }

    const address: DeliveryAddress = {
      cep: data.cep,
      street: data.street,
      number: data.number,
      complement: data.complement || undefined,
      neighborhood: data.neighborhood,
      city: data.city,
      state: data.state,
    }

    // A ordem importa: o pedido é congelado antes de o carrinho ser esvaziado.
    createOrder(address, data.paymentMethod, items, {
      subtotalInCents,
      deliveryFeeInCents,
      totalInCents,
    })
    clearCart()
    navigate('/success')
  }

  return (
    <Page>
      <Title>Finalizar pedido</Title>

      {itemCount === 0 ? (
        <EmptyCart />
      ) : (
        <form onSubmit={form.handleSubmit(handleValidSubmit)} noValidate>
          <Layout>
            <Column>
              <DeliveryAddressForm form={form} />
              <PaymentMethodSelector form={form} />
            </Column>

            <Column>
              <ItemsPanel aria-labelledby="items-title">
                <SectionTitle id="items-title">Cafés selecionados</SectionTitle>
                {items.map((item) => (
                  <CartItem key={item.coffeeId} item={item} />
                ))}
              </ItemsPanel>

              <CartSummary />

              <SubmitButton type="submit" disabled={itemCount === 0}>
                Confirmar Pedido
              </SubmitButton>
              <Note>
                Pagamento fictício: nenhum dado financeiro é coletado ou enviado.
              </Note>
            </Column>
          </Layout>
        </form>
      )}
    </Page>
  )
}
