import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { ToasterComponent } from './components/toaster/toaster.component';
import { ToasterService } from './services/toaster/toaster.service';

@NgModule({
  declarations: [ToasterComponent],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-left',
      preventDuplicates: false,
    })
  ],
  providers: [ToasterService]
})
export class ToasterModule { }
