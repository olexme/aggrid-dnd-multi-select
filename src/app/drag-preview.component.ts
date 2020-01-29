import { Component, Input} from '@angular/core';
@Component({
  selector: 'drag-preview',
  templateUrl: './drag-preview.component.html',
  styleUrls: ['./drag-preview.component.css']
})
export class DragPreviewComponent {
  @Input() data: any[];
}