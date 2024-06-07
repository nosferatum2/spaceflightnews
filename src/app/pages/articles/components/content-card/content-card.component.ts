import { Component, input } from '@angular/core';
import { MatAnchor, MatButton, MatIconAnchor } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { Article } from '@shared/models/article.model';
import { DatePipe, NgOptimizedImage } from '@angular/common';

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
    MatIconAnchor
  ],
  templateUrl: './content-card.component.html',
  styleUrl: './content-card.component.scss'
})
export class ContentCardComponent {

  article = input<Article | null>(null);

}
