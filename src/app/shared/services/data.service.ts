import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DataService {
  DATA_SOURCE = 'assets/data/userData.json';
  constructor(private http: HttpClient) { }

  showLoader = false;

  getRequest(url: string, params: any): Observable<any> {
    const _url = (url && url.length > 0) ? url : this.DATA_SOURCE;

    return this.http.get<any>(`${url}${params}`);
  }

  postRequest(url: string, params: any): Observable<any> {
    const _url = (url && url.length > 0) ? url : this.DATA_SOURCE;

    return this.http.post<any>(_url, params, {
        headers : new HttpHeaders({ 'Content-Type': 'application/json'})
      }
    );
  }

  putRequest(url: string, params: any): Observable<any> {
    const _url = (url && url.length > 0) ? url : this.DATA_SOURCE;

    return this.http.put<any>(`${url}${params.id}`, params, {
        headers : new HttpHeaders({ 'Content-Type': 'application/json'})
      }
    );
  }
}
