import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {GameComponent} from './components/game/game.component';
import {HomeComponent} from './components/home/home.component';
import {NewQuestionComponent} from './components/new-question/new-question.component';

const routes: Routes = [
  {path: 'game', component: GameComponent},
  {path: 'home', component: HomeComponent},
  {path: 'new-question', component: NewQuestionComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
