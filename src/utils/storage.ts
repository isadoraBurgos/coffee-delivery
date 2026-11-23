/** Leitura defensiva de JSON: storage bloqueado ou dados corrompidos caem no fallback. */
export function readJson<T>(
  key: string,
  parse: (raw: unknown) => T | null,
  fallback: T,
): T {
  if (typeof window === 'undefined') {
    return fallback
  }

  try {
    const serialized = window.localStorage.getItem(key)

    if (serialized === null) {
      return fallback
    }

    const raw: unknown = JSON.parse(serialized)
    return parse(raw) ?? fallback
  } catch {
    return fallback
  }
}

/** Escrita defensiva: se o storage estiver indisponível, o estado segue só em memória. */
export function writeJson<T>(key: string, value: T): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Intencionalmente ignorado: persistência é best-effort (FA-08).
  }
}
