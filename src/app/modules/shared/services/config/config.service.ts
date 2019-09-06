import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import * as  _ from 'lodash';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private configObj: object = {};
  private DEFAULT_MATERIAL_CONFIG_FILENAME = 'material.json';
  private DEFAULT_MATERIAL_CONFIG_URL = 'http://localhost:3050/config/get';
  constructor(private localService : HttpClient) {
    this.getRemoteConfig();
  }


  getRemoteConfig(configName:string = "") {
    if(configName){
      let params = new HttpParams().set('fileName', configName);
      return this.localService.get(this.DEFAULT_MATERIAL_CONFIG_URL, {params}).pipe(map(config => {
        if (config.constructor === Object) {
          this.configObj = _.cloneDeep(config);
          return true;
        } else {
          console.log('did not recieve proper format of config in config-service');
          return false;
        }
      }));
    }    
  }

  getConfig(configName = null) {
    console.log('called getConfig');
    // read the config name
    if (!!configName) {
      if (!Object.keys(this.configObj).length) {
        return this.getRemoteConfig(configName).pipe(map(config => {
          if (!!config) {
            console.log('config name updated to  ', this.configObj);
            return this.configObj;
          } else {
            return null;
          }
        }));
      }
      else {
        console.log('already have config variable, using it',this.configObj );
        return of(this.configObj[configName]);
      }
    }
    else {
      console.warn(`Unable to load config ${configName} inside Custom Material Module, returning empty`);
      return of({});
    }
  }
}
