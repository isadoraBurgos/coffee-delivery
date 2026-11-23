// @refresh reset
// O context é exportado junto com o provider (exigência da spec), o que o Fast Refresh
// não consegue preservar. Forçar reload completo evita HMR inválido/estado congelado.
import { createContext, useMemo, useReducer, type ReactNode } from 'react'
import { coffees } from '../data/coffees'
import { cartReducer, initialCartState } from '../reducers/cartReducer'
import type { CartItem } from '../types/cart'
import type { Coffee } from '../types/coffee'
import { formatBRL } from '../utils/currency'

export interface CartContextValue {
  items: CartItem[]
  itemCount: number
  subtotalInCents: number
  subtotalFormatted: string
  addCoffee: (coffee: Coffee, quantity: number) => void
  incrementItem: (coffeeId: string) => void
  decrementItem: (coffeeId: string) => void
  removeItem: (coffeeId: string) => void
  clearCart: () => void
}

// Contexto e provider ficam juntos para manter a API em um único arquivo, conforme a spec.
// oxlint-disable-next-line react/only-export-components
export const CartContext = createContext<CartContextValue | null>(null)

/** Preço por id, construído uma vez a partir do catálogo local. */
const priceByCoffeeId = new Map(
  coffees.map((coffee) => [coffee.id, coffee.priceInCents]),
)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState)

  const itemCount = useMemo(
    () => state.items.reduce((total, item) => total + item.quantity, 0),
    [state.items],
  )

  // Aritmética inteira em centavos: nenhum ponto flutuante entra no cálculo (RN-01).
  const subtotalInCents = useMemo(
    () =>
      state.items.reduce(
        (total, item) => total + (priceByCoffeeId.get(item.coffeeId) ?? 0) * item.quantity,
        0,
      ),
    [state.items],
  )

  const value = useMemo<CartContextValue>(
    () => ({
      items: state.items,
      itemCount,
      subtotalInCents,
      subtotalFormatted: formatBRL(subtotalInCents),
      addCoffee: (coffee, quantity) =>
        dispatch({ type: 'ADD_ITEM', payload: { coffeeId: coffee.id, quantity } }),
      incrementItem: (coffeeId) =>
        dispatch({ type: 'INCREMENT_ITEM', payload: { coffeeId } }),
      decrementItem: (coffeeId) =>
        dispatch({ type: 'DECREMENT_ITEM', payload: { coffeeId } }),
      removeItem: (coffeeId) => dispatch({ type: 'REMOVE_ITEM', payload: { coffeeId } }),
      clearCart: () => dispatch({ type: 'CLEAR_CART' }),
    }),
    [state.items, itemCount, subtotalInCents],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
