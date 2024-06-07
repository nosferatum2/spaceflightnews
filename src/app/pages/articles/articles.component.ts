import { Component, DestroyRef, inject, OnInit } from '@angular/core';
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
import { debounceTime, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    ReactiveFormsModule
  ],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss',
  providers: [SpaceFlightNewsApiService]
})
export class ArticlesComponent implements OnInit {

  articles$: Observable<Article[]>;

  filterSearch = new FormControl('');

  private spaceFlightNewsApiService = inject(SpaceFlightNewsApiService);

  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.articles$ = this.spaceFlightNewsApiService.items$;
    this.spaceFlightNewsApiService.getItems(ItemsUrlType.ARTICLES);

    // TODO: implement Filter search
    this.filterSearch.valueChanges
      .pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef))
      .subscribe(console.log);
  }

  // TODO: get data on infinity scroll
  onScrollDown() {
    this.spaceFlightNewsApiService.getMoreItems(ItemsUrlType.ARTICLES);
  }

  trackByFn(_: number, article: Article) {
    return article.id;
  }

}
