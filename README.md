# Coffee Delivery

SPA de cafeteria com catálogo, carrinho persistido, checkout com ViaCEP, pagamento fictício, confirmação de pedido, tema claro/escuro e identidade visual original.

## Branding com IA

A identidade visual da marca foi criada com **Gemini / Imagen IA** e integrada à aplicação na Etapa 8.

- **Ferramenta:** Gemini (Imagen) para geração da arte; o favicon é uma adaptação vetorial feita à mão a partir do mesmo conceito, e nenhuma biblioteca externa foi adicionada.
- **Conceito:** um filhote amigável, com boné e bandana de entregador, aparecendo dentro de uma xícara de café fumegante. A imagem transmite a ideia de um pedido que chega "quentinho" e com carinho.
- **Arte:** `src/assets/logo.jpg` (1024×1024), exibida no `Header` com 44 px de altura, `object-fit: contain`, borda circular e fundo de superfície vindos dos tokens do tema.
- **Favicon:** `public/favicon.svg`, versão simplificada da mascote (círculo roxo, xícara creme e vapor dourado), referenciado em `index.html`.
- **Título da página:** `Coffee Delivery - Fast & Fresh Coffee`.

### Paleta

| Cor | Código | Uso |
| --- | --- | --- |
| Roxo profundo | `#4B2995` | fundo do emblema e contorno da logo |
| Roxo vibrante | `#8047F8` | detalhes e destaque da marca |
| Dourado | `#DBAC2C` | vapor e acentos quentes |
| Caramelo | `#C47F17` | café e detalhes da xícara |
| Creme/café | tons claros e escuros | xícara, superfícies e contraste |

### Justificativa

A mascote torna a marca **afetuosa, carismática e moderna**: o filhote entregador conecta a agilidade do delivery ao conforto de um café fresco, sem perder a personalidade lúdica esperada em uma cafeteria. Os tons roxos mantêm a continuidade com a identidade anterior do projeto, enquanto o dourado/caramelo reforçam o calor do produto.

### Responsividade e acessibilidade

- No `Header`, a logo mantém proporção e altura fixa de 44 px; em telas estreitas o cabeçalho quebra linha sem cortar a arte (`src/styles/GlobalStyle.ts` evita rolagem horizontal).
- A imagem é decorativa: o link já possui `aria-label` ("Coffee Delivery — página inicial"), então a logo usa `alt=""` e `aria-hidden="true"` para não duplicar a leitura por leitores de tela.
- Borda e fundo derivados dos tokens de tema preservam o contorno roxo e o contraste tanto no **tema claro** quanto no **tema escuro**.
- O foco visível e os alvos de toque dos controles ao redor seguem as regras de acessibilidade do projeto (WCAG AA).

---

## Configuração original do Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
