import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {SharedModule} from './../shared/shared.module';

import { VisGraphComponent } from './components/vis-graph/vis-graph.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

import {SuiSelectModule, SuiModule} from 'ng2-semantic-ui';
import { CreateNodesComponent } from './components/create-nodes/create-nodes.component';
import { CreateEditNodeModalsComponent } from './components/create-nodes/modals/create-edit-node-modals/create-edit-node-modals.component';
// tslint:disable-next-line: max-line-length
import { CreateEditRelationModalsComponent } from './components/create-nodes/modals/create-edit-relation-modals/create-edit-relation-modals.component';
import { ColorPanelComponent } from './components/color-panel/color-panel.component';

@NgModule({
  declarations: [
    VisGraphComponent, ToolbarComponent,
    CreateNodesComponent, CreateEditNodeModalsComponent,
    CreateEditRelationModalsComponent, ColorPanelComponent
  ],
  imports: [
    CommonModule,
    SuiSelectModule,
    SuiModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports : [VisGraphComponent]
})
export class VisualizerModule { }
