/**
 * Graph visualizer.
 * @created_date 02/09/2019
 * @version 1.0.0
 * @author Neha Verma
 */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TypeCheckService {

  constructor() { }

  /**
   * Arrays check
   * @description check for null, empty, type, length
   * @param array 
   * @returns boolean
   */
  isArray(array){
    if(array && array instanceof Array && array.length > 0){
      return true;
    } else { 
      return false;
    }
  }

  /**
   * Objects check
   * @description check for null, empty, type
   * @param obj 
   * @return boolean
   * */
  isObject(obj){
    if(obj && typeof obj === 'object'){
      return true;
    } else { 
      return false;
    }
  }

  /**
   * Booleans check
   * @description check for null, empty, type
   * @param bool 
   * @return boolean
   */
  isBoolean(bool){
    if(typeof bool === 'boolean'){
      return true;
    } else { 
      return false;
    }
  }

  /**
   * Numbers check
   * @description check for null, empty, type
   * @param num 
   * @returns boolean
   */
  isNumber(num){
    if(num && typeof num === 'number'){
      return true;
    } else { 
      return false;
    }
  }

  /**
   * Determines whether string is
   * @param str 
   * @returns boolean
   */
  isString(str){
    if(str && typeof str === 'string'){
      return true;
    } else{
      return false;
    }
  }
}
