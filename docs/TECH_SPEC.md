# TECH_SPEC — Coffee Delivery

| Campo | Valor |
| --- | --- |
| Versão | 1.0 |
| Status | **Proposta para validação** |
| Atualizado em | 2026-11-23 |
| Documentos relacionados | `PRD_SPEC.md`, `TASKS_SPEC.md` |

> Esta especificação define **como** o produto descrito no `PRD_SPEC.md` será construído. Toda biblioteca externa adicionada de agora em diante deve ser registrada e justificada na seção 2, conforme as diretrizes do projeto.

---

## 1. Arquitetura geral

A aplicação segue uma arquitetura em camadas, com fronteiras explícitas:

```text
[ Páginas / Componentes ]  ── leem estado e disparam ações
            │
            ▼
[ Contextos + Reducers ]   ── estado global (carrinho, pedido, tema)
            │
            ▼
[ Hooks + Schemas ]        ── regras derivadas, validação, integração ViaCEP
            │
            ▼
[ Dados + Utils + Estilos ]── catálogo local, formatação monetária, storage, tokens
```

**Princípios obrigatórios:**
- `App.tsx` contém **apenas** a configuração de rotas/providers — nenhuma regra de negócio.
- Reducers e hooks são **puros e imutáveis** (`map`, `filter`, `find`, `reduce`); nunca mutam estado.
- **Proibido `any`**: todo valor usa `interface`, `type` ou inferência segura.
- Operações monetárias usam **inteiros em centavos**; a formatação para BRL acontece somente na camada de apresentação.
- Implementação incremental: uma tarefa do `TASKS_SPEC.md` por vez, com validação antes de prosseguir.

## 2. Stack e justificativas

| Camada | Biblioteca (versão instalada) | Justificativa |
| --- | --- | --- |
| Build / Dev | Vite `8.x` | Servidor rápido, HMR e fallback SPA nativo para `/checkout` e `/success`. |
| Linguagem | TypeScript `~7.0.2`, modo estrito | Segurança de tipos conforme as diretrizes (`strict: true` já ativado em `tsconfig.app.json`). |
| UI | React `19.x` | Base declarativa da SPA; `StrictMode` no ponto de entrada. |
| Rotas | react-router-dom `7.18.6` | Navegação cliente-side; `BrowserRouter` com `Routes`/`Route` e redirecionamento `*` → `/`. |
| Estado global | Context API + `useReducer` (nativo) | Carrinho com transições previsíveis e auditáveis, sem dependência extra. |
| Formulários | react-hook-form `7.92.0` | Validação não controlada, re-renderizações mínimas, integração com `zodResolver`. |
| Validação | zod `4.6.7` + @hookform/resolvers `7.0.8` | Schema único e tipado (`z.infer`) compartilhado entre formulário e regras RN-06/RN-07/RN-08. |
| Estilização | styled-components `6.6.0` | Tokens semânticos por `ThemeProvider`, suporte direto a light/dark e escopo por componente. **Não instalar `@types/styled-components`**: a v6 já publica `dist/index.d.ts`. |
| Ícones | lucide-react `1.78.0` | Ícones de ação (carrinho, tema, remover, quantidade) com tipagem nativa e importação por árvore. **Registro obrigatório:** biblioteca externa adicionada para atender ao requisito visual de ícones das diretrizes; nenhuma outra biblioteca de ícones será instalada. |
| Qualidade | oxlint `1.x` (já no template) | Lint rápido via `npm run lint`, sem configuração adicional. |
| Testes | A definir | Nenhuma biblioteca de testes instalada ainda. Quando a tarefa T-17 for executada, a escolha (ex.: Vitest + Testing Library) deve ser justificada aqui antes da instalação. |

**Integração externa:** ViaCEP (`https://viacep.com.br/ws/{cep}/json/`), API pública, sem chave de autenticação. Nenhum outro serviço externo é consumido.

**Fora da stack:** backend, banco de dados, autenticação, gateway de pagamento, Tailwind e fontes locais pagas.

## 3. Estrutura de pastas

