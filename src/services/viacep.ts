import { CEP_LOOKUP_TIMEOUT_MS } from '../data/constants'
import type { DeliveryAddress } from '../types/address'
import type { ViaCepResponse } from '../types/viacep'

/**
 * Consulta o ViaCEP com os 8 dígitos do CEP.
 * - `null` significa "CEP não encontrado" (`erro: true`).
 * - Exceções significam falha de rede/timeout; o chamador mantém os campos editáveis.
 */
export async function fetchAddress(
  cep: string,
  signal?: AbortSignal,
): Promise<Partial<DeliveryAddress> | null> {
  const digits = cep.replace(/\D/g, '')

  if (digits.length !== 8) {
    return null
  }

  const controller = new AbortController()
  let timedOut = false

  const timeoutId = globalThis.setTimeout(() => {
    timedOut = true
    controller.abort()
  }, CEP_LOOKUP_TIMEOUT_MS)

  const abortFromCaller = () => controller.abort()
  signal?.addEventListener('abort', abortFromCaller, { once: true })

  try {
    const response = await fetch(`https://viacep.com.br/ws/${digits}/json/`, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    })

    if (!response.ok) {
      throw new Error('ViaCEP indisponível. Preencha o endereço manualmente.')
    }

    const data = (await response.json()) as ViaCepResponse

    if (data.erro) {
      return null
    }

    return {
      street: data.logradouro,
      neighborhood: data.bairro,
      city: data.localidade,
      state: data.uf,
    }
  } catch (error) {
    if (timedOut) {
      throw new Error('Tempo limite ao consultar o CEP. Preencha o endereço manualmente.')
    }
    throw error
  } finally {
    globalThis.clearTimeout(timeoutId)
    signal?.removeEventListener('abort', abortFromCaller)
  }
}
