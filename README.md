<p align="center">
  <img src="banner_controle_estoque.png" alt="Banner do Projeto" width="100%">
</p>

# 📦 Sistema de Controle de Estoque - Versão 2.0

Sistema web para gerenciamento e controle de estoque de produtos, desenvolvido com Node.js, Express, MySQL, HTML5, CSS3 e JavaScript.

> 📌 **Projeto Acadêmico:** Este é o **Projeto 3** desenvolvido para a disciplina de **Ferramentas Web**, ministrada pelo professor da instituição. O objetivo principal do projeto é aplicar na prática os conceitos de desenvolvimento web, integração com banco de dados MySQL e criação de APIs REST com Node.js.

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

* **Node.js** (com o gerenciador de pacotes **npm**)
* **MySQL Server** (ou MySQL Workbench)

---

## 🗄️ Banco de Dados

Para criar o banco de dados e a tabela necessária para o funcionamento do sistema, basta executar o script SQL contido no arquivo **`schema.sql`** (disponível na raiz deste repositório) dentro do seu cliente MySQL.

---

## 🆕 O que mudou na Versão 2.0?

Diferente da versão anterior (v1.0), a **Versão 2.0** implementa um **CRUD completo** diretamente integrado ao banco de dados MySQL via API REST:

* **✏️ Alterar / Editar (PUT):** Atualização de dados dos produtos cadastrados utilizando uma janela modal interativa sem recarregar a página.
* **🗑️ Excluir (DELETE):** Remoção direta de produtos pela tabela com confirmação de segurança, limpando o registro no banco em tempo real.
* **🌐 Conexão Backend:** Comunicação assíncrona usando `fetch()` entre a interface web e a API em Node.js.

---

## 🛠️ Tecnologias Utilizadas

* **Frontend:** HTML5, CSS3, JavaScript (Fetch API)
* **Backend:** Node.js, Express, CORS
* **Banco de Dados:** MySQL (`mysql2`)

---

## 💻 Como Executar no PowerShell (Localmente)

Abra o **Windows PowerShell** e navegue até a pasta onde deseja salvar o projeto:

1. **se necessário pode Clonar este repositório:**
   ```powershell
   git clone [https://github.com/diegoalmei-TI/controle-estoque.git](https://github.com/diegoalmei-TI/controle-estoque.git)
   
2. adicione o comando ( node server.js ) para se conectar a porta 3000 do server.


   
