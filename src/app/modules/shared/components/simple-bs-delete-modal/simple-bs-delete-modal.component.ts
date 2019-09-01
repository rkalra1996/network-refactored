import { Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewInit } from '@angular/core';
import {BsDeleteModalInterface} from './../../interfaces/bs-delete-modal-interface';
import {CommonModalsService} from './../../services/common-modals/common-modals.service';

declare var $: any;

@Component({
  selector: 'shared-simple-bs-delete-modal',
  templateUrl: './simple-bs-delete-modal.component.html',
  styleUrls: ['./simple-bs-delete-modal.component.scss']
})
export class SimpleBsDeleteModalComponent implements OnInit, OnChanges, AfterViewInit{

  @Input() deleteContext: object | null = null;

  @Output() modalSubmit: any | null = null;
  @Output() modalReject: any | null = null;
  @Output() modalClosed = new EventEmitter<any>();

  public deleteModalID = 'deleteModal';

  constructor(private modalSrvc: CommonModalsService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $(`#${this.deleteModalID}`).on('shown.bs.modal', (e) => {
      this.addAttribute(
        {
        attributeName: `${this.deleteContext['context']}_id`,
        attributeValue: this.deleteContext['contextID'],
        targetID: 'del_btn'
      });
    });
    $(`#${this.deleteModalID}`).on('hidden.bs.modal', (e) => {
      this.modalClosed.emit({type: 'delete', context: 'node', event: 'close'});
    });
  }

  ngOnChanges() {
    if(this.deleteContext) {
      this.processModalDetails(this.deleteModalID);
    }
  }

  processModalDetails(modalID: string) {
    this.modalSrvc.showModal(modalID);
  }

  addAttribute(attributeObject: BsDeleteModalInterface): boolean {
    try {
      $(`#${attributeObject.targetID}`).attr(attributeObject.attributeName, attributeObject.attributeValue);
      return true;
    } catch (e) {
      console.log('An error occured while setting attribute in deleteModal', e);
      return false;
    }
  }

}
