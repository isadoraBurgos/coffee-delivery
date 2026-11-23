import type { CartAction, CartState } from '../types/cart'

export const initialCartState: CartState = {
  items: [],
}

/**
 * Reducer puro do carrinho. Nunca muta o estado: usa map/filter e cria novos objetos.
 * RN-04: ADD_ITEM soma quantidades quando o coffeeId já existe (sem duplicar linhas).
 * RN-03: no carrinho, DECREMENT_ITEM de 1 remove o item (no catálogo o botão é travado em 1).
 */
export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { coffeeId, quantity } = action.payload

      if (quantity < 1) {
        return state
      }

      const existingItem = state.items.find((item) => item.coffeeId === coffeeId)

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.coffeeId === coffeeId
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          ),
        }
      }

      return {
        items: [...state.items, { coffeeId, quantity }],
      }
    }

    case 'INCREMENT_ITEM': {
      const { coffeeId } = action.payload

      return {
        items: state.items.map((item) =>
          item.coffeeId === coffeeId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      }
    }

    case 'DECREMENT_ITEM': {
      const { coffeeId } = action.payload

      return {
        items: state.items
          .map((item) =>
            item.coffeeId === coffeeId
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          )
          .filter((item) => item.quantity > 0),
      }
    }

    case 'REMOVE_ITEM': {
      const { coffeeId } = action.payload

      return {
        items: state.items.filter((item) => item.coffeeId !== coffeeId),
      }
    }

    case 'CLEAR_CART':
      return {
        items: [],
      }

    default:
      return state
  }
}
