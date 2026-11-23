import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    max-width: 100%;
  }

  body,
  #root {
    width: 100%;
    max-width: 100%;
    min-height: 100vh;
  }

  body {
    margin: 0;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textTitle};
    font-family: ${({ theme }) => theme.fonts.body};
    -webkit-font-smoothing: antialiased;
    overflow-x: clip;
  }

  h1, h2, h3 {
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.heading};
    line-height: 1.2;
    color: ${({ theme }) => theme.colors.textTitle};
    overflow-wrap: break-word;
  }

  p {
    margin: 0;
    overflow-wrap: break-word;
  }

  img {
    display: block;
    max-width: 100%;
  }

  button, input {
    font: inherit;
  }

  button, a {
    -webkit-tap-highlight-color: transparent;
  }

  a {
    color: inherit;
  }

  ::placeholder {
    color: ${({ theme }) => theme.colors.textLabel};
    opacity: 1;
  }

  :focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focusRing};
    outline-offset: 2px;
  }
`
