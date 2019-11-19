import {AfterViewInit, Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[pilMaxHeight]'
})

export class MaxHeightDirective implements OnInit, AfterViewInit {
  @Input('pilMaxHeight') maxHeight: number;

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    this.el.nativeElement.style.fontSize = '20px';
  }

  ngAfterViewInit(): void {
    const element = this.el.nativeElement;
    while (element.clientHeight > this.maxHeight) {
      const style = element.style;
      style.fontSize = parseFloat(style.fontSize) - 1 + 'px';
    }
  }
}
