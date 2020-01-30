import { Component, OnDestroy, OnInit } from '@angular/core';
import { SkyhookDndService, DropTargetMonitor } from '@angular-skyhook/core';
import {GridDndKey} from './config';
@Component({
  selector: 'drop',
  templateUrl: './drop.component.html',
  styleUrls: [ './drop.component.scss' ]
})
export class DropComponent implements OnInit, OnDestroy {
  data: {id: string, value: string, value2: string}[] = [];
  canDrop = false;
  isOver = false;
  dropTarget = this.dnd.dropTarget([GridDndKey, 'TheOtherDNDSource'], {
    canDrop: (monitor: DropTargetMonitor<any, any>) => {
      const itemType = monitor.getItemType();
      return itemType === GridDndKey;
    },
    drop: (monitor: DropTargetMonitor<any, any>) => {
      const items = monitor.getItem();
      this.data.push(...items);
    }
  });
  private subscription;
  ngOnInit() {
  const collectedDndState = this.dropTarget.listen(m => ({
      canDrop: m.canDrop(),
      isOver: m.isOver(),
    }));

  this.subscription = collectedDndState
      .subscribe((c) => {
        this.canDrop = !c.isOver && c.canDrop;
        this.isOver =  c.isOver && c.canDrop;
      });
  }
  constructor(private dnd: SkyhookDndService) { }

  ngOnDestroy() {
    this.dropTarget.unsubscribe();
    this.subscription.unsubscribe();
  }
}
