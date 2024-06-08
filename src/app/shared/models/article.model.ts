import { LaunchModel } from '@shared/models/launch.model';
import { EventModel } from '@shared/models/event.model';

export interface Article {
  id: number
  title: string
  url: string
  image_url: string
  news_site: string
  summary: string
  published_at: Date
  updated_at: Date
  featured: boolean
  launches: LaunchModel[]
  events: EventModel[]
}

export interface PaginatedArticleList {
  count: number
  next: string
  previous: string
  results: Article[]
}
