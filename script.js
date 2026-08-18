const API_URL = 'http://localhost:3000/produtos';
let listaProdutos = [];

document.addEventListener('DOMContentLoaded', carregarProdutos);

async function carregarProdutos() {
    try {
        const res = await fetch(API_URL);
        listaProdutos = await res.json();
        
        const tabela = document.getElementById('corpo-tabela');
        if (!tabela) return;
        
        tabela.innerHTML = '';

        listaProdutos.forEach(produto => {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${produto.id}</td>
                <td>${produto.nome}</td>
                <td>${produto.categoria}</td>
                <td>R$ ${Number(produto.preco).toFixed(2)}</td>
                <td>${produto.quantidade_estoque}</td>
                <td>${produto.fornecedor}</td>
                <td>
                    <button class="btn-editar" onclick="prepararEdicao(${produto.id})">Editar</button>
                    <button class="btn-excluir" onclick="excluirProduto(${produto.id})">Excluir</button>
                </td>
            `;
            tabela.appendChild(linha);
        });
    } catch (err) {
        console.error('Erro ao carregar produtos:', err);
    }
}

const formCadastro = document.getElementById('form-cadastro');
if (formCadastro) {
    formCadastro.addEventListener('submit', async (e) => {
        e.preventDefault();

        const novoProduto = {
            nome: document.getElementById('nome').value,
            categoria: document.getElementById('categoria').value,
            preco: parseFloat(document.getElementById('preco').value),
            quantidade_estoque: parseInt(document.getElementById('quantidade').value),
            fornecedor: document.getElementById('fornecedor').value
        };

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(novoProduto)
            });

            if (res.ok) {
                alert('Produto cadastrado com sucesso!');
                formCadastro.reset();
                carregarProdutos();
            } else {
                const data = await res.json();
                alert(data.erro || 'Erro ao cadastrar.');
            }
        } catch (err) {
            console.error('Erro no cadastro:', err);
        }
    });
}

function prepararEdicao(id) {
    const produto = listaProdutos.find(p => p.id === id);
    if (!produto) return;

    document.getElementById('edit-id').value = produto.id;
    document.getElementById('edit-nome').value = produto.nome;
    document.getElementById('edit-categoria').value = produto.categoria;
    document.getElementById('edit-preco').value = produto.preco;
    document.getElementById('edit-quantidade').value = produto.quantidade_estoque;
    document.getElementById('edit-fornecedor').value = produto.fornecedor;

    document.getElementById('modal-edicao').classList.remove('hidden');
}

function fecharModal() {
    document.getElementById('modal-edicao').classList.add('hidden');
}

const formEditar = document.getElementById('form-editar-produto');
if (formEditar) {
    formEditar.addEventListener('submit', async (e) => {
        e.preventDefault();

        const id = document.getElementById('edit-id').value;
        const produtoAtualizado = {
            nome: document.getElementById('edit-nome').value,
            categoria: document.getElementById('edit-categoria').value,
            preco: parseFloat(document.getElementById('edit-preco').value),
            quantidade_estoque: parseInt(document.getElementById('edit-quantidade').value),
            fornecedor: document.getElementById('edit-fornecedor').value
        };

        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(produtoAtualizado)
            });

            const data = await res.json();

            if (res.ok) {
                alert(data.mensagem);
                fecharModal();
                carregarProdutos();
            } else {
                alert(data.erro || 'Erro ao atualizar.');
            }
        } catch (err) {
            console.error('Erro na edição:', err);
        }
    });
}

async function excluirProduto(id) {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;

    try {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        const data = await res.json();

        if (res.ok) {
            alert(data.mensagem);
            carregarProdutos();
        } else {
            alert(data.erro || 'Erro ao excluir.');
        }
    } catch (err) {
        console.error('Erro ao deletar:', err);
    }
}