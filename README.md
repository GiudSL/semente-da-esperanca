# 🌱 Semente da Esperança: Projeto de Estudo Front-end

Este projeto de estudo tem como objetivo a criação de um site institucional Front-end completo para uma Organização Não Governamental (ONG). O foco principal foi a aplicação prática das tecnologias essenciais da web para construir uma interface responsiva, semanticamente correta e interativa.

---

## 🛠️ Tecnologias Utilizadas

- *HTML5:* Estrutura semântica utilizando elementos como header, main, section, form e article. Implementação de atributos de Acessibilidade (A11Y) como aria-labelledby, role e a classe .sr-only.

- *CSS:* CSS Variables (:root): Uso de variáveis para cores (--color-primary, --color-secondary), tipografia, espaçamento e breakpoints. Layout Responsivo: Implementação de um sistema de Grid Layout de 12 colunas (.grid-layout) com breakpoints (@tablet, @desktop) definidos em media queries.

- *JS:* Interatividade e Validação: Lógica para controle do Menu de Navegação responsivo (.menu-toggle) e implementação de Máscaras de Input (CPF, Telefone, CEP) e validações básicas no formulário de cadastro.

---

## 📂 Estrutura de arquivos

*A organização de arquivos segue o padrão profissional de separação de responsabilidades (Separation of Concerns):*

```
sementedaesperanca/
├── index.html              # Página inicial (na raiz)
├── pages/
│   ├── cadastro.html       # Formulário de Cadastro
│   └── projetos.html       # Detalhe de Projetos e Doações
├── assets/                 # Contêiner para recursos estáticos
│   ├── css/
│   │   └── style.css       # Estilos globais e componentes
│   ├── js/
│   │   └── main.js         # Scripts de interatividade e validação
│   └── img/                # Imagens e Ícones do projeto
│       ├── food.jpg
│       ├── kids.jpg
│       ├── smile.jpg
│       ├── tree.jpg
│       └── favicon.png
└── README.md
