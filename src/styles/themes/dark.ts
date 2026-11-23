import { themeBreakpoints, themeFonts, type AppTheme } from './tokens'

/** Tema escuro: superfícies elevadas e textos claros com contraste AA. */
export const darkTheme: AppTheme = {
  colors: {
    background: '#16131C',
    surface: '#221D2B',
    card: '#251F30',
    input: '#2D2638',
    surfaceAlt: '#2D2638',
    textTitle: '#F7F4FA',
    textSubtitle: '#D6CFE0',
    textLabel: '#B9AEC9',
    border: '#4A4059',
    borderStrong: '#8A78A6',
    brandYellow: '#E5C168',
    brandYellowHover: '#F0D18B',
    onBrandYellow: '#1A1520',
    brandPurple: '#B78BFF',
    brandPurpleHover: '#D6BEFF',
    brandPurpleSubtle: '#3A2B57',
    onBrandPurple: '#16131C',
    feedbackError: '#FF9B9B',
    feedbackErrorSubtle: '#3A2028',
    focusRing: '#D6BEFF',
  },
  fonts: themeFonts,
  breakpoints: themeBreakpoints,
}
