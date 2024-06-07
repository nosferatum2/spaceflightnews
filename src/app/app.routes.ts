import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'articles',
    pathMatch: 'full',
  },
  {
    path: 'articles',
    loadComponent: () => import('@pages/articles/articles.component').then(c => c.ArticlesComponent)
  },
  {
    path: 'article/:id',
    loadComponent: () => import('@pages/article/article.component').then(c => c.ArticleComponent)
  },
  {
    path: '**',
    redirectTo: 'articles',
    pathMatch: 'full',
  }
];
