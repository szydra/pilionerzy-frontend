import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {NewQuestionComponent} from './components/new-question/new-question.component';

const routes: Routes = [
  {path: 'game', loadChildren: () => import('./game/game.module').then(m => m.GameModule)},
  {path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  {path: 'new-question', component: NewQuestionComponent},
  {path: '**', redirectTo: '/home'}
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
