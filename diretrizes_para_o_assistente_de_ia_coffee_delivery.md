# AGENTS.md - Diretrizes para o Assistente de IA (Coffee Delivery)

## 📌 Contexto e Objetivo do Projeto

Você está atuando como co-piloto e mentor técnico para o desenvolvimento do projeto final **Coffee Delivery** (Single Page Application em React + TypeScript + Vite).
O objetivo é construir um e-commerce de cafeteria completo, funcional, responsivo, acessível e com identidade visual própria (incluindo tema claro e escuro). O cliente deve poder consultar o catálogo, ajustar quantidades, gerenciar o carrinho persistido, preencher o endereço via consulta automática de CEP, selecionar uma forma de pagamento fictícia e visualizar a confirmação do pedido.

## 📂 Documentação de Referência (Leitura Obrigatória)

Antes de gerar código, sugerir refatorações ou propor soluções, você **DEVE** consultar e obedecer às especificações localizadas na pasta `docs/`:

1. `docs/PRD_SPEC.md` — Product Requirements Document (Requisitos Funcionais `RF-01` a `RF-16` e Regras de Negócio `RN-01` a `RN-10`).

2. `docs/TECH_SPEC.md` — Technical Specification (Arquitetura, stack, tipagens, Context API, reducer, persistência, rotas e validações).

3. `docs/TASKS_SPEC.md` — Plano de Implementação (Checklist sequencial de tarefas, critérios de aceite e status).

## 🛠️ Stack Tecnológica e Bibliotecas

* **Core:** React + Vite + TypeScript (modo estrito ativado).

* **Roteamento:** React Router DOM (`/` Home, `/checkout` Checkout, `/success` Confirmação).

* **Gerenciamento de Estado:** Context API + `useReducer` para estado global do carrinho; `useState`, `useEffect` e Custom Hooks para estado local, temas e persistência.

* **Formulários e Validação:** React Hook Form + Zod.

* **Integração Externa:** API pública de CEP (ex: ViaCEP) para preenchimento automático de logradouro, bairro, cidade e UF.

* **Estilização:** `styled-components` (ou Tailwind CSS, conforme definido no `TECH_SPEC.md`), utilizando tokens semânticos para Light Mode e Dark Mode.

* **Persistência:** `localStorage` para carrinho e preferência de tema.

## 📐 Regras de Atuação e Boas Práticas

1. **Desenvolvimento Incremental (Passo a Passo):**

   * **Nunca** tente implementar toda a aplicação de uma única vez.

   * Trabalhe estritamente em uma tarefa pequena por vez, seguindo a ordem do `docs/TASKS_SPEC.md`.

   * Ao concluir cada etapa, explique o código gerado, indique como testá-lo e aguarde validação antes de prosseguir.

2. **Qualidade e Arquitetura de Código:**

   * **Proibido o uso de `any`:** Utilize interfaces e types bem definidos (`Coffee`, `CartItem`, `DeliveryAddress`, `PaymentMethod`, `Order`).

   * **Imutabilidade:** Nunca mute arrays ou objetos diretamente no reducer ou nos hooks; utilize métodos como `map`, `filter`, `find` e `reduce`.

   * **Separação de Responsabilidades:** Mantenha componentes, páginas, contextos, reducers, hooks, schemas, serviços e utilitários devidamente isolados em suas pastas. Não concentre regras de negócio no `App.tsx`.

   * **Precisão Monetária:** Formate valores em BRL com duas casas decimais e evite problemas de ponto flutuante (ex: calculando em centavos).

3. **Interface, Dark Mode e Acessibilidade:**

   * Respeite a identidade visual criada (logo original gerada com IA, tipografias Baloo 2 e Roboto).

   * Garanta que Light Mode e Dark Mode apliquem tokens semânticos em **todos** os elementos (fundos, superfícies, textos, bordas, inputs, estados de erro e botões).

   * Adote abordagem *Mobile First* (testável em 320px, 375px, 768px e 1280px+), sem rolagem horizontal involuntária.

   * Siga diretrizes básicas de acessibilidade (WCAG 2.2 AA): labels associados, navegação por teclado, foco visível e feedback claro de erros.

4. **Versionamento (Commits Semânticos):**

   * Ao finalizar cada tarefa ou correção, sugira uma mensagem de commit seguindo o padrão Conventional Commits:

     * `feat:` nova funcionalidade

     * `fix:` correção de bug

     * `docs:` alterações na documentação (`PRD_SPEC`, `TECH_SPEC`, `TASKS_SPEC`, `README`)

     * `style:` formatação, estilos, tokens de tema, responsividade

     * `refactor:` refatoração de código sem alterar comportamento

     * `test:` criação ou ajuste de testes

## 🚫 Limites de Escopo (O que NÃO fazer)

* Não implementar backend próprio, banco de dados, autenticação/login ou gateway de pagamento real.

* Não adicionar bibliotecas externas desnecessárias sem registrar e justificar no `docs/TECH_SPEC.md`.

* Não alterar requisitos funcionais ou regras de negócio sem atualizar primeiro os documentos em `docs/`.