import { Component, OnInit } from '@angular/core';

import * as _ from 'lodash';

declare var $: any;

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

  createNode(modalID: string = 'createNodeModal') {
    $(`#${modalID}`).modal('show');
  }

  createRelation(modalID: string = 'createRelationModal') {
    $(`#${modalID}`).modal('show');
  }

  /**
   * Closed Modal
   * @description This will be triggered whenever the create or edit node modal is closed in any way.
   * @param event
   */
  closedModal(event) {
    console.log('Modal create / edit closed', event);
  }

}
