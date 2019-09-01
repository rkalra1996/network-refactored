import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { GraphExporterComponent } from './components/graph-exporter/graph-exporter.component';
import { SimpleBsDeleteModalComponent } from './components/simple-bs-delete-modal/simple-bs-delete-modal.component';

@NgModule({
  declarations: [GraphExporterComponent, SimpleBsDeleteModalComponent],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [GraphExporterComponent, SimpleBsDeleteModalComponent]
})
export class SharedModule { }
