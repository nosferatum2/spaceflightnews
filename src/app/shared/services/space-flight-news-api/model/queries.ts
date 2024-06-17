// TODO: expand query params to include all available query params
abstract class QueryParams {

  public limit: number = 30;

  public offset: number = 0;

  public search?: string;

  public ordering?: string;

  public summary_contains?: string;

  public title_contains?: string;

}

export class ArticlesQueryParams extends QueryParams {

  constructor(data?: Partial<ArticlesQueryParams>) {
    super();
    Object.assign(this, data);
  }

  build() {
    return {
      limit: this.limit,
      offset: this.offset,
    };
  }

  buildQuery(data?: Partial<ArticlesQueryParams>) {
    return new ArticlesQueryParams(data);
  }

}
