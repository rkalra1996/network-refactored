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

  clickTriggered() {
    console.log("gr",{isClicked: true});
    this.clicked.next({isClicked: true});
  }

}
