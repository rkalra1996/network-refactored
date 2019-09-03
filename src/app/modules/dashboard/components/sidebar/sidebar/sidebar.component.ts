import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SharedGraphService } from 'src/app/modules/visualizer/services/shared-graph-service/shared-graph.service';

@Component({
  selector: 'dashboard-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Output() eventClicked = new EventEmitter<object>();
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
    console.log("searchGraph");
    if (isClicked) {
      // button is clicked
      let requestBody;
      this.selectedGraph = [];
      if (this.selectedAttributeOptions) {
        Object.keys(this.selectedAttributeOptions).forEach(selectedKey => {
        if (this.selectedAttributeOptions[selectedKey].length > 0) {
          this.selectedGraph.push({ type: selectedKey, value: this.selectedAttributeOptions[selectedKey] });
        }
      });
      if (this.selectedGraph.length > 0) {
        requestBody = { nodes: this.selectedGraph };
      } else {
        // if no selected element
        requestBody = {};
      }
    }
    console.log('request is made like ', requestBody)
    this.sharedGraphData.setGraphData(requestBody);
    let obj = { event: 'search' };
    this.eventClicked.emit(obj);
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
    this.eventClicked.emit(obj);
  }
}
