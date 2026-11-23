/** Endereço de entrega coletado no checkout (RN-07). */
export interface DeliveryAddress {
  cep: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
}
