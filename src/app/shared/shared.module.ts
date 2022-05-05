import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MathJaxDirective} from './directives/mathjax.directive';
import {AlertCloseableComponent} from './components/alert-closeable/alert-closeable.component';
import {NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {SpinnerComponent} from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    AlertCloseableComponent,
    SpinnerComponent,
    MathJaxDirective
  ],
  imports: [
    CommonModule,
    NgbAlertModule
  ],
  exports: [
    AlertCloseableComponent,
    SpinnerComponent,
    MathJaxDirective
  ]
})
export class SharedModule {
}
