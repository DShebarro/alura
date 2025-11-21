let cardContainer = document.querySelector(".card-container");

let dados = [];

async function carregarDados() {
  let resposta = await fetch("data.json");

  dados = await resposta.json();

  mostrarMensagemInicial();
}

function mostrarMensagemInicial() {
  cardContainer.innerHTML = `

    <div class="mensagem-inicial">

      <h2>O que você está procurando para estudar?</h2>

      <p>Use a barra de busca acima para encontrar informações sobre linguagens de programação e tecnologias.</p>

    </div>

  `;
}

function iniciarBusca() {
  const termoBusca = document

    .getElementById("search-input")

    .value.toLowerCase();

  if (termoBusca.trim() === "") {
    mostrarMensagemInicial();

    return;
  }

  const resultados = dados.filter((dado) =>
    dado.nome.toLowerCase().includes(termoBusca)
  );

  if (resultados.length === 0) {
    cardContainer.innerHTML = `

      <div class="mensagem-inicial">

        <h2>Nenhum resultado encontrado.</h2>

        <p>Tente buscar por outro termo.</p>

      </div>

    `;
  } else {
    renderizarCards(resultados);
  }
}

function renderizarCards(dados) {
  cardContainer.innerHTML = ""; // Limpa os cards existentes

  for (let dado of dados) {
    let article = document.createElement("article");

    article.classList.add("card");

    article.innerHTML = `

        <h2>${dado.nome}</h2>

        <p>Ano de criação: ${dado.ano}</p>

        <p>${dado.descricao}</p>

        <a href="${dado.link}" target="_blank">Saiba mais</a>

        `;

    cardContainer.appendChild(article);
  }
}

// Carrega os dados iniciais ao carregar a página

carregarDados();
