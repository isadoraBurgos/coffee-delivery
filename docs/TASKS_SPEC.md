# TASKS_SPEC — Coffee Delivery

| Campo | Valor |
| --- | --- |
| Versão | 1.0 |
| Status | **Proposta para validação** |
| Atualizado em | 2026-11-23 |
| Documentos relacionados | `PRD_SPEC.md`, `TECH_SPEC.md` |

## 1. Como usar este plano

1. Execute **uma tarefa por vez**, na ordem exata desta lista.
2. Ao concluir, explique o código gerado, indique **como testar** e **aguarde validação** antes de iniciar a próxima (regra das diretrizes).
3. Sugira o commit com a mensagem indicada em cada tarefa (Conventional Commits).
4. Atualize `PRD_SPEC.md` e `TECH_SPEC.md` **antes** de qualquer mudança de requisito ou arquitetura.
5. Critério de pronto global: `npm run build` e `npm run lint` passam; sem `any`; sem mutação direta de estado; nenhuma regra de negócio em `App.tsx`.

**Legenda de status:** ⏳ Pendente · 🔄 Em andamento · ✅ Concluída · ⛔ Bloqueada

> **Etapa 7 (mapeamento):** o pedido cita `RF-14`/`RF-15`, mas nesta baseline esses IDs são pagamento e finalização. O escopo de tema/responsividade/acessibilidade corresponde a **RF-16 + RNF-01/RNF-02** e às tarefas **T-02 + T-08 + T-16**, executadas em conjunto para evitar estados intermediários sem tokens.

## 2. Checklist ordenado

- [x] **T-01** — Documentação de referência (concluída, aguardando validação)
- [ ] **T-02** — Tokens de tema, fontes e estilos globais
- [ ] **T-03** — Tipagens do domínio e catálogo local
- [ ] **T-04** — Utilitários monetários e storage seguro
- [ ] **T-05** — Reducer puro do carrinho
- [ ] **T-06** — Context do carrinho com persistência
- [ ] **T-07** — Home: catálogo e seleção de quantidade
- [ ] **T-08** — Cabeçalho com badge e alternador de tema
- [ ] **T-09** — Checkout: itens e resumo financeiro
- [ ] **T-10** — Schema Zod do checkout
- [ ] **T-11** — Cliente ViaCEP e hook de consulta
- [ ] **T-12** — Formulário de endereço com React Hook Form
- [ ] **T-13** — Seletor de forma de pagamento
- [ ] **T-14** — Finalização do pedido
- [ ] **T-15** — Página de confirmação (`/success`)
- [ ] **T-16** — Varredura de responsividade e acessibilidade
- [ ] **T-17** — Verificação final e testes automatizados

---

## 3. Detalhamento das tarefas

### T-01 — Documentação de referência

- **Status:** ✅ Concluída (aguardando validação)
- **Objetivo:** criar as três especificações obrigatórias em `docs/`, convertendo as diretrizes em requisitos e plano verificáveis.
- **Requisitos relacionados:** todos (RF-01..RF-16, RN-01..RN-10, RNF-01..RNF-07).
- **Arquivos afetados:** `docs/PRD_SPEC.md`, `docs/TECH_SPEC.md`, `docs/TASKS_SPEC.md`.
- **Critério de pronto:** os três arquivos existem; RF/RN estão numerados de 01 a 16 e 01 a 10; plano em ordem sequencial; nenhum componente foi implementado nesta etapa.
- **Commit sugerido:** `docs: adiciona especificações de produto, técnica e tarefas`

### T-02 — Tokens de tema, fontes e estilos globais

- **Status:** ⏳ Pendente
- **Objetivo:** definir tokens semânticos light/dark, estilos globais, fontes Baloo 2/Roboto e o `ThemeContext` com persistência.
- **Requisitos relacionados:** RF-16, RN-10, RNF-02, RNF-03, RNF-04.
- **Arquivos afetados:** `src/styles/themes/{light,dark,index}.ts`, `src/styles/GlobalStyle.ts`, `src/contexts/ThemeContext.tsx`, `src/hooks/useTheme.ts`, `src/data/constants.ts`, `src/main.tsx`.
- **Critério de pronto:** tokens semânticos claros/escuros com contraste AA; chave `@coffee-delivery:theme-1.0.0`; fallback `prefers-color-scheme`; troca imediata e persistida; build/lint ok.
- **Commit sugerido:** `feat: adiciona tema claro e escuro com persistência`

