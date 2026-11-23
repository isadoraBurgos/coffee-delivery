import type { PaymentMethod } from '../types/payment'

/** Chave versionada do carrinho no localStorage (RN-10). */
export const CART_STORAGE_KEY = '@coffee-delivery:cart-state-1.0.0'

/** Taxa fixa de entrega: R$ 3,50 (RN-02). */
export const DELIVERY_FEE_IN_CENTS = 350

export const CEP_LOOKUP_DEBOUNCE_MS = 300
export const CEP_LOOKUP_TIMEOUT_MS = 5000

export const PAYMENT_OPTIONS = [
  { value: 'credit', label: 'Cartão de crédito' },
  { value: 'debit', label: 'Cartão de débito' },
  { value: 'money', label: 'Dinheiro' },
] as const satisfies readonly { value: PaymentMethod; label: string }[]
