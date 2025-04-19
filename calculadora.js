// Elementos do DOM
const selects = ['armor', 'boots', 'gloves', 'weapon', 'helmet'];
const statusLista = document.getElementById('status-lista');
const calcularBtn = document.getElementById('calcular');

// Carregar os dados do JSON
let equipamentos = {};

fetch('equipamentos.json')
  .then(response => response.json())
  .then(data => {
    equipamentos = data;
    preencherDropdowns();
  })
  .catch(error => {
    console.error('Erro ao carregar o JSON:', error);
  });

// Preenche os dropdowns com os itens do JSON
function preencherDropdowns() {
  selects.forEach(categoria => {
    const selectElement = document.getElementById(categoria);
    if (equipamentos[categoria]) {
      equipamentos[categoria].forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = `${item.nome} (Nivel ${item.nivel})`;
        selectElement.appendChild(option);
      });
    }
  });
}

// Calcula e exibe os status totais
calcularBtn.addEventListener('click', () => {
  let total = {
    vida: 0,
    ataque: 0,
    armadura: 0,
    evasão: 0,
    crítico: 0,
    aceleração: 0
  };

  selects.forEach(categoria => {
    const select = document.getElementById(categoria);
    const idSelecionado = select.value;

    const item = equipamentos[categoria].find(eq => eq.id === idSelecionado);
    if (item) {
      total.vida += item.vida || 0;
      total.ataque += item.ataque || 0;
      total.armadura += item.armadura || 0;
      total.evasão += item.evasão || 0;
      total.crítico += item.crítico || 0;
      total.aceleração += item.aceleração || 0;
    }
  });

  exibirResultado(total);
});

// Exibe os resultados na tela
function exibirResultado(total) {
  statusLista.innerHTML = '';
  for (const [chave, valor] of Object.entries(total)) {
    const li = document.createElement('li');
    li.textContent = `${chave.charAt(0).toUpperCase() + chave.slice(1)}: ${valor}`;
    statusLista.appendChild(li);
  }
}
