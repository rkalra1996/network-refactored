/**
 * Relationship Filter
 * @created_date 02/09/2019
 * @version 1.0.0
 * @author Neha Verma
 */
import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { SharedGraphService } from 'src/app/modules/visualizer/services/shared-graph-service/shared-graph.service';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { GraphRelationsService } from '../../../services/graph-relations-service/graph-relations.service';
import { ResetInterface } from '../../../interfaces/sidebar-interface';

@Component({
  selector: 'dashboard-realtionship-filter',
  templateUrl: './realtionship-filter.component.html',
  styleUrls: ['./realtionship-filter.component.scss']
})


export class RealtionshipFilterComponent implements OnInit, OnChanges {
  
  @Input() resetObj: ResetInterface = {reset: false};
  @Output() selectedData = new EventEmitter<Array<string>>(null);
  public selectedRelation: Array<string> = [];
  public relationOptions: Array<string> = [];
  public relationTypeOptions: Array<any> = [];
  public relationsData: any;
  
  constructor(private graphRelationsService: GraphRelationsService, private sharedGraphData: SharedGraphService) { }

  ngOnInit() {
    this.getRelationTypes().subscribe(response => {
      // this.graphInitData.push(data);
      this.relationOptions = this.relationTypeOptions;
    });
  }

  ngOnChanges(){
    if(this.resetObj && typeof this.resetObj === 'object' && this.resetObj.hasOwnProperty('reset') && this.resetObj['reset'] === true){
      this.selectedRelation = [];
    }
  }


  /**
   * Gets relation types
   * @description get relationships from database
   * @author Neha Verma
   * @returns true value when data fetched successfuly 
   */
  getRelationTypes() {
    return this.graphRelationsService.getGraphRelations().pipe(map(response => {

      this.relationsData = this.filterRelationsData(response);
      let extractedTypes = this.extractTypes(this.relationsData);
      // pass it into the options for dropdown
      this.relationTypeOptions = _.cloneDeep(extractedTypes);
      this.sharedGraphData.setRelationTypeOptions(this.relationTypeOptions);
      this.sharedGraphData.setRelationsData(this.relationsData);
      return true;
    }, err => {
      console.error('An error occured while fetching relations ', err);
      throw Error();
    }));
  }

  /**
   * Filters relations data
   * @description 
   * @param response 
   * @author Rishabh Kalra
   * @returns filtered relation object
   */
  filterRelationsData(response) {
    let filteredObjectArray = [];
    filteredObjectArray.push(response[0]);
    response.splice(0, 1);
    // clear relations response as there are duplicates inside
    // steps to clear, process each relation type
    // find all the keys which are of this type and collect its properties into a unique array of objects
    let i = 0;
    while (i <= response.length) {
      if (response.length === 0) {
        i = 1;
      } else {
        let matched = false;
        filteredObjectArray.forEach(firstObj => {
          if (firstObj.type === response[i].type) {
            matched = true;
            firstObj['properties'].push(...response[i].properties);
          }
        });
        if (matched) {
          response.splice(i, 1);
          i = 0;
        } else {
          filteredObjectArray.push(response[i]);
          response.splice(i, 1);
        }
      }
    }
    // make the properties of each type as unique
    filteredObjectArray.map(typeObj => {
      typeObj['properties'] = _.uniq(typeObj['properties']);
      return typeObj;
    });
    console.log('final fetched types for relation is ', filteredObjectArray);
    return filteredObjectArray;
  }


  /**
   * Extracts types
   * @description extract types of the relations
   * @param ObjectArray 
   * @author Rishabh Kalra
   * @returns array of relation types 
   */
  extractTypes(ObjectArray: any): any {
    let typesArray = [];
    ObjectArray.forEach(obj => {
      typesArray.push(obj['type']);
    });
    return typesArray;
  }

  /**
   * Emits selected data
   * @description emit seleted relation to parent(sidebar)
   * @author Neha Verma
   */
  emitSelectedData(){
    this.selectedData.emit(this.selectedRelation);
  }
}