### T-03 — Tipagens do domínio e catálogo local

- **Status:** ⏳ Pendente
- **Objetivo:** criar as interfaces canônicas e a fonte local de cafés, além das constantes de negócio.
- **Requisitos relacionados:** RF-01, RF-02, RN-01, RN-02, RN-08.
- **Arquivos afetados:** `src/types/index.ts`, `src/data/coffees.ts`, `src/data/constants.ts`.
- **Critério de pronto:** `Coffee`, `CartItem`, `DeliveryAddress`, `PaymentMethod`, `Order` e `OrderItem` definidos sem `any`; catálogo com cafés suficientes para representar variedades (nome, descrição, tags, preço em centavos e imagem); `DELIVERY_FEE_IN_CENTS = 350`; build/lint ok.
- **Commit sugerido:** `feat: adiciona tipos de domínio e catálogo de cafés`

### T-04 — Utilitários monetários e storage seguro

- **Status:** ⏳ Pendente
- **Objetivo:** centralizar formatação BRL e leitura/escrita segura de `localStorage`.
- **Requisitos relacionados:** RF-08, RF-09, RN-01, RN-10, FA-08.
- **Arquivos afetados:** `src/utils/currency.ts`, `src/utils/storage.ts`.
- **Critério de pronto:** `formatBRL(1050)` produz `R$ 10,50` em `pt-BR`; leitura com JSON inválido retorna fallback sem exceção; nenhum cálculo usa ponto flutuante fora do formatador; build/lint ok.
- **Commit sugerido:** `feat: adiciona utilitários de formatação monetária e storage`

### T-05 — Reducer puro do carrinho

- **Status:** ⏳ Pendente
- **Objetivo:** implementar as transições `ADD_ITEM`, `INCREMENT_ITEM`, `DECREMENT_ITEM`, `REMOVE_ITEM` e `CLEAR_CART`.
- **Requisitos relacionados:** RF-04, RF-06, RF-07, RN-03, RN-04, RN-09.
- **Arquivos afetados:** `src/reducers/cartReducer.ts`, `src/types/index.ts`.
- **Critério de pronto:** ações são puras e imutáveis; `ADD_ITEM` soma quantidades sem duplicar `coffeeId`; `DECREMENT_ITEM` de 1 remove o item; nenhum estado com quantidade ≤ 0; build/lint ok.
- **Commit sugerido:** `feat: implementa reducer do carrinho`

### T-06 — Context do carrinho com persistência

- **Status:** ⏳ Pendente
- **Objetivo:** expor `useCart()` com itens, contador, totais e ações, hidratando e persistindo o carrinho.
- **Requisitos relacionados:** RF-05, RF-08, RF-09, RN-02, RN-10.
- **Arquivos afetados:** `src/contexts/CartContext.tsx`, `src/hooks/useCart.ts`, `src/schemas/cartSchema.ts`, `src/main.tsx`.
- **Critério de pronto:** itens e quantidades reaparecem após reload; resumo mostra subtotal, taxa de R$ 3,50 e total em BRL; dados corrompidos são descartados; build/lint ok.
- **Commit sugerido:** `feat: adiciona context do carrinho com persistência`

### T-07 — Home: catálogo e seleção de quantidade

- **Status:** ⏳ Pendente
- **Objetivo:** renderizar os cards do catálogo com quantidade e botão de adicionar.
- **Requisitos relacionados:** RF-01, RF-02, RF-03, RF-04.
- **Arquivos afetados:** `src/pages/Home.tsx`, `src/components/CoffeeCard.tsx`, `src/components/QuantitySelector.tsx`, `src/App.tsx`.
- **Critério de pronto:** um card por café com imagem, nome, descrição, tags e preço; quantidade mínima 1 com decremento desabilitado; adicionar atualiza o carrinho; build/lint ok.
- **Commit sugerido:** `feat: implementa catálogo com seleção de quantidade`

### T-08 — Cabeçalho com badge e alternador de tema

