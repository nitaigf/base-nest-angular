# Arquitetura do Projeto
# Arquitetura do Projeto

## Visão Geral

Este repositório demonstra uma arquitetura fullstack moderna com os seguintes objetivos:

- Permitir experimentar os diferentes modos de renderização do Angular 20 (SPA, SSR, SSG, Prerender e PWA).
- Demonstrar múltiplos protocolos de comunicação no backend com NestJS (REST, GraphQL, WebSockets, Microservices e gRPC).
- Oferecer infra (Docker Compose e Kubernetes) com configurações prontas para desenvolvimento e deploy.

## Principais Componentes

- Frontend: Angular 20
        - Modos: SPA (4200), SSR (4000), SSG, Prerender, PWA
- Backend: NestJS
        - Protocolos: REST, GraphQL, WebSockets, Microservices (TCP), gRPC
- Bancos: PostgreSQL (Prisma), MongoDB (Mongoose), Redis (Cache Manager)
- Orquestração: Docker Compose (dev/prod) e manifests Kubernetes (root)

## Diagrama Simplificado

Frontend ⇄ Backend ⇄ Datastores

- Frontend (Angular) comunica com Backend via HTTP/GraphQL/WebSocket/gRPC
- Backend acessa PostgreSQL, MongoDB e Redis conforme a necessidade

## Fluxo de Requisição (Exemplo)

1. Usuário acessa `/ssr` (SSR) → requisição chega ao server SSR → server consulta Backend REST `/api/metadata` → Backend consulta banco (Postgres/Mongo) ou cache (Redis) → resposta retornada ao server SSR → HTML renderizado enviado ao cliente.

## Decisões e Configurações Relevantes

- Angular: separado em SPA (porta 4200) e SSR (porta 4000). Angular não suporta rodar ambos no mesmo processo, por isso são serviços distintos.
- Bun: usado como package manager/runtime nos Dockerfiles (imagens `oven/bun`). Adoção feita para menor tempo de instalação e arranque.
- Dockerfiles: multi-stage builds para reduzir tamanho da imagem e acelerar CI/CD.
- Docker Compose: `docker-compose.yml` (dev) e `docker-compose.prod.yml` (produção otimizada).
- Kubernetes: manifestos incluem Deployments, Services e PVCs para PostgreSQL/Mongo/Redis, com readiness/liveness probes.

## Observabilidade e Extensões Recomendadas

- Logs: Loki + Promtail + Grafana (leve) ou ELK (mais robusto).
- Métricas: Prometheus + Grafana.
- Tracing: OpenTelemetry + Jaeger/Tempo.
- Filas/Jobs: BullMQ (com Redis) ou RabbitMQ.

## Scripts e comandos importantes

- Levantar tudo em dev: `docker compose up -d`
- Levantar produção otimizada: `docker compose -f docker-compose.prod.yml up -d --build`
- Aplicar manifests K8s (ordem: bancos → backend → frontend):
        - `kubectl apply -f k8s-postgres.yaml`
        - `kubectl apply -f k8s-mongo.yaml`
        - `kubectl apply -f k8s-redis.yaml`
        - `kubectl apply -f k8s-backend.yaml`
        - `kubectl apply -f k8s-frontend.yaml`

## Observações finais

- O repositório foi estruturado para aprendizado e demonstração; para produção, revisões adicionais de segurança, backup e escalabilidade são necessárias.

---

Para uso prático e instruções passo-a-passo, consulte `README.md`.
4. MetadataService seleciona banco/cache conforme query params ou configuração
