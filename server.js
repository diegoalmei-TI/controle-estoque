const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'controle_estoque'
});

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL com sucesso!');
});

app.get('/produtos', (req, res) => {
    const query = 'SELECT * FROM produtos';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ erro: 'Erro ao buscar produtos.' });
        res.json(results);
    });
});

app.post('/produtos', (req, res) => {
    const { nome, categoria, preco, quantidade_estoque, fornecedor } = req.body;
    if (!nome || !categoria || preco === undefined || quantidade_estoque === undefined || !fornecedor) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
    }
    const query = 'INSERT INTO produtos (nome, categoria, preco, quantidade_estoque, fornecedor) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [nome, categoria, preco, quantidade_estoque, fornecedor], (err, result) => {
        if (err) return res.status(500).json({ erro: 'Erro ao cadastrar produto.' });
        res.status(201).json({ mensagem: 'Produto cadastrado com sucesso!', id: result.insertId });
    });
});

app.put('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const { nome, categoria, preco, quantidade_estoque, fornecedor } = req.body;
    const query = 'UPDATE produtos SET nome = ?, categoria = ?, preco = ?, quantidade_estoque = ?, fornecedor = ? WHERE id = ?';
    db.query(query, [nome, categoria, preco, quantidade_estoque, fornecedor, id], (err, result) => {
        if (err) return res.status(500).json({ erro: 'Erro interno ao atualizar produto.' });
        if (result.affectedRows === 0) return res.status(404).json({ mensagem: 'Produto não encontrado.' });
        res.json({ mensagem: 'Produto atualizado com sucesso!' });
    });
});

app.delete('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM produtos WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ erro: 'Erro interno ao deletar produto.' });
        if (result.affectedRows === 0) return res.status(404).json({ mensagem: 'Produto não encontrado.' });
        res.json({ mensagem: 'Produto excluído com sucesso!' });
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});