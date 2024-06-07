import { DestroyRef, inject, Injectable } from '@angular/core';
import { ApiService, ItemsUrlType } from '@core/services/api-service/api.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Article, PaginatedArticleList } from '@shared/models/article.model';
import { BehaviorSubject } from 'rxjs';
import { ArticlesQueryParams } from './model/queries';

@Injectable()
export class SpaceFlightNewsApiService {

  public items$ = new BehaviorSubject<Article[]>([]);

  public totalCount$ = new BehaviorSubject<number>(0);

  private articlesQueryParams = new ArticlesQueryParams();

  private destroyRef = inject(DestroyRef);

  private apiService = inject(ApiService);

  public getItems(type: ItemsUrlType) {
    this.apiService.doGetRequest<PaginatedArticleList>(type, this.articlesQueryParams)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        this.totalCount$.next(res.count);
        this.items$.next(res.results);
      });
  }

  public getMoreItems(type: ItemsUrlType) {
    let totalPages = this.getTotalPages(this.totalCount$.getValue(), this.articlesQueryParams.limit);
    let currentPage = this.getCurrentPage(this.articlesQueryParams.offset, this.articlesQueryParams.limit);

    if (currentPage > totalPages) {
      return;
    }

    this.articlesQueryParams.offset = this.getPageOffset(currentPage + 1, this.articlesQueryParams.limit);

    this.apiService.doGetRequest<PaginatedArticleList>(type, this.articlesQueryParams)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        this.totalCount$.next(res.count);
        this.items$.next([...this.items$.getValue(), ...res.results]);
      });
  }

  private getTotalPages(totalCount: number, pageLimit: number) {
    return Math.ceil(totalCount / pageLimit);
  }

  private getPageOffset(page: number, pageLimit: number) {
    return page * pageLimit;
  }

  private getCurrentPage(pageOffset: number, pageLimit: number) {
    return Math.ceil(pageOffset / pageLimit);
  }

}
