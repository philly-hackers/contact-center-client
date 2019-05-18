import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DataService {
  DATA_SOURCE = 'assets/data/userData.json';
  constructor(private http: HttpClient) { }

  showLoader = false;

  getRequest(url, params): Observable<any> {
    return this.http.get<any>(this.DATA_SOURCE);
  }

  PostRequest(url, params): Observable<any> {
    return this.http.post<any>(url, params, {
        headers : new HttpHeaders({ 'Content-Type': 'application/json'})
      }
    );
  }

  pullRequest(): Observable<any> {
    return this.http.get<any>('/api/comments');
  }
}
