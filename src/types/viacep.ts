/** Resposta bruta do ViaCEP; `erro: true` indica CEP inexistente. */
export interface ViaCepResponse {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  erro?: true
}
