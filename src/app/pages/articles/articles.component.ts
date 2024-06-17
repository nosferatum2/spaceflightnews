import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatFormField, MatInput, MatLabel, MatPrefix } from '@angular/material/input';
import { MatDivider } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { ContentCardComponent } from '@pages/articles/components/content-card/content-card.component';
import { Article } from '@shared/models/article.model';
import { SpaceFlightNewsApiService } from '@shared/services/space-flight-news-api/space-flight-news-api.service';
import { ItemsUrlType } from '@core/services/api-service/api.service';
import { BehaviorSubject, combineLatestWith, map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ArticlesQueryParams } from '@shared/services/space-flight-news-api/model/queries';
import { ArticleView } from '@pages/articles/components/content-card/article-view.model';
import { FilterSearchComponent } from '@pages/articles/components/filter-search/filter-search.component';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [
    RouterLink,
    MatInput,
    MatDivider,
    MatFormField,
    MatIconModule,
    MatLabel,
    MatPrefix,
    MatCardModule,
    MatButton,
    ContentCardComponent,
    AsyncPipe,
    ReactiveFormsModule,
    FilterSearchComponent
  ],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss',
  providers: [SpaceFlightNewsApiService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlesComponent implements OnInit {

  articles$: Observable<ArticleView[]>;

  articlesCount$: Observable<number>;

  private searchValue$ = new BehaviorSubject<string | null>(null);

  private spaceFlightNewsApiService = inject(SpaceFlightNewsApiService);

  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.spaceFlightNewsApiService.getItemsInit(ItemsUrlType.ARTICLES);

    this.articles$ = this.spaceFlightNewsApiService.items$.asObservable()
      .pipe(
        combineLatestWith(this.searchValue$.asObservable()),
        map(([articleArr, searchValue]) => {
          return articleArr.map((item: Article) => this.transformToArticleView(item, searchValue));
        }),
        takeUntilDestroyed(this.destroyRef)
      );

    this.articlesCount$ = this.spaceFlightNewsApiService.totalCount$.asObservable()
      .pipe(takeUntilDestroyed(this.destroyRef));
  }

  // TODO: get data on infinity scroll
  onScrollDown() {
    this.spaceFlightNewsApiService.getMoreItems(ItemsUrlType.ARTICLES);
  }

  onFilterChanged(filterValue: string | null) {
    if (filterValue && filterValue.length > 0) {
      this.spaceFlightNewsApiService.getItemsByQuery(ItemsUrlType.ARTICLES, {
        limit: 30,
        offset: 0,
        title_contains: filterValue,
        summary_contains: filterValue,
        ordering: 'title'
      } as ArticlesQueryParams);
    } else {
      this.spaceFlightNewsApiService.getItemsInit(ItemsUrlType.ARTICLES);
    }

    this.searchValue$.next(filterValue);
  }

  trackByFn(_: number, article: Article) {
    return article.id;
  }

  private transformToArticleView(article: Article, searchValue: string | null = null): ArticleView {
    return {
      data: article,
      searchValue
    };
  }

}
