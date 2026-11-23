/** Tokens semânticos compartilhados por light e dark (RF-16/RNF-04). */
export interface ThemeColors {
  /** Fundo da página. */
  background: string
  /** Superfície de painéis. */
  surface: string
  /** Superfície de cards. */
  card: string
  /** Fundo de campos de formulário. */
  input: string
  /** Superfícies secundárias (controles, resumos). */
  surfaceAlt: string
  /** Títulos e valores em destaque. */
  textTitle: string
  /** Texto corrido e descrições. */
  textSubtitle: string
  /** Rótulos, metadados e textos de apoio. */
  textLabel: string
  /** Bordas decorativas e divisores. */
  border: string
  /** Bordas de controles interativos (contraste ≥ 3:1). */
  borderStrong: string
  /** Amarelo da marca; realce quente e estado selecionado. */
  brandYellow: string
  /** Variação de hover do amarelo da marca. */
  brandYellowHover: string
  /** Texto sobre fundo amarelo da marca. */
  onBrandYellow: string
  /** Roxo da marca; ações primárias e links. */
  brandPurple: string
  /** Variação de hover do roxo da marca. */
  brandPurpleHover: string
  /** Fundo roxo suave para estado selecionado/foco. */
  brandPurpleSubtle: string
  /** Texto sobre fundo roxo da marca. */
  onBrandPurple: string
  /** Cor de erro para textos e bordas. */
  feedbackError: string
  /** Fundo suave para mensagens de erro. */
  feedbackErrorSubtle: string
  /** Anel de foco visível. */
  focusRing: string
}

export interface AppTheme {
  colors: ThemeColors
  fonts: {
    heading: string
    body: string
  }
  breakpoints: {
    xs: string
    sm: string
    md: string
    lg: string
  }
}

export const themeFonts: AppTheme['fonts'] = {
  heading: "'Baloo 2', cursive",
  body: "'Roboto', system-ui, sans-serif",
}

/** Mobile first: 320px é a base; 375/768/1280 são extensões progressivas. */
export const themeBreakpoints: AppTheme['breakpoints'] = {
  xs: '320px',
  sm: '375px',
  md: '768px',
  lg: '1280px',
}
