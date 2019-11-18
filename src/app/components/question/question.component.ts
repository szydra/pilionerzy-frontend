import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';

import {Game} from '../../models/game';

import {GameService} from '../../services/game.service';
import {GameUiService} from '../../services/game-ui.service';

@Component({
  selector: 'pil-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnChanges {
  @Input() game: Game;
  @Output() gameStateChange: EventEmitter<Game> = new EventEmitter();
  @Output() errorEmitter: EventEmitter<Error> = new EventEmitter();
  selected: string;
  waiting = false;
  interval: any;
  blinking = false;

  constructor(private gameService: GameService,
              private gameUiService: GameUiService) {
  }

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
    this.interval = setInterval(() => this.blinking = !this.blinking, 500);
    setTimeout(() => {
      this.game.level++;
      this.gameStateChange.emit(this.game);
      if (this.game.level < Game.HIGHEST_LEVEL) {
        this.getQuestion();
      } else {
        clearInterval(this.interval);
        this.blinking = false;
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
    this.waiting = this.game.level === 0;
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

  get submitButtonDisabled(): boolean {
    const answers = this.game.lastQuestion.answers;
    const selectedVisible = answers.some(e => e && e.prefix === this.selected);
    return !(this.selected && selectedVisible);
  }

  reset(): void {
    if (this.game.lastQuestion) {
      this.game.lastQuestion.correctAnswer = undefined;
    }
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

  correctBackground(prefix: string): boolean {
    return prefix === this.game.lastQuestion.correctAnswer && (this.blinking || this.game.finished);
  }

  selectedBackground(prefix: string): boolean {
    return prefix === this.selected && !this.correctBackground(prefix);
  }

  unselectedBackground(prefix: string): boolean {
    return !this.correctBackground(prefix) && !this.selectedBackground(prefix);
  }
}