```text
src/
├── assets/        # imagens, logo original e ícones locais (atualmente vazia)
├── components/    # componentes reutilizáveis (CoffeeCard, Header, AddressForm, ...)
├── pages/         # Home, Checkout, Success — uma página por rota
├── contexts/      # CartContext, OrderContext, ThemeContext + providers
├── reducers/      # cartReducer (puro) e seus tipos de ação
├── hooks/         # useCart, useTheme, useCepLookup e outros hooks customizados
├── data/          # catálogo local de cafés e constantes de negócio (taxa de entrega)
├── types/         # interfaces e types do domínio (Coffee, CartItem, Order, ...)
├── schemas/       # schemas zod (checkout, persistência do carrinho)
├── utils/         # formatação monetária, storage seguro, cliente ViaCEP
├── styles/        # tokens de tema, GlobalStyle e definições de breakpoints
├── tests/         # testes unitários (quando introduzidos na T-17)
├── App.tsx        # somente rotas e composição de providers
├── index.css      # reset mínimo global
└── main.tsx       # ponto de entrada (StrictMode + providers globais)
docs/              # PRD_SPEC.md, TECH_SPEC.md, TASKS_SPEC.md
```

**Regras de colocação:**
- Acesso a `localStorage` fica em `src/utils/storage.ts` — nunca diretamente em componentes.
- O cliente ViaCEP fica em `src/utils/viacep.ts`; a orquestração (debounce, abort, estados) fica em `src/hooks/useCepLookup.ts`.
- Toda constante de negócio (taxa de entrega, opções de pagamento, chaves de storage) fica em `src/data/constants.ts`.
- Componentes não calculam totais: usam seletores derivados do context (`subtotalInCents`, `totalInCents`).

## 4. Modelo de domínio (tipagens)

Definições canônicas em `src/types/` — nenhuma delas usa `any`:

```ts
export interface Coffee {
  id: string
  name: string
  description: string
  priceInCents: number        // inteiro; ex.: 1050 = R$ 10,50
  image: string               // caminho do asset em src/assets
  tags: string[]
}

export interface CartItem {
  coffeeId: string            // chave de identidade (RN-04)
  quantity: number            // sempre >= 1 (RN-03)
}

export interface DeliveryAddress {
  cep: string                 // 8 dígitos, normalizado
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string               // UF com 2 letras
}

export type PaymentMethod = 'credit' | 'debit' | 'cash'

export interface OrderItem {
  coffeeId: string
  name: string
  unitPriceInCents: number    // snapshot do preço (RN-09)
  quantity: number
}

export interface Order {
  id: string                  // crypto.randomUUID()
  items: OrderItem[]
  address: DeliveryAddress
  paymentMethod: PaymentMethod
  subtotalInCents: number
  deliveryFeeInCents: number
  totalInCents: number
  createdAt: string           // ISO 8601
}

export type ThemeMode = 'light' | 'dark'
```

Tipos de apoio (também em `src/types/`):

```ts
export interface CartState {
  items: CartItem[]
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: { coffeeId: string; quantity: number } }
  | { type: 'INCREMENT_ITEM'; payload: { coffeeId: string } }
  | { type: 'DECREMENT_ITEM'; payload: { coffeeId: string } }
  | { type: 'REMOVE_ITEM'; payload: { coffeeId: string } }
  | { type: 'CLEAR_CART' }

export interface ViaCepResponse {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string         // mapeado para DeliveryAddress.city
  uf: string                 // mapeado para DeliveryAddress.state
  erro?: true
}
```

## 5. Estado global: Context API + useReducer

### 5.1 Carrinho (`CartContext` + `cartReducer`)

O reducer é uma função pura em `src/reducers/cartReducer.ts`; a API pública do context é em `src/contexts/CartContext.tsx`, exposta pelo hook `useCart()`:

```ts
interface CartContextValue {
  items: CartItem[]
  itemCount: number           // soma das quantidades (RF-05)
  subtotalInCents: number     // derivado do catálogo (RF-09)
  subtotalFormatted: string   // BRL com 2 casas (RN-01)
  totalInCents: number        // subtotal + taxa (RN-02) — ainda não implementado
  addCoffee: (coffee: Coffee, quantity: number) => void
  incrementItem: (coffeeId: string) => void
  decrementItem: (coffeeId: string) => void
  removeItem: (coffeeId: string) => void
  clearCart: () => void
}
```

Comportamento das ações:

