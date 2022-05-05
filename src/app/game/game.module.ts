import {NgModule} from '@angular/core';

import {GameRoutingModule} from './game-routing.module';
import {SharedModule} from '../shared/shared.module';
import {MaxHeightDirective} from './directives/max-height.directive';
import {QuestionComponent} from './components/question/question.component';
import {PhoneAFriendComponent} from './components/phone-a-friend/phone-a-friend.component';
import {GameComponent} from './components/game/game.component';
import {AskTheAudienceComponent} from './components/ask-the-audience/ask-the-audience.component';

@NgModule({
  declarations: [
    AskTheAudienceComponent,
    GameComponent,
    PhoneAFriendComponent,
    QuestionComponent,
    MaxHeightDirective
  ],
  imports: [
    GameRoutingModule,
    SharedModule
  ]
})
export class GameModule {
}
