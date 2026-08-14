document.addEventListener("DOMContentLoaded", () => { 
// Professor, usei o evento DOMContentLoaded para garantir que o 
script só comece a rodar 
// depois que o navegador tiver carregado toda a estrutura de tags 
da página HTML. 
const form = document.getElementById("form-produto"); 
const corpoTabela = document.getElementById("corpo-tabela"); 
const valorTotalEstoqueTxt = document.getElementById("valor-total
estoque"); 
const btnSalvar = document.getElementById("btn-salvar"); 
const campoBusca = document.getElementById("busca"); 
// Aqui eu defini a URL base do nosso servidor Node.js (Backend) que 
criamos na porta 3000. 
// Todas as requisições do site vão apontar para esse endereço 
local. 
const API_URL = "http://localhost:3000/produtos"; 
// FUNÇÃO REQUISITAR (GET): Busca os dados persistidos lá dentro da 
tabela do MySQL. 
async function carregarProdutos() { 
try { 
// Professor, utilizei o método 'fetch' com 'async/await' para fazer 
uma requisição assíncrona. 
// O site pede os dados ao servidor e aguarda a resposta sem travar 
a tela do usuário. 
const resposta = await fetch(API_URL);
const produtos = await resposta.json(); // aqui eu converto a 
resposta do servidor para JSON. 
renderizarTabela(produtos); // Passo a lista de produtos recebida 
para ser desenhada na tela. 
} catch (erro) { 
console.error("Erro ao buscar produtos do MySQL:", erro); 
} 
} 
 
// FUNÇÃO RENDERIZAR: Responsável por desenhar as linhas da tabela e 
calcular o desafio. 
function renderizarTabela(produtos) { 
corpoTabela.innerHTML = ""; // Limpo a tabela para não duplicar os 
itens na tela. 
let valorTotalGeral = 0; // Criei esta variável acumuladora para o 
Desafio JavaScript. 
 
produtos.forEach((produto, index) => { 
// Como mapeamos direto do banco, puxo o campo 'quantidade_estoque' 
exatamente igual à coluna do MySQL. 
const quantidade = produto.quantidade_estoque || produto.quantidade 
|| 0; 
 
// Aqui eu faço o cálculo matemático individual: Preço do produto 
multiplicado pela Quantidade. 
const valorTotalItem = produto.preco * quantidade; 
 
// Somo o valor desse item ao montante geral do estoque (Lógica do 
Desafio). 
valorTotalGeral += valorTotalItem; 
 
// Crio a linha estruturada no HTML e injeto os dados do objeto 
vindos do banco de dados. 
const tr = document.createElement("tr"); 
tr.innerHTML = ` 
<td>${produto.id || index + 1}</td> 
<td>${produto.nome}</td> 
<td>${produto.categoria}</td> 
<td>R$ ${parseFloat(produto.preco).toFixed(2)}</td> 
<td>${quantidade}</td> 
<td>${produto.fornecedor}</td> 
<td> 
<button class="btn-excluir" data-id="${produto.id}" 
style="background-color: #e74c3c; padding: 5px 10px; color: white; 
border: none; cursor: pointer;">Excluir</button> 
</td> 
`; 
corpoTabela.appendChild(tr); 
}); 
 
// Professor, aqui eu atualizo o painel do Desafio na tela, travando 
em duas casas decimais com o 'toFixed(2)'. 
valorTotalEstoqueTxt.textContent = valorTotalGeral.toFixed(2); 
}
// EVENTO DE SUBMIT (POST): Intercepta o clique no botão Salvar e 
manda os dados para o MySQL. 
form.onsubmit = async (e) => { 
e.preventDefault(); // Comando crucial para impedir que a página 
recarregue e perca o fluxo. 
 
// Capturo os valores digitados pelo usuário em cada campo do 
formulário. 
const nome = document.getElementById("nome").value; 
const categoria = document.getElementById("categoria").value; 
const preco = parseFloat(document.getElementById("preco").value); 
const quantidade_estoque = 
parseInt(document.getElementById("quantidade").value); 
const fornecedor = document.getElementById("fornecedor").value; 
 
// Monto um objeto estruturado em JavaScript com os dados coletados. 
const novoProduto = { nome, categoria, preco, quantidade_estoque, 
fornecedor }; 
 
try { 
// Faço uma requisição POST enviando o produto no corpo da mensagem 
(body) em formato de texto JSON. 
const resposta = await fetch(API_URL, { 
method: "POST", 
headers: { 
"Content-Type": "application/json" 
}, 
body: JSON.stringify(novoProduto) 
}); 
 
if (resposta.ok) { 
form.reset(); // Se o servidor gravou com sucesso no MySQL, eu limpo 
os campos do formulário. 
carregarProdutos(); // E chamo a função para recarregar a tabela 
atualizada com o novo item do banco. 
} 
} catch (erro) { 
console.error("Erro ao salvar produto no banco:", erro); 
} 
}; 
 
// LÓGICA DA BUSCA DINÂMICA: Filtro local na tabela em tempo real. 
if (campoBusca) { 
campoBusca.addEventListener("input", (e) => { 
// Converto o termo digitado para letras minúsculas para a busca não 
diferenciar maiúsculas de minúsculas. 
const termoBusca = e.target.value.toLowerCase(); 
const linhas = corpoTabela.querySelectorAll("tr"); 
 
linhas.forEach(linha => { 
// Capturo o texto contido nas células de Nome (Coluna 1) e 
Categoria (Coluna 2). 
const nomeProduto = linha.cells[1].textContent.toLowerCase(); 
const categoriaProduto = linha.cells[2].textContent.toLowerCase(); 
 
// Se o termo digitado existir no nome ou na categoria, a linha 
continua visível. 
// Caso contrário, eu mudo o display para 'none' para ocultar o 
registro temporariamente. 
if (nomeProduto.includes(termoBusca) || 
categoriaProduto.includes(termoBusca)) { 
linha.style.display = ""; 
} else { 
linha.style.display = "none"; 
} 
}); 
}); 
} 
 
// INICIALIZAÇÃO: Assim que o portal abre, ele dispara o gatilho 
para trazer os dados guardados no MySQL. 
carregarProdutos(); 
});