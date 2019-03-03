import {Component, Input} from '@angular/core';

@Component({
  selector: 'pil-alert-closeable',
  templateUrl: './alert-closeable.component.html'
})

export class AlertCloseableComponent {
  @Input()
  message: string;

  @Input()
  type: string;

  showAlert = true;

  closeAlert(): void {
    this.showAlert = false;
  }
}
