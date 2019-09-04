/**
 * Custom Semantic Dropdown
 * @created_date 02/09/2019
 * @version 1.0.0
 * @author Neha Verma
 */
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { SharedGraphService } from 'src/app/modules/visualizer/services/shared-graph-service/shared-graph.service';
import { ResetInterface } from 'src/app/modules/dashboard/interfaces/sidebar-interface';

@Component({
  selector: 'shared-custom-semantic-dropdown',
  templateUrl: './custom-semantic-dropdown.component.html',
  styleUrls: ['./custom-semantic-dropdown.component.scss']
})
export class CustomSemanticDropdownComponent implements OnInit, OnChanges {

  @Input() attributeOptions: object = {};
  @Input() resetObj: ResetInterface = {reset: false};
  @Output() selectedKeys = new EventEmitter<object>(null);
  public selectedAttributeOptions: Array<object> = [];
  private showDisabled: boolean = false;

  constructor(private sharedGraphService:SharedGraphService) { }

  ngOnInit() {
  }
 
  ngOnChanges(){
    if(this.resetObj && typeof this.resetObj === 'object' && this.resetObj.hasOwnProperty('reset') && this.resetObj['reset'] === true){
      this.selectedAttributeOptions = [];
    }
  }
  
  /**
   * Networks element click
   * @description for future use
   * @param element 
   * @author Neha Verma
   */
  networkElementClick(element) { }
  
  /**
   * Emits selected data
   * @description emits seletecd dropdown data to its parent based on type key
   * @author Neha Verma
   */
  emitSelectedData(){
    let tempObject = {};
    tempObject[Object.keys(this.selectedAttributeOptions)[0]] = this.selectedAttributeOptions[Object.keys(this.selectedAttributeOptions)[0]];
    this.selectedKeys.emit(tempObject);
  }

}
