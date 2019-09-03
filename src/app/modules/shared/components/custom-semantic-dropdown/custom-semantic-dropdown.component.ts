import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedGraphService } from 'src/app/modules/visualizer/services/shared-graph-service/shared-graph.service';

@Component({
  selector: 'shared-custom-semantic-dropdown',
  templateUrl: './custom-semantic-dropdown.component.html',
  styleUrls: ['./custom-semantic-dropdown.component.scss']
})
export class CustomSemanticDropdownComponent implements OnInit {

  @Input() attributeOptions: object = {};
  @Output() selectedKeys = new EventEmitter<object>(null);
  public selectedAttributeOptions: Array<object> = [];
  private showDisabled: boolean = false;

  constructor(private sharedGraphService:SharedGraphService) { }

  ngOnInit() {
  }
  networkElementClick(element) { }


  //
  NodeLimitToggleHandler(event) {
    try {
      if (event.constructor === Object) {
        this.showDisabled = event['isOn'];
      }
    } catch (e) {
      this.showDisabled = false;
    }
    this.sharedGraphService.sendToogleStatus(this.showDisabled);
  }

  emitSelectedData(){
    let tempObject = {};
    tempObject[Object.keys(this.selectedAttributeOptions)[0]] = this.selectedAttributeOptions[Object.keys(this.selectedAttributeOptions)[0]];
    console.log('emitting : ', tempObject);
    this.selectedKeys.emit(tempObject);
  }

}
