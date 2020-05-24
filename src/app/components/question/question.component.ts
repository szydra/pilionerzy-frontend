import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';

import {Game} from '../../models/game';

import {GameService} from '../../services/game.service';
import {interval} from 'rxjs';
import {finalize, take} from 'rxjs/operators';

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
  blinking = false;
  hoverable = true;

  private interval$ = interval(500);

  constructor(private gameService: GameService) {
  }

  checkAnswer(prefix: string) {
    this.waiting = true;
    this.hoverable = false;
    this.gameService.sendAnswer(this.selected)
      .subscribe(
        correctAnswer => {
          this.game.lastQuestion.correctAnswer = correctAnswer;
          this.waiting = false;
          correctAnswer === prefix ? this.continueGame() : this.finishGame();
        },
        error => this.handleError(error)
      );
  }

  continueGame() {
    this.interval$
      .pipe(
        take(6),
        finalize(() => {
          this.game.level++;
          this.gameStateChange.emit(this.game);
          if (this.game.level < Game.HIGHEST_LEVEL) {
            this.getQuestion();
          } else {
            this.blinking = false;
            this.finishGame();
          }
        })
      )
      .subscribe(() => this.blinking = !this.blinking);
  }

  finishGame() {
    this.game.finished = true;
    this.gameStateChange.emit(this.game);
  }

  onClick(prefix: string) {
    if (!this.game.finished && !this.game.lastQuestion.correctAnswer) {
      this.selected = this.selected === prefix ? undefined : prefix;
    }
  }

  getQuestion(): void {
    this.waiting = this.game.level === 0;
    this.gameService.getQuestion()
      .subscribe(
        question => {
          this.game.lastQuestion = question;
          this.hoverable = true;
          this.reset();
          this.gameStateChange.emit(this.game);
        },
        error => this.handleError(error)
      );
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
      .subscribe(
        () => this.getQuestion(),
        error => this.handleError(error)
      );
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
