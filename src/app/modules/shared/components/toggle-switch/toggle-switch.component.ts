import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'shared-toggle-switch',
  templateUrl: './toggle-switch.component.html',
  styleUrls: ['./toggle-switch.component.scss']
})
export class ToggleSwitchComponent implements OnInit {

  private toggleOn = false;
  @Output() toggleEvent = new EventEmitter<object | null>(null);

  constructor() { }

  ngOnInit() {
  }

  toggleEventHandler(event) {
    this.toggleOn = !this.toggleOn;
    this.toggleEvent.emit({type: 'toggle', isOn : this.toggleOn});
  }

}