- **Status:** ⏳ Pendente
- **Objetivo:** criar o cabeçalho com navegação, badge do carrinho e controle de tema acessível.
- **Requisitos relacionados:** RF-05, RF-10, RF-16.
- **Arquivos afetados:** `src/components/Header.tsx`, `src/components/ThemeToggle.tsx`, `src/contexts/ThemeContext.tsx`, `src/hooks/useTheme.ts`, `src/App.tsx`.
- **Critério de pronto:** badge reflete a soma das quantidades; links levam a `/` e `/checkout`; `ThemeToggle` tem `aria-label`, `title` dinâmico, `aria-pressed`, foco visível e alvo ≥ 44 px; build/lint ok.
- **Commit sugerido:** `feat: adiciona cabeçalho com carrinho e alternador de tema`

### T-09 — Checkout: itens e resumo financeiro

- **Status:** ⏳ Pendente
- **Objetivo:** listar itens do carrinho com ajuste/remoção e exibir o resumo.
- **Requisitos relacionados:** RF-06, RF-07, RF-09, RN-02, RN-03.
- **Arquivos afetados:** `src/pages/Checkout.tsx`, `src/components/CartItem.tsx`, `src/components/CartSummary.tsx`, `src/components/EmptyCart.tsx`.
- **Critério de pronto:** cada item mostra imagem, nome, preço, quantidade, subtotal e remover; decrementar de 1 remove; totais recalculam; carrinho vazio exibe estado vazio; build/lint ok.
- **Commit sugerido:** `feat: implementa carrinho e resumo no checkout`

### T-10 — Schema Zod do checkout

- **Status:** ⏳ Pendente
- **Objetivo:**validar endereço e pagamento em um único schema tipado.
- **Requisitos relacionados:** RF-11, RF-12, RF-13, RN-06, RN-07, RN-08.
- **Arquivos afetados:** `src/schemas/checkoutSchema.ts`.
- **Critério de pronto:** CEP exige 8 dígitos (com ou sem hífen); UF exige 2 letras; complemento opcional; pagamento obrigatório e restrito a `credit | debit | money`; `CheckoutFormData` inferido do schema; build/lint ok.
- **Commit sugerido:** `feat: adiciona schema de validação do checkout`

### T-11 — Cliente ViaCEP e hook de consulta

- **Status:** ⏳ Pendente
- **Objetivo:** consultar CEP e expor estados de carregamento/erro sem acoplar a UI ao `fetch`.
- **Requisitos relacionados:** RF-11, RN-06, FA-01, FA-02.
- **Arquivos afetados:** `src/services/viacep.ts`, `src/hooks/useCepLookup.ts`.
- **Critério de pronto:** 8 dígitos válidos preenchem logradouro/bairro/cidade/UF; CEP inexistente retorna `null` sem lançar; requisição antiga é abortada; timeout ≈ 5 s; build/lint ok.
- **Commit sugerido:** `feat: integra consulta de CEP com ViaCEP`

### T-12 — Formulário de endereço com React Hook Form

- **Status:** ⏳ Pendente
- **Objetivo:** implementar os campos com `zodResolver`, preenchimento automático e feedback de erro.
- **Requisitos relacionados:** RF-11, RF-12, RF-13, RN-06, RN-07.
- **Arquivos afetados:** `src/components/DeliveryAddressForm.tsx`.
- **Critério de pronto:** labels associados; erros por campo com `aria-invalid`/`role="alert"`; foco no primeiro inválido; campos automáticos permanecem editáveis; build/lint ok.
- **Commit sugerido:** `feat: implementa formulário de endereço com validação`

### T-13 — Seletor de forma de pagamento

- **Status:** ⏳ Pendente
- **Objetivo:** permitir escolher uma das três opções fictícias.
- **Requisitos relacionados:** RF-14, RN-08.
- **Arquivos afetados:** `src/components/PaymentMethodSelector.tsx`, `src/data/constants.ts`.
- **Critério de pronto:** exatamente três opções (crédito, débito, dinheiro); seleção única; obrigatória; nenhum dado de cartão solicitado; build/lint ok.
- **Commit sugerido:** `feat: adiciona seleção de forma de pagamento`

### T-14 — Finalização do pedido

