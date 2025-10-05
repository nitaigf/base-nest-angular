# Angular 20 Hybrid Rendering Demo

Este projeto demonstra as diferentes estratégias de renderização do Angular 20 em um único aplicativo, similar ao que o Next.js oferece. Suporte para **CSR**, **SSR**, **SSG** e **PWA** coexistindo no mesmo projeto.

## 🚀 Estratégias de Renderização Disponíveis

### 1. **CSR (Client-Side Rendering)**
- **Rota**: `/pages/csr` (padrão para `/`, `/home`, `/csr`)
- **Descrição**: Renderização tradicional no cliente
- **Características**:
  - Carregamento inicial mais rápido do shell da aplicação
  - Conteúdo carregado dinamicamente via JavaScript
  - Ideal para aplicações altamente interativas
  - SEO limitado (requer hidratação)

### 2. **SSR (Server-Side Rendering)**
- **Rota**: `/pages/ssr` (acessível via `/ssr`)
- **Descrição**: Renderização no servidor com Angular Universal
- **Características**:
  - HTML pré-renderizado no servidor
  - Melhor SEO e performance inicial
  - Hydration automática no cliente
  - Ideal para páginas que precisam ser indexadas

### 3. **SSG (Static Site Generation)**
- **Rota**: `/pages/ssg` (acessível via `/ssg` ou `/prerender`)
- **Descrição**: Páginas geradas estaticamente em build time
- **Características**:
  - HTML estático gerado durante o build
  - Máxima performance (servido via CDN)
  - Zero latência de servidor
  - Ideal para conteúdo que não muda frequentemente

### 4. **PWA (Progressive Web App)**
- **Rota**: `/pages/pwa` (acessível via `/pwa`)
- **Descrição**: Experiência de aplicativo nativo
- **Características**:
  - Funcionamento offline via Service Workers
  - Instalável no dispositivo
  - Notificações push (quando configurado)
  - Cache inteligente de recursos

## 🛠️ Scripts de Desenvolvimento

### Desenvolvimento Local
```bash
# CSR Development (porta 4000)
npm start

# SSR Development (porta 4000) 
npm run start:ssr

# SSR Development com watch mode
npm run dev:ssr:watch
```

### Build e Deploy
```bash
# Build para produção (CSR)
npm run build

# Build com SSR
npm run build:ssr

# Build com SSG (pre-render)
npm run build:ssg

# Servir build SSG localmente (porta 4000)
npm run serve:ssg
```

### Comandos de Produção
```bash
# Servir aplicação SSR em produção
npm run serve:ssr

# Executar prerender para SSG
npm run prerender
```

## 🏗️ Arquitetura do Projeto

```
src/
├── app/
│   ├── pages/
│   │   ├── csr/           # Client-Side Rendering
│   │   ├── ssr/           # Server-Side Rendering  
│   │   ├── ssg/           # Static Site Generation
│   │   └── pwa/           # Progressive Web App
│   ├── core/              # Serviços compartilhados
│   ├── app.routes.ts      # Configuração de rotas
│   ├── app.config.ts      # Configuração cliente
│   └── app.config.server.ts # Configuração servidor
├── server.ts              # Servidor SSR/Universal
├── main.ts               # Bootstrap cliente
└── main.server.ts        # Bootstrap servidor
```

## ⚙️ Configurações Técnicas

### Hydration Habilitado
- **Event Replay**: Eventos capturados durante SSR são reproduzidos no cliente
- **HTTP Transfer Cache**: Requisições SSR são reutilizadas no cliente
- **Suporte para POST requests** e headers de autenticação

### Otimizações Aplicadas
- `ChangeDetectionStrategy.OnPush` em todos os componentes
- Lazy loading com `loadComponent()`
- Standalone components (sem NgModules)
- Code splitting por rota
- Build otimizado para produção

### Porta Padrão
- **Desenvolvimento**: `http://localhost:4000`
- **Produção**: Configurável via `PORT` environment variable

## 🔗 Rotas e Redirecionamentos

