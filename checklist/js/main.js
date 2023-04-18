const form = document.getElementById("novoItem");
const listaAdd = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach((elemento) => {
  criaElemento(elemento);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nome = e.target.elements["nome"];
  const quantidade = e.target.elements["quantidade"];

  const existente = itens.find((elemento) => elemento.nome === nome.value);

  const itemAtual = {
    nome: nome.value,
    quantidade: quantidade.value,
  };

  if (existente) {
    itemAtual.id = existente.id;

    atualizaElemento(itemAtual);

    itens[itens.findIndex((elemento) => elemento.id === existente.id)] =
      itemAtual;
  } else {
    itemAtual.id = itens[itens.length - 1] ? itens[itens.length - 1].id + 1 : 0;

    criaElemento(itemAtual);

    itens.push(itemAtual);
  }

  localStorage.setItem("itens", JSON.stringify(itens));

  nome.value = "";
  quantidade.value = "";
});

function criaElemento(item) {
  const novoItem = document.createElement("li");
  novoItem.classList.add("item");

  const numeroitem = document.createElement("strong");
  numeroitem.innerHTML = item.quantidade;
  numeroitem.dataset.id = item.id;

  novoItem.appendChild(numeroitem);
  novoItem.innerHTML += item.nome;
  novoItem.appendChild(botaoDeleta(item.id));

  listaAdd.appendChild(novoItem);
}

function atualizaElemento(item) {
  document.querySelector("[data-id='" + item.id + "']").innerHTML =
    item.quantidade;
}

function botaoDeleta(id) {
  const elementoBotao = document.createElement("button");
  elementoBotao.innerText = "X";

  elementoBotao.addEventListener("click", function () {
    deletaElemento(this.parentNode, id);
  });

  return elementoBotao;
}

function deletaElemento(tag, id) {
  tag.remove();

  itens.splice(
    itens.findIndex((elemento) => elemento.id === id),
    1
  );
  localStorage.setItem("itens", JSON.stringify(itens));
}
