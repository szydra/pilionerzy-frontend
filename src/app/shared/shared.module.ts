import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MathJaxDirective} from './directives/mathjax.directive';
import {AlertCloseableComponent} from './components/alert-closeable/alert-closeable.component';

@NgModule({
  declarations: [
    AlertCloseableComponent,
    MathJaxDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertCloseableComponent,
    MathJaxDirective
  ]
})
export class SharedModule {
}
