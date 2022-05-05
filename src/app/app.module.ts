import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {NgbPopoverModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {InfoPopoverComponent} from './components/info-popover/info-popover.component';
import {NewQuestionComponent} from './components/new-question/new-question.component';
import {TextareaPreviewComponent} from './components/textarea-preview/textarea-preview.component';

import {AppCommonModule} from './app-common/app-common.module';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from '@core/core.module';
import {SharedModule} from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    InfoPopoverComponent,
    NewQuestionComponent,
    TextareaPreviewComponent
  ],
  imports: [
    AppCommonModule,
    AppRoutingModule,
    BrowserModule,
    CoreModule,
    FormsModule,
    NgbPopoverModule,
    // TODO Remove
    SharedModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
