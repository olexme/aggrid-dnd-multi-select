import { Component, OnDestroy, OnInit } from '@angular/core';
import { SkyhookDndService, DropTargetMonitor } from '@angular-skyhook/core';
import {GridDndKey} from './config';
@Component({
  selector: 'drop',
  templateUrl: './drop.component.html',
  styleUrls: [ './drop.component.css' ]
})
export class DropComponent implements OnInit, OnDestroy {
  data: {id: string, value: string, value2: string}[] = [];
  canDrop = false;
  isOver = false;
  dropTarget = this.dnd.dropTarget([GridDndKey, 'TheOtherDNDSource'], {
    canDrop: (monitor: DropTargetMonitor<any, any>) => {
      const itemType = monitor.getItemType();
      // const item = monitor.getItem();

      // console.log('this.isOver, this.canDrop', this.isOver, this.canDrop);
      return itemType === GridDndKey;
    },
    drop: (monitor: DropTargetMonitor<any, any>) => {
      const items = monitor.getItem();
      this.data.push(...items);
      // this.isOver = false;
      // this.canDrop = false;
      console.log('items dropped', items);
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
        console.log('this.canDrop', this.canDrop, 'this.isOver', this.isOver);
      });
  }
  constructor(private dnd: SkyhookDndService) { }

  ngOnDestroy() {
    this.dropTarget.unsubscribe();
    this.subscription.unsubscribe();
  }
}
