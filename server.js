 const express = require("express"); 
 const mysql = require("mysql2"); 
 const cors = require("cors"); 
  
 // Professor, inicializei o Express para gerenciar as rotas 
HTTP e ativei o CORS 
 // para que o navegador (Frontend) possa fazer requisições de 
rede para o Servidor sem bloqueios de segurança. 
 const app = express(); 
 app.use(cors()); 
 app.use(express.json()); // Configuro o Express para entender 
dados enviados no formato JSON. 
  
 // CONFIGURAÇÃO DO BANCO DE DADOS: Equivalente ao Driver JDBC 
do Java. 
 // Estabeleço a conexão com o banco local apontando para as 
minhas credenciais do MySQL. 
 const db = mysql.createConnection({ 
 host: "localhost", 
 user: "root", 
 password: "", // Coloque aqui a senha do seu MySQL caso possua 
uma
 database: "controle_estoque" // Nome do banco de dados que 
criamos na tela preta 
 }); 
  
// TESTE DE CONEXÃO: Executado assim que o comando 'node 
server.js' roda no CMD. 
 db.connect((erro) => { 
 if (erro) { 
 console.error("Erro crítico ao conectar no MySQL:", erro); 
 return; 
 } 
 console.log("    Conectado com sucesso na tela preta do 
MySQL!"); 
 }); 
  
 // ROTA GET /produtos: Busca as informações salvas para 
preencher a tabela do site. 
 app.get("/produtos", (req, res) => { 
 // Professor, aqui eu executo uma instrução SQL nativa para 
ler todas as linhas da tabela. 
 const querySQL = "SELECT * FROM produtos"; 
  
 db.query(querySQL, (erro, resultados) => { 
 if (erro) { 
 console.error("Erro ao buscar dados do banco:", erro); 
 return res.status(500).json({ mensagem: "Erro no servidor" }); 
 } 
 // Retorno os dados capturados do banco de dados convertidos 
em formato JSON para o Frontend. 
 res.json(resultados); 
 }); 
 }); 
  
 // ROTA POST /produtos: Recebe os dados do formulário e insere 
um novo produto no MySQL. 
 app.post("/produtos", (req, res) => { 
 // Desestruturo o objeto enviado pelo script.js para pegar 
cada dado individual do produto. 
 const { nome, categoria, preco, quantidade_estoque, fornecedor 
} = req.body; 
  
 // Professor, usei interrogações (?) na query por questões de 
segurança.  
 // Isso evita ataques de SQL Injection, que é uma das maiores 
vulnerabilidades de Backend do mercado. 
 const querySQL = "INSERT INTO produtos (nome, categoria, 
preco, quantidade_estoque, fornecedor) VALUES (?, ?, ?, ?, 
?)"; 
 const valores = [nome, categoria, preco, quantidade_estoque, 
fornecedor]; 
  
 db.query(querySQL, valores, (erro, resultado) => { 
 if (erro) { 
 console.error("Erro ao inserir produto no MySQL:", erro); 
 return res.status(500).json({ mensagem: "Erro ao salvar 
registro" }); 
 } 
 // Se a gravação deu certo, respondo ao navegador com o status 
201 (Criado com Sucesso). 
 res.status(201).json({ mensagem: "Produto cadastrado com 
sucesso!", id: resultado.insertId }); 
 }); 
 }); 
  
 // INICIALIZAÇÃO DO SERVIDOR: Configuração da porta de escuta 
da API. 
 const PORTA = 3000; 
 app.listen(PORTA, () => { 
 console.log(`        
Servidor rodando na porta ${PORTA}. Pronto 
para receber dados!`); 
 });