| Rota Original | Destino | Tipo |
|---------------|---------|------|
| `/` | `/pages/csr` | CSR |
| `/home` | `/pages/csr` | CSR |
| `/csr` | `/pages/csr` | CSR |
| `/ssr` | `/pages/ssr` | SSR |
| `/ssg` | `/pages/ssg` | SSG |
| `/prerender` | `/pages/ssg` | SSG |
| `/pwa` | `/pages/pwa` | PWA |

## 🚀 Executando Diferentes Modos

### Modo Desenvolvimento

#### CSR (Client-Side Rendering)
```bash
npm start
# Acesse: http://localhost:4000/pages/csr
```

#### SSR (Server-Side Rendering)
```bash
npm run start:ssr
# Acesse: http://localhost:4000/pages/ssr
```

#### SSG (Static Site Generation)
```bash
# 1. Gerar arquivos estáticos
npm run build:ssg

# 2. Servir arquivos estáticos
npm run serve:ssg
# Acesse: http://localhost:4000/pages/ssg
```

#### PWA (Progressive Web App)
```bash
npm start
# Acesse: http://localhost:4000/pages/pwa
# Para testar PWA completo, use HTTPS em produção
```

### Modo Produção

#### Deploy SSR
```bash
# Build para produção
npm run build:ssr

# Executar servidor
npm run serve:ssr
```

#### Deploy SSG
```bash
# Build estático
npm run build:ssg

# Deploy pasta dist/frontend/browser para CDN/host estático
```

## 📊 Comparação de Performance

| Estratégia | Time to First Byte | First Contentful Paint | SEO | Caching |
|------------|-------------------|------------------------|-----|---------|
| **CSR** | ⚡ Rápido | 🟡 Médio | ❌ Limitado | 🟡 Médio |
| **SSR** | 🟡 Médio | ⚡ Rápido | ✅ Excelente | 🟡 Médio |
| **SSG** | ⚡ Muito Rápido | ⚡ Muito Rápido | ✅ Excelente | ✅ Excelente |
| **PWA** | ⚡ Rápido (cache) | ⚡ Rápido | 🟡 Médio | ✅ Excelente |

## 🔧 Personalização

### Adicionando Novas Rotas SSG
Edite `angular.json` na seção `prerender.options.routes`:

```json
{
  "routes": [
    "/",
    "/pages/csr",
    "/pages/ssr", 
    "/pages/ssg",
    "/pages/pwa",
    "/nova-rota-ssg"
  ]
}
```

### Configurando PWA
Para habilitar PWA completo:

1. Adicione service worker:
```bash
ng add @angular/pwa
```

2. Configure `ngsw-config.json` para cache strategies

3. Build com PWA:
```bash
ng build --service-worker
```

## 🐛 Troubleshooting

### Problemas Comuns

#### "Cannot GET /pages/xxx"
- Certifique-se de usar `npm run start:ssr` para rotas SSR
- Para desenvolvimento CSR, use `npm start`

#### Hydration Mismatch
- Verifique se o conteúdo é consistente entre servidor e cliente
- Evite usar `Date.now()` ou `Math.random()` em templates SSR

#### Service Worker não ativa
- PWA requer HTTPS em produção
- Use `ng build --service-worker` para build com SW

## 📝 Logs e Debug

O servidor SSR logga todas as requisições:
```
2025-01-05T10:30:15.123Z - GET /pages/ssr
2025-01-05T10:30:15.145Z - GET /pages/ssg
```

## 🤝 Contribuição

Para adicionar novas estratégias de renderização:

1. Crie nova pasta em `src/app/pages/`
2. Adicione componente com `ChangeDetectionStrategy.OnPush`
3. Configure rota em `app.routes.ts`
4. Adicione scripts no `package.json` se necessário
5. Documente no README

---

**Tecnologias**: Angular 20, Angular Universal, Angular SSR, Progressive Web Apps, TypeScript

**Criado**: Janeiro 2025 | **Versão**: 1.0.0