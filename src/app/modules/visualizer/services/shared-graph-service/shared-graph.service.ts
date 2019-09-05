/**
 * Shared Graph Service
 * @created_date 02/09/2019
 * @version 1.0.0
 * @author Neha Verma
 */
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
  
  /**
   * Gets node details
   * @description provide node data to subscribers
   * @param nodeIDs 
   * @param [forRestore] 
   * @author Neha Verma
   */
  getNodeDetails(nodeIDs, forRestore = false) {
      this.restoreConnectedNodesData = forRestore ? true : false;
      this.getNodeByIDs.next(nodeIDs);
  }

  /**
   * Sends node details 
   * @param nodeDetailsArray 
   * @author Rishabh Kalra
   */
  sendNodeDetails(nodeDetailsArray) {
    if (this.restoreConnectedNodesData) {
      this.connectedNodeDetails.next(nodeDetailsArray);
    } else {
      this.nodeDetails.next(nodeDetailsArray);
    }
    this.restoreConnectedNodesData = false;
  }

  /**
   * Sends toogle status
   * @description function to send the deleted toggle info whenever needed
   * @param status 
   * @author Rishabh Kalra
   */
  sendToogleStatus(status) {
    console.log('sending new status for toggle ', status);
    this.showDeletedData.next(status);
  }

  /**
   * Sets node properties
   * @description to set node and relation properties
   * @param nodeProperties 
   * @author Neha Verma
   */
  setNodeProperties(nodeProperties){
    this.totalNodesProperties.next(nodeProperties);
  }

  /**
   * Sets relation properties
   * @param relProperties 
   * @author Neha Verma
   */
  setRelationProperties(relProperties){
    this.totalRelationsProperties.next(relProperties);
  }
  
  /**
   * Sets processed data
   * @description to set processedData and nodeTypes2
   * @param proData 
   * @author Neha Verma
   */
  setProcessedData(proData){
    this.processedData.next(proData);
  }

  /**
   * Sets node types2
   * @param nodeTypes
   * @author Neha Verma
   */
  setNodeTypes2(nodeTypes){
    this.nodeTypes2.next(nodeTypes);
  }

  /**
   * Sets relation type options
   * @description set relationTypeOptions and relationsData
   * @param relTypeOptions 
   * @author Neha Verma
   */
  setRelationTypeOptions(relTypeOptions){
    this.relationTypeOptions.next(relTypeOptions);
  }

  /**
   * Sets relations data
   * @param relData 
   * @author Neha Verma
   */
  setRelationsData(relData){
    this.relationsData.next(relData);
  }
}
