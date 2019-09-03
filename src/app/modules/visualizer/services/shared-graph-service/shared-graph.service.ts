import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedGraphService {

  graphData : object;
  public nodeDetails = new BehaviorSubject<any>(null);
  public connectedNodeDetails = new BehaviorSubject<any>(null);
  public getNodeByIDs = new BehaviorSubject<Array<any>>([]);
  public showDeletedData = new BehaviorSubject<boolean>(null);
  public totalNodesProperties = new BehaviorSubject<Array<any>>(null);
  public totalRelationsProperties = new BehaviorSubject<Array<any>>(null);

  public processedData = new BehaviorSubject<any>(null);
  public nodeTypes2 = new BehaviorSubject<Array<any>>(null);

  private restoreConnectedNodesData = false;

  public relationTypeOptions = new BehaviorSubject<any>(null);
  public relationsData = new BehaviorSubject<any>(null);

  constructor() { }
  
  getNodeDetails(nodeIDs, forRestore = false) {
      this.restoreConnectedNodesData = forRestore ? true : false;
      this.getNodeByIDs.next(nodeIDs);
  }
  sendNodeDetails(nodeDetailsArray) {
    if (this.restoreConnectedNodesData) {
      this.connectedNodeDetails.next(nodeDetailsArray);
    } else {
      this.nodeDetails.next(nodeDetailsArray);
    }
    this.restoreConnectedNodesData = false;
  }

  // function to send the deleted toggle info whenever needed
  sendToogleStatus(status) {
    console.log('sending new status for toggle ', status);
    this.showDeletedData.next(status);
  }

  // to set node and relation properties
  setNodeProperties(nodeProperties){
    this.totalNodesProperties.next(nodeProperties);
  }
  setRelationProperties(relProperties){
    this.totalRelationsProperties.next(relProperties);
  }
  // to set processedData and nodeTypes2
  setProcessedData(proData){
    this.processedData.next(proData);
  }
  setNodeTypes2(nodeTypes){
    this.nodeTypes2.next(nodeTypes);
  }
  // set relationTypeOptions and relationsData
  setRelationTypeOptions(relTypeOptions){
    this.relationTypeOptions.next(relTypeOptions);
  }
  setRelationsData(relData){
    this.relationsData.next(relData);
  }
}
