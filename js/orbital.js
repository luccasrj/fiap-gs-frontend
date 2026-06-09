const dadosSatelitais = [
  { regiao: 'Belém-PA',   metano_ppb: 1847, status: 'ALERTA',      score: 87, classificacao: 'LIXAO_CONFIRMADO' },
  { regiao: 'Manaus-AM',  metano_ppb: 1812, status: 'MONITORANDO', score: 62, classificacao: 'RISCO_MEDIO'      },
  { regiao: 'Recife-PE',  metano_ppb: 1798, status: 'NORMAL',      score: 31, classificacao: 'NORMAL'           },
  { regiao: 'Goiânia-GO', metano_ppb: 1831, status: 'ALERTA',      score: 75, classificacao: 'RISCO_MEDIO'      }
];

const elRegiao     = document.getElementById('regiao-atual');
const elMetano     = document.getElementById('metano-valor');
const elBadge      = document.getElementById('status-badge');
const elScoreBar   = document.getElementById('score-bar');
const elScoreValor = document.getElementById('score-valor');

function atualizarPainelOrbital(dado) {
  if (!elRegiao) return;

  elRegiao.textContent = dado.regiao;
  elMetano.textContent = dado.metano_ppb.toLocaleString('pt-BR') + ' ppb';

  elBadge.textContent = dado.status;
  elBadge.className = 'badge';
  if (dado.status === 'ALERTA') {
    elBadge.classList.add('badge--alert');
  } else if (dado.status === 'MONITORANDO') {
    elBadge.classList.add('badge--monitoring');
  } else {
    elBadge.classList.add('badge--normal');
  }

  elScoreBar.classList.remove('progress-bar--alert', 'progress-bar--warn', 'progress-bar--cyan');
  if (dado.score >= 70) {
    elScoreBar.classList.add('progress-bar--alert');
  } else if (dado.score >= 40) {
    elScoreBar.classList.add('progress-bar--warn');
  } else {
    elScoreBar.classList.add('progress-bar--cyan');
  }

  elScoreBar.style.width = dado.score + '%';
  elScoreBar.setAttribute('aria-valuenow', dado.score);

  if (elScoreValor) {
    elScoreValor.textContent = dado.score + ' / 100';
  }
}

atualizarPainelOrbital(dadosSatelitais[0]);

let indexSatelite = 0;

setInterval(function () {
  indexSatelite = (indexSatelite + 1) % dadosSatelitais.length;
  atualizarPainelOrbital(dadosSatelitais[indexSatelite]);
}, 5000);

iniciarFiltroBusca('busca-regioes', 'tabela-regioes');
