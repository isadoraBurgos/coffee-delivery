import type { DeliveryAddress } from './address'
import type { PaymentMethod } from './payment'

/** Linha congelada no pedido: nome e preço não acompanham mudanças futuras no catálogo. */
export interface OrderItem {
  coffeeId: string
  name: string
  unitPriceInCents: number
  quantity: number
}

/** Valores conferidos no checkout e copiados para o pedido (RN-01/RN-02). */
export interface OrderTotals {
  subtotalInCents: number
  deliveryFeeInCents: number
  totalInCents: number
}

/** Snapshot imutável do momento da finalização (RN-09). */
export interface Order extends OrderTotals {
  id: string
  items: OrderItem[]
  address: DeliveryAddress
  paymentMethod: PaymentMethod
  createdAt: string
}
