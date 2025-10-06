# Base Nest Angular — Stack Fullstack Completa

[![Angular](https://img.shields.io/badge/Angular-20.3.4-red.svg)](https://angular.io/)
[![NestJS](https://img.shields.io/badge/NestJS-10.x-ea2845.svg)](https://nestjs.com/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED.svg)](https://www.docker.com/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-Ready-326CE5.svg)](https://kubernetes.io/)

Demo fullstack **100% funcional** que demonstra as capacidades de uma stack moderna:

**Frontend Angular 20.3.4:**
- ✅ **SPA** (Client-Side Rendering)
- ✅ **SSR** (Server-Side Rendering com Angular Universal)
- ✅ **SSG** (Static Site Generation)
- ✅ **PWA** (Progressive Web App)
- ✅ **Prerender** (Pré-renderização)

**Backend NestJS:**
- ✅ **REST API** (Express + TypeScript)
- ✅ **GraphQL** (Apollo Server)
- ✅ **WebSockets** (Socket.IO)
- ✅ **Microservices** (TCP Transport)
- ✅ **gRPC** (Protocol Buffers)

**Infraestrutura:**
- ✅ **PostgreSQL** com Prisma ORM
- ✅ **MongoDB** com Mongoose ODM
- ✅ **Redis** para Cache Manager
- ✅ **Docker Compose** (Dev + Prod)
- ✅ **Kubernetes** manifests

## 🎯 Propósito

**Projeto educacional e de demonstração** para explorar tecnologias modernas de desenvolvimento web fullstack com foco em:

- **Múltiplos padrões de renderização** frontend
- **Diversos protocolos de comunicação** backend
- **Orquestração containerizada** completa
- **Arquitetura escalável** e cloud-ready

## 🚀 Quick Start

### Desenvolvimento com Docker Compose

```bash
# Clone o repositório
git clone https://github.com/nitaigf/base-nest-angular
cd base-nest-angular

# Levantar todos os serviços
docker-compose -f docker-compose.dev.yml up -d

# Aguardar inicialização (~2-3 minutos)
# Verificar status
docker-compose -f docker-compose.dev.yml ps
```

### Desenvolvimento Local

```bash
# Backend
cd backend
npm install
npm run start:dev  # Porta 3000

# Frontend (em terminais separados)
cd frontend
npm install
npm start          # SPA na porta 4200
npm run start:ssr  # SSR na porta 4000
```

### 🌐 Endpoints Funcionais

| Serviço | URL | Status | Descrição |
|---------|-----|--------|-----------|
| **Frontend SPA** | http://localhost:4200 | ✅ | Angular SPA com lazy loading |
| **Frontend SSR** | http://localhost:4000 | ✅ | Angular Universal SSR |
| **Backend REST** | http://localhost:3000/api | ✅ | NestJS REST API |
| **GraphQL** | http://localhost:3000/graphql | ✅ | Apollo Server |
| **WebSocket** | ws://localhost:3000 | ✅ | Socket.IO Gateway |
| **gRPC** | localhost:5001 | ✅ | Protocol Buffers |
| **PostgreSQL** | localhost:5432 | ✅ | Banco relacional |
| **MongoDB** | localhost:27017 | ✅ | Banco NoSQL |
| **Redis** | localhost:6379 | ✅ | Cache e sessões |

## 🗺️ Rotas e Endpoints Validados

### Backend API (localhost:3000)

**Todas as rotas testadas e funcionais:**

```bash
# REST API
GET  /api/metadata              # ✅ Status 200 - Metadados sistema
GET  /api/health               # ✅ Status 200 - Health check
GET  /api                      # ✅ Status 200 - API info

# GraphQL
POST /graphql                  # ✅ Status 200 - Apollo Server
GET  /graphql                  # ✅ Status 200 - GraphQL Playground

# WebSocket
ws://localhost:3000            # ✅ Socket.IO Gateway

# gRPC
localhost:5001                 # ✅ MetadataService

# Microservices
localhost:6000                 # ✅ TCP Transport
```

### Frontend Rotas (Ambos SPA e SSR)

**Todas as rotas testadas com status 200:**

| Rota | SPA (4200) | SSR (4000) | Descrição |
|------|------------|------------|-----------|
| `/` | ✅ ~9ms | ✅ ~158ms | Home → Redireciona para /pages/csr |
| `/home` | ✅ ~10ms | ✅ ~53ms | Alias para home |
| `/csr` | ✅ ~10ms | ✅ ~66ms | Redireciona para /pages/csr |
| `/ssr` | ✅ ~6ms | ✅ ~170ms | Redireciona para /pages/ssr |
| `/ssg` | ✅ ~8ms | ✅ ~127ms | Redireciona para /pages/ssg |
| `/pwa` | ✅ ~11ms | ✅ ~604ms | Redireciona para /pages/pwa |
| `/pages/csr` | ✅ ~12ms | ✅ ~55ms | Página CSR + GraphQL |
| `/pages/ssr` | ✅ ~11ms | ✅ ~63ms | Página SSR + REST API |
| `/pages/ssg` | ✅ ~6ms | ✅ ~49ms | Página SSG + WebSocket |
| `/pages/pwa` | ✅ ~10ms | ✅ ~59ms | Página PWA + gRPC |
| `/**` | ✅ ~9ms | ✅ ~44ms | Wildcard → Redireciona para /pages/csr |

**Diferenças SPA vs SSR:**
- **SPA**: HTML básico + JavaScript (hidratação no cliente)
- **SSR**: HTML completo pré-renderizado + dados de hidratação

## Serviços e portas (docker-compose padrão)

- frontend-spa (service `frontend-spa`): 4200
- frontend-ssr (service `frontend-ssr`): 4000
- backend: 3000
- postgres: 5432
- mongo: 27017
- redis: 6379

## 🛠️ Comandos Úteis

### Docker Compose

```bash
# Desenvolvimento (validado ✅)
docker-compose -f docker-compose.dev.yml up -d
docker-compose -f docker-compose.dev.yml down
docker-compose -f docker-compose.dev.yml logs -f [service]

# Produção (build otimizado)
docker-compose -f docker-compose.prod.yml up -d --build
docker-compose -f docker-compose.prod.yml down

# Limpeza completa
docker-compose -f docker-compose.dev.yml down -v
docker system prune -f
```

### Kubernetes Deployment

```bash
# Ordem de aplicação: Databases → Backend → Frontend
kubectl apply -f k8s-postgres.yaml
kubectl apply -f k8s-mongo.yaml
kubectl apply -f k8s-redis.yaml
kubectl apply -f k8s-backend.yaml
kubectl apply -f k8s-frontend.yaml

# Verificar status
kubectl get pods,svc,pvc
kubectl logs -f deployment/backend
kubectl logs -f deployment/frontend-spa
```

### Desenvolvimento Local

```bash
# Backend NestJS
cd backend
npm run start:dev     # Desenvolvimento com hot reload
npm run start:debug   # Debug mode
npm run test         # Testes unitários

# Frontend Angular
cd frontend
npm start            # SPA na porta 4200
npm run start:ssr    # SSR na porta 4000
npm run build        # Build de produção
npm run test         # Testes unitários
```

## ✅ Status de Validação

**Projeto 100% testado e funcional em:**
- ✅ **Desenvolvimento Local** (macOS Apple Silicon)
- ✅ **Docker Compose** (containers Linux)
- ✅ **Todas as rotas frontend** validadas
- ✅ **Todos os protocolos backend** validados
- ✅ **Integração completa** frontend ↔ backend ↔ databases
- ✅ **Angular 20.3.4** com BootstrapContext compliance

## ⚠️ Considerações Importantes

### Arquitetura
- **SPA vs SSR**: Executam em processos separados (limitação do Angular Universal)
- **Renderização**: SSR pré-renderiza no servidor, SPA hidrata no cliente
- **Performance**: SPA mais rápido após carregamento inicial, SSR melhor para SEO

### Configuração
- **Variáveis de ambiente**: Ajustar em `docker-compose.dev.yml` conforme necessário
- **Apple Silicon**: Containers já configurados para ARM64
- **Portas**: Configuráveis via environment variables

### Produção
- **Builds otimizados**: Use `docker-compose.prod.yml`
- **Segurança**: Revisar configurações antes de deploy
- **Monitoramento**: Implementar observabilidade conforme necessário

## 📚 Documentação

- **[ARCHITECTURE.md](ARCHITECTURE.md)**: Detalhes técnicos e decisões arquiteturais
- **[Frontend README](frontend/README.md)**: Configurações específicas do Angular
- **[Backend README](backend/README.md)**: Configurações específicas do NestJS

## 🤝 Contribuição

Projeto educacional aberto a contribuições! Veja issues para melhorias sugeridas.

---

**Stack validada e pronta para desenvolvimento!** 🚀
