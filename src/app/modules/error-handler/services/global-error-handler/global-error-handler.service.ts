import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import {GlobalErrorHandlerInterFace} from './../../interfaces/global-error-handler';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  handleError(error: any): void {
    let errorObject = {};
    const currentDate = new Date();
    if (error.constructor === Error) {
      // Handle on Generic errors
      errorObject = this.getErrorObject(error, currentDate);
    } else if (error instanceof HttpErrorResponse) {
      // Handle only HttpResponse errors
      if (!navigator.onLine) {
        // no internet connection
        console.log('No internet connection detected');
      } else {
        // connection is okay, httpError here
        errorObject = this.getHttpErrorObject(error, currentDate);
      }
    } else {
      // Handle any error which is none of the above
      errorObject = this.getGenericErrorObject(error, currentDate);
    }
    console.log(errorObject);
  }

  constructor() { }

  getErrorObject(error: Error, currentDate: Date = new Date()): GlobalErrorHandlerInterFace {
    // tslint:disable-next-line: max-line-length
    return {
      error: 'In Code Error',
      errorName: error.name || 'unavailable',
      message: error.message || 'unavailable',
      timestamp: {
        date: `${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()}`,
        time: `${currentDate.toLocaleTimeString()}`
      },
      stack: error.stack || 'unavailable'
    };
  }

  getHttpErrorObject(error: HttpErrorResponse, currentDate: Date = new Date()): GlobalErrorHandlerInterFace {
    // tslint:disable-next-line: max-line-length
    return {
      error: 'Http/Server',
      message: error.message || 'unavailable',
      type: error.error.type || 'unavailable',
      errorName: error.name || 'unavailable',
      status: (error.status  || error.status === 0) ? error.status : 'unavailable',
      statusText: error.statusText || 'unavailable',
      url: error.url || 'unavailable',
      timestamp: {
        date: `${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()}`,
        time: `${currentDate.toLocaleTimeString()}`
      },
      stack: error.error.stack || 'unavailable'
    };
  }

  getGenericErrorObject(error: any, currentDate: Date = new Date()): GlobalErrorHandlerInterFace {
    // tslint:disable-next-line: max-line-length
    return {
      error: 'Generic',
      errorName: error.name || 'unavailable',
      message: error.message || 'unavailable',
      timestamp: {
        date: `${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()}`,
        time: `${currentDate.toLocaleTimeString()}`
      },
      stack: error.stack || 'unavailable'
    };
  }
}
