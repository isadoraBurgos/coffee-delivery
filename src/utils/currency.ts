const brlFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

/** Formata centavos inteiros em BRL com duas casas decimais (RN-01). */
export function formatBRL(cents: number): string {
  return brlFormatter.format(cents / 100)
}
