import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    min-width: 320px;
  }

  body {
    margin: 0;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.body};
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3 {
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.heading};
    line-height: 1.2;
  }

  p {
    margin: 0;
  }

  img {
    display: block;
    max-width: 100%;
  }

  button, input {
    font: inherit;
  }

  a {
    color: inherit;
  }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
`
