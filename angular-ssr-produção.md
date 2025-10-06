Para colocar uma aplicação **Angular 20.3.4** com **SSR (Angular Universal)** em produção de forma correta, você deve configurar diversas partes: build, servidor Node, roteamento, segurança, performance, monitoramento etc. Abaixo vai um guia com os passos e melhores práticas — posso depois adaptar exatamente ao seu ambiente se você me disser onde vai rodar (AWS, Vercel, Next, contêiner Docker, etc).

---

## 1. Estrutura básica / geração das versões

Você precisa gerar duas “partes” da aplicação:

* **Client (browser build)** — os arquivos JS/CSS/HTML que vão ser carregados no navegador.
* **Server (server build / bundle SSR)** — o código que roda no servidor Node para renderizar as páginas inicialmente.

Na prática:

1. Instale/adicione o SSR (se ainda não estiver):

   ```bash
   ng add @angular/ssr
   ```

   Isso vai adicionar dependências como `@angular/platform-server`, criar `server.ts`, `main.server.ts`, atualizar o `angular.json`, scripts no `package.json`, etc. ([Coder Legion][1])

2. No `package.json`, normalmente você terá algo como:

   ```json
   "scripts": {
     "build": "ng build",
     "build:ssr": "ng build && ng run your-app:server",
     "serve:ssr": "node dist/your-app/server/main.js",
     "prerender": "ng run your-app:prerender"
   }
   ```

   * `ng build` → build para navegador
   * `ng run …:server` → build do código servidor
   * `serve:ssr` → inicia o servidor Node com SSR
   * `prerender` (opcional) → gera páginas estáticas para rotas específicas (SSG) ([Coder Legion][1])

3. No `angular.json`, sob o seu projeto, haverá configurações de “architect / server” para o build SSR.

---

## 2. Configuração do servidor Express / Node

O `server.ts` gerado (ou modificado) será o ponto de entrada do servidor que vai receber requisições HTTP e renderizar páginas:

Um exemplo básico:

```ts
import 'zone.js/node';
import { ngExpressEngine } from '@nguniversal/express-engine';
import express from 'express';
import { join } from 'path';
import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';

export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/your-app/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) 
    ? 'index.original.html' 
    : 'index';

  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // servir arquivos estáticos diretamente
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // todas as outras rotas: SSR
  server.get('*', (req, res) => {
    res.render(indexHtml, {
      req,
      providers: [
        { provide: APP_BASE_HREF, useValue: req.baseUrl }
      ]
    });
  });

  return server;
}

function run(): void {
  const port = process.env.PORT || 4000;
  const serverApp = app();
  serverApp.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// executar só se for chamado diretamente
if (require.main === module) {
  run();
}

export * from './src/main.server';
```

Pontos importantes:

* Use `express.static` para servir arquivos estáticos do build do cliente.
* A rota “catch-all” (`*`) chama a engine do Angular para renderizar cada página no servidor.
* Use variáveis de ambiente para definir porta, host etc.
* Cuide de tratar erros (ex: capturar exceções não tratadas no Node) — em Angular 20 existe um tratamento padrão para `unhandledRejection` e `uncaughtException` para evitar que o servidor “quebre” com erro não capturado. ([Angular Blog][2])

---

## 3. Rotas de SSR / prerender / CSR híbrido

Com Angular 20 você pode usar *render modes* para controlar como cada rota deve ser renderizada: **Server**, **Prerender** ou **Client**. ([angular.dev][3])

Você faz isso definindo `serverRoutes: ServerRoute[]` (por exemplo em `app.routes.server.ts`):

```ts
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Client },
  { path: 'about', renderMode: RenderMode.Prerender },
  { path: 'profile', renderMode: RenderMode.Server },
  { path: '**', renderMode: RenderMode.Server },
];
```

Depois, ao configurar o SSR, você injeta isso via `provideServerRendering(withRoutes(serverRoutes))`:

```ts
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { serverRoutes } from './app.routes.server';

export const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(
      withRoutes(serverRoutes),
      // opcional: withAppShell(...)
    ),
    // outros providers
  ]
};
```

Isso dá controle fino de quais rotas serão renderizadas no servidor, pré-renderizadas ou deixadas para client-side. ([angular.dev][3])

Esse modelo híbrido (SSR + SSG + CSR) é recomendado em produção para otimizar performance e custos.

---

## 4. Localização / internacionalização (i18n)

Uma mudança importante em Angular 20: o SSR gera **um único `server.mjs`** para todas as localizações, diferente de versões anteriores onde havia um por locale. ([Stack Overflow][4])

Isso significa que a lógica para renderização por idioma deve ser tratada dinamicamente no servidor — use provedores/injeções de locale customizadas com base no cabeçalho `Accept-Language` ou em parâmetros da URL.

---

## 5. Otimizações para produção

Para garantir que a aplicação SSR em produção seja eficiente e estável:

* **Cache**: use cache HTTP (CDN, proxy reverso) para rotas que mudam pouco.
* **Compressão**: habilite compressão gzip / brotli no servidor (via Express ou proxy).
* **Cabeçalhos de segurança**: HSTS, CSP, XSS, CORS etc.
* **Limitar footprint de dependências**: evite bibliotecas que dependem de APIs de browser no servidor.
* **State Transfer / TransferState**: para evitar dupla requisição de dados (no servidor + no cliente), use `TransferState` para transferir dados já carregados no servidor para o cliente, evitando refetch.
* **Hydration ou incremental hydration**: Angular 20 oferece melhorias de SSR e modos de “hidratação incremental” para ativar partes da UI apenas quando necessário, reduzindo tempo de interatividade. ([syncfusion.com][5])
* **Monitoramento & logging**: registre erros de SSR no servidor (stack traces) para não “quebrar” toda a página para o usuário.
* **Fallback / timeout**: se o SSR falhar ou demorar demais, incluir fallback para servir a aplicação client-side.

---

## 6. Implantação / ambiente de produção

* Use variável de ambiente para `PORT`, `NODE_ENV=production`, `HOST` etc.
* Pode empacotar como contêiner Docker ou usar plataformas Node compatíveis (Heroku, AWS Lambda / Lambda@Edge, Azure, etc).
* No build do servidor e cliente, habilite otimizações de produção (minificação, treeshaking).
* Nunca execute o `ng serve` em produção — sempre use `serve:ssr` ou o script Node resultante.
* Se estiver usando SSR + prerender, você pode gerar páginas estáticas antecipadamente para rotas definidas, e renderizar outras dinâmicas sob demanda.

---

Se você quiser, posso montar pra você um `Dockerfile` modelo + `nginx + express` pronto para produção para Angular 20.3.4 SSR. Você quer que eu gere isso para você?

[1]: https://coderlegion.com/4175/how-to-add-angular-universal-ssr-to-your-angular-app?utm_source=chatgpt.com "How to Add Angular Universal (SSR) to Your Angular App"
[2]: https://blog.angular.dev/announcing-angular-v20-b5c9c06cf301?utm_source=chatgpt.com "Announcing Angular v20"
[3]: https://angular.dev/guide/ssr?utm_source=chatgpt.com "Server-side and hybrid-rendering - Angular"
[4]: https://stackoverflow.com/questions/79713010/angular-20-ssr-only-generates-one-server-mjs-for-all-locales-unlike-angular-19?utm_source=chatgpt.com "Angular 20 SSR only generates one server.mjs for all locales (unlike ..."
[5]: https://www.syncfusion.com/blogs/post/whats-new-in-angular-20?utm_source=chatgpt.com "What's New in Angular 20? | Syncfusion Blogs"
