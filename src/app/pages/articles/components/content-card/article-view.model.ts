import { Article } from '@shared/models/article.model';

export interface ArticleView {
  data: Article;
  searchValue: string | null;
}
