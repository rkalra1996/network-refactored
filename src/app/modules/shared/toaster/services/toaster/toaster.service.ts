import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ToasterData } from '../../interfaces/toaster-data';
import { ConfigService } from '../../../services/config/config.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  public toasterMessages$ = new BehaviorSubject<object>(null);
  private DEAFAULT_TOASTER_MESSAGE_CONFIG;

  constructor(private toastrService: ToastrService, private configSrvc: ConfigService) {
    this.configSrvc.getConfig('toaster-messages.json').subscribe(newConfig => {
      this.DEAFAULT_TOASTER_MESSAGE_CONFIG = newConfig;
      this.toasterMessages$.next(this.DEAFAULT_TOASTER_MESSAGE_CONFIG);
    }, err => {
      console.log('error while reading new config in material', err);
  });
  }

  showSuccess(dataObj : ToasterData = {title: this.DEAFAULT_TOASTER_MESSAGE_CONFIG['DEFAULT_TITLE'],message:this.DEAFAULT_TOASTER_MESSAGE_CONFIG['DEFAULT_MESSAGES'],timeOut:1000}) {
    this.toastrService.success(dataObj.title,dataObj.message,{
      timeOut: dataObj.timeOut,
      toastClass: "toast-success"
    });
  }

  showError(dataObj : ToasterData = {title: this.DEAFAULT_TOASTER_MESSAGE_CONFIG['DEFAULT_TITLE'],message:this.DEAFAULT_TOASTER_MESSAGE_CONFIG['DEFAULT_MESSAGES'],timeOut:1000}){
    this.toastrService.error(dataObj.title,dataObj.message,{
      timeOut: dataObj.timeOut,
      toastClass: "toast-error"
    });
  }

  showInfo(dataObj : ToasterData = {title: this.DEAFAULT_TOASTER_MESSAGE_CONFIG['DEFAULT_TITLE'],message:this.DEAFAULT_TOASTER_MESSAGE_CONFIG['DEFAULT_MESSAGES'],timeOut:1000}){
    this.toastrService.info(dataObj.title,dataObj.message,{
      timeOut: dataObj.timeOut,
      toastClass: "toast-info"
    });
  }

  showWarning(dataObj : ToasterData = {title: this.DEAFAULT_TOASTER_MESSAGE_CONFIG['DEFAULT_TITLE'],message:this.DEAFAULT_TOASTER_MESSAGE_CONFIG['DEFAULT_MESSAGES'],timeOut:1000}){
    this.toastrService.warning(dataObj.title,dataObj.message,{
      timeOut: dataObj.timeOut,
      toastClass: "toast-warning"
    });
  }
  
}
