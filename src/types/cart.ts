/** Linha do carrinho: identidade por coffeeId, preço sempre consultado no catálogo (RN-01/RN-04). */
export interface CartItem {
  coffeeId: string
  quantity: number
}

export interface CartState {
  items: CartItem[]
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: { coffeeId: string; quantity: number } }
  | { type: 'INCREMENT_ITEM'; payload: { coffeeId: string } }
  | { type: 'DECREMENT_ITEM'; payload: { coffeeId: string } }
  | { type: 'REMOVE_ITEM'; payload: { coffeeId: string } }
  | { type: 'CLEAR_CART' }
