// TODO: expand query params to include all available query params
abstract class QueryParams {

  public limit: number = 100;

  public offset: number = 0;

}

export class ArticlesQueryParams extends QueryParams {

  constructor(data?: Partial<ArticlesQueryParams>) {
    super();
    Object.assign(this, data);
  }

}
