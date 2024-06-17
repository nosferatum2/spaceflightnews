import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatAnchor, MatButton, MatIconAnchor } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { DatePipe, NgOptimizedImage, SlicePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HighlightTextPipe } from '@pages/articles/components/content-card/highlight-text.pipe';
import { ArticleView } from '@pages/articles/components/content-card/article-view.model';

@Component({
  selector: 'app-content-card',
  standalone: true,
  imports: [
    MatButton,
    MatCardModule,
    MatIcon,
    NgOptimizedImage,
    DatePipe,
    MatAnchor,
    MatIconAnchor,
    RouterLink,
    SlicePipe,
    HighlightTextPipe
  ],
  templateUrl: './content-card.component.html',
  styleUrl: './content-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentCardComponent {

  article = input<ArticleView | null>(null);

}
