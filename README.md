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
Página principal. Exibe KPIs (EcoCredits, receita, toneladas desviadas, propostas recebidas), tabela de lotes e feed de propostas recebidas.

### 2. `comprador.html` — Dashboard do Comprador
Tabela de geradores disponíveis com filtros por tipo de resíduo e região. Exibe indicadores de impacto acumulado.

### 3. `orbital.html` — Painel Orbital Público
Acesso livre, sem autenticação. Tabela de 4 regiões monitoradas com score de risco de lixão, índice NDVI, focos de calor e concentração de metano.

### 4. `cadastro-lote.html` — Cadastro de Lote (RF02)
Formulário completo com campos: tipo de resíduo, peso estimado, frequência de geração, estado, município, endereço, condição de armazenamento, data de disponibilidade e observações.

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

- **Display/Títulos**: `Exo 2` — geométrica, futurista, legível. Usada em headings, valores de KPI.
- **Corpo**: `Space Grotesk` — humanista, moderna, boa legibilidade em interfaces densas de dados.
- **Monospace**: `JetBrains Mono` — para valores numéricos (metano em ppb, EcoCredits em tCO2e, IDs de lote).

Fontes genéricas como Arial, Roboto e Inter foram descartadas por não transmitirem a identidade tecnológica que o produto exige.

---

## Moodboard — Análise Crítica de Referências Visuais

As referências estão na pasta `assets/moodboard/`.

### Referência 1 — NASA Earthdata Dashboard
**O que aproveitei:** A combinação de dark mode com dados satelitais em tempo real. O padrão de apresentar métricas em tipografia monospaced sobre fundo escuro.

**O que descartei:** A complexidade dos mapas interativos e a densidade excessiva de informação.

**Impacto no EcoOrbit:** O painel orbital usa badge animado e fonte mono para PPB.

---

### Referência 2 — Grafana Dark Dashboard
**O que aproveitei:** Cards de KPI com borda colorida lateral como indicador semântico de estado. O uso de cores de acento só para dados relevantes.

**O que descartei:** A sobrecarga de gráficos em cada card.

**Impacto no EcoOrbit:** Os `card-kpi` têm `border-left` colorida como único indicador visual de categoria.

---

### Referência 3 — Linear App (Interface de Produto)
**O que aproveitei:** A navegação lateral com ícones + texto que colapsa em mobile. O sistema de badges para status.

**O que descartei:** O esquema de cores claro.

**Impacto no EcoOrbit:** O componente `.nav-sidebar` e os `.badge` foram inspirados nessa referência.

---

### Referência 4 — ESA Open Access Hub (Copernicus)
**O que aproveitei:** O badge "LIVE" com ponto animado para indicar dados em tempo real. A terminologia técnica apresentada sem ser pedante.

**O que descartei:** O layout antigo com tabelas pesadas e ausência de hierarquia visual moderna.

**Impacto no EcoOrbit:** O `.orbital-live-badge` com `.orbital-live-dot` animado vem dessa referência.

---

### Referência 5 — Stripe Dashboard (Fintech)
**O que aproveitei:** O feed de transações recentes como componente de "feed de propostas". O timer de expiração para criar urgência.

**O que descartei:** A paleta azul corporativa e o foco em dados financeiros puros.

**Impacto no EcoOrbit:** O componente `.proposal-feed` e os `.kpi-delta` vêm dessa referência.

---

### Referência 6 — Ecosia / Sustainability Dashboards
**O que aproveitei:** O uso de ícones de impacto ambiental com métricas simples. A linguagem acessível para comunicar dados técnicos.

**O que descartei:** O design excessivamente "eco-friendly" com verdes pastel e fontes orgânicas.

**Impacto no EcoOrbit:** Os `.impact-card` no dashboard do comprador vêm dessa referência.

---

## Decisões de Responsividade

| Breakpoint | Comportamento |
|---|---|
| `≥ 1440px` | Grid de 4 KPIs lado a lado. Padding generoso. Max-width de 1600px centralizado. |
| `768px–1439px` | Sidebar colapsa para ícones (64px). Grid de 2 KPIs. Tabelas com scroll horizontal. |
| `480px–767px` | Sidebar colapsa para ícones (64px). Grid de 1 KPI por linha. Botões em coluna. |
| `≤ 480px` | Sidebar oculta. Layout de coluna única. Tabelas com scroll horizontal. |

---

## Componentes CSS

Todos definidos em `css/style.css` com tokens de design via variáveis CSS:

- `.card-kpi` + `.card-kpi--cyan/green/alert/warn` — cards de KPI com borda colorida lateral
- `.badge--verified/conditional/review` — Selo Orbital nas 3 variações
- `.badge--processed/pending/alert/monitoring/normal` — status de lote e região
- `.data-table` — tabela de lotes com colunas ID, tipo, peso, status, EcoCredit
- `.alert--critical/warning/success/info` — alertas de status com cor e ícone
- `.form-group` + `.form-input/.form-select/.form-textarea` — campos do formulário de lote
- `.nav-sidebar` — navegação lateral com collapse responsivo
- `.orbital-live-badge` + `.orbital-live-dot` — badge animado de dados ao vivo
- `.progress-bar` — barra de score de risco
- `.proposal-item` + `.proposal-timer` — feed de propostas

---

## Acessibilidade

- Contraste WCAG AA garantido: texto primário (`#e2e8f0`) sobre fundo (`#0a0e1a`) = ratio 14.5:1
- Formulários com `label` associado via `for/id`, `aria-required`, `aria-describedby`
- Alertas com `role="alert"` e `aria-live="assertive"` para leitores de tela
- Navegação com `aria-label` e `aria-current="page"`
- Tabelas com `scope="col"` nos cabeçalhos
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
- [x] Breakpoints: 320px, 768px, 1440px definidos no CSS

---

*EcoOrbit · FIAP Global Solution 2026 · Engenharia de Software 1º Ano · Semi Presencial RJ*
