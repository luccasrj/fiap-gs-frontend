const ctxImpacto = document.getElementById('grafico-impacto');

if (ctxImpacto) {
  new Chart(ctxImpacto, {
    type: 'line',
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
      datasets: [{
        label: 'tCO2e evitadas',
        data: [0.08, 0.15, 0.21, 0.34, 0.41, 0.29],
        borderColor: '#06d6a0',
        backgroundColor: 'rgba(6, 214, 160, 0.1)',
        borderWidth: 2,
        pointBackgroundColor: '#06d6a0',
        pointRadius: 4,
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: '#94a3b8',
            font: { family: "'Space Grotesk', sans-serif", size: 12 }
          }
        },
        tooltip: {
          backgroundColor: '#111827',
          titleColor: '#e2e8f0',
          bodyColor: '#94a3b8',
          borderColor: '#1e2d45',
          borderWidth: 1,
          callbacks: {
            label: function (ctx) {
              return ' ' + ctx.parsed.y.toFixed(4) + ' tCO2e';
            }
          }
        }
      },
      scales: {
        x: {
          ticks: { color: '#94a3b8' },
          grid: { color: '#1e2d45' }
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: '#94a3b8',
            callback: function (val) { return val + ' t'; }
          },
          grid: { color: '#1e2d45' }
        }
      }
    }
  });
}

const inputBuscaGeradores = document.getElementById('busca-geradores');
const filtroTipo = document.getElementById('filtro-tipo');
const filtroRegiao = document.getElementById('filtro-regiao');
const tbodyGeradores = document.getElementById('tbody-geradores');

function aplicarFiltros() {
  if (!tbodyGeradores) return;

  const termoBusca = inputBuscaGeradores ? inputBuscaGeradores.value.toLowerCase().trim() : '';
  const tipoSelecionado = filtroTipo ? filtroTipo.value.toLowerCase() : '';
  const regiaoSelecionada = filtroRegiao ? filtroRegiao.value.toLowerCase() : '';

  const linhas = tbodyGeradores.querySelectorAll('tr');

  linhas.forEach(function (linha) {
    const texto = linha.textContent.toLowerCase();

    const passaBusca = termoBusca === '' || texto.includes(termoBusca);
    const passaTipo = tipoSelecionado === '' || texto.includes(tipoSelecionado);
    const passaRegiao = regiaoSelecionada === '' || texto.includes(regiaoSelecionada.replace('-', ' ').replace(/[a-z]+$/, '').trim()) || texto.includes(regiaoSelecionada);

    linha.hidden = !(passaBusca && passaTipo && passaRegiao);
  });
}

if (inputBuscaGeradores) {
  inputBuscaGeradores.addEventListener('input', aplicarFiltros);
}

if (filtroTipo) {
  filtroTipo.addEventListener('change', aplicarFiltros);
}

if (filtroRegiao) {
  filtroRegiao.addEventListener('change', aplicarFiltros);
}
