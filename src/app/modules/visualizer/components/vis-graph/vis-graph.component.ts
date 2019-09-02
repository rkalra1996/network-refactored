import { Component, OnInit } from '@angular/core';
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
export class VisGraphComponent implements OnInit {

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

    setFilteredData(isDeletedToggle = false) {
      this.filteredGraphData['nodes'] = [];
      this.filteredGraphData['edges'] = [];
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
      this.allGraphData['edges'].filter(edge => {
        if (edge['properties']['deleted'] === "false" || edge['properties']['deleted'] === false) {
          let tem = _.cloneDeep(edge);
          tem['title'] = this.graphUtility.stringifyProperties(tem);
          this.filteredGraphData['edges'].push(tem);
        }
      });
    }
  }
