/**
 * Graph visualizer.
 * @created_date 02/09/2019
 * @version 1.0.0
 * @author Rishabh Kalra
 */
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { GraphVisualizerService } from '../../services/graph-visualizer-service/graph-visualizer.service';
import { ColorPanelService } from './../../services/color-panel-service/color-panel.service';
import { DataSet, Network } from 'vis';

import { VisualizerUtility } from './../../utilities/visualizer-utilities/visualizer-utility';

import * as _ from 'lodash';
import { SharedGraphService } from '../../services/shared-graph-service/shared-graph.service';

@Component({
  selector: 'visualizer-vis-graph',
  templateUrl: './vis-graph.component.html',
  styleUrls: ['./vis-graph.component.scss']
})
export class VisGraphComponent implements OnInit, OnChanges {

  @Input() sidebarBtnClicked: object = null;
  private graphUtility: any;

  private graphOptions: object = {};
  public graphData: object = {};
  public allGraphData: object = {};
  public filteredGraphData: object = {};
  public network: any;
  public showDeletedData = false;
  public selectedCount = null;
  public loader = false;
  public hideDelModal = false;
  public colorConfig: object = {};
  private SIDEBAR_EVENTS_SEARCH = 'search';
  private SIDEBAR_EVENTS_RESET = 'reset';

  constructor(private graphVisualizerSrvc: GraphVisualizerService, private colorSrvc: ColorPanelService, private sharedGraphService: SharedGraphService) {
    this.graphUtility = new VisualizerUtility();
  }

  ngOnInit() {
    this.graphOptions = this.graphUtility.getVisGraphOptions();
    this.displayInitialGraph();

    this.colorSrvc.colorObj$.subscribe(response => {
      this.colorConfig = response;
    });
    // subscribe to showDeletedData so that appropriate data can be fetched
    this.sharedGraphService.showDeletedData.subscribe(toggle => {
      if (toggle !== null && (toggle.toString() === 'true' || toggle.toString() === 'false')) {
        this.loader = true;
        // if the toggle variable is  only true and false and nothing else
        this.showDeletedData = toggle;
        // console.log('recieved toggle', toggle);
      } else {
        // set to false by default
        this.showDeletedData = false;
      }
      if (this.showDeletedData) {
        this.showAllData();
      } else {
        if (this.allGraphData.hasOwnProperty('nodes')) {
          this.showFilteredData();
        }
      }
    }, err => {
      // set to false by default
      console.error('An error occured while subscribing to the toggle for deleted data', err);
      this.showDeletedData = false;
      this.displayInitialGraph();
    });
  }
  ngOnChanges() {
    if (this.sidebarBtnClicked && typeof this.sidebarBtnClicked === 'object' && this.sidebarBtnClicked.hasOwnProperty('event')) {
      const searchEvent = this.sidebarBtnClicked['event'];
      if (searchEvent === this.SIDEBAR_EVENTS_SEARCH || searchEvent === this.SIDEBAR_EVENTS_RESET) {
        this.updateGraphOnSidebarEvent(searchEvent);
      }
    }
  }
  
  
  /**
   * Displays initial graph
   * @author Neha Verma
   */
  displayInitialGraph() {
    this.graphVisualizerSrvc.getInitialDataV2().subscribe(result => {
      // set data for vis
      if (result.hasOwnProperty('seperateNodes')) {
        // set color config using nodes color properties
        this.colorSrvc.updateColorConfigObject(result);
        // add colors to nodes
        result = this.colorSrvc.addColors(result);
        // store all data without any filter
        this.allGraphData['nodes'] = result['seperateNodes'];
        this.allGraphData['edges'] = result['seperateEdges'];
        // to update filtered data
        this.setFilteredData(this.showDeletedData);
        // check for show deleted toggel
        if (this.showDeletedData) {
          // show all data
          this.graphData['nodes'] = this.graphUtility.createVisDataset(this.allGraphData['nodes']);
        } else {
          // show filtered data
          this.graphData['nodes'] = this.graphUtility.createVisDataSet(this.filteredGraphData['nodes']);
        }
        if (this.graphData.hasOwnProperty('length')) {
          this.selectedCount = this.graphData['nodes'].length;
        } else {
          this.selectedCount = 0;
        }
      }
      if (result.hasOwnProperty('seperateEdges')) {
        // check for show deleted toggel
        if (this.showDeletedData) {
          this.graphData['edges'] = new DataSet(this.allGraphData['edges']);
        } else {
          // show filtered data
          this.graphData['edges'] = new DataSet(this.filteredGraphData['edges']);
        }
      }
      // console.log('graphData :', this.graphData);
      // display data
      const container = document.getElementById('graphViewer');
      this.loader = false;
      this.network = new Network(container, this.graphData, this.graphOptions);

      // activating double click event for editing node or relationship
      console.log('registering double click');
      this.network.on('doubleClick', (event) => {
        this.hideDelModal = false;
        console.log('double click');
        // this.graphUtility.doubleClickHandler(event);
      });
    }, err => {
      console.error('An error occured while retrieving initial graph data', err);
      this.loader = true;
      this.graphData = {};
    });
    // activate double click event for editing a node or a relationship
  }

