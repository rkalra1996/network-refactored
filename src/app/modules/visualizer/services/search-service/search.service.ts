import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor( private http: HttpClient) { }

  runQuery(request) {
    // const url = '/api/search/neo4j';
    const url = 'http://localhost:3050/api/search/neo4j';
    const token = 'DDCE5DBC3AA826EA295F963113B4F';
    let httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
        Database_Authorization: token
      })
    };
    return this.http.post(url, request, httpOptions);
  }
}
