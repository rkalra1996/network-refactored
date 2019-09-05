/**
 * Color Panel
 * @created_date 02/09/2019
 * @version 1.0.0
 * @author Rishabh Kalra
 */
import { Component, OnInit } from '@angular/core';
import { SharedGraphService } from '../../services/shared-graph-service/shared-graph.service';
import { ColorPanelService } from '../../services/color-panel-service/color-panel.service';
import * as _ from 'lodash';

@Component({
  selector: 'visualizer-color-panel',
  templateUrl: './color-panel.component.html',
  styleUrls: ['./color-panel.component.scss']
})
export class ColorPanelComponent implements OnInit {

  public colorObject = undefined;
  public showDeletedData = false;
  public objectKeys = [];
  public colorData = [];
  public showDropDown = true;
  constructor(
    private colorSrvc: ColorPanelService,
    private sharedGraphSrvc: SharedGraphService
    ) { }

  ngOnInit() {
    // get color panel details
    this.colorSrvc.colorObj$.subscribe(data => {
      this.colorObject = data;
      // console.log('color object is ', this.colorObject);
      this.objectKeys = Object.keys(this.colorObject['defaultColor']);

      this.processColors(this.objectKeys, this.colorObject['defaultColor']);
      // console.log('processed color data is ', this.colorData);
    });

    // to monitor toggle status
    this.sharedGraphSrvc.showDeletedData.subscribe(toggle => {
      // console.log('recieved toggle', toggle);
      if (toggle !== null && (toggle.toString() === 'true' || toggle.toString() === 'false')) {
        // if the toggle variable is  only true and false and nothing else
        this.showDeletedData = toggle;
      } else {
        // set to false by default
        this.showDeletedData = false;
      }
      this.addDeleteColor();
    });
  }

  /**
   * Process colors
   * @param keyArray 
   * @param colorObj 
   * @returns 
   * @author Rishabh Kalra 
   */
  processColors(keyArray, colorObj) {
    this.colorData = [];
    if (!!keyArray.length || !!Object.keys(colorObj).length) {
      // both have the data , kindly process
      keyArray.map(key => {
        // for each key create a new object which has item name and item color
        this.colorData.push({ name: key, color: colorObj[key] });
      });
    } else {
      console.log('empty key Array or colorObj in color panel');
      return [];
    }
  }

  /**
   * Adds delete color
   * @author Rishabh Kalra
   */
  addDeleteColor() {
    // add new color for deleted node
    if (this.showDeletedData) {
      if(_.some(this.colorData,{name:"Deleted",color:"#C0C0C0"})){

      }else{
        this.colorData.push({name:"Deleted",color:"#C0C0C0"});
      }
    }else{
      _.remove(this.colorData,{name:"Deleted",color:"#C0C0C0"});
    }
  }

  /**
   * Toggles dropdown
   * @author Rishabh Kalra
   */
  toggleDropdown() {
    this.showDropDown = !this.showDropDown;
  }


}
