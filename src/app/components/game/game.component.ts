import {Component, OnInit} from '@angular/core';

import {GameService} from '../../services/game.service';
import {GameUiService} from '../../services/game-ui.service';

import {Game} from '../../models/game';
import {Lifeline} from '../../models/lifeline';

@Component({
  selector: 'pil-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit {
  levels: number[] = Array.from(new Array(Game.HIGHEST_LEVEL), (x, i) => Game.HIGHEST_LEVEL - i - 1);
  lifeline = Lifeline;
  game: Game;
  askTheAudienceVisible = false;
  showError = false;
  waiting = false;

  constructor(private gameService: GameService,
              private gameUiService: GameUiService) {
  }

  ngOnInit() {
    this.game = new Game();
  }

  onGameStateChange(game: Game) {
    this.game = game;
    if (this.game.finished) {
      for (const i of Game.GUARANTEED_LEVELS) {
        if (this.game.level >= i) {
          this.game.level = i - 1;
          break;
        }
      }
      this.gameUiService.roundLevelBoxCorners();
    }
  }

  onError(error: Error) {
    console.error('An unknown error occurred', error);
    this.showError = true;
    this.game.finished = true;
    this.game.level--;
    this.gameUiService.roundLevelBoxCorners();
  }

  onNewGameRequest() {
    this.showError = false;
    this.gameUiService.resetLevelBoxCorners();
    this.game = new Game();
  }

  onResign(): void {
    this.waiting = true;
    this.gameService.stopGame().then(correctAnswer => {
      this.game.finished = true;
      this.game.level--;
      this.game.lastQuestion.correctAnswer = correctAnswer;
      this.gameUiService.roundLevelBoxCorners();
    }).catch(error => this.onError(error))
      .then(() => this.waiting = false);
    this.gameUiService.disableHover();
  }

  isGuaranteed(level: number): boolean {
    return Game.GUARANTEED_LEVELS.some(lev => lev === level + 1);
  }

  fiftyFifty() {
    this.waiting = true;
    this.gameService.getTwoIncorrectAnswers().then(incorrectPrefixes => {
      this.game.lastQuestion.answers.forEach((answer, index, answers) => {
        if (incorrectPrefixes.includes(answer.prefix)) {
          answers[index] = null;
        }
      });
    }).catch(error => this.onError(error))
      .then(() => this.waiting = false);
    this.game.usedLifelines.push(Lifeline.FiftyFifty);
  }

  askTheAudience() {
    this.askTheAudienceVisible = true;
    this.game.usedLifelines.push(Lifeline.AskTheAudience);
  }

  onAskTheAudiencePopupClose() {
    this.askTheAudienceVisible = false;
  }
}
