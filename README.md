# EcoOrbit

**Marketplace de Resíduos com Inteligência Orbital**
FIAP · Global Solution 2026 · Engenharia de Software · Semi Presencial RJ

---

## Sobre o Projeto

O EcoOrbit é um marketplace B2B para comercialização de resíduos industriais com monitoramento orbital integrado. Geradores cadastram lotes de resíduos; compradores fazem propostas; satélites dos programas ESA Sentinel-5P (TROPOMI) e NASA Landsat monitoram regiões de risco em tempo real. Cada lote desviado de aterros gera EcoCredits — créditos de carbono em tCO2e calculados com os fatores de emissão do IPCC 2006.

---

## Usuários do Sistema

| Perfil | Tela principal | O que faz |
|---|---|---|
| **Gerador** | `index.html` | Cadastra lotes, acompanha propostas e EcoCredits gerados |
| **Comprador** | `comprador.html` | Explora geradores disponíveis, filtra por tipo/região e faz propostas |
| **Público** | `orbital.html` | Consulta monitoramento orbital das regiões — sem login |

---

## Telas do Projeto

### 1. `index.html` — Dashboard do Gerador
Página principal. Exibe KPIs (EcoCredits, receita, toneladas desviadas, propostas recebidas), tabela de lotes com filtro de busca em tempo real, feed de propostas recebidas com timers de expiração e acesso rápido ao cadastro de lote.

### 2. `comprador.html` — Dashboard do Comprador
Tabela de geradores disponíveis com filtros por tipo de resíduo e região. Exibe indicadores de impacto acumulado (toneladas adquiridas, tCO2e evitadas, número de parceiros) e gráfico de impacto mensal via Chart.js.

### 3. `orbital.html` — Painel Orbital Público
Acesso livre, sem autenticação. Exibe dado orbital atual simulado (TROPOMI/Sentinel-5P) com atualização automática via `setInterval` a cada 5 segundos no WD. Tabela de 4 regiões monitoradas com score de risco de lixão, índice NDVI, focos de calor e concentração de metano.

### 4. `cadastro-lote.html` — Cadastro de Lote (RF02)
Formulário completo com campos: tipo de resíduo, peso estimado, frequência de geração, estado (dropdown IBGE), município (dropdown IBGE dependente do estado), endereço, condição de armazenamento, data de disponibilidade e observações. Preview de EcoCredit calculado dinamicamente no WD.

---

## Direção Visual e Identidade

### Tema: Espacial + Sustentabilidade

A identidade do EcoOrbit resolve a tensão entre dois universos visuais opostos — a frieza tecnológica do espaço e o calor orgânico da sustentabilidade. A solução foi construir sobre um fundo escuro profundo (`#0a0e1a`, quase preto azulado, evocando o cosmos) e sobrepor os dois acentos cromáticos que representam cada polo:

- **Ciano `#00B4D8`**: tecnologia, satélite, dados, precisão orbital
- **Verde `#06D6A0`**: sustentabilidade, natureza, reciclagem, impacto positivo

### Paleta completa

| Token | Valor | Uso |
|---|---|---|
| `--color-bg` | `#0a0e1a` | Fundo global (cosmos) |
| `--color-surface` | `#111827` | Cards e painéis |
| `--color-surface-2` | `#1a2236` | Linhas de tabela, inputs |
| `--color-cyan` | `#00B4D8` | Cor principal, links, botões primários |
| `--color-green` | `#06D6A0` | Métricas positivas, confirmações |
| `--color-alert` | `#ef4444` | Alertas críticos, lixão confirmado |
| `--color-warning` | `#f59e0b` | Risco médio, monitoramento |

### Tipografia

- **Display/Títulos**: `Exo 2` — geométrica, futurista, legível. Carrega o peso visual das marcas tecnológicas sem cair no clichê de fontes "de ficção científica". Usada em headings, logo, valores de KPI.
- **Corpo**: `Space Grotesk` — humanista, moderna, boa legibilidade em interfaces densas de dados. Escolhida por contrastar bem com Exo 2 sem criar conflito visual.
- **Monospace**: `JetBrains Mono` — para valores numéricos (metano em ppb, EcoCredits em tCO2e, IDs de lote). Garante alinhamento vertical em tabelas e reforça o caráter técnico dos dados.

