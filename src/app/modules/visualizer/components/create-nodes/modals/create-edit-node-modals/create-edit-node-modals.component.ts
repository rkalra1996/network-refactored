import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';

declare var $: any;

@Component({
  selector: 'visualizer-create-edit-node-modals',
  templateUrl: './create-edit-node-modals.component.html',
  styleUrls: ['./create-edit-node-modals.component.scss']
})
export class CreateEditNodeModalsComponent implements OnInit {

  @Output() modalCloseEvent = new EventEmitter<object>();

  public createNodeFormGroup: FormGroup;

  constructor(private fb: FormBuilder) {

    this.createNodeFormGroup = this.fb.group({
      newNodeType : new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    $('#createNodeModal').on('hidden.bs.modal', (closeEvent) => {
      console.log('modal create/edit closed event triggered');
      this.modalCloseEvent.emit({type: 'event', context: 'close', isClosed: true, id: 'createNodeModal'});
    });
  }

  getNodeFormControls() {
    return this.createNodeFormGroup.controls;
  }

  storeNewType() {
    console.log('Store new type clicked', this.createNodeFormGroup.value);
  }

}
