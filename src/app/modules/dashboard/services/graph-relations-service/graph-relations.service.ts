import { Injectable } from '@angular/core';
import { PublicHttpService } from 'src/app/modules/core/services/public-http/public-http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GraphRelationsService {

  constructor(private publicHttp: PublicHttpService) { }
  getGraphRelations(): Observable<any> {
    // const url = '/api/graph/relations';
    const url = 'http://localhost:3050/api/graph/relations';
    return this.publicHttp.get(url).pipe(map (data => {
      return data;
    }));
  }
}