Fontes genéricas como Arial, Roboto e Inter foram explicitamente descartadas por não transmitirem a identidade tecnológica que o produto exige.

---

## Moodboard — Análise Crítica de Referências Visuais

As referências estão na pasta `assets/moodboard/`. Para cada uma, a análise abaixo documenta o que foi aproveitado, o que foi descartado e o porquê.

### Referência 1 — NASA Earthdata Dashboard
**O que aproveitei:** A combinação de dark mode com dados satelitais em tempo real. O padrão de apresentar coordenadas e métricas em tipografia monospaced sobre fundo escuro. A credibilidade que o design sóbrio confere a dados científicos.

**O que descartei:** A complexidade dos mapas interativos (Leaflet/OpenStreetMap foi explicitamente removido do escopo). A densidade excessiva de informação que prejudica usuários não técnicos.

**Impacto no EcoOrbit:** O painel orbital usa a mesma lógica de "dado ao vivo" com badge animado, fonte mono para PPB e barra de score em vez de mapa.

---

### Referência 2 — Grafana Dark Dashboard
**O que aproveitei:** O sistema de cards de KPI com borda colorida lateral como indicador semântico de estado (verde = ok, vermelho = alerta). A tabela densa com fontes pequenas e hover sutil. O uso de cores de acento só para dados relevantes, não como decoração.

**O que descartei:** A sobrecarga de gráficos em cada card. O EcoOrbit tem dashboards focados em ação (aceitar proposta, cadastrar lote) — não em observação pura.

**Impacto no EcoOrbit:** Os `card-kpi` têm `border-left` colorida como único indicador visual de categoria. Economiza espaço e mantém leitura rápida.

---

### Referência 3 — Linear App (Interface de Produto)
**O que aproveitei:** A navegação lateral com ícones + texto que colapsa em mobile. O sistema de badges para status (variações de cor com fundo semi-transparente). A tipografia compacta com peso semibold nos labels de KPI.

**O que descartei:** O esquema de cores claro. O produto é espacial — dark mode não é escolha estética, é parte da narrativa.

**Impacto no EcoOrbit:** O componente `.nav-sidebar` e os `.badge` foram diretamente inspirados nessa referência.

---

### Referência 4 — ESA Open Access Hub (Copernicus)
**O que aproveitei:** O badge "LIVE" com ponto animado para indicar dados em tempo real. A terminologia técnica apresentada sem ser pedante (ppb, NDVI, tCO2e aparecem com contexto suficiente). A credibilidade institucional que o design comunica.

**O que descartei:** O layout antigo com tabelas pesadas e ausência de hierarquia visual moderna.

**Impacto no EcoOrbit:** O `.orbital-live-badge` com `.orbital-live-dot` animado vem diretamente dessa referência. A terminologia orbital foi mantida sem simplificação excessiva.

---

### Referência 5 — Stripe Dashboard (Fintech)
**O que aproveitei:** O feed de transações recentes como componente de "feed de propostas" — cada item com empresa, valor e ação disponível. O timer de expiração para criar urgência. O padrão de mostrar delta (variação percentual) ao lado de cada KPI.

**O que descartei:** A paleta azul corporativa e o foco em dados financeiros puros. O EcoOrbit precisa comunicar impacto ambiental, não só receita.

**Impacto no EcoOrbit:** O componente `.proposal-feed` e os `.kpi-delta` vêm dessa referência.

---

### Referência 6 — Ecosia / Sustainability Dashboards
**O que aproveitei:** O uso de ícones de impacto ambiental com métricas simples (toneladas, árvores, CO2). A linguagem acessível para comunicar dados técnicos a usuários não especialistas. O contraste entre dados duros e narrativa de impacto positivo.

