import { themeBreakpoints, themeFonts, type AppTheme } from './tokens'

/** Tema claro: contraste AA verificado nos pares de texto e bordas de controle. */
export const lightTheme: AppTheme = {
  colors: {
    background: '#FAFAFA',
    surface: '#FFFFFF',
    card: '#FFFFFF',
    input: '#FFFFFF',
    surfaceAlt: '#F3F2F2',
    textTitle: '#272221',
    textSubtitle: '#4A4240',
    textLabel: '#574F4D',
    border: '#D6CFCE',
    borderStrong: '#8C8482',
    brandYellow: '#F1E3C7',
    brandYellowHover: '#DBAC2C',
    onBrandYellow: '#2B1452',
    brandPurple: '#6D28D9',
    brandPurpleHover: '#5B21B6',
    brandPurpleSubtle: '#EDE4FF',
    onBrandPurple: '#FFFFFF',
    feedbackError: '#B42318',
    feedbackErrorSubtle: '#FEF3F2',
    focusRing: '#5B21B6',
  },
  fonts: themeFonts,
  breakpoints: themeBreakpoints,
}
