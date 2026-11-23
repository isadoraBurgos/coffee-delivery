import { useContext } from 'react'
import { ThemeContext, type ThemeContextValue } from '../contexts/ThemeContext'

/** Acesso tipado ao tema; falha rápido se usado fora do ThemeProvider. */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)

  if (context === null) {
    throw new Error('useTheme precisa ser usado dentro de <ThemeProvider>.')
  }

  return context
}
