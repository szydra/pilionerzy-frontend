import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';

import {AlertCloseableComponent} from './components/alert-closeable/alert-closeable.component';
import {AppComponent} from './app.component';
import {AskTheAudienceComponent} from './components/ask-the-audience/ask-the-audience.component';
import {GameComponent} from './components/game/game.component';
import {QuestionComponent} from './components/question/question.component';
import {HomeComponent} from './components/home/home.component';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {NewQuestionComponent} from './components/new-question/new-question.component';
import {TextareaPreviewComponent} from './components/textarea-preview/textarea-preview.component';
import {InfoPopoverComponent} from './components/info-popover/info-popover.component';

import {GameService} from './services/game.service';
import {GameUiService} from './services/game-ui.service';
import {QuestionService} from './services/question.service';
import {AppRoutingModule} from './app-routing.module';

import {MathJaxDirective} from './directives/mathjax.directive';

@NgModule({
  declarations: [
    AlertCloseableComponent,
    AppComponent,
    AskTheAudienceComponent,
    QuestionComponent,
    GameComponent,
    HomeComponent,
    NavBarComponent,
    SpinnerComponent,
    NewQuestionComponent,
    TextareaPreviewComponent,
    InfoPopoverComponent,
    MathJaxDirective
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    GameService,
    GameUiService,
    QuestionService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
