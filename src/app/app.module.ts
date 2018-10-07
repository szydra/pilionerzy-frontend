import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AlertCloseable } from './components/alert-closeable/alert-closeable';
import { AppComponent } from './app.component';
import { GameComponent } from './components/game/game.component';
import { QuestionComponent } from './components/question/question.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/nav-bar/nav-bar.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NewQuestion } from './components/new-question/new-question.component';
import { TextareaPreview } from './components/textarea-preview/textarea-preview';

import { GameService } from './services/game.service';
import { GameUiService } from './services/game-ui.service';
import { QuestionService } from './services/question.service';
import { AppRoutingModule } from './app-routing.module';

import { MathJaxDirective } from './directives/mathjax.directive';

@NgModule({
  declarations: [
    AlertCloseable,
    AppComponent,
    QuestionComponent,
    GameComponent,
    HomeComponent,
    NavbarComponent,
    SpinnerComponent,
    NewQuestion,
    TextareaPreview,
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

export class AppModule { }
