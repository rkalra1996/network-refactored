/**
 * Toggle Switch
 * @created_date 02/09/2019
 * @version 1.0.0
 * @author Rishabh Kalra
 */
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

  /**
   * Toggles event handler
   * @param event 
   * @author Rishabh Kalra
   */
  toggleEventHandler(event) {
    this.toggleOn = !this.toggleOn;
    this.toggleEvent.emit({type: 'toggle', isOn : this.toggleOn});
  }

}
