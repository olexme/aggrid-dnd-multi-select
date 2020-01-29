import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { GridOptions, SelectionChangedEvent, CellMouseDownEvent, DragStartedEvent} from 'ag-grid-community';
import { GridCellComponent } from './grid-cell.component';
const gridCellCompName = 'gridCellCompName';
@Component({
    selector: 'grid',
    template: `
        <ag-grid-angular class="ag-theme-balham"
         [gridOptions]="gridOptions"></ag-grid-angular>
    `,
    styleUrls: ['./grid.scss'],
})
export class Grid {
    public gridOptions: GridOptions = {
      frameworkComponents: {[gridCellCompName]: GridCellComponent},
      columnDefs: [
         { headerName: "id", field: "id", width: 90, cellRenderer: gridCellCompName},
         { headerName: "value", field: "value", width: 120 },
         { headerName: "value2", field: "value2", width: 120 }
      ],
      rowSelection: 'multiple',
      rowData: this.createData()
    };
    private createData() {
      let rowData: any[] = [];

        for (let i = 0; i < 15; i++) {
            rowData.push({
                id: "id_" + i,
                value: i,
                value2: i + Number(Math.random().toFixed(2))
            });
        }

        return rowData;
    }
    constructor() {
        
    }
}