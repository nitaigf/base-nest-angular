# TODOs - Frontend Angular 20 Produção

## 📋 Status Atual

**✅ Conquistado:**
- Infraestrutura backend 100% operacional (PostgreSQL, MongoDB, Redis, NestJS)
- Caddy reverse proxy configurado (substituto mais simples do Traefik)
- Sistema flexível de configuração via .env
- Ambiente de desenvolvimento Angular funcionando perfeitamente

**⚠️ Pendente - Frontend Produção:**

## 🎯 TODOs Prioritários

### 1. **Resolver Servidor SSR em Produção** (Alta Prioridade)
**Problema:** Angular 20 mudou estrutura do SSR, não gera mais `server.mjs` standalone.

**Tarefas:**
- [ ] Investigar nova estrutura de servidor Angular 20 SSR
- [ ] Corrigir comando de execução no `package.json` (`serve:ssr`)
- [ ] Ajustar Dockerfile para nova estrutura Angular 20
- [ ] Testar servidor local antes de Docker
- [ ] Validar build `ng build --ssr` gera arquivos corretos

**Arquivos afetados:**
- `frontend/Dockerfile` (comando CMD)
- `frontend/package.json` (script serve:ssr)
- `frontend/server.prod.js` (servidor simplificado criado)

### 2. **Docker Produção Frontend** (Alta Prioridade)
**Problema:** Container frontend reinicia continuamente, não encontra ponto de entrada.

**Tarefas:**
- [ ] Definir estratégia: servidor SSR real vs servidor estático + CSR
- [ ] Corrigir CMD no Dockerfile baseado na estratégia escolhida
- [ ] Testar build completo em Docker
- [ ] Validar healthcheck do container
- [ ] Integrar com Caddy reverse proxy

### 3. **Configuração Angular Universal** (Média Prioridade)
**Problema:** Configuração SSR híbrida precisa validação.

**Tarefas:**
- [ ] Verificar se `serverRoutes` está funcionando corretamente
- [ ] Testar diferentes render modes (CSR/SSR/SSG)
- [ ] Validar integração com backend via Caddy
- [ ] Otimizar configuração de produção

### 4. **Kubernetes Manifests** (Baixa Prioridade)
**Problema:** Manifests ainda usam Traefik, precisa migrar para Caddy.

**Tarefas:**
- [ ] Atualizar ingress de Traefik para Caddy
- [ ] Testar deployment K8s completo
- [ ] Validar configuração de produção K8s

## 🚫 Restrições Importantes

**❌ NÃO COMPROMETER:**
- Ambiente de desenvolvimento (está funcionando perfeitamente)
- Infraestrutura backend (100% operacional)
- Configuração Caddy (já funcional)

**✅ MANTER:**
- Configurações isoladas/separadas quando possível
- Sistema .env flexível já implementado
- Override files para diferentes ambientes

## 📚 Referências para Investigação

### Angular 20 SSR
- Documento `angular-ssr-produção.md` (guidelines do Angular 20)
- [Angular SSR Documentation](https://angular.dev/guide/ssr)
- [Angular 20 SSR Changes](https://blog.angular.dev/announcing-angular-v20-b5c9c06cf301)

### Estrutura Atual que Funciona (Dev)
```bash
# Development - Funciona perfeitamente
npm run start:ssr  # ng run frontend:serve-ssr
```

### Estrutura Produção que Precisa Ajuste
```bash
# Production - Precisa correção
npm run serve:ssr  # Comando atual não funciona
node server.prod.js # Servidor simplificado criado
```

## 🔍 Próximos Passos

1. **Investigar Angular 20 SSR:** Como é a nova estrutura de servidor
2. **Testar Local Primeiro:** Antes de ajustar Docker
3. **Documentar Solução:** Para referência futura
4. **Validar Integração:** Com Caddy e backend

## 📅 Timeline Sugerido

- **Fase 1:** Resolver servidor SSR local (1-2 dias)
- **Fase 2:** Ajustar Docker produção (1 dia)
- **Fase 3:** Testar integração completa (1 dia)
- **Fase 4:** Kubernetes manifests (opcional, baixa prioridade)

---

**Objetivo:** Completar stack fullstack 100% funcional em produção, mantendo a excelência já conquistada no backend. 🎯