export class GraphExportUtility {

    constructor() {}

    convertFileDataToBlob(rawData) {
        try {
            let data = rawData['data'];
            const blob = new Blob([data], { type: 'data:application/vnd.ms-excel' });
            const downloadUrl = URL.createObjectURL(blob);
            const fileName = `networks.csv`;
            return { data: blob, url: downloadUrl, fileName };
          } catch (err) {
            // handle any error occured during blob creation
            console.error('An error occured while creating a blob for xport functionality');
            return {data : null , url: null, fileName: null};
          }
    }

    initiateDownload(elementType, data = {}) {
        if (!!elementType) {
          const element = document.createElement(elementType);
          element.href = data['url'];
          element.download = `${data['fileName']}`;
          return element;
      } else {
        return null;
      }
    }

}
