import { Component, OnDestroy } from '@angular/core';
import { SkyhookDndService, DropTargetMonitor } from '@angular-skyhook/core';
import {GridDndKey} from './config';
@Component({
  selector: 'drop',
  template: `<div [dropTarget]="dropTarget"><div>DropHere</div></div>`,
  styleUrls: [ './drop.component.css' ]
})
export class DropComponent implements OnDestroy {
  dropTarget = this.dnd.dropTarget([GridDndKey, 'TheOtherDNDSource'], {
    canDrop: (monitor: DropTargetMonitor<any, any>) => {
      const type = monitor.getItemType();
      // const item = monitor.getItem();
      // console.log('items to drop', item);
      return type === GridDndKey;
    },
    drop: (monitor: DropTargetMonitor<any, any>) => {
      const item = monitor.getItem();
      console.log('items dropped', item);
    }
  });

  constructor(private dnd: SkyhookDndService) { }

  ngOnDestroy() {
    this.dropTarget.unsubscribe();
  }
}
