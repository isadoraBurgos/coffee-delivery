// @refresh reset
// Contexto e provider ficam juntos; reload completo evita estado de tema obsoleto no HMR.
import { createContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { THEME_STORAGE_KEY } from '../data/constants'
import { darkTheme, lightTheme } from '../styles/themes'
import type { ThemeMode } from '../types/theme'
import { readThemeMode, writeThemeMode } from '../utils/storage'

export interface ThemeContextValue {
  mode: ThemeMode
  isDark: boolean
  toggleTheme: () => void
}

// oxlint-disable-next-line react/only-export-components
export const ThemeContext = createContext<ThemeContextValue | null>(null)

function getSystemMode(): ThemeMode {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return 'light'
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/** Ordem de decisão: escolha salva → preferência do sistema → light (RF-16). */
function getInitialMode(): ThemeMode {
  return readThemeMode(THEME_STORAGE_KEY) ?? getSystemMode()
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(getInitialMode)

  useEffect(() => {
    writeThemeMode(THEME_STORAGE_KEY, mode)

    if (typeof document !== 'undefined') {
      document.documentElement.dataset.theme = mode
    }
  }, [mode])

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      isDark: mode === 'dark',
      toggleTheme: () => setMode((current) => (current === 'dark' ? 'light' : 'dark')),
    }),
    [mode],
  )

  return (
    <ThemeContext.Provider value={value}>
      <StyledThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  )
}
