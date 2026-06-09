const FATORES_EMISSAO = {
  organico:   1.3,
  plastico:   0.04,
  metal:      0.001,
  eletronico: 0.08,
  oleo:       0.5
};

function calcularEcoCredit(pesoKg, tipoResiduo) {
  const fator = FATORES_EMISSAO[tipoResiduo];
  if (!fator || pesoKg <= 0) return 0;
  const metanoKg = pesoKg * fator;
  const co2Equivalente = metanoKg * 80;
  return parseFloat((co2Equivalente / 1000).toFixed(4));
}

const selectTipo       = document.getElementById('tipo-residuo');
const inputPeso        = document.getElementById('peso-kg');
const previewEcoCredit = document.getElementById('preview-ecocredit');

if (inputPeso) {
  inputPeso.addEventListener('keydown', function (e) {
    const permitidas = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];
    if (permitidas.includes(e.key)) return;
    if (e.ctrlKey || e.metaKey) return;
    if (!/^\d$/.test(e.key)) e.preventDefault();
  });

  inputPeso.addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '');
  });
}

function atualizarPreview() {
  if (!previewEcoCredit) return;
  const tipo = selectTipo ? selectTipo.value : '';
  const peso = inputPeso ? parseFloat(inputPeso.value) : 0;

  if (tipo && peso > 0) {
    const credito = calcularEcoCredit(peso, tipo);
    previewEcoCredit.innerHTML = credito.toFixed(4) + ' <span class="kpi-unit">tCO2e</span>';
  } else {
    previewEcoCredit.innerHTML = '— <span class="kpi-unit">tCO2e</span>';
  }
}

if (selectTipo) selectTipo.addEventListener('change', atualizarPreview);
if (inputPeso)  inputPeso.addEventListener('input', atualizarPreview);

const selectEstado    = document.getElementById('select-estado');
const selectMunicipio = document.getElementById('select-municipio');

if (selectEstado) {
  fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
    .then(function (res) { return res.json(); })
    .then(function (estados) {
      selectEstado.innerHTML = '<option value="">Selecione o estado</option>';
      estados.forEach(function (estado) {
        const option = document.createElement('option');
        option.value = estado.sigla;
        option.textContent = estado.nome;
        selectEstado.appendChild(option);
      });
    })
    .catch(function () {
      selectEstado.innerHTML = '<option value="">Erro ao carregar estados</option>';
    });
}

function carregarMunicipios(uf) {
  if (!selectMunicipio) return;
  selectMunicipio.disabled = true;
  selectMunicipio.innerHTML = '<option value="">Carregando municípios...</option>';

  fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados/' + uf + '/municipios')
    .then(function (res) { return res.json(); })
    .then(function (municipios) {
      selectMunicipio.innerHTML = '<option value="">Selecione o município</option>';
      municipios.forEach(function (m) {
        const option = document.createElement('option');
        option.value = m.nome;
        option.textContent = m.nome;
        selectMunicipio.appendChild(option);
      });
      selectMunicipio.disabled = false;
    })
    .catch(function () {
      selectMunicipio.innerHTML = '<option value="">Erro ao carregar municípios</option>';
      selectMunicipio.disabled = false;
    });
}

if (selectEstado) {
  selectEstado.addEventListener('change', function () {
    if (this.value) {
      carregarMunicipios(this.value);
    } else {
      selectMunicipio.innerHTML = '<option value="">Selecione o estado primeiro</option>';
      selectMunicipio.disabled = true;
    }
  });
}

const form        = document.getElementById('form-cadastro-lote');
const formSuccess = document.getElementById('form-success');

function validarCampo(groupId, valor) {
  const group = document.getElementById(groupId);
  if (!group) return true;
  const vazio = !valor || valor.trim() === '' || valor === '0';
  if (vazio) {
    group.classList.add('has-error');
    return false;
  }
  group.classList.remove('has-error');
  return true;
}

function validarNumero(groupId, valor) {
  const group = document.getElementById(groupId);
  if (!group) return true;
  const num = parseFloat(valor);
  const invalido = isNaN(num) || num <= 0;
  if (invalido) {
    group.classList.add('has-error');
    return false;
  }
  group.classList.remove('has-error');
  return true;
}

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const tipo       = document.getElementById('tipo-residuo')?.value || '';
    const peso       = document.getElementById('peso-kg')?.value || '';
    const frequencia = document.getElementById('frequencia')?.value || '';
    const estado     = document.getElementById('select-estado')?.value || '';
    const municipio  = document.getElementById('select-municipio')?.value || '';
    const endereco   = document.getElementById('endereco')?.value || '';
    const disponivel = document.getElementById('disponibilidade')?.value || '';

    const valido = [
      validarCampo('group-tipo', tipo),
      validarNumero('group-peso', peso),
      validarCampo('group-frequencia', frequencia),
      validarCampo('group-estado', estado),
      validarCampo('group-municipio', municipio),
      validarCampo('group-endereco', endereco),
      validarCampo('group-disponibilidade', disponivel)
    ].every(Boolean);

    if (!valido) {
      const primeiroErro = form.querySelector('.has-error');
      if (primeiroErro) {
        primeiroErro.scrollIntoView({ behavior: 'smooth', block: 'center' });
        primeiroErro.querySelector('input, select, textarea')?.focus();
      }
      return;
    }

    if (formSuccess) {
      formSuccess.classList.remove('hidden');
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    form.reset();
    if (previewEcoCredit) {
      previewEcoCredit.innerHTML = '— <span class="kpi-unit">tCO2e</span>';
    }
    if (selectMunicipio) {
      selectMunicipio.innerHTML = '<option value="">Selecione o estado primeiro</option>';
      selectMunicipio.disabled = true;
    }

    setTimeout(function () {
      formSuccess.classList.add('hidden');
    }, 6000);
  });

  form.addEventListener('input', function (e) {
    const group = e.target.closest('.form-group');
    if (group && group.classList.contains('has-error') && e.target.value.trim() !== '') {
      group.classList.remove('has-error');
    }
  });

  form.addEventListener('change', function (e) {
    const group = e.target.closest('.form-group');
    if (group && group.classList.contains('has-error') && e.target.value !== '') {
      group.classList.remove('has-error');
    }
  });
}
