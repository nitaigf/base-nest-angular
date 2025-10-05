import { Routes } from '@angular/router';

export const routes: Routes = [
  // Redirects principais
  {
    path: '',
    redirectTo: '/pages/csr',
    pathMatch: 'full'
  },
  {
    path: 'home',
    redirectTo: '/pages/csr',
    pathMatch: 'full'
  },
  {
    path: 'csr',
    redirectTo: '/pages/csr',
    pathMatch: 'full'
  },
  {
    path: 'ssr',
    redirectTo: '/pages/ssr',
    pathMatch: 'full'
  },
  {
    path: 'ssg',
    redirectTo: '/pages/ssg',
    pathMatch: 'full'
  },
  {
    path: 'prerender',
    redirectTo: '/pages/ssg',
    pathMatch: 'full'
  },
  {
    path: 'pwa',
    redirectTo: '/pages/pwa',
    pathMatch: 'full'
  },
  
  // Rotas das páginas
  {
    path: 'pages/csr',
    loadComponent: () => import('./pages/csr/csr.component').then(m => m.CsrComponent)
  },
  {
    path: 'pages/ssr',
    loadComponent: () => import('./pages/ssr/ssr.component').then(m => m.SsrComponent)
  },
  {
    path: 'pages/ssg',
    loadComponent: () => import('./pages/ssg/ssg.component').then(m => m.SsgComponent)
  },
  {
    path: 'pages/pwa',
    loadComponent: () => import('./pages/pwa/pwa.component').then(m => m.PwaComponent)
  },
  
  // Wildcard redirect
  {
    path: '**',
    redirectTo: '/pages/csr'
  }
];
