import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';

import {GameService} from '../../services/game.service';

import {Game} from '../../models/game';
import {Lifeline} from '../../models/lifeline';
import {finalize, skipWhile} from 'rxjs/operators';
import {QuestionComponent} from '../question/question.component';
import {BehaviorSubject, zip} from 'rxjs';
import {cloneDeep} from 'lodash-es';

@Component({
  selector: 'pil-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, AfterViewInit {

  levels: number[] = Array.from(new Array(Game.HIGHEST_LEVEL), (x, i) => Game.HIGHEST_LEVEL - i - 1);
  lifeline = Lifeline;
  game: Game = new Game();
  phoneAFriendVisible = false;
  askTheAudienceVisible = false;
  showError = false;
  waiting = false;

  @ViewChild(QuestionComponent, {static: false})
  private question: QuestionComponent;
  private continueGame$ = new BehaviorSubject<boolean>(null);

  constructor(private gameService: GameService) {
  }

  ngOnInit(): void {
    this.startNewGame();
  }

  ngAfterViewInit(): void {
    zip(
      this.question.blinkingFinished$.pipe(skipWhile(value => value !== true)),
      this.continueGame$.asObservable().pipe(skipWhile(value => value !== true))
    )
      .subscribe(() => this.getNextQuestion());
  }

  private startNewGame(): void {
    this.gameService.startNewGame()
      .subscribe(
        () => this.getFirstQuestion(),
        error => this.onError(error)
      );
  }

  private getFirstQuestion(): void {
    this.waiting = true;
    this.gameService.getQuestion()
      .pipe(
        finalize(() => this.waiting = false)
      )
      .subscribe(
        question => this.game.lastQuestion = question,
        error => this.onError(error)
      );
  }

  private getNextQuestion(): void {
    this.gameService.getQuestion()
      .subscribe(
        question => this.game.lastQuestion = question,
        error => this.onError(error)
      );
  }

  onError(error: Error): void {
    console.error('An unknown error occurred', error);
    this.showError = true;
    this.game.finished = true;
  }

  onNewGameRequest(): void {
    this.showError = false;
    this.game = new Game();
    this.startNewGame();
  }

  checkAnswer(prefix: string): void {
    this.waiting = true;
    this.gameService.sendAnswer(prefix)
      .pipe(
        finalize(() => this.waiting = false)
      )
      .subscribe(
        game => {
          const question = this.game.lastQuestion;
          question.correctAnswer = game.correctAnswer;
          this.game.lastQuestion = cloneDeep(question);
          this.game.level = game.level;
          this.game.finished = !game.active;
          if (game.active) {
            this.continueGame$.next(true);
          }
        },
        error => this.onError(error)
      );
  }

  onResign(): void {
    this.waiting = true;
    this.gameService.stopGame()
      .pipe(
        finalize(() => this.waiting = false)
      )
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

  fiftyFifty(): void {
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

  phoneAFriend(): void {
    this.phoneAFriendVisible = true;
    this.game.usedLifelines.push(Lifeline.PhoneAFriend);
  }

  askTheAudience(): void {
    this.askTheAudienceVisible = true;
    this.game.usedLifelines.push(Lifeline.AskTheAudience);
  }
}
