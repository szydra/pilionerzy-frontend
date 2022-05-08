import {NgModule} from '@angular/core';

import {NewQuestionRoutingModule} from './new-question-routing.module';
import {InfoPopoverComponent} from './components/info-popover/info-popover.component';
import {NewQuestionComponent} from './components/new-question/new-question.component';
import {TextareaPreviewComponent} from './components/textarea-preview/textarea-preview.component';
import {SharedModule} from '@shared/shared.module';
import {NgbPopoverModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    InfoPopoverComponent,
    NewQuestionComponent,
    TextareaPreviewComponent
  ],
  imports: [
    NewQuestionRoutingModule,
    NgbPopoverModule,
    SharedModule
  ]
})
export class NewQuestionModule {
}
