import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('@pages/home/home.component').then(c => c.HomeComponent)
  },
  {
    path: 'article/:id',
    loadComponent: () => import('@pages/article/article.component').then(c => c.ArticleComponent)
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  }
];
