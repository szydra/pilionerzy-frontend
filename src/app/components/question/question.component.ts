import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { Game } from '../../models/game';

import { GameService } from '../../services/game.service';
import { GameUiService } from '../../services/game-ui.service';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnChanges {
  @Input() game: Game;
  @Output() gameStateChange: EventEmitter<Game> = new EventEmitter();
  @Output() errorEmitter: EventEmitter<Error> = new EventEmitter();
  selected: string;
  waiting: boolean = false;
  interval: any;

  constructor(private gameService: GameService,
    private gameUiService: GameUiService) { }

  checkAnswer(prefix: string) {
    this.waiting = true;
    this.gameUiService.disableHover();
    this.gameService.sendAnswer(this.selected)
      .then(correctAnswer => {
        this.game.lastQuestion.correctAnswer = correctAnswer;
        this.waiting = false;
        correctAnswer === prefix ? this.continueGame() : this.finishGame();
      }).catch(error => this.handleError(error));
  }

  continueGame() {
    this.interval = setInterval(() => this.gameUiService.blink(), 500);
    setTimeout(() => {
      this.game.level++;
      this.gameStateChange.emit(this.game);
      if (this.game.level < Game.HIGHEST_LEVEL) {
        this.getQuestion();
      } else {
        clearInterval(this.interval);
        this.gameUiService.stopBlinking();
        this.finishGame();
      }
    }, 3000);
  }

  finishGame() {
    this.game.finished = true;
    this.gameStateChange.emit(this.game);
    this.gameUiService.disableHover();
  }

  onClick(prefix: string) {
    if (!this.game.finished && !this.game.lastQuestion.correctAnswer) {
      this.selected = this.selected === prefix ? undefined : prefix;
    }
  }

  getQuestion(): void {
    this.waiting = this.game.level === 0 ? true : false;
    this.gameService.getQuestion()
      .then(question => {
        this.game.lastQuestion = question;
        clearInterval(this.interval);
        this.gameUiService.updateFontSize();
        this.gameUiService.enableHover();
        this.reset();
        this.gameStateChange.emit(this.game);
      }).catch(error => this.handleError(error));
  }

  reset(): void {
    this.game.lastQuestion.correctAnswer = undefined;
    this.selected = undefined;
    this.waiting = false;
  }

  handleError(error: Error) {
    this.errorEmitter.emit(error);
    this.reset();
  }

  ngOnChanges(changes) {
    this.waiting = true;
    this.gameService.startNewGame()
      .then(() => this.getQuestion())
      .catch(error => this.handleError(error));
  }
}
