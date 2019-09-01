import { Component, OnInit } from '@angular/core';

import {GraphExportService} from './../../services/graph-export/graph-export.service';

@Component({
  selector: 'shared-graph-exporter',
  templateUrl: './graph-exporter.component.html',
  styleUrls: ['./graph-exporter.component.scss']
})
export class GraphExporterComponent implements OnInit {

  constructor(private graphExprtSrvc: GraphExportService) { }

  ngOnInit() {
  }

  // Function to hit the export API with specified format
  exportGraph(formatToExport = 'csv') {
    this.graphExprtSrvc.getExportData(formatToExport)
    .subscribe(fileData => {
      const element = this.graphExprtSrvc.initiateDownload('a', fileData);
      // initiate download
      element.click();
    }, error => {
      // check for ok and status
      if (error.ok === false && error.status === 200) {
        const element = this.graphExprtSrvc.initiateDownload('a', error['text']);
      // initiate download
        element.click();
      } else {
        console.error('An error occured while getting file content from the service ', error);
      }
    });
  }

}