  /**
   * Sets filtered data
   * @description to set filteredGraph data (non-deleted) variable
   * @param [isDeletedToggle] 
   * @author Neha Verma
   */
  setFilteredData(isDeletedToggle: boolean = false) {
    this.filteredGraphData['nodes'] = [];
    this.filteredGraphData['edges'] = [];
    if (this.allGraphData && typeof this.allGraphData === 'object' && this.allGraphData.hasOwnProperty('nodes')) {
      this.allGraphData['nodes'].filter(node => {
        if (node['properties']['deleted'] === "false" || node['properties']['deleted'] === false) {
          let tem = _.cloneDeep(node);
          if (isDeletedToggle) {
            delete tem['color'];
          }
          tem['title'] = this.graphUtility.stringifyProperties(tem);
          this.filteredGraphData['nodes'].push(tem);
        }
      });
    }
    if (this.allGraphData && typeof this.allGraphData === 'object' && this.allGraphData.hasOwnProperty('edges')) {
      this.allGraphData['edges'].filter(edge => {
        if (edge['properties']['deleted'] === "false" || edge['properties']['deleted'] === false) {
          let tem = _.cloneDeep(edge);
          tem['title'] = this.graphUtility.stringifyProperties(tem);
          this.filteredGraphData['edges'].push(tem);
        }
      });
    }
  }

  /**
   * Updates graph on sidebar event
   * @description check for sidebar event 
   * @param sidebarBtnEvent 
   * @author Neha Verma
   */
  updateGraphOnSidebarEvent(sidebarBtnEvent: string) {
    this.loader = true;
    if (sidebarBtnEvent && sidebarBtnEvent === this.SIDEBAR_EVENTS_SEARCH) {
      this.showGraphData();
    } else if (sidebarBtnEvent && sidebarBtnEvent === this.SIDEBAR_EVENTS_RESET) {
      this.displayInitialGraph();
    } else {
      // invalid sideBarEvent recieved
    }
    this.loader = false;
  }

  /**
   * Shows graph data
   * @description get filtered data from database 
   * @author Neha Verma
   */
  showGraphData() {
    this.loader = true;
    let requestBody = {};
    if (this.sidebarBtnClicked && typeof this.sidebarBtnClicked === 'object') {
      if(this.sidebarBtnClicked.hasOwnProperty('nodes')){
        requestBody['nodes'] = this.sidebarBtnClicked['nodes'];
      }
      if(this.sidebarBtnClicked.hasOwnProperty('edges')){
        requestBody['edges'] = this.sidebarBtnClicked['edges'];
      } 
      this.graphVisualizerSrvc.getSearchDataV2(requestBody).subscribe(result => {
        // set data for vis
        if (result && typeof result === 'object' && result.hasOwnProperty('seperateNodes') && result.hasOwnProperty('seperateEdges')) {
          result = this.graphUtility.addColors(result, this.colorConfig);
          // store all data without any filter
          this.allGraphData['nodes'] = result['seperateNodes'];
          this.allGraphData['edges'] = result['seperateEdges'];
          // to update filtered data
          this.setFilteredData();
          //check for show deleted 
          if (this.showDeletedData) {
            // show all data
            this.graphData['nodes'] = new DataSet(this.allGraphData['nodes']);

          } else {
            // remove deleted data
            this.graphData['nodes'] = new DataSet(this.filteredGraphData['nodes']);
          }
          this.selectedCount = this.graphData['nodes'].length;
        }
        if (result && typeof result === 'object' && result.hasOwnProperty('seperateEdges')) {
          if (this.showDeletedData) {
            this.graphData['edges'] = new DataSet(this.allGraphData['edges']);
          } else {
            this.graphData['edges'] = new DataSet(this.filteredGraphData['edges']);
          }

        }
        this.reinitializeGraph();
        this.loader = false;
      }, err => {
        console.error('An error occured while retrieving initial graph data', err);
        this.loader = true;
        this.graphData = {};
      });
    }
  }

  /**
   * Reinitialize the visualizer graph.
   * @author NehaVerma
   */
  reinitializeGraph() {
    if (this.graphData && typeof this.graphData === 'object' && this.graphData.hasOwnProperty('nodes')) {
      this.network.setData(this.graphData);
    }
  }

  /**
   * Show all data
  * @description to show all data (deleted and non-deleted)
  * @author NehaVerma
  */
  showAllData() {
    // create dataset for all data 
    if (this.allGraphData && typeof this.allGraphData === 'object' && this.allGraphData.hasOwnProperty('nodes') && this.allGraphData.hasOwnProperty('edges')) {
      this.graphData['nodes'] = new DataSet(this.allGraphData['nodes']);
      this.graphData['edges'] = new DataSet(this.allGraphData['edges']);
      // to count graph element
      this.selectedCount = this.graphData['nodes'].length;
      // display data
      this.reinitializeGraph();
    }
    this.loader = false;
  }

  /**
  * Show filtered data
  * @description to show filtered data (non-deleted)
  * @author NehaVerma
  */
  showFilteredData() {
    // create dataset for filtered graph data
    if (this.filteredGraphData && typeof this.filteredGraphData === 'object' && this.filteredGraphData.hasOwnProperty('nodes') && this.filteredGraphData.hasOwnProperty('edges')) {
      this.graphData['nodes'] = new DataSet(this.filteredGraphData['nodes']);
      this.graphData['edges'] = new DataSet(this.filteredGraphData['edges']);
      // to count graph element
      this.selectedCount = this.graphData['nodes'].length;
      // display data
      this.reinitializeGraph();
    }
    this.loader = false;
  }

}
