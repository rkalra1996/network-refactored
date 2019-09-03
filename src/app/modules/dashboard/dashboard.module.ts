import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// custom modules
import {VisualizerModule} from './../visualizer/visualizer.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
// components
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { SuiSelectModule, SuiModule } from 'ng2-semantic-ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NodeFilterComponent } from './components/sidebar/node-filter/node-filter.component';
import { RealtionshipFilterComponent } from './components/sidebar/realtionship-filter/realtionship-filter.component';

// services

@NgModule({
  declarations: [MainComponent, HeaderComponent, SidebarComponent, NodeFilterComponent, RealtionshipFilterComponent],
  imports: [
    CommonModule,
    VisualizerModule,
    DashboardRoutingModule,
    SharedModule,
    SuiSelectModule, SuiModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class DashboardModule { }
