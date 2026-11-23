import { useEffect, useState } from 'react'
import { CEP_LOOKUP_DEBOUNCE_MS } from '../data/constants'
import { fetchAddress } from '../services/viacep'
import type { DeliveryAddress } from '../types/address'

export type CepLookupStatus = 'idle' | 'loading' | 'success' | 'error'

export interface CepLookupState {
  status: CepLookupStatus
  message: string | null
}

interface UseCepLookupOptions {
  cep: string
  onAddressFound: (address: Partial<DeliveryAddress>) => void
}

interface InternalState extends CepLookupState {
  digits: string
}

const idleState: InternalState = { status: 'idle', message: null, digits: '' }

/** Debounce + abort + estados da consulta ViaCEP, sem acoplar a UI ao fetch. */
export function useCepLookup({ cep, onAddressFound }: UseCepLookupOptions): CepLookupState {
  const [state, setState] = useState<InternalState>(idleState)
  const digits = cep.replace(/\D/g, '')
  const isQueryable = digits.length === 8

  useEffect(() => {
    if (!isQueryable) {
      return
    }

    let active = true
    const controller = new AbortController()

    const timer = globalThis.setTimeout(() => {
      fetchAddress(digits, controller.signal)
        .then((address) => {
          if (!active) {
            return
          }

          if (address === null) {
            setState({
              digits,
              status: 'error',
              message: 'CEP não encontrado. Confira o número ou preencha o endereço manualmente.',
            })
            return
          }

          onAddressFound(address)
          setState({
            digits,
            status: 'success',
            message: 'Endereço encontrado. Confira os dados.',
          })
        })
        .catch((error: unknown) => {
          if (!active || (error instanceof DOMException && error.name === 'AbortError')) {
            return
          }

          setState({
            digits,
            status: 'error',
            message:
              error instanceof Error
                ? error.message
                : 'Não foi possível consultar o CEP. Preencha o endereço manualmente.',
          })
        })
    }, CEP_LOOKUP_DEBOUNCE_MS)

    return () => {
      active = false
      globalThis.clearTimeout(timer)
      controller.abort()
    }
  }, [digits, isQueryable, onAddressFound])

  // "idle" e "loading" são derivados do CEP atual: nenhum setState síncrono no effect.
  const visibleState: CepLookupState = !isQueryable
    ? idleState
    : state.digits === digits
      ? state
      : { status: 'loading', message: null }

  return visibleState
}
