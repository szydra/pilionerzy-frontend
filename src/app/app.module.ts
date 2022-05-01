import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {NgbAlertModule, NgbPopoverModule} from '@ng-bootstrap/ng-bootstrap';

import {AlertCloseableComponent} from './components/alert-closeable/alert-closeable.component';
import {AppComponent} from './app.component';
import {AskTheAudienceComponent} from './components/ask-the-audience/ask-the-audience.component';
import {GameComponent} from './components/game/game.component';
import {InfoPopoverComponent} from './components/info-popover/info-popover.component';
import {NewQuestionComponent} from './components/new-question/new-question.component';
import {PhoneAFriendComponent} from './components/phone-a-friend/phone-a-friend.component';
import {QuestionComponent} from './components/question/question.component';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {TextareaPreviewComponent} from './components/textarea-preview/textarea-preview.component';

import {MathJaxDirective} from './directives/mathjax.directive';
import {MaxHeightDirective} from './directives/max-height.directive';
import {AppCommonModule} from './app-common/app-common.module';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from '@core/core.module';

@NgModule({
  declarations: [
    AlertCloseableComponent,
    AppComponent,
    AskTheAudienceComponent,
    GameComponent,
    InfoPopoverComponent,
    MathJaxDirective,
    MaxHeightDirective,
    NewQuestionComponent,
    PhoneAFriendComponent,
    QuestionComponent,
    SpinnerComponent,
    TextareaPreviewComponent
  ],
  imports: [
    AppCommonModule,
    AppRoutingModule,
    BrowserModule,
    CoreModule,
    FormsModule,
    NgbAlertModule,
    NgbPopoverModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
