import {Directive, ElementRef, Input, OnChanges, SecurityContext} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

declare var MathJax: any;

@Directive({
  selector: '[pilMathJax]'
})
export class MathJaxDirective implements OnChanges {

  @Input('pilMathJax') mathString: string;

  constructor(private el: ElementRef, private sanitizer: DomSanitizer) {
  }

  ngOnChanges() {
    const nativeElement = this.el.nativeElement;
    nativeElement.innerHTML = this.sanitizer.sanitize(SecurityContext.HTML, this.mathString);
    MathJax.typeset([nativeElement]);
  }
}
