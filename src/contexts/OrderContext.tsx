// @refresh reset
// O context é exportado junto com o provider, o que o Fast Refresh não preserva.
import { createContext, useMemo, useState, type ReactNode } from 'react'
import { coffeeById } from '../data/coffees'
import type { DeliveryAddress } from '../types/address'
import type { CartItem } from '../types/cart'
import type { Order, OrderTotals } from '../types/order'
import type { PaymentMethod } from '../types/payment'

export interface OrderContextValue {
  order: Order | null
  createOrder: (
    address: DeliveryAddress,
    paymentMethod: PaymentMethod,
    items: CartItem[],
    totals: OrderTotals,
  ) => Order
}

// Contexto e provider ficam juntos para manter a API em um único arquivo, conforme a spec.
// oxlint-disable-next-line react/only-export-components
export const OrderContext = createContext<OrderContextValue | null>(null)

/** Guarda somente o último pedido confirmado, em memória (RN-09/RN-10). */
export function OrderProvider({ children }: { children: ReactNode }) {
  const [order, setOrder] = useState<Order | null>(null)

  const value = useMemo<OrderContextValue>(() => {
    return {
      order,
      createOrder: (address, paymentMethod, items, totals) => {
        // Cada linha é reconstruída: o pedido não guarda referência para o carrinho.
        const snapshotItems = items.map((item) => {
          const coffee = coffeeById.get(item.coffeeId)

          if (!coffee) {
            throw new Error(`Café ${item.coffeeId} não encontrado no catálogo.`)
          }

          return {
            coffeeId: coffee.id,
            name: coffee.name,
            unitPriceInCents: coffee.priceInCents,
            quantity: item.quantity,
          }
        })

        const confirmedOrder: Order = {
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          items: snapshotItems,
          address: { ...address },
          paymentMethod,
          ...totals,
        }

        setOrder(confirmedOrder)
        return confirmedOrder
      },
    }
  }, [order])

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}
