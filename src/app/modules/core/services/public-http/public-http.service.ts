import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicHttpService {

  constructor(private http: HttpClient) { }

  get(url, httpOptions = {}) {
    const requestUrl = !!url ? url : null;
    // if(httpOptions.hasOwnProperty('user-token') && httpOptions.hasOwnProperty('contentType')){
    if (HttpClient) {
      httpOptions = {
        'Access-Control-Allow-Origin': httpOptions['Access-Control-Allow-Origin']
      };
    }
    if (!!requestUrl) {
      return this.http.get(requestUrl, httpOptions);
    } else {
      console.error('No url provided for get request');
      return throwError('No url provided');
    }
  }
  post(url,body) {
    const requestUrl = !!url ? url : null;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
       })
    };
    if (!!requestUrl) {
      return this.http.post(requestUrl, body, httpOptions);
    } else {
      console.error('No url provided for post request');
      return throwError('No url provided');
    }
  }


  patch() {
    // no implementation yet
  }
}
