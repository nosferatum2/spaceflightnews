import { Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RequestOptions {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  context?: HttpContext;
  observe?: any;
  params?: HttpParams | {
    [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
  };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?: {
    includeHeaders?: string[];
  } | boolean;
}

export enum ItemsUrlType {
  ARTICLES = '/articles',
  NEWS = '/news',
  EVENTS = '/events',
  LAUNCHES = '/launches'
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://api.spaceflightnewsapi.net/v4';

  private config: RequestOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    observe: 'body',
    params: {},
    responseType: 'json',
  };

  constructor(
    private http: HttpClient
  ) {
  }

  public doGetRequest<T>(path: string, params?: any): Observable<T> {
    const config = { ...this.config, params: { ...params } };
    return this.http.get<T>(this.buildUrl(path), config);
  }

  public doPostRequest<T>(path: string, body: any, params?: any): Observable<T> {
    const config = { ...this.config, params: { ...params } };
    return this.http.post<T>(this.buildUrl(path), body, config);
  }

  public doPutRequest<T>(path: string, body: any, params?: any): Observable<T> {
    const config = { ...this.config, params: { ...params } };
    return this.http.put<T>(this.buildUrl(path), body, config);
  }

  public doDeleteRequest(path: string) {
    const config = { ...this.config };
    return this.http.delete(this.buildUrl(path), config);
  }

  private buildUrl(path: string) {
    return this.baseUrl + path;
  }

}