**O que descartei:** O design excessivamente "eco-friendly" com verdes pastel e fontes orgânicas — o EcoOrbit também é tecnologia orbital, não apenas sustentabilidade.

**Impacto no EcoOrbit:** Os `.impact-card` no dashboard do comprador vêm dessa referência. A linguagem de impacto ("toneladas desviadas", "tCO2e evitadas") é comunicada de forma direta e sem jargão desnecessário.

---

## Decisões de Responsividade

| Breakpoint | Comportamento |
|---|---|
| `≥ 1440px` | Grid de 4 KPIs lado a lado. Padding generoso (`var(--space-12)`). Max-width de 1600px centralizado. |
| `768px–1439px` | Sidebar colapsa para ícones (64px). Grid de 2 KPIs. Tabelas com scroll horizontal. |
| `480px–767px` | Sidebar colapsa para ícones (64px). Grid de 1 KPI por linha. Botões em coluna. |
| `≤ 480px` | Sidebar oculta. Layout de coluna única. Tabelas com scroll horizontal. Fonte menor. |

A sidebar lateral nunca empurra o conteúdo em mobile — some completamente para preservar o espaço de conteúdo.

---

## Componentes CSS

Todos definidos em `css/style.css` com tokens de design via variáveis CSS:

- `.card-kpi` + `.card-kpi--cyan/green/alert/warn` — cards de KPI com borda colorida lateral
- `.badge--verified/conditional/review` — Selo Orbital nas 3 variações
- `.badge--processed/pending/alert/monitoring/normal` — status de lote e região
- `.data-table` — tabela de lotes com colunas ID, tipo, peso, status, EcoCredit
- `.alert--critical/warning/success/info` — alertas de status com cor e ícone
- `.form-group` + `.form-input/.form-select/.form-textarea` — campos do formulário de lote
- `.nav-sidebar` — navegação lateral com logo e collapse responsivo
- `.orbital-live-badge` + `.orbital-live-dot` — badge animado de dados ao vivo
- `.progress-bar` — barra de score de risco
- `.proposal-item` + `.proposal-timer` — feed de propostas

---

## Acessibilidade

- Contraste WCAG AA garantido: texto primário (`#e2e8f0`) sobre fundo (`#0a0e1a`) = ratio 14.5:1
- Toda imagem tem atributo `alt`
- Formulários com `label` associado via `for/id`, `aria-required`, `aria-describedby`
- Alertas com `role="alert"` e `aria-live="assertive"` para leitores de tela
- Navegação com `aria-label` e `aria-current="page"`
- Tabelas com `scope="col"` nos cabeçalhos
- Botões com `aria-label` descritivo quando o texto sozinho é insuficiente
- `:focus-visible` com outline ciano em todos os elementos interativos

---

## Organização do Repositório

```
/
├── index.html           — Dashboard do Gerador
├── comprador.html       — Dashboard do Comprador
├── orbital.html         — Painel Orbital Público
├── cadastro-lote.html   — Formulário de Cadastro de Lote (RF02)
├── integrantes.txt      — Nomes e RMs do grupo
├── README.md            — Este arquivo
├── css/
│   └── style.css        — Único arquivo de estilos (tokens + componentes)
└── assets/
    ├── logo-ecoorbit.png
    ├── icons/
    └── moodboard/       — Referências visuais (6+ imagens)
```

---

## Penalidades — Checklist de Entrega

- [x] Toda imagem com atributo `alt`
- [x] Nenhum link quebrado de CSS ou imagem
- [x] Zero estilos inline no HTML
- [x] Nenhum `<script>` (escopo FED = zero JavaScript)
- [x] HTML semântico: `header`, `main`, `section`, `nav`, `article` — sem div soup
- [x] `integrantes.txt` presente
- [x] `README.md` com análise crítica do moodboard
- [x] Logo na navbar de todas as páginas
- [x] Breakpoints: 320px, 768px, 1440px definidos no CSS

---

---

