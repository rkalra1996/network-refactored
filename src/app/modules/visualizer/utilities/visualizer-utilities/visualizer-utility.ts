/**
 * visualizer utility.
 * @created_date 02/09/2019
 * @version 1.0.0
 * @author Rishabh Kalra
 */
import {DataSet, Network} from 'vis';

export class VisualizerUtility {

    constructor() {}


    /**
     * Stringifys properties
     * @description remove deleted and color key from tooltip for nodes and edges
     * @param propertyObject 
     * @returns node object with new tooltip values
     */
    stringifyProperties(propertyObject) {
        if (propertyObject.constructor === Object) {
          let finalString = '';
          if (propertyObject['properties'].hasOwnProperty('deleted')) {
            Object.keys(propertyObject['properties']).filter(key => {
              if (key !== 'deleted' && key !== 'color') {
                finalString += `<strong>${key} :</strong> ${propertyObject['properties'][key]} <br>`;
              }
            });
          }
          return finalString;
        } else { return propertyObject['title']; }
      }


      /**
       * Gets vis graph options
       * @returns vis graph options
       * @author Rishabh Kalra 
       */
      getVisGraphOptions(): object {
          return {
            physics: false,
            interaction: {
              navigationButtons: true
            },
            edges: {
              smooth: {
                type: 'dynamic'
              }
            },
            nodes: {
              shape: 'dot',
              scaling: {
                customScalingFunction: (min, max, total, value) => {
                  return value / total;
                },
                min: 5,
                max: 150
              }
            }
          };
      }


      /**
       * Creates vis data set
       * @param arrayOfObjects 
       * @returns new dataset
       * @author Rishabh Kalra 
       */
      createVisDataSet(arrayOfObjects) {
          if (Array.isArray(arrayOfObjects)) {
            return new DataSet(arrayOfObjects);
          } else {
              console.error('Array not provided to create visJS dataset');
              return [];
          }
      }

      /**
       * Adds colors
       * @description if the user opted for deleted data, simply set deleted default color to all the nodes
       * @param resultObj 
       * @param colorConfig 
       * @returns result object which have gray color for deleted node 
       * @author Neha Verma
       */
      addColors(resultObj: object,colorConfig: object) {
        resultObj['seperateNodes'].forEach(node => {
          if (node.hasOwnProperty('type') && node.type.length > 0) {
            if (node['properties']['deleted'] === "true" || node['properties']['deleted'] === true) {
              node['color'] = colorConfig['deletedColor']['colorCode'];
            } else {
              // if the node has a color property, assign that else assign the defaults one
              node = this.shiftColorKey(node);
              if (!node.hasOwnProperty('color')) {
                node['color'] = colorConfig['defaultColor'][node.type[0]];
              }
            }
          }
        });

        // if the user opted for deleted data, simply set deleted default color to all the edges
        resultObj['seperateEdges'].forEach(edge => {
          if (edge.hasOwnProperty('type') && edge.type.length > 0) {
            if (edge['properties']['deleted'] === "true" || edge['properties']['deleted'] === true) {
              edge['color']['color'] = colorConfig['deletedColor']['colorCode'];
              edge['color']['highlight'] = colorConfig['deletedColor']['highlightColorCode'];
            } else {
              // edge['color'] = this.colorConfig.defaultColor[edge.type[0]];
            }
          }
        });
        // console.log(nodeObj);
        return resultObj;
      }


      /**
       * Shifts color key
       * @param elementObject 
       * @param [previousObject] 
       * @returns  a element object which have updated color value
       * @author Rishabh Kalra
       */
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
