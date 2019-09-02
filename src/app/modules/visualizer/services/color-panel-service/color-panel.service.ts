import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorPanelService {

  private colorConfig = {
    defaultColor: {},
    selectedColor: {},
    deletedColor: {
      colorCode: '#C0C0C0',
      highlightColorCode: '#9a9a9a'
    },
    restoreColor: {
      colorCode: '#96C1FA',
      highlightColorCode: '#249BFC'
    },
    initialColor: {
      colorCode: '#96C1FA'
    }
  };

  public colorObj$ = new BehaviorSubject<object>(this.colorConfig);

  constructor() { }

  updateColorConfigObject(resultObj) {
    let temColorObj = {};
    resultObj['seperateNodes'].forEach(node => {
      if (node.hasOwnProperty('type') && node.type.length > 0 && node.hasOwnProperty('properties')) {
        if ( !temColorObj[node.type[0]]) {
          if ( node['properties']['color']) {
            temColorObj[node.type[0]] = node['properties']['color'];
          } else {
            temColorObj[node.type[0]] = this.colorConfig['initialColor']['colorCode'];
          }
        }
      }
      });
    this.updateDefaultColor(temColorObj);
  }

  updateDefaultColor(data) {
    this.colorConfig.defaultColor = data;
    this.colorObj$.next(this.colorConfig);
  }
  insertIntoDefaultColor(data) {
    if(!this.colorConfig.defaultColor[data['type']]){
      this.colorConfig.defaultColor[data['type']] = data['color'];
      this.colorObj$.next(this.colorConfig);
    }
  }

  addColors(resultObj) {
    // if the user opted for deleted data, simply set deleted default color to all the nodes
    resultObj['seperateNodes'].forEach(node => {
      if (node.hasOwnProperty('type') && node.type.length > 0) {
        if (node['properties']['deleted'] === "true" || node['properties']['deleted'] === true) {
          node['color'] = this.colorConfig['deletedColor']['colorCode'];
        } else {
          // if the node has a color property, assign that else assign the defaults one
          node = this.shiftColorKey(node);
          if (!node.hasOwnProperty('color')) {
            node['color'] = this.colorConfig['defaultColor'][node.type[0]];
          }
        }
      }
    });
    // if the user opted for deleted data, simply set deleted default color to all the edges
    resultObj['seperateEdges'].forEach(edge => {
      if (edge.hasOwnProperty('type') && edge.type.length > 0) {
        if (edge['properties']['deleted'] === "true" || edge['properties']['deleted'] === true) {
          edge['color']['color'] = this.colorConfig['deletedColor']['colorCode'];
          edge['color']['highlight'] = this.colorConfig['deletedColor']['highlightColorCode'];
        } else {
          // edge['color'] = this.colorConfig.defaultColor[edge.type[0]];
        }
      }
    });
    return resultObj;

  }

  shiftColorKey(elementObject, previousObject = null) {
    // To add a new color key in the root level if color is present in properties key
    if (elementObject.hasOwnProperty('properties') && elementObject['properties'].hasOwnProperty('color')) {
      elementObject['color'] = elementObject['properties']['color'];
      return elementObject;
    } else if (previousObject !== null) {
      return previousObject;
    } else {
      return elementObject;
    }
  }
}