| Ação | Efeito no estado | Regras |
| --- | --- | --- |
| `ADD_ITEM` | Se o `coffeeId` existe, soma `quantity`; senão, cria nova linha. | RN-03, RN-04; ignora quantidade < 1. |
| `INCREMENT_ITEM` | `map` incrementando apenas o item alvo. | RN-03. |
| `DECREMENT_ITEM` | Se quantidade > 1, decrementa; se == 1, remove com `filter`. | RN-03. |
| `REMOVE_ITEM` | `filter` removendo o `coffeeId`. | RF-07. |
| `CLEAR_CART` | Retorna `{ items: [] }`. | RN-09 (após criar o pedido). |

O preço **não** é duplicado no carrinho: `subtotalInCents` é calculado com `reduce`, cruzando `CartItem[]` com o catálogo em `src/data/coffees.ts`. O preço só é "congelado" no `OrderItem` no momento da finalização (RN-09).

### 5.2 Pedido (`OrderContext`)

- Estado: `Order | null`, apenas em memória.
- `createOrder(address, paymentMethod, items, totals)` gera `id`, `createdAt`, snapshot e limpa o carrinho em seguida.
- A rota `/success` lê esse context; se `order === null`, redireciona para `/` (FA-06/RN-05).
- Nada deste context vai para `localStorage` (RN-10).

### 5.3 Tema (`ThemeContext`)

- Estado: `ThemeMode`, com `toggleTheme()`.
- Inicialização: valor salvo → senão `prefers-color-scheme` → senão `'light'`.
- Efeito colateral: grava a preferência no storage e define `document.documentElement.dataset.theme`.
- Exposição: `ThemeProvider` do styled-components com os tokens correspondentes + hook `useTheme()`.

## 6. Persistência

| Dado | Chave | Formato |
| --- | --- | --- |
| Carrinho | `coffee-delivery:cart:v1` | `{ items: CartItem[] }` |
| Tema | `coffee-delivery:theme:v1` | `"light"` ou `"dark"` |

Regras de implementação:
- `src/utils/storage.ts` expõe leitura/escrita com `try/catch` (ambientes com storage bloqueado não quebram a aplicação).
- Hidratação do carrinho usa `useReducer(reducer, initialState, loadInitialCart)`; o conteúdo é validado por um schema zod em `src/schemas/cartSchema.ts` antes de entrar no estado.
- Escrita ocorre em `useEffect` sempre que `state.items` muda; escrita do tema ocorre em `useEffect` do `ThemeContext`.
- Dados inválidos, versão diferente ou `coffeeId` inexistente no catálogo são descartados (FA-08).
- Nenhum outro dado é persistido (RN-10).

## 7. Integração ViaCEP

- **Endpoint:** `GET https://viacep.com.br/ws/{cep}/json/`, onde `{cep}` contém apenas os 8 dígitos.
- **Cliente (`src/utils/viacep.ts`):** `fetchAddress(cep: string, signal?: AbortSignal): Promise<Partial<DeliveryAddress> | null>`; converte `erro: true` em `null`; trata status não-2xx como falha.
- **Hook (`src/hooks/useCepLookup.ts`):** estados `idle | loading | success | error`; debounce de ~300 ms; `AbortController` para cancelar requisições antigas e timeout de ~5 s.
- **Mapeamento:** `logradouro → street`, `bairro → neighborhood`, `localidade → city`, `uf → state`.
- **Comportamento em falha:** mantém os campos editáveis e não bloqueia o envio do formulário (RN-06/FA-02).
- O CEP digitado é normalizado (`replace(/\D/g, '')`) antes da consulta e validado pelo schema (RN-06).

## 8. Validação de formulário

`src/schemas/checkoutSchema.ts` é a fonte única de validação; `z.infer` produz `CheckoutFormData`. Esboço da forma esperada:

```ts
const checkoutSchema = z.object({
  name: z.string().min(3, 'Informe seu nome completo'),
  cep: z.string().regex(/^\d{5}-?\d{3}$/, 'CEP inválido'),
  street: z.string().min(1, 'Informe o logradouro'),
  number: z.string().min(1, 'Informe o número'),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, 'Informe o bairro'),
  city: z.string().min(1, 'Informe a cidade'),
  state: z.string().regex(/^[A-Za-z]{2}$/, 'UF inválida'),
  paymentMethod: z.enum(['credit', 'debit', 'cash'], {
    error: 'Selecione uma forma de pagamento',
  }),
})
```

- Integração: `useForm<CheckoutFormData>({ resolver: zodResolver(checkoutSchema), mode: 'onBlur' })`.
- Erros são exibidos por campo com `role="alert"` e `aria-invalid`; `shouldFocusError` cuida do foco no primeiro inválido (RF-13).
- O schema cobre RN-06, RN-07 e RN-08. Regras de estoque/pagamento real não existem (fora de escopo).

