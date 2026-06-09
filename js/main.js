const btnEmergency = document.getElementById('btn-emergency');
const emergencyBanner = document.getElementById('emergency-banner');
const pageHeader = document.querySelector('.page-header');

let emergencyActive = false;

if (btnEmergency) {
  btnEmergency.addEventListener('click', function () {
    emergencyActive = !emergencyActive;

    if (emergencyActive) {
      emergencyBanner.classList.add('active');
      pageHeader.style.borderBottomColor = 'var(--color-alert)';
      pageHeader.style.background = 'rgba(239, 68, 68, 0.08)';
      btnEmergency.textContent = 'Desativar Alerta';
      btnEmergency.setAttribute('aria-pressed', 'true');
    } else {
      emergencyBanner.classList.remove('active');
      pageHeader.style.borderBottomColor = '';
      pageHeader.style.background = '';
      btnEmergency.innerHTML = `
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
        Alerta Orbital`;
      btnEmergency.setAttribute('aria-pressed', 'false');
    }
  });
}

const btnAnunciar = document.getElementById('btn-anunciar-lote');
const formAnunciar = document.getElementById('form-anunciar');

if (btnAnunciar && formAnunciar) {
  btnAnunciar.addEventListener('click', function () {
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    formAnunciar.classList.toggle('hidden');
    this.setAttribute('aria-expanded', String(!isExpanded));
    this.textContent = isExpanded ? '+ Anunciar Lote' : '− Fechar';
  });
}

function iniciarFiltroBusca(inputId, tabelaId) {
  const input = document.getElementById(inputId);
  const tabela = document.getElementById(tabelaId);

  if (!input || !tabela) return;

  const tbody = tabela.querySelector('tbody');

  input.addEventListener('input', function () {
    const termo = this.value.toLowerCase().trim();
    const linhas = tbody.querySelectorAll('tr');

    linhas.forEach(function (linha) {
      const textoLinha = linha.textContent.toLowerCase();
      linha.hidden = termo.length > 0 && !textoLinha.includes(termo);
    });

    const visiveis = Array.from(linhas).filter(l => !l.hidden).length;
    input.setAttribute('aria-label',
      `Buscar — ${visiveis} resultado${visiveis !== 1 ? 's' : ''} encontrado${visiveis !== 1 ? 's' : ''}`
    );
  });
}
