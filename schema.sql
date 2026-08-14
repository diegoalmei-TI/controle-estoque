-- 1. Cria a base de dados se ela ainda não existir
CREATE DATABASE IF NOT EXISTS controle_estoque;

-- 2. Seleciona o banco para aplicar os comandos seguintes
USE controle_estoque;

-- 3. Cria a tabela de produtos com os tipos de dados exigidos
CREATE TABLE IF NOT EXISTS produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    quantidade_estoque INT NOT NULL,
    fornecedor VARCHAR(100) NOT NULL
);
