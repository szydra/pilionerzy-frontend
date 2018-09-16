import { Input, Component } from '@angular/core';

@Component({
  selector: 'alert-closeable',
  templateUrl: './alert-closeable.html'
})

export class AlertCloseable {
  @Input()
  message: string;

  @Input()
  type: string;

  showAlert: boolean = true;

  closeAlert(): void {
    this.showAlert = false;
  }
}
