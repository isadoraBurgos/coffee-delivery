import { useContext } from 'react'
import { OrderContext, type OrderContextValue } from '../contexts/OrderContext'

/** Acesso tipado ao último pedido; falha rápido se usado fora do OrderProvider. */
export function useOrder(): OrderContextValue {
  const context = useContext(OrderContext)

  if (context === null) {
    throw new Error('useOrder precisa ser usado dentro de <OrderProvider>.')
  }

  return context
}
