import { AngularNodeAppEngine, createNodeRequestHandler, writeResponseToNodeResponse } from '@angular/ssr/node';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const app = express();
const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

// Criar a engine do Angular
const angularApp = new AngularNodeAppEngine();

// Porta do servidor
const PORT = process.env['PORT'] || 4000;

// Servir arquivos estáticos
app.get('**/*.{js,css,ico,png,jpg,jpeg,gif,svg,woff,woff2,ttf,eot}', 
  express.static(browserDistFolder, {
    maxAge: '1y',
    setHeaders: (res, path) => {
      if (path.endsWith('.js') || path.endsWith('.mjs')) {
        res.setHeader('Content-Type', 'application/javascript');
      }
    }
  })
);

// Handler para todas as rotas da aplicação
app.use('**', (req, res, next) => {
  angularApp
    .handle(req)
    .then(response => {
      if (response) {
        writeResponseToNodeResponse(response, res);
      } else {
        res.status(404).send('Not Found');
      }
    })
    .catch(err => {
      console.error('SSR Error:', err);
      next(err);
    });
});

// Iniciar servidor
if (import.meta.url === `file://${process.argv[1]}`) {
  app.listen(PORT, () => {
    console.log(`🚀 Server rodando em http://localhost:${PORT}`);
    console.log(`\n📱 Modos de renderização disponíveis:`);
    console.log(`   • CSR: http://localhost:${PORT}/pages/csr`);
    console.log(`   • SSR: http://localhost:${PORT}/pages/ssr`);
    console.log(`   • SSG: http://localhost:${PORT}/pages/ssg`);
    console.log(`   • PWA: http://localhost:${PORT}/pages/pwa`);
  });
}

export const reqHandler = createNodeRequestHandler(app);