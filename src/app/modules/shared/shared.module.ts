import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { GraphExporterComponent } from './components/graph-exporter/graph-exporter.component';
import { SimpleBsDeleteModalComponent } from './components/simple-bs-delete-modal/simple-bs-delete-modal.component';
import { GrayButtonComponent } from './components/gray-button/gray-button.component';
import { CustomSemanticDropdownComponent } from './components/custom-semantic-dropdown/custom-semantic-dropdown.component';
import { ToggleSwitchComponent } from './components/toggle-switch/toggle-switch.component';
import { SuiSelectModule, SuiModule } from 'ng2-semantic-ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToasterModule } from './toaster/toaster.module';

@NgModule({
  declarations: [GraphExporterComponent, SimpleBsDeleteModalComponent, GrayButtonComponent, CustomSemanticDropdownComponent, ToggleSwitchComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ToasterModule,
    SuiSelectModule, SuiModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [GraphExporterComponent, SimpleBsDeleteModalComponent, GrayButtonComponent, CustomSemanticDropdownComponent, ToggleSwitchComponent]
})
export class SharedModule { }
