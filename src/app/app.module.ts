import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AlertCloseableComponent} from './components/alert-closeable/alert-closeable.component';
import {AppComponent} from './app.component';
import {AskTheAudienceComponent} from './components/ask-the-audience/ask-the-audience.component';
import {GameComponent} from './components/game/game.component';
import {HomeComponent} from './components/home/home.component';
import {InfoPopoverComponent} from './components/info-popover/info-popover.component';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {NewQuestionComponent} from './components/new-question/new-question.component';
import {PhoneAFriendComponent} from './components/phone-a-friend/phone-a-friend.component';
import {QuestionComponent} from './components/question/question.component';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {TextareaPreviewComponent} from './components/textarea-preview/textarea-preview.component';

import {AppRoutingModule} from './app-routing.module';
import {GameService} from './services/game.service';
import {GameUiService} from './services/game-ui.service';
import {QuestionService} from './services/question.service';

import {MathJaxDirective} from './directives/mathjax.directive';

@NgModule({
  declarations: [
    AlertCloseableComponent,
    AppComponent,
    AskTheAudienceComponent,
    GameComponent,
    HomeComponent,
    InfoPopoverComponent,
    MathJaxDirective,
    NavBarComponent,
    NewQuestionComponent,
    PhoneAFriendComponent,
    QuestionComponent,
    SpinnerComponent,
    TextareaPreviewComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    GameService,
    GameUiService,
    QuestionService
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule {
}
