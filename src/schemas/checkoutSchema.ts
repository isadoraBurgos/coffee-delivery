import { z } from 'zod'

/** Fonte única de validação do checkout (RN-06/RN-07/RN-08). */
export const checkoutSchema = z.object({
  name: z.string().trim().min(3, 'Informe seu nome completo'),
  cep: z.string().regex(/^\d{5}-?\d{3}$/, 'Informe um CEP válido com 8 dígitos'),
  street: z.string().trim().min(1, 'Informe o logradouro'),
  number: z.string().trim().min(1, 'Informe o número'),
  complement: z.string().trim().optional(),
  neighborhood: z.string().trim().min(1, 'Informe o bairro'),
  city: z.string().trim().min(1, 'Informe a cidade'),
  state: z.string().trim().regex(/^[A-Za-z]{2}$/, 'Informe a UF com 2 letras'),
  paymentMethod: z.enum(['credit', 'debit', 'money'], {
    error: 'Selecione uma forma de pagamento',
  }),
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>
