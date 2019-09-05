/**
 * Sidebar
 * @created_date 02/09/2019
 * @version 1.0.0
 * @author Neha Verma
 */
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SharedGraphService } from 'src/app/modules/visualizer/services/shared-graph-service/shared-graph.service';
import * as _ from 'lodash';
import { ResetInterface, SelectedEdgeInterface, SelectedNodeInterface } from '../../../interfaces/sidebar-interface';

@Component({
  selector: 'dashboard-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Output() sidebarBtnClicked = new EventEmitter<object>();
  public BUTTON_TEXT_RESET = "Reset";
  public BUTTON_TEXT_APPLY = "Apply";
  public selectedAttributeOptions: Array<object> = [];
  public selectedRelation: Array<string> = [];
  public formatedSelectedRelation: Array<SelectedEdgeInterface> = [];
  public selectedGraph: Array<SelectedNodeInterface> = [];
  public preSelectedRel: string;
  private showDisabled: boolean = false;
  public resetObj: ResetInterface = {reset: false};
  constructor(private sharedGraphData: SharedGraphService) { }

  ngOnInit() {
  }

  /**
   * Searchs graph
   * @description collect selected dropdown values in single object
   * @param [isClicked] 
   * @param [clickedFrom] 
   * @author Neha Verma
   */
  searchGraph(isClicked: object = {isClicked : false},clickedFrom: string = 'nodes') {
    if (isClicked && clickedFrom === 'nodes') {
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
    } else if (isClicked && clickedFrom === 'relation') {
      if (this.selectedRelation && typeof this.selectedRelation === 'object' && this.selectedRelation.length > 0) {
        this.formatedSelectedRelation = [];
        this.selectedRelation.map(rel => {
          this.formatedSelectedRelation.push({ type: rel });
        })
        this.sidebarBtnClicked.emit({ event: 'search',nodes: [], edges: this.formatedSelectedRelation });
      }  else {
       // if no selected element
       this.sidebarBtnClicked.emit({event: 'search'});
      }
     } else {
      // button is not clicked
    }
  }

  /**
   * Resets graph
   * @description emit reset event to graph visualizer to reset vis-graph
   * @param data 
   * @author Neha Verma
   */
  resetGraph(event : Event) {
    // this.getGraph();
    // console.log("resetGraph");
    this.selectedAttributeOptions = [];
    this.selectedRelation = [];
    if (this.preSelectedRel) {
      var element = document.getElementById(this.preSelectedRel);
      element.classList.remove("selected");
    }
    let obj = { event: 'reset' };
    this.resetObj = {reset: true};
    this.sidebarBtnClicked.emit(obj);
  }

  /**
   * Sets selected data
   * @description to store selecetd nodes dropdown data from child node-filter
   * @param [selectedData] 
   * @author Neha Verma
   */
  setSelectedData(selectedData: object = null){
    if(selectedData){
      this.selectedAttributeOptions = _.cloneDeep(selectedData);
    }
  }

    /**
   * Sets selected relation data
   * @description to store selecetd relation dropdown data from child relation-filter
   * @param [selectedData] 
   * @author Neha Verma
   */
  setSelectedRelData(selectedData: object = null){
    if(selectedData){
      this.selectedRelation = _.cloneDeep(selectedData);
    }
  }

  /**
   * Nodes limit toggle handler
   * @description store toogle status in shared service
   * @param event 
   * @author Rishabh Kalra
   */
  NodeLimitToggleHandler(event) {
    try {
      if (event.constructor === Object) {
        this.showDisabled = event['isOn'];
      }
    } catch (e) {
      this.showDisabled = false;
    }
    this.sharedGraphData.sendToogleStatus(this.showDisabled);
  }
}
