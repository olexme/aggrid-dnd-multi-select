import { Component, OnDestroy } from '@angular/core';
import { SkyhookDndService, DropTargetMonitor } from '@angular-skyhook/core';
import {GridDndKey} from './config';
@Component({
  selector: 'drop',
  template: `<div [dropTarget]="dropTarget">aaaaaaaaaaa<br>bbbbbbbb</div>`,
  styleUrls: [ './drop.component.css' ]
})
export class DropComponent implements OnDestroy {
  dropTarget = this.dnd.dropTarget(GridDndKey, {
    drop: (monitor: DropTargetMonitor<any, any>) => {
      const item = monitor.getItem();
      console.log('items dropped', item);
    }
  });
  constructor(
    private dnd: SkyhookDndService
  ) { }

  ngOnDestroy() {
    this.dropTarget.unsubscribe();
  }
}
