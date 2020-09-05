import {Directive, ElementRef, Input, OnChanges} from '@angular/core';

declare var MathJax: any;

@Directive({
  selector: '[pilMathJax]'
})
export class MathJaxDirective implements OnChanges {

  @Input('pilMathJax') mathString: string;

  constructor(private el: ElementRef) {
  }

  ngOnChanges() {
    this.el.nativeElement.innerHTML = this.mathString;
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, this.el.nativeElement]);
  }
}
