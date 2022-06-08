import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MathJaxDirective} from './directives/mathjax.directive';
import {AlertCloseableComponent} from './components/alert-closeable/alert-closeable.component';
import {NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AlertCloseableComponent,
    SpinnerComponent,
    MathJaxDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbAlertModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    AlertCloseableComponent,
    SpinnerComponent,
    MathJaxDirective
  ]
})
export class SharedModule {
}