## Manual de Interatividade (WD — JavaScript)

Esta seção documenta todas as interações implementadas nos arquivos `.js`. Indica onde clicar, o que acontece e qual arquivo/função é responsável.

### Interações presentes em todas as páginas (`js/main.js`)

| Onde clicar / interagir | O que acontece |
|---|---|
| Botão **"Alerta Orbital"** (header) | Exibe faixa vermelha de emergência no topo da página, muda cor do header para vermelho. Clicar novamente desfaz. Usa `classList.add/remove('active')` e manipulação de `style`. |
| Campo de **busca** nas tabelas | Filtra as linhas da tabela em tempo real conforme o usuário digita. Usa `addEventListener('input')` + `elemento.hidden`. |

---

### `index.html` — Dashboard do Gerador (`js/dashboard-gerador.js`)

| Onde clicar / interagir | O que acontece |
|---|---|
| Campo **"Buscar lotes"** | Filtra a tabela de lotes em tempo real por ID ou tipo de resíduo. |
| **Gráfico de barras** | Renderizado automaticamente ao carregar a página via Chart.js. Exibe EcoCredits gerados nos últimos 6 meses. Tooltip com valor ao passar o mouse. |
| **Timers das propostas** | Contadores regressivos (hh:mm:ss) atualizados a cada 1 segundo via `setInterval`. Ficam vermelhos quando restam menos de 1 hora. |
| Botão **"Anunciar Lote"** | Exibe/oculta o bloco de formulário abaixo via `classList.toggle('hidden')`. Atualiza o atributo `aria-expanded`. |

---

### `comprador.html` — Dashboard do Comprador (`js/dashboard-comprador.js`)

| Onde clicar / interagir | O que acontece |
|---|---|
| Campo **"Buscar geradores"** | Filtra a tabela em tempo real por nome, tipo ou região. |
| Dropdown **"Tipo"** | Filtra a tabela pelos tipos: Orgânico, Plástico, Metal, Eletrônico, Óleo. Combinável com os outros filtros. |
| Dropdown **"Região"** | Filtra a tabela pela região do gerador. Combinável com os outros filtros. |
| **Gráfico de linha** | Renderizado automaticamente via Chart.js. Exibe tCO2e evitadas por mês. |

---

### `orbital.html` — Painel Orbital Público (`js/orbital.js`)

| Onde clicar / interagir | O que acontece |
|---|---|
| **Painel orbital ao vivo** | Atualiza automaticamente a cada **5 segundos** via `setInterval`. Troca região, valor de metano (ppb), badge de status e barra de score. Simula chegada de dados do satélite TROPOMI. |
| Campo **"Buscar regiões"** | Filtra a tabela de regiões monitoradas em tempo real. |

---

### `cadastro-lote.html` — Cadastro de Lote (`js/cadastro-lote.js`)

| Onde clicar / interagir | O que acontece |
|---|---|
| Dropdown **"Estado"** | Populado automaticamente ao carregar a página via **API IBGE** (`fetch`). Lista todos os estados do Brasil em ordem alfabética. |
| Dropdown **"Município"** | Desabilitado até o estado ser selecionado. Ao selecionar o estado, carrega os municípios via **API IBGE** com `fetch`. |
| Campos **"Tipo"** e **"Peso"** | Ao preencher os dois, o **EcoCredit estimado** é calculado em tempo real e exibido em tCO2e no card abaixo do formulário. Usa os mesmos fatores de emissão do IPCC 2006 do código Python. |
| Botão **"Cadastrar Lote"** | Valida todos os campos obrigatórios. Se houver erro, destaca o campo com borda vermelha e exibe mensagem descritiva abaixo — **sem `alert()` nativo**. Se válido, exibe mensagem de sucesso em verde e reseta o formulário. |
| Começar a digitar em campo com erro | Remove o estado de erro do campo automaticamente via `addEventListener('input')`. |

---

*EcoOrbit · FIAP Global Solution 2026 · Engenharia de Software 1º Ano · Semi Presencial RJ*