- **Status:** ⏳ Pendente
- **Objetivo:** criar o `Order` com snapshot, limpar o carrinho e navegar para `/success`.
- **Requisitos relacionados:** RF-15, RN-05, RN-09.
- **Arquivos afetados:** `src/types/order.ts`, `src/contexts/OrderContext.tsx`, `src/pages/Checkout.tsx`, `src/App.tsx`.
- **Critério de pronto:** pedido com id único, `createdAt`, itens/preços snapshot, endereço, pagamento e totais; `clearCart()` após criar o pedido; carrinho vazio após finalizar inclusive no reload; bloqueio com formulário inválido ou carrinho vazio; build/lint ok.
- **Commit sugerido:** `feat: implementa finalização do pedido`

### T-15 — Página de confirmação (`/success`)

- **Status:** ⏳ Pendente
- **Objetivo:** exibir o resumo do pedido e tratar acesso sem pedido.
- **Requisitos relacionados:** RF-10, RF-15, RN-05, RN-10.
- **Arquivos afetados:** `src/components/OrderSuccess.tsx`, `src/pages/Success.tsx`, `src/App.tsx`.
- **Critério de pronto:** mostra “Uhu! Pedido confirmado”, id do pedido, endereço completo, previsão de 20 a 30 minutos, pagamento e total em BRL em card com borda gradiente; link para a home; sem pedido em memória exibe “Nenhum pedido encontrado” e botão para `/`; build/lint ok.
- **Commit sugerido:** `feat: adiciona tela de confirmação do pedido`

### T-16 — Varredura de responsividade e acessibilidade

- **Status:** ⏳ Pendente
- **Objetivo:** revisar toda a interface nos breakpoints e verificar navegação por teclado/contraste.
- **Requisitos relacionados:** RNF-01, RNF-02, RF-16.
- **Arquivos afetados:** `src/styles/GlobalStyle.ts`, `src/styles/themes/`, `Home`, `CoffeeCard`, `QuantityInput`, `Checkout`, `DeliveryAddressForm`, `PaymentMethodSelector`, `CartItem`, `CartSummary`, `EmptyCart`, `OrderSuccess`, `Success`.
- **Critério de pronto:** grid de cafés 1/2/3 colunas em 320-375/768/1280 px; checkout empilhado no mobile; sem rolagem horizontal; alvos ≥ 44 px; foco visível; labels e erros legíveis; contraste AA nos dois temas; build/lint ok.
- **Commit sugerido:** `style: ajusta responsividade e acessibilidade da interface`

### T-17 — Verificação final e testes automatizados

- **Status:** ⏳ Pendente
- **Objetivo:** cobrir com testes as funções puras e validar todos os fluxos do PRD.
- **Requisitos relacionados:** todos (RF-01..RF-16, RN-01..RN-10, FA-01..FA-09).
- **Arquivos afetados:** `src/tests/`, `docs/TECH_SPEC.md` (justificar a biblioteca de testes antes de instalá-la).
- **Critério de pronto:** testes para `cartReducer`, `currency`, `checkoutSchema` e `viacep`; `npm run build` e `npm run lint` passam; fluxos FA-01 a FA-09 verificados manualmente.
- **Commit sugerido:** `test: adiciona testes de reducer, utilitários e schemas`

---

## 4. Matriz de rastreabilidade

| Requisito | Tarefa(s) |
| --- | --- |
| RF-01, RF-02, RF-03, RF-04 | T-03, T-07 |
| RF-05, RF-10 | T-08, T-15 |
| RF-06, RF-07, RF-08, RF-09 | T-04, T-06, T-09 |
| RF-11, RF-12, RF-13 | T-10, T-11, T-12 |
| RF-14 | T-13 |
| RF-15 | T-14, T-15 |
| RF-16 | T-02, T-08, T-16 |
| RN-01, RN-02 | T-03, T-04, T-09 |
| RN-03, RN-04, RN-05, RN-09 | T-05, T-06, T-09, T-14 |
| RN-06, RN-07, RN-08 | T-10, T-11, T-12, T-13 |
| RN-10 | T-02, T-04, T-06, T-15 |
| RNF-01, RNF-02 | T-02, T-16 |

## 5. Pronto para começar

A próxima ação, **após a sua validação destes documentos**, é a **T-02 — Tokens de tema, fontes e estilos globais**. Nenhum componente de funcionalidade deve ser escrito antes disso.
