// @refresh reset
// O context é exportado junto com o provider (exigência da spec), o que o Fast Refresh
// não consegue preservar. Forçar reload completo evita HMR inválido/estado congelado.
import { createContext, useEffect, useMemo, useReducer, type ReactNode } from 'react'
import { CART_STORAGE_KEY, DELIVERY_FEE_IN_CENTS } from '../data/constants'
import { coffeeById } from '../data/coffees'
import { cartReducer, initialCartState } from '../reducers/cartReducer'
import { parseCartState } from '../schemas/cartSchema'
import type { CartItem, CartState } from '../types/cart'
import type { Coffee } from '../types/coffee'
import { formatBRL } from '../utils/currency'
import { readJson, writeJson } from '../utils/storage'

export interface CartContextValue {
  items: CartItem[]
  itemCount: number
  subtotalInCents: number
  subtotalFormatted: string
  deliveryFeeInCents: number
  deliveryFeeFormatted: string
  totalInCents: number
  totalFormatted: string
  addCoffee: (coffee: Coffee, quantity: number) => void
  incrementItem: (coffeeId: string) => void
  decrementItem: (coffeeId: string) => void
  removeItem: (coffeeId: string) => void
  clearCart: () => void
}

// Contexto e provider ficam juntos para manter a API em um único arquivo, conforme a spec.
// oxlint-disable-next-line react/only-export-components
export const CartContext = createContext<CartContextValue | null>(null)

/** Hidrata o carrinho; dados inválidos no storage voltam ao estado inicial (FA-08). */
function loadInitialCart(): CartState {
  return readJson(CART_STORAGE_KEY, parseCartState, initialCartState)
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState, loadInitialCart)

  useEffect(() => {
    writeJson(CART_STORAGE_KEY, state)
  }, [state])

  const itemCount = useMemo(
    () => state.items.reduce((total, item) => total + item.quantity, 0),
    [state.items],
  )

  // Aritmética inteira em centavos: nenhum ponto flutuante entra no cálculo (RN-01).
  const subtotalInCents = useMemo(
    () =>
      state.items.reduce(
        (total, item) => total + (coffeeById.get(item.coffeeId)?.priceInCents ?? 0) * item.quantity,
        0,
      ),
    [state.items],
  )

  const value = useMemo<CartContextValue>(() => {
    // Com carrinho vazio, taxa e total são 0 (RN-02/RN-05).
    const deliveryFeeInCents = state.items.length === 0 ? 0 : DELIVERY_FEE_IN_CENTS
    const totalInCents = subtotalInCents + deliveryFeeInCents

    return {
      items: state.items,
      itemCount,
      subtotalInCents,
      subtotalFormatted: formatBRL(subtotalInCents),
      deliveryFeeInCents,
      deliveryFeeFormatted: formatBRL(deliveryFeeInCents),
      totalInCents,
      totalFormatted: formatBRL(totalInCents),
      addCoffee: (coffee, quantity) =>
        dispatch({ type: 'ADD_ITEM', payload: { coffeeId: coffee.id, quantity } }),
      incrementItem: (coffeeId) =>
        dispatch({ type: 'INCREMENT_ITEM', payload: { coffeeId } }),
      decrementItem: (coffeeId) =>
        dispatch({ type: 'DECREMENT_ITEM', payload: { coffeeId } }),
      removeItem: (coffeeId) => dispatch({ type: 'REMOVE_ITEM', payload: { coffeeId } }),
      clearCart: () => dispatch({ type: 'CLEAR_CART' }),
    }
  }, [state.items, itemCount, subtotalInCents])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
