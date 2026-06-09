const ctxEcoCredit = document.getElementById('grafico-ecocredit');

if (ctxEcoCredit) {
  new Chart(ctxEcoCredit, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
      datasets: [{
        label: 'EcoCredits gerados (tCO2e)',
        data: [1.2, 2.4, 1.8, 3.1, 2.7, 4.28],
        backgroundColor: 'rgba(0, 180, 216, 0.7)',
        borderColor: '#00b4d8',
        borderWidth: 1,
        borderRadius: 6,
        borderSkipped: false
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

const propostas = [
  { id: 'timer-1', totalSegundos: 2 * 3600 + 34 * 60 + 10 },
  { id: 'timer-2', totalSegundos: 5 * 3600 + 12 * 60 + 40 },
  { id: 'timer-3', totalSegundos: 11 * 3600 + 58 * 60 + 20 }
];

function formatarTempo(segundos) {
  if (segundos <= 0) return 'Expirado';
  const h = Math.floor(segundos / 3600);
  const m = Math.floor((segundos % 3600) / 60);
  const s = segundos % 60;
  return `Expira em ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

propostas.forEach(function (proposta) {
  const el = document.getElementById(proposta.id);
  if (!el) return;

  let restante = proposta.totalSegundos;

  const intervalo = setInterval(function () {
    restante--;
    el.textContent = formatarTempo(restante);

    if (restante <= 3600) {
      el.style.color = 'var(--color-alert)';
    }

    if (restante <= 0) {
      clearInterval(intervalo);
      el.textContent = 'Proposta Expirada';
      el.style.color = 'var(--color-text-muted)';
    }
  }, 1000);
});

iniciarFiltroBusca('busca-lotes', 'tabela-lotes');
