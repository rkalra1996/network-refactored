import { Injectable } from '@angular/core';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class CommonModalsService {

  constructor() { }

  showModal(modalID: string): boolean {
    if (modalID) {
      setTimeout(() => {
        $('#' + modalID).modal('show');
      }, 0);
      return true;
    } else {
      console.log('Modal ID not provided to show');
      return false;
    }
  }

  hideModal(modalID: string): boolean {
    if (modalID) {
    setTimeout(() => {
      $(`#${modalID}`).modal('hide');
    }, 0);
    return true;
  } else {
    console.log('Modal ID not provided to hide');
    return false;
  }
}
}
