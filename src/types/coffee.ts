/** Produto do catálogo local (RF-01/RF-02). Preço sempre em centavos (RN-01). */
export interface Coffee {
  id: string
  name: string
  description: string
  priceInCents: number
  image: string
  tags: string[]
}
