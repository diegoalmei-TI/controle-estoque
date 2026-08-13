<p align="center">
  <img src="banner_controle_estoque.png" alt="Banner do Projeto" width="100%">
</p>
# 📦 Sistema de Gerenciamento de Controle de Estoque

Uma aplicação web full-stack simples, funcional e moderna, desenvolvida para a disciplina de **Ferramentas Web** (2º Período do Curso Técnico em TI - FAETEC).

---

## 🎯 Sobre o Projeto

O **Controle de Estoque** foi criado para otimizar o acompanhamento e a gestão de produtos em tempo real. O sistema resolve o problema de controle manual de inventário, permitindo o cadastro dinâmico de itens, consulta instantânea com filtros, atualização/edição de dados e cálculo automatizado do valor total acumulado no patrimônio.

Esta aplicação foi desenvolvida com base na **Opção 3** da lista de projetos práticos da disciplina.

---

## 🛠️ Tecnologias Utilizadas

- **Front-end:** HTML5 semântico, CSS3 e JavaScript (Fetch API / Async-Await)
- **Back-end:** Node.js com Express e CORS
- **Banco de Dados:** MySQL
- **Controle de Versão:** Git & GitHub

---

## 📌 Funcionalidades Principais

- [x] **Cadastro de Produtos:** Adição de novos itens com validação de campos (nome, categoria, preço, quantidade em estoque e fornecedor).
- [x] **Listagem Dinâmica:** Exibição dos produtos integrados diretamente ao banco de dados MySQL.
- [x] **Cálculo Automático (Desafio JS):** Atualização em tempo real do valor total acumulado em estoque (preço × quantidade).
- [x] **Filtro de Busca:** Pesquisa em tempo real por nome do produto ou categoria.
- [ ] **Edição de Produtos:** Rota `PUT` para alteração de cadastros no banco de dados *(em desenvolvimento para a versão v2.0.0)*.
- [ ] **Exclusão de Produtos:** Rota `DELETE` e remoção de itens no painel *(em desenvolvimento para a versão v2.0.0)*.

---

## 🚀 Como Executar a Aplicação Localmente

### Pré-requisitos
- Node.js instalado
- Servidor MySQL ativo localmente (via XAMPP, MySQL Workbench ou serviço do Windows)

### 1. Clonar o repositório
```bash
git clone [https://github.com/diegoalmei-TI/controle-estoque.git](https://github.com/diegoalmei-TI/controle-estoque.git)
cd controle-estoque