## 9. Rotas

| Caminho | Página | Observação |
| --- | --- | --- |
| `/` | `Home` | Catálogo e seleção de quantidades (RF-01 a RF-04). |
| `/checkout` | `Checkout` | Carrinho, endereço, pagamento e resumo (RF-06 a RF-14). |
| `/success` | `Success` | Confirmação; redireciona para `/` se não houver pedido (RF-15/RN-05). |
| `*` | `Navigate to="/"` | Rota desconhecida (FA-07). |

`App.tsx` apenas compõe `BrowserRouter`, os providers e `<Routes>`; a navegação usa `<Link>`/`<Navigate>` e `useNavigate()`.

## 10. Estilização, tema e responsividade

- **Tokens semânticos** em `src/styles/theme.ts`, com um objeto por modo (`light`/`dark`): `background`, `surface`, `text`, `textMuted`, `border`, `primary`, `primaryHover`, `error`, `focus`, etc. Nenhum componente usa cor literal.
- `src/styles/GlobalStyle.ts` aplica `createGlobalStyle` com `body`, foco visível (`:focus-visible`) e as fontes.
- **Tipografias:** Baloo 2 para títulos e Roboto para texto; carregadas via `<link>` no `index.html` (T-02).
- **Breakpoints mobile-first:** `320px` (base), `375px`, `768px` (tablet), `1280px` (desktop). Layout em grid/flex sem `overflow-x` involuntário.
- **Acessibilidade:** contraste AA, labels associados, foco visível, ícones decorativos com `aria-hidden`, botões com texto acessível (RNF-02/RF-16).

## 11. Formatação monetária

`src/utils/currency.ts` centraliza:
- `formatBRL(centsIn: number): string` → `new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(centsIn / 100)`.
- Cálculos de `subtotalInCents` e `totalInCents` permanecem em inteiros; a divisão por 100 ocorre apenas dentro do formatador (RN-01).
- `DELIVERY_FEE_IN_CENTS = 350` em `src/data/constants.ts` (RN-02).

## 12. Qualidade e verificação

- Ao fim de **cada** tarefa: `npm run build` (tsc + Vite) e `npm run lint` (oxlint) devem passar.
- Verificação manual guiada pelos critérios do `PRD_SPEC.md`, incluindo os fluxos alternativos FA-01 a FA-09.
- Testes automatizados: introduzir na T-17, priorizando `cartReducer`, `currency`, `checkoutSchema` e `viacep` (funções puras, sem depender de DOM). A biblioteca de testes será justificada neste documento antes da instalação.
- Commits seguem **Conventional Commits** (`feat`, `fix`, `docs`, `style`, `refactor`, `test`).

## 13. Rastreabilidade rápida

| Requisito | Onde se materializa |
| --- | --- |
| RF-01/02/03/04 | `src/data/coffees.ts`, `src/pages/Home.tsx`, `src/components/CoffeeCard.tsx`, `cartReducer` |
| RF-05/10 | `src/components/Header.tsx`, `src/App.tsx` |
| RF-06/07/08/09 | `src/contexts/CartContext.tsx`, `src/pages/Checkout.tsx`, `src/utils/storage.ts`, `src/utils/currency.ts` |
| RF-11 | `src/utils/viacep.ts`, `src/hooks/useCepLookup.ts` |
| RF-12/13 | `src/schemas/checkoutSchema.ts`, `src/components/AddressForm.tsx` |
| RF-14 | `src/components/PaymentSelector.tsx`, `src/data/constants.ts` |
| RF-15 | `src/contexts/OrderContext.tsx`, `src/pages/Checkout.tsx` |
| RF-16 | `src/contexts/ThemeContext.tsx`, `src/styles/theme.ts`, `src/styles/GlobalStyle.ts` |
| RN-01/02 | `src/utils/currency.ts`, `src/data/constants.ts` |
| RN-03/04/05/09 | `src/reducers/cartReducer.ts`, `src/contexts/OrderContext.tsx` |
| RN-06/07/08 | `src/schemas/checkoutSchema.ts`, `src/hooks/useCepLookup.ts` |
| RN-10 | `src/utils/storage.ts`, `src/schemas/cartSchema.ts` |
