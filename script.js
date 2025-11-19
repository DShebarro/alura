let dados = [];

// Baseado no linha 14
async function iniciarBusca() {
    let resposta = await fetch("data.json");
    dados = await resposta.json();
    console.log(dados);

}