import { Routes } from '@angular/router';
import { dataResolver } from '@shared/services/utils/data-resolver';

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
    path: 'articles/:id',
    resolve: { article: dataResolver },
    loadComponent: () => import('@pages/article/article.component').then(c => c.ArticleComponent)
  },
  {
    path: '**',
    redirectTo: 'articles',
    pathMatch: 'full',
  }
];
