# Base Nest Angular — README consolidado

Este repositório é uma demo fullstack que mostra várias capacidades de uma stack moderna: Angular 20 no frontend (com SPA, SSR, SSG, prerender e PWA) e NestJS no backend (REST, GraphQL, WebSockets, Microservices e gRPC). O objetivo é fornecer um ambiente de experimentação e demonstração, fácil de levantar localmente com Docker Compose ou num cluster Kubernetes.

## Propósito

Fornecer um projeto didático e funcional para explorar:

- Múltiplos modos de renderização do Angular
- Diferentes protocolos do NestJS
- Integração com PostgreSQL (Prisma), MongoDB (Mongoose) e Redis (Cache)
- Orquestração com Docker Compose e deployment com Kubernetes

## Como subir rapidamente

1. Na raiz do projeto:

```bash
docker compose up -d
```

2. Endpoints e ports principais:

- Frontend SPA (desenvolvimento): http://localhost:4200
- Frontend SSR (desenvolvimento): http://localhost:4000
- Backend (REST/GraphQL/WebSocket/gRPC): http://localhost:3000
- PostgreSQL: localhost:5432
- MongoDB: localhost:27017
- Redis: localhost:6379

## Rotas e endpoints principais

Backend (padrões):

- REST: GET /api/metadata → metadados via REST
- GraphQL: POST /graphql → endpoint Apollo
- WebSocket: ws://localhost:3000 (Socket.IO gateway)
- gRPC: porta 5000 (MetadataService)
- Microservices (exemplo TCP): porta 6000

Frontend (rotas demonstrativas):

- /         → SPA (usa GraphQL)
- /ssr      → SSR (usa REST)
- /ssg      → SSG (páginas estáticas)
- /prerender→ Prerendered routes (microservices)
- /pwa      → PWA (simula gRPC)

## Serviços e portas (docker-compose padrão)

- frontend-spa (service `frontend-spa`): 4200
- frontend-ssr (service `frontend-ssr`): 4000
- backend: 3000
- postgres: 5432
- mongo: 27017
- redis: 6379

## Comandos úteis

- Levantar (desenvolvimento/integração):
  - docker compose up -d
- Levantar produção (build otimizado):
  - docker compose -f docker-compose.prod.yml up -d --build
- Kubernetes (aplicar manifests na ordem: bancos → backend → frontend):
  - kubectl apply -f k8s-postgres.yaml
  - kubectl apply -f k8s-mongo.yaml
  - kubectl apply -f k8s-redis.yaml
  - kubectl apply -f k8s-backend.yaml
  - kubectl apply -f k8s-frontend.yaml

## Observações importantes

- O Angular não roda SPA e SSR no mesmo processo; neste repositório ambos estão disponíveis em portas separadas (4200 e 4000).
- Ajuste variáveis de ambiente em `docker-compose.yml` conforme necessário (DATABASE_URL, MONGO_URL, REDIS_URL).
- Para Apple Silicon/ARM, adicione `platform: linux/amd64` nos serviços do compose se necessário.

---

Veja `ARCHITECTURE.md` para detalhes de tecnologias, configuração e decisões arquiteturais.
