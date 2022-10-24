import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {GameService} from '@core/services/game.service';

import {Game} from '../../models/game';
import {Lifeline} from '../../models/lifeline';
import {finalize, skipWhile, takeUntil, tap} from 'rxjs/operators';
import {QuestionComponent} from '../question/question.component';
import {BehaviorSubject, Observable, Subject, zip} from 'rxjs';
import {Level} from '../../models/level';

@Component({
  selector: 'pil-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, AfterViewInit, OnDestroy {

  levels$: Observable<Level[]>;
  lifeline = Lifeline;
  game: Game = new Game();
  phoneAFriendVisible = false;
  askTheAudienceVisible = false;
  showError = false;
  waiting = false;

  @ViewChild(QuestionComponent)
  private question: QuestionComponent;
  private continueGame$ = new BehaviorSubject<boolean>(null);
  private destroy$ = new Subject<void>();

  constructor(private gameService: GameService) {
    this.levels$ = this.gameService.getLevels();
  }

  ngOnInit(): void {
    this.startNewGame();
  }

  ngAfterViewInit(): void {
    zip(
      this.question.blinkingFinished$
        .pipe(skipWhile(value => value !== true)),
      this.continueGame$.asObservable()
        .pipe(skipWhile(value => value !== true))
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.getNextQuestion());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private startNewGame(): void {
    this.gameService.startNewGame()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => this.getFirstQuestion(),
        error => this.onError(error)
      );
  }

  private getFirstQuestion(): void {
    this.waiting = true;
    this.gameService.getQuestion()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.waiting = false)
      )
      .subscribe(
        question => this.game.lastQuestion = question,
        error => this.onError(error)
      );
  }

  private getNextQuestion(): void {
    this.gameService.getQuestion()
      .pipe(
        takeUntil(this.destroy$),
        tap(() => this.game.correctAnswer = null)
      )
      .subscribe(
        question => this.game.lastQuestion = question,
        error => this.onError(error)
      );
  }

  onError(error: Error): void {
    console.error('An unknown error occurred', error);
    this.showError = true;
    this.game.active = false;
  }

  onNewGameRequest(): void {
    this.showError = false;
    this.game = new Game();
    this.startNewGame();
  }

  levelMatcher = lev => lev.id === this.game.level;

  checkAnswer(prefix: string): void {
    this.waiting = true;
    this.gameService.sendAnswer(prefix)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.waiting = false)
      )
      .subscribe(
        game => {
          this.game.correctAnswer = game.correctAnswer;
          this.game.level = game.level;
          this.game.active = game.active;
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
        takeUntil(this.destroy$),
        finalize(() => this.waiting = false)
      )
      .subscribe(
        correctAnswer => {
          this.game.active = false;
          this.game.correctAnswer = correctAnswer;
        },
        error => this.onError(error)
      );
  }

  fiftyFifty(): void {
    this.waiting = true;
    this.gameService.getTwoIncorrectAnswers()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.waiting = false)
      )
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
