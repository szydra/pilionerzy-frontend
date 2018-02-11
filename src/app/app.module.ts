import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameComponent } from './components/game/game.component';
import { QuestionComponent } from './components/question/question.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/nav-bar/nav-bar.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

import { GameService } from './services/game.service';
import { GameUiService } from './services/game-ui.service';
import { AppRoutingModule } from './app-routing.module';

import { MathJaxDirective } from './directives/mathjax.directive';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    GameComponent,
    HomeComponent,
    NavbarComponent,
    SpinnerComponent,
    MathJaxDirective
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    GameService,
    GameUiService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
