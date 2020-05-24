import {Component, OnInit} from '@angular/core';

import {GameService} from '../../services/game.service';

import {Game} from '../../models/game';
import {Lifeline} from '../../models/lifeline';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'pil-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit {
  levels: number[] = Array.from(new Array(Game.HIGHEST_LEVEL), (x, i) => Game.HIGHEST_LEVEL - i - 1);
  lifeline = Lifeline;
  game: Game;
  phoneAFriendVisible = false;
  askTheAudienceVisible = false;
  showError = false;
  waiting = false;

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    this.game = new Game();
  }

  onGameStateChange(game: Game) {
    this.game = game;
    if (this.game.finished) {
      for (const i of Game.GUARANTEED_LEVELS) {
        if (this.game.level >= i) {
          this.game.level = i;
          break;
        }
      }
    }
  }

  onError(error: Error) {
    console.error('An unknown error occurred', error);
    this.showError = true;
    this.game.finished = true;
  }

  onNewGameRequest() {
    this.showError = false;
    this.game = new Game();
  }

  onResign(): void {
    this.waiting = true;
    this.gameService.stopGame()
      .pipe(finalize(() => this.waiting = false))
      .subscribe(
        correctAnswer => {
          this.game.finished = true;
          this.game.lastQuestion.correctAnswer = correctAnswer;
        },
        error => this.onError(error)
      );
  }

  isGuaranteed(level: number): boolean {
    return Game.GUARANTEED_LEVELS.some(lev => lev === level + 1);
  }

  fiftyFifty() {
    this.waiting = true;
    this.gameService.getTwoIncorrectAnswers()
      .pipe(finalize(() => this.waiting = false))
      .subscribe(
        incorrectPrefixes => {
          this.game.lastQuestion.answers.forEach((answer, index, answers) => {
            if (incorrectPrefixes.includes(answer.prefix)) {
              answers[index] = null;
            }
          });
        },
        error => this.onError(error)
      );
    this.game.usedLifelines.push(Lifeline.FiftyFifty);
  }

  phoneAFriend() {
    this.phoneAFriendVisible = true;
    this.game.usedLifelines.push(Lifeline.PhoneAFriend);
  }

  askTheAudience() {
    this.askTheAudienceVisible = true;
    this.game.usedLifelines.push(Lifeline.AskTheAudience);
  }

  onPhoneAFriendPopupClose() {
    this.phoneAFriendVisible = false;
  }

  onAskTheAudiencePopupClose() {
    this.askTheAudienceVisible = false;
  }
}
