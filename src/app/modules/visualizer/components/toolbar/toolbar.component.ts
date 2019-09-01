import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'visualizer-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  public selectedCount = 10;
  public nodeLimit = 10;
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

  limitChange(a,b) {}
  sendLimit($event, nodeLimit) {}

}
