import {Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

@Component({
  selector: 'pil-textarea-preview',
  templateUrl: './textarea-preview.component.html',
  styleUrls: ['./textarea-preview.component.css']
})
export class TextareaPreviewComponent {

  @Input()
  selected = false;
  @Input()
  inputValue: string;
  @Output()
  inputValueChange = new EventEmitter<string>();

  constructor(private _elementRef: ElementRef<HTMLElement>) {
    fromEvent(_elementRef.nativeElement, 'keyup')
      .pipe(map((event: any) => {
        return event.target.value;
      }))
      .pipe(debounceTime(1200))
      .pipe(distinctUntilChanged())
      .subscribe(input => {
        this.inputValue = input;
        this.inputValueChange.emit(input);
      });
  }
}
