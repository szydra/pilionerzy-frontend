import { Directive, ElementRef, Input } from '@angular/core';
declare var MathJax: any;

@Directive({
  selector: '[mathJax]'
})

export class MathJaxDirective {
  @Input('mathJax') mathString: string;

  constructor(private el: ElementRef) { }

  ngOnChanges() {
    this.el.nativeElement.innerHTML = this.mathString;
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.el.nativeElement]);
  }
}
