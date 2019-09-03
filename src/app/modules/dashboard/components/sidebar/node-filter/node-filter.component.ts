import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { forkJoin, throwError } from 'rxjs';
import * as _ from 'lodash';
import { GraphNodeService } from '../../../services/graph-node-service/graph-node.service';
import { SharedGraphService } from 'src/app/modules/visualizer/services/shared-graph-service/shared-graph.service';
import { SearchService } from 'src/app/modules/visualizer/services/search-service/search.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'dashboard-node-filter',
  templateUrl: './node-filter.component.html',
  styleUrls: ['./node-filter.component.scss']
})
export class NodeFilterComponent implements OnInit {

  @Output() selectedData = new EventEmitter<object>(null);
  public totalAtrributeOptions: Array<object> = [];
  public selectedAttributeOptions: Array<object> = [];
  public selectedGraph: { type: string, value: Array<string> }[] = [];
  public graphData: object = {};
  public totalNodesProperties: object = {};
  public totalRelationsProperties: object = {};
  public processedData;
  public nodeTypes2: Array<any> = [];
  public selectedDropdownOptions: object = {};
  
  // Query to fetch all labels
  public queryObj = {
    raw: true,
    query: `MATCH (p) WITH DISTINCT keys(p) AS keys,p
     with DISTINCT labels(p) as label,keys 
     UNWIND keys AS keyslisting WITH DISTINCT keyslisting AS allfields,label
     RETURN collect(allfields),label`
  };

  constructor(private graphNodeService:GraphNodeService, private sharedGraphService:SharedGraphService, private searchService:SearchService) { }

  ngOnInit() {
    this.getGraph();
  }
  // set all data in sidebar dropdown
  getGraph() {
    this.totalAtrributeOptions = [];
    // fetch the properties of all the nodes and relationships
    forkJoin([this.graphNodeService.getGraphProperties(), this.getNodeTypes()]).subscribe(results =>{
      // results[0] is our character
      // results[1] is our character homeworld
      if(results[0].hasOwnProperty('nodes')){
        // push name to top
        this.setNodeProperties(results[0]);
        let index = this.totalAtrributeOptions.findIndex(obj => obj['attribute'] === "Name")
        this.totalAtrributeOptions = _.cloneDeep(this.swap(this.totalAtrributeOptions, index, 0));
      }
      if(results[1]){
        // push type to second position
        this.setTypes(results[1]);
        let index = this.totalAtrributeOptions.findIndex(obj => obj['attribute'] === "Type")
      this.totalAtrributeOptions = _.cloneDeep(this.swap(this.totalAtrributeOptions, index, 1));
      }
    }, err => {
      throwError({error : 'Error while reading graph properties'});
      console.error(err);
    });
  }
// for node properties
setNodeProperties(response){
  if (response.hasOwnProperty('nodes')) {
    this.totalNodesProperties = _.cloneDeep(response['nodes']);
    this.sharedGraphService.setNodeProperties(this.totalNodesProperties);
    if (this.totalNodesProperties) {
      Object.keys(this.totalNodesProperties).forEach(keyName => {
        if (keyName !== 'deleted' && keyName !== 'color')
          this.totalAtrributeOptions.push({ attribute: keyName, options: this.totalNodesProperties[keyName], rotate: false });
        // this.selectedAttributeOptions[keyName] = [];
      });
    }
    if (response.hasOwnProperty('relations')) {
      this.totalRelationsProperties = _.cloneDeep(response['relations']);
      this.sharedGraphService.setRelationProperties(this.totalRelationsProperties);
    }
    console.log(this.totalNodesProperties, this.totalRelationsProperties);
  }
  this.checkRotate();
  
}

// for types
setTypes(response){
if(response){
this.sharedGraphService.setProcessedData(this.processedData);
this.sharedGraphService.setNodeTypes2(this.nodeTypes2);
// this.typeOptions = this.nodeTypes2;
this.totalAtrributeOptions.push({ attribute: 'Type', options: this.nodeTypes2, rotate: false });
this.checkRotate();
return true;
}
}
// check for rotate object
checkRotate(){
  // check for selected value so the dropdown should not close on refresh
  if(this.selectedAttributeOptions){
    Object.keys(this.selectedAttributeOptions).forEach(selectedKey => {
      if (this.selectedAttributeOptions[selectedKey].length > 0) {
        this.totalAtrributeOptions = this.totalAtrributeOptions.filter(attr=>{
          if (attr && attr['attribute'] === selectedKey){
            attr['rotate'] = true;
            return attr;
          }else{
            return attr;
          }
        })
      }
  });
}
}
getNodeTypes() {
  return this.searchService.runQuery(this.queryObj).pipe(map(data => {
    console.log('recieved label data from service ', data);
    this.processedData = this.processData(data);
    // extract types from the array
    this.extractLabels(this.processedData);
    // this.typeOptions = _.cloneDeep(this.nodeTypes2);
    return this.nodeTypes2;
  }));
}
swap(ArrayForSwapping, swapFromIndex, swapToIndex) {
  let temArrayForSwapping = _.cloneDeep(ArrayForSwapping);
  const temp = temArrayForSwapping[swapFromIndex];
  temArrayForSwapping[swapFromIndex] = temArrayForSwapping[swapToIndex];
  temArrayForSwapping[swapToIndex] = temp;
  return temArrayForSwapping;
}

extractLabels(data) {
  this.nodeTypes2 = [];
  data.forEach(label => {
    this.nodeTypes2.push(label.type[0]);
  });
  // console.log('types are ', this.nodeTypes2);
}
processData(data) {
  if (data.length > 0) {
    let tempData = [];
    data.forEach(label => {
      tempData.push({ type: label._fields[1], properties: label._fields[0] });
    });
    return tempData;
  } else return [];
}

prepareSelectedDropdown(event:object){
  if(event){
    this.selectedDropdownOptions[Object.keys(event)[0]] = event[Object.keys(event)[0]];
    this.selectedData.emit(this.selectedDropdownOptions);
  }  
}
}
