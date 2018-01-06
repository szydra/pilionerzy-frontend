import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { Game } from '../../models/game';
import { Question } from '../../models/question';

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
  selected: string;
  question: Question;
  waiting: boolean = false;
  interval: any;

  constructor(private gameService: GameService,
    private gameUiService: GameUiService) { }

  checkAnswer(prefix: string) {
    this.waiting = true;
    this.gameUiService.disableHover();
    this.gameService.sendAnswer(this.selected)
      .then(correctAnswer => {
        this.game.correct = correctAnswer;
        this.waiting = false;
        if (correctAnswer === prefix) {
          this.continueGame();
        } else {
          this.finishGame();
        }
      });
  }

  continueGame() {
    this.interval = setInterval(() => this.gameUiService.blink(), 500);
    setTimeout(() => {
      this.game.level++;
      this.gameStateChange.emit(this.game);
      if (this.game.level < Game.HIGHEST_LEVEL()) {
        this.getQuestion();
      } else {
        clearInterval(this.interval);
        this.gameUiService.stopBlinking();
        this.finishGame();
      }
    }, 3000);
  }

  finishGame() {
    this.game.end = true;
    this.gameStateChange.emit(this.game);
    this.gameUiService.disableHover();
  }

  onClick(prefix: string) {
    if (!this.game.end && !this.game.correct) {
      this.selected = this.selected === prefix ? undefined : prefix;
    }
  }

  getQuestion(): void {
    this.waiting = this.game.level === 0 ? true : false;
    this.gameService.getQuestion()
      .then(question => {
        this.question = question;
        clearInterval(this.interval);
        this.gameUiService.updateFontSize();
        this.gameUiService.enableHover();
        this.gameUiService.updateMathInLeftContainer();
        this.reset();
        this.gameStateChange.emit(this.game);
      });
  }

  reset(): void {
    this.game.correct = undefined;
    this.selected = undefined;
    this.waiting = false;
  }

  ngOnChanges(changes) {
    if (!changes.game.currentValue.level) {
      this.getQuestion();
    }
  }
}
