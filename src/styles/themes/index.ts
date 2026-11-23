import type { AppTheme } from './tokens'

export { darkTheme } from './dark'
export { lightTheme } from './light'
export { themeBreakpoints, themeFonts, type AppTheme, type ThemeColors } from './tokens'

declare module 'styled-components' {
  // Permite `props.theme.colors.*` com tipagem forte nos styled components.
  export interface DefaultTheme extends AppTheme {}
}
