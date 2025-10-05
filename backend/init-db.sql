-- Criar database demo se não existir
CREATE DATABASE IF NOT EXISTS demo;

-- Criar database para Keycloak se não existir  
CREATE DATABASE IF NOT EXISTS keycloak;

-- Conectar ao database demo
\c demo;

-- Criar tabela metadados
CREATE TABLE IF NOT EXISTS metadados (
  id SERIAL PRIMARY KEY,
  chave VARCHAR(100) NOT NULL UNIQUE,
  valor TEXT NOT NULL,
  observacao TEXT,
  criada_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizada_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir dados iniciais
INSERT INTO metadados (chave, valor, observacao) 
VALUES ('versao', '1.0.0', 'Versão inicial do sistema')
ON CONFLICT (chave) DO NOTHING;