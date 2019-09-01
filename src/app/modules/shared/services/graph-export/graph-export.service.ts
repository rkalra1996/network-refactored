import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PublicHttpService } from '../../../core/services/public-http/public-http.service';

import {GraphExportUtility} from './../utilities/graph-export/graph-export-utility';


@Injectable({
  providedIn: 'root'
})
export class GraphExportService {

  private graphExprtUtility: any = new GraphExportUtility();

  constructor(private publicHttp: PublicHttpService) {
   }

  getExportData(formatToExport = 'csv') {
    if (formatToExport) {
      const url = `/file/graph/export/${formatToExport}`;
      try {
        return this.publicHttp.get(url).pipe(map(data => {
          if (!!data) {
            const convertedData = this.graphExprtUtility.convertFileDataToBlob(data);
            return convertedData;
          } else {
            console.warn('did not recieve any data when retrieving export');
            return of({});
          }
        }));
      } catch (e) {
        const convertedData = this.graphExprtUtility.convertFileDataToBlob(e['text']);
        return of(convertedData);
      }
    }
  }

  initiateDownload(elementType, data = {}) {
    if (!!elementType) {
      const element = document.createElement(elementType);
      element.href = data['url'];
      element.download = `${data['fileName']}`;
      return element;
  } else {
    return null;
  }
  }
}
