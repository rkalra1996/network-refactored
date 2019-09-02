import {DataSet, Network} from 'vis';

export class VisualizerUtility {

    constructor() {}

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

      createVisDataSet(arrayOfObjects) {
          if (Array.isArray(arrayOfObjects)) {
            return new DataSet(arrayOfObjects);
          } else {
              console.error('Array not provided to create visJS dataset');
              return [];
          }
      }
}
