import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'textarea-preview',
  templateUrl: './textarea-preview.html',
  styleUrls: ['./textarea-preview.css']
})

export class TextareaPreview {
  @Input() inputValue: string;
  @Output() inputValueChange = new EventEmitter<string>();

  constructor(private elementRef: ElementRef) {
    fromEvent(elementRef.nativeElement, 'keyup')
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
