// app.routes.server.ts - Hybrid Rendering Configuration
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // SSG Routes - Pre-rendered at build time
  {
    path: 'pages/ssg',
    renderMode: RenderMode.Prerender,
  },
  
  // SSR Routes - Rendered on server with hydration  
  {
    path: 'pages/ssr',
    renderMode: RenderMode.Server,
  },
  {
    path: 'pages/pwa',
    renderMode: RenderMode.Server,
  },
  
  // All other routes default to CSR
  {
    path: '**',
    renderMode: RenderMode.Client,
  },
];