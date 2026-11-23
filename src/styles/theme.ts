export interface ThemeColors {
  background: string
  surface: string
  surfaceAlt: string
  text: string
  textMuted: string
  textSubtle: string
  border: string
  primary: string
  primaryHover: string
  onPrimary: string
  accent: string
  accentHover: string
  onAccent: string
  error: string
  focus: string
}

export interface AppTheme {
  colors: ThemeColors
  fonts: {
    heading: string
    body: string
  }
  breakpoints: {
    sm: string
    md: string
    lg: string
  }
}

/** Paleta base (light) inspirada no layout do Coffee Delivery. */
export const lightTheme: AppTheme = {
  colors: {
    background: '#FAFAFA',
    surface: '#FFFFFF',
    surfaceAlt: '#F3F2F2',
    text: '#272221',
    textMuted: '#574F4D',
    textSubtle: '#7C7774',
    border: '#E4E1E1',
    primary: '#8047F8',
    primaryHover: '#4B2995',
    onPrimary: '#FFFFFF',
    accent: '#F1E3C7',
    accentHover: '#DBAC2C',
    onAccent: '#4B2995',
    error: '#C73A3A',
    focus: '#4B2995',
  },
  fonts: {
    heading: "'Baloo 2', cursive",
    body: "'Roboto', system-ui, sans-serif",
  },
  breakpoints: {
    sm: '375px',
    md: '768px',
    lg: '1280px',
  },
}

/** reservado para a T-02 (toggle de tema); já garante tokens semânticos para dark. */
export const darkTheme: AppTheme = {
  colors: {
    background: '#16131C',
    surface: '#221D2B',
    surfaceAlt: '#2D2638',
    text: '#F7F4FA',
    textMuted: '#D3CBDD',
    textSubtle: '#A99FBA',
    border: '#40364F',
    primary: '#B78BFF',
    primaryHover: '#D6BEFF',
    onPrimary: '#16131C',
    accent: '#D6A93B',
    accentHover: '#E5C168',
    onAccent: '#1A1520',
    error: '#FF8A8A',
    focus: '#D6BEFF',
  },
  fonts: {
    heading: "'Baloo 2', cursive",
    body: "'Roboto', system-ui, sans-serif",
  },
  breakpoints: {
    sm: '375px',
    md: '768px',
    lg: '1280px',
  },
}

declare module 'styled-components' {
  // Permite `props.theme.colors.*` com tipagem forte nos styled components.
  export interface DefaultTheme extends AppTheme {}
}
