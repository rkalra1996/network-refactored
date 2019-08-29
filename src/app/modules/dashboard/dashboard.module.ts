import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// custom modules
import {VisualizerModule} from './../visualizer/visualizer.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
// components
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

// services

@NgModule({
  declarations: [MainComponent, HeaderComponent, SidebarComponent],
  imports: [
    CommonModule,
    VisualizerModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
