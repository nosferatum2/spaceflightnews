import { Component, DestroyRef, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Article } from '@shared/models/article.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatIcon,
    RouterLink
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent {

  article: Article;

  private activatedRoute = inject(ActivatedRoute);

  private destroyRef = inject(DestroyRef);

  constructor() {
    this.activatedRoute.data
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => this.article = res['article']);
  }

}
