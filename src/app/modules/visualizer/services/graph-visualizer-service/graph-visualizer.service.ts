import { Injectable } from '@angular/core';
import {PublicHttpService} from './../../../core/services/public-http/public-http.service';

import { Observable, of, pipe, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import {throwError} from 'rxjs';

import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class GraphVisualizerService {

  constructor(private publicHttp: PublicHttpService) { }

  getInitialDataV2() {
    // const url = 'http://localhost:3050/api/initialdatav2';
    const url = 'http://localhost:3050/api/initialdatav2';
    return this.publicHttp.get(url).pipe(map(data => {
      if (!!data) {
        return data;
      } else {
        return of({});
      }
    }));
  }
}
