import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public sidebarEvent: object = null;
  public nodeLimit: object = null;
  constructor() { }

  ngOnInit() {
  }

  /**
   * Sidebars event fetch
   * @param [event] 
   */
  sidebarEventFetch(event: object = null){
    if(event && typeof event === 'object'){
      this.sidebarEvent = event;
    }
  }

  /**
   * Nodes limit event
   * @param [event] 
   */
  nodeLimitEvent(event: object = null){
    if(event && typeof event === 'object'){
      this.nodeLimit = event;
    }
  }
}
