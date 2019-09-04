/**
 * Gray Button
 * @created_date 02/09/2019
 * @version 1.0.0
 * @author Neha Verma
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'shared-gray-button',
  templateUrl: './gray-button.component.html',
  styleUrls: ['./gray-button.component.scss']
})
export class GrayButtonComponent implements OnInit {

@Input() btnText: string = "default";
@Output() clicked = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  /**
   * Clicks triggered
   * @description emit show deleted toggle status
   * @author Rishabh Kalra
   */
  clickTriggered() {
    this.clicked.emit({isClicked: true});
  }

}
