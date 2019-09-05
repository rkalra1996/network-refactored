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

}
