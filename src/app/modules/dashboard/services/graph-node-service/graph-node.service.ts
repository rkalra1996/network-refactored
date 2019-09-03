import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { PublicHttpService } from 'src/app/modules/core/services/public-http/public-http.service';

@Injectable({
  providedIn: 'root'
})
export class GraphNodeService {

  constructor(private publicHttp: PublicHttpService) { }


  getGraphProperties() {
    // const url = '/api/graph/properties';
    const url = 'http://localhost:3050/api/graph/properties';
    return this.publicHttp.get(url).pipe(map(data => {
      if (!!data) {
        return data;
      } else {
        return {response: 'empty'};
    }
    }, err => {
      throwError({error : 'Error while reading graph properties'});
      console.error(err);
    }));
  }
}
