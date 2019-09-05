/**
 * Toolbar
 * @created_date 02/09/2019
 * @version 1.0.0
 * @author Rishabh Kalra
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'visualizer-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  private NODE_DEFAULT_LIMIT: number = 149;
  @Input() editData: object = {};
  @Input() editRelData: object = {};
  @Input() selectedCount: number = 0;
  @Output() nodeLimitEvent = new EventEmitter<object | null>();
  @Output() nodeLimitEnterEvent = new EventEmitter<object | null>();
  @Input() nodeLimit: number = this.NODE_DEFAULT_LIMIT;
  public errorMessage = "hello";
  public totalTypesArray = [];
  public editNodeData = [];
  public editRelationData = [];
  public hideDelModal = false;
  public promptRelationCreateAfterNode = false;
  public restoredData = {};
  

  constructor() { }

  ngOnInit() {
  }
  
  /**
   * Limits change
   * @description show error popup for invalid limit input
   * @param limit 
   * @param popup 
   * @author Neha Verma
   */
  limitChange(limit, popup) {
    if (limit === "") {
      this.errorMessage = 'Only valid numbers allowed'
      popup.open();
      window.setTimeout(() => {
        popup.close();
      }, 3000)
    } else if (!isNaN(limit)) {
      this.nodeLimit = parseInt(limit);
      this.nodeLimitEvent.emit({limit : limit});
    } else {
      this.errorMessage = 'Only valid numbers allowed'
      popup.open();
      window.setTimeout(() => {
        popup.close();
      }, 3000)
    }
  }
  
  /**
   * Sends limit
   * @description send node limit to its parent graph-vis
   * @param $event 
   * @param nodeLimit 
   * @author Neha Verma
   */
  sendLimit($event, nodeLimit) {
    if (event['key'] === 'Enter') {
      this.nodeLimitEnterEvent.emit({limit : nodeLimit});
    } else {
      // this.nodeLimitEvent.emit(null);
    }
  }

}
