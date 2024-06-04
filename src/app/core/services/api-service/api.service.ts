import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://api.spaceflightnewsapi.net/v3';

  constructor(
    private http: HttpClient
  ) {
  }

  public doGetRequest<R>(path: string, options?: any) {
    return this.http.get<R>(this.buildUrl(path), options);
  }

  public doPostRequest<R>(path: string, body: any, options?: any) {
    return this.http.post<R>(this.buildUrl(path), body, options);
  }

  public doPutRequest<R>(path: string, body: any, options?: any) {
    return this.http.put<R>(this.buildUrl(path), body, options);
  }

  public doDeleteRequest<R>(path: string) {
    return this.http.delete<R>(this.buildUrl(path));
  }

  private buildUrl(path: string) {
    return this.baseUrl + path;
  }

}
