import { Component, OnInit, Output, EventEmitter } from '@angular/core';


declare var $: any;

@Component({
  selector: 'visualizer-create-edit-relation-modals',
  templateUrl: './create-edit-relation-modals.component.html',
  styleUrls: ['./create-edit-relation-modals.component.scss']
})
export class CreateEditRelationModalsComponent implements OnInit {

  @Output() modalCloseEvent = new EventEmitter<object>();
  constructor() { }

  ngOnInit() {
    $('#createRelationModal').on('hidden.bs.modal', (closeEvent) => {
      console.log('modal create/edit closed event triggered');
      this.modalCloseEvent.emit({type: 'event', context: 'close', isClosed: true, id: 'createRelationModal'});
    });
  }

}
