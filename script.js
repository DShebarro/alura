const cardContainer = document.getElementById("card-container");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const themeToggle = document.getElementById("theme-toggle");
let dados = [];

// --- Lógica do Modo Escuro ---

// Verifica a preferência do usuário no localStorage
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    themeToggle.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    themeToggle.textContent = "🌙";
  }
});

// Adiciona um ouvinte de evento para o formulário de busca
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  iniciarBusca();
});

// Carrega o JSON externo
async function carregarDados() {
  const response = await fetch("data.json");
  dados = await response.json();
  mostrarMensagemInicial();
}

function mostrarMensagemInicial() {
  cardContainer.innerHTML = `
        <div class="mensagem">
            <h2>O que você quer aprender hoje?</h2>
            <p>Use a barra de busca acima para explorar linguagens.</p>
        </div>
    `;
}

function iniciarBusca() {
  const termo = searchInput.value.toLowerCase();

  if (termo === "") return mostrarMensagemInicial();

  const resultados = dados.filter((item) =>
    item.nome.toLowerCase().includes(termo)
  );

  if (!resultados.length) {
    cardContainer.innerHTML = `<div class="mensagem"><p>Nenhum resultado encontrado para "${searchInput.value}".</p></div>`;
    return;
  }

  renderizarCards(resultados);
}

function renderizarCards(lista) {
  cardContainer.innerHTML = "";

  lista.forEach((item, index) => {
    const card = document.createElement("article");
    card.classList.add("card");

    card.innerHTML = `
            <h2>${item.nome}</h2>
            <p><strong>Ano:</strong> ${item.ano}</p>
            <p>${item.descricao}</p>
            <a href="${item.link}" target="_blank">Ver mais</a>

            <button onclick="gerarExemplo('${item.nome}', ${index})">
                Gerar exemplo
            </button>

            <div id="exemplo-${index}" class="hidden"></div>
        `;

    cardContainer.appendChild(card);
  });
}

// Exemplo simples (versão sem API) - Eu estou estudando para começar a usar uma API
function gerarExemplo(linguagem, id) {
  const area = document.getElementById(`exemplo-${id}`);

  const exemplos = {
    JavaScript: {
      codigo: "console.log('Hello World');",
      saida: "Hello World",
      texto: "Este é o comando básico para imprimir mensagens.",
    },
    Python: {
      codigo: "print('Olá Mundo')",
      saida: "Olá Mundo",
      texto: "A função print exibe texto na tela.",
    },
    Java: {
      codigo:
        'public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
      saida: "Hello, World!",
      texto:
        "Em Java, o método System.out.println() é usado para imprimir na console.",
    },
    "C#": {
      codigo: 'Console.WriteLine("Hello, World!");',
      saida: "Hello, World!",
      texto: "Em C#, Console.WriteLine() é usado para exibir texto no console.",
    },
    Go: {
      codigo:
        'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}',
      saida: "Hello, World!",
      texto: "Em Go, a função Println do pacote fmt é usada para imprimir.",
    },
    Swift: {
      codigo: 'print("Hello, World!")',
      saida: "Hello, World!",
      texto: "Em Swift, a função print() é usada para exibir saídas.",
    },
    Kotlin: {
      codigo: 'fun main() {\n    println("Hello, World!")\n}',
      saida: "Hello, World!",
      texto:
        "Em Kotlin, a função println() é usada para imprimir texto na console.",
    },
    Rust: {
      codigo: 'fn main() {\n    println!("Hello, World!");\n}',
      saida: "Hello, World!",
      texto: "Em Rust, a macro println! é usada para imprimir na console.",
    },
    TypeScript: {
      codigo: "console.log('Hello, World!');",
      saida: "Hello, World!",
      texto:
        "Como um superset do JavaScript, TypeScript usa console.log() para saídas.",
    },
    PHP: {
      codigo: "<?php\n    echo 'Hello, World!';\n?>",
      saida: "Hello, World!",
      texto: "Em PHP, o comando echo é usado para exibir strings.",
    },
  };

  const ex = exemplos[linguagem] || {
    codigo: "// exemplo indisponível",
    saida: "",
    texto: "Desculpe, ainda não temos um exemplo para esta linguagem.",
  };

  area.classList.remove("hidden");
  area.innerHTML = `
        <div class="terminal-bg">
            <pre class="code-area">${ex.codigo}</pre>
            <p><strong>Saída:</strong> ${ex.saida}</p>
            <p>${ex.texto}</p>
        </div>
    `;
}

carregarDados();
