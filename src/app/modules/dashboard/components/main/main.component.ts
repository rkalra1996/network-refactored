import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public sidebarEvent: object = null;
  constructor() { }

  ngOnInit() {
  }
  sidebarEventFetch(event : object = null){
    if(event){
      this.sidebarEvent = event;
    }
  }
}
