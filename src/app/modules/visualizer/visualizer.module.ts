import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisGraphComponent } from './components/vis-graph/vis-graph.component';

@NgModule({
  declarations: [VisGraphComponent],
  imports: [
    CommonModule
  ],
  exports : [VisGraphComponent]
})
export class VisualizerModule { }
