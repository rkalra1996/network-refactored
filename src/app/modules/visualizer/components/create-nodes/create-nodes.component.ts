import { Component, OnInit } from '@angular/core';

import * as _ from 'lodash';

@Component({
  selector: 'visualizer-create-nodes',
  templateUrl: './create-nodes.component.html',
  styleUrls: ['./create-nodes.component.scss']
})
export class CreateNodesComponent implements OnInit {

  public deleteModalDetails: object | null = null;

  constructor() { }

  ngOnInit() {
  }

  sendData() {
    setTimeout(() => {
      this.deleteModalDetails = _.cloneDeep({context: 'relation', contextID: 234, contextName: 'rk'});
    }, 0);
  }

  DeleteClosedModal($event) {
    console.log($event);
  }

}
