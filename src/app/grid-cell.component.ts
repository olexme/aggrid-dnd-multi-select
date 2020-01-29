import { Component, OnDestroy } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, RowNode } from 'ag-grid-community';
import { SkyhookDndService } from '@angular-skyhook/core';
import { GridDndKey } from './config';
@Component({
  selector: 'grid-cell',
  template: `<span [dragSource]="dragSrc" [noHTML5Preview]="true">{{params.data[params.colDef.field]}}</span>`,
})
export class GridCellComponent implements ICellRendererAngularComp, OnDestroy {
  public params: ICellRendererParams;
  public dragSrc;
  public agInit(params: ICellRendererParams): void {
      this.params = params;
      this.dragSrc = this.dnd.dragSource(GridDndKey, {beginDrag: () => {
        const alreadySelected: RowNode = this.params.api.getSelectedNodes()
                                  .find(row => row.rowIndex === this.params.rowIndex);
        if (!alreadySelected) {
          const rowNodeToSelect: RowNode = this.params.api.getDisplayedRowAtIndex(this.params.rowIndex);
          if (rowNodeToSelect) {
            this.params.api.selectNode(rowNodeToSelect, false);
          }
        }
        return this.params.api.getSelectedNodes().map(row => row.data);
      }});
  }

  public refresh(params: any): boolean {
      return false;
  }

  constructor(private dnd: SkyhookDndService) {}
  
  ngOnDestroy() {
    if (this.dragSrc) {
      this.dragSrc.unsubscribe();
    }
  }
}