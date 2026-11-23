import { z } from 'zod'
import { coffeeById } from '../data/coffees'
import type { CartState } from '../types/cart'

const persistedCartSchema = z.object({
  items: z.array(
    z.object({
      coffeeId: z.string().min(1),
      quantity: z.number().int().positive(),
    }),
  ),
})

/**
 * Valida o carrinho vindo do storage. Linhas inválidas, duplicadas ou com
 * coffeeId fora do catálogo são descartadas (FA-08/RN-03/RN-04/RN-10).
 */
export function parseCartState(raw: unknown): CartState | null {
  const parsed = persistedCartSchema.safeParse(raw)

  if (!parsed.success) {
    return null
  }

  const seen = new Set<string>()
  const items = parsed.data.items.filter((item) => {
    if (!coffeeById.has(item.coffeeId) || seen.has(item.coffeeId)) {
      return false
    }
    seen.add(item.coffeeId)
    return true
  })

  return { items }
}
