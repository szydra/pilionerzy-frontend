import {Component, ElementRef, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {fromEvent, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'pil-textarea-preview',
  templateUrl: './textarea-preview.component.html',
  styleUrls: ['./textarea-preview.component.scss']
})
export class TextareaPreviewComponent implements OnDestroy {

  @Input()
  selected = false;

  @Input()
  inputValue: string;

  @Output()
  inputValueChange = new EventEmitter<string>();

  private destroy$ = new Subject<void>();

  constructor(private _elementRef: ElementRef<HTMLElement>) {
    fromEvent(_elementRef.nativeElement, 'keyup')
      .pipe(
        takeUntil(this.destroy$),
        map((event: any) => event.target.value),
        debounceTime(1200),
        distinctUntilChanged()
      )
      .subscribe(input => {
        this.inputValue = input;
        this.inputValueChange.emit(input);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
