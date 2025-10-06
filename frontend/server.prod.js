// server.prod.js - Servidor simples para Angular 20
const express = require('express');
const { readFileSync } = require('fs');
const { join } = require('path');

const app = express();
const DIST_FOLDER = join(__dirname, 'dist/frontend');
const PORT = process.env['PORT'] || 4000;

// Servir arquivos estáticos
app.use(express.static(join(DIST_FOLDER, 'browser')));

// Para todas as outras rotas, servir o index.html (SPA)
app.get('*', (req, res) => {
  try {
    const indexHtml = readFileSync(join(DIST_FOLDER, 'browser', 'index.html'), 'utf-8');
    res.send(indexHtml);
  } catch (err) {
    console.error('Erro ao servir index.html:', err);
    res.status(500).send('Erro interno do servidor');
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Server rodando em http://localhost:${PORT}`);
  console.log(`📱 Frontend Angular 20 disponível`);
});

module.exports = app;