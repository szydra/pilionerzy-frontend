import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {GameService} from '../../services/game.service';
import {finalize, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'pil-ask-the-audience',
  templateUrl: './ask-the-audience.component.html',
  styleUrls: ['./ask-the-audience.component.css']
})
export class AskTheAudienceComponent implements OnInit, OnDestroy {

  @Output()
  popupClosed = new EventEmitter();

  @Output()
  errorEmitter: EventEmitter<Error> = new EventEmitter();
  audienceAnswers: Map<string, string>;
  waiting: boolean;

  private destroy$ = new Subject<void>();

  constructor(private gameService: GameService) {
  }

  ngOnInit(): void {
    this.waiting = true;
    this.gameService.getAudienceAnswer()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.waiting = false)
      )
      .subscribe(
        answers => this.audienceAnswers = answers,
        error => {
          this.errorEmitter.emit(error);
          this.close();
        });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  parseInt = function (num): number {
    return parseInt(num, 10);
  };

  close(): void {
    this.popupClosed.emit();
  }

  get prefixes(): string[] {
    return Object.keys(this.audienceAnswers);
  }
}
