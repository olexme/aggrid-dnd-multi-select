import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SkyhookDndModule, SkyhookDndService } from '@angular-skyhook/core';
import { SkyhookMultiBackendModule, createDefaultMultiBackend } from '@angular-skyhook/multi-backend';
import { AgGridModule } from 'ag-grid-angular';

import { AppComponent } from './app.component';
import { Grid } from './grid.component';
import { GridCellComponent } from './grid-cell.component';
import { DropComponent } from './drop.component';
import { DragPreviewComponent } from './drag-preview.component';

@NgModule({
  imports:      [ BrowserModule,
                  FormsModule,
                  SkyhookMultiBackendModule,
                  SkyhookDndModule.forRoot({ backendFactory: createDefaultMultiBackend }),
                  AgGridModule.withComponents([GridCellComponent]) ],
  declarations: [ AppComponent, Grid, GridCellComponent, DropComponent, DragPreviewComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ SkyhookDndService ]
})
export class AppModule { }
