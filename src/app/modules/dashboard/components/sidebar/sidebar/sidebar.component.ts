import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SharedGraphService } from 'src/app/modules/visualizer/services/shared-graph-service/shared-graph.service';
import * as _ from 'lodash';

@Component({
  selector: 'dashboard-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Output() sidebarBtnClicked = new EventEmitter<object>();
  public btnTextReset = "Reset";
  public btnTextApply = "Apply";
  public selectedAttributeOptions: Array<object> = [];
  public selectedGraph: { type: string, value: Array<string> }[] = [];
  public selectedRelation: Array<string> = [];
  public preSelectedRel: string;

  constructor(private sharedGraphData: SharedGraphService) { }

  ngOnInit() {
  }
  searchGraph(isClicked: object = {isClicked : false},clickedFrom: string = 'node') {
    if (isClicked) {
      // button is clicked
      this.selectedGraph = [];
      if (this.selectedAttributeOptions) {
        Object.keys(this.selectedAttributeOptions).forEach(selectedKey => {
        if (this.selectedAttributeOptions[selectedKey].length > 0) {
          this.selectedGraph.push({ type: selectedKey, value: this.selectedAttributeOptions[selectedKey] });
        }
      });
      if (this.selectedGraph.length > 0) {
        this.sidebarBtnClicked.emit({ event: 'search', nodes: this.selectedGraph });
      } else {
        // if no selected element
        this.sidebarBtnClicked.emit({event: 'search'});
      }
    }
    
    } else {
      // button is not clicked
    }
  }

  resetGraph(data) {
    // this.getGraph();
    console.log("resetGraph");
    this.selectedAttributeOptions = [];
    this.selectedRelation = [];
    if (this.preSelectedRel) {
      var element = document.getElementById(this.preSelectedRel);
      element.classList.remove("selected");
    }
    let obj = { event: 'reset' };
    this.sidebarBtnClicked.emit(obj);
  }
  // to store selecetd dropdown data from child node-filter
  setSelectedData(selectedData: object = null){
    if(selectedData){
      this.selectedAttributeOptions = _.cloneDeep(selectedData);
    }
  }
}
