import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { GraphVisualizerService } from '../../services/graph-visualizer-service/graph-visualizer.service';
import {ColorPanelService} from './../../services/color-panel-service/color-panel.service';
import {DataSet, Network} from 'vis';

import {VisualizerUtility} from './../../utilities/visualizer-utilities/visualizer-utility';

import * as _ from 'lodash';

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
  
  constructor(private graphVisualizerSrvc: GraphVisualizerService, private colorSrvc: ColorPanelService) {
    this.graphUtility = new VisualizerUtility();
   }

  ngOnInit() {
    this.graphOptions = this.graphUtility.getVisGraphOptions();
    this.displayInitialGraph();

    this.colorSrvc.colorObj$.subscribe(response => {
      this.colorConfig = response;
    });
  }
  ngOnChanges(){
    if (this.sidebarBtnClicked && typeof this.sidebarBtnClicked === 'object' && this.sidebarBtnClicked.hasOwnProperty('event')) {
      const searchEvent = this.sidebarBtnClicked['event'];
      if (searchEvent === 'search' || searchEvent === 'reset') {
        this.changeNodeColor();
      }
    }
  }
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

    setFilteredData(isDeletedToggle:boolean = false) {
      this.filteredGraphData['nodes'] = [];
      this.filteredGraphData['edges'] = [];
      if(this.allGraphData && typeof this.allGraphData === 'object' && this.allGraphData.hasOwnProperty('nodes')){
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
    if(this.allGraphData && typeof this.allGraphData === 'object' && this.allGraphData.hasOwnProperty('edges')){
      this.allGraphData['edges'].filter(edge => {
        if (edge['properties']['deleted'] === "false" || edge['properties']['deleted'] === false) {
          let tem = _.cloneDeep(edge);
          tem['title'] = this.graphUtility.stringifyProperties(tem);
          this.filteredGraphData['edges'].push(tem);
        }
      });
    }
    }
    changeNodeColor() {
      if (this.sidebarBtnClicked && typeof this.sidebarBtnClicked === 'object' && this.sidebarBtnClicked.hasOwnProperty('event') && this.sidebarBtnClicked['event'] === 'search') {
        this.loader = true;
        this.showGraphData();
      } else if (this.sidebarBtnClicked && typeof this.sidebarBtnClicked === 'object' && this.sidebarBtnClicked.hasOwnProperty('event') && this.sidebarBtnClicked['event'] === 'reset') {
        this.loader = true;
        this.displayInitialGraph();
      }         
    }
    showGraphData() {
      this.loader = true;
      let requestBody = {};
      if(this.sidebarBtnClicked && typeof this.sidebarBtnClicked === 'object' && this.sidebarBtnClicked.hasOwnProperty('nodes')){
         requestBody['nodes'] = this.sidebarBtnClicked['nodes'];
         this.graphVisualizerSrvc.getSearchDataV2(requestBody).subscribe(result => {
          // console.log('recieved data from graph service', result);
          // set data for vis
          if (result && typeof result === 'object' && result.hasOwnProperty('seperateNodes')) {
            result = this.addColors(result);
            //this.graphData['nodes'] = new DataSet(result['seperateNodes']);
            // store all data without any filter
            // this.allGraphData['nodes'] = new DataSet(result['seperateNodes']); 
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
  
    reinitializeGraph() {
      if(this.graphData && typeof this.graphData === 'object' && this.graphData.hasOwnProperty('nodes')){
        this.network.setData(this.graphData);
      }
    }
    addColors(resultObj) {
      // if the user opted for deleted data, simply set deleted default color to all the nodes
      resultObj['seperateNodes'].forEach(node => {
        if (node.hasOwnProperty('type') && node.type.length > 0) {
          if (node['properties']['deleted'] === "true" || node['properties']['deleted'] === true) {
            node['color'] = this.colorConfig['deletedColor']['colorCode'];
          } else {
            // if the node has a color property, assign that else assign the defaults one
            node = this.shiftColorKey(node);
            if (!node.hasOwnProperty('color')) {
              node['color'] = this.colorConfig['defaultColor'][node.type[0]];
            }
          }
        }
      });
      // if the user opted for deleted data, simply set deleted default color to all the edges
      resultObj['seperateEdges'].forEach(edge => {
        if (edge.hasOwnProperty('type') && edge.type.length > 0) {
          if (edge['properties']['deleted'] === "true" || edge['properties']['deleted'] === true) {
            edge['color']['color'] = this.colorConfig['deletedColor']['colorCode'];
            edge['color']['highlight'] = this.colorConfig['deletedColor']['highlightColorCode'];
          } else {
            // edge['color'] = this.colorConfig.defaultColor[edge.type[0]];
          }
        }
      });
      // console.log(nodeObj);
      return resultObj;
  
    }
    shiftColorKey(elementObject, previousObject = null) {
      // To add a new color key in the root level if color is present in properties key
      if (elementObject.hasOwnProperty('properties') && elementObject['properties'].hasOwnProperty('color')) {
        elementObject['color'] = elementObject['properties']['color'];
        return elementObject;
      } else if (previousObject !== null) {
        return previousObject;
      } else {
        return elementObject;
      }
    }
  }
