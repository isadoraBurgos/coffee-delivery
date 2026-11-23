import { Moon, Sun } from 'lucide-react'
import styled from 'styled-components'
import { useTheme } from '../hooks/useTheme'

const ToggleButton = styled.button`
  display: inline-grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0;
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.brandPurple};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.brandPurpleSubtle};
    border-color: ${({ theme }) => theme.colors.brandPurple};
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focusRing};
    outline-offset: 2px;
  }
`

/** Alternador acessível de tema; rótulo e título descrevem a próxima ação. */
export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()
  const label = isDark ? 'Ativar tema claro' : 'Ativar tema escuro'

  return (
    <ToggleButton
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      aria-pressed={isDark}
      title={label}
    >
      {isDark ? (
        <Sun size={18} aria-hidden="true" />
      ) : (
        <Moon size={18} aria-hidden="true" />
      )}
    </ToggleButton>
  )
}
