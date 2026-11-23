import { useContext } from 'react'
import { CartContext, type CartContextValue } from '../contexts/CartContext'

/** Acesso tipado ao carrinho; falha rápido se usado fora do CartProvider. */
export function useCart(): CartContextValue {
  const context = useContext(CartContext)

  if (context === null) {
    throw new Error('useCart precisa ser usado dentro de <CartProvider>.')
  }

  return context
}
