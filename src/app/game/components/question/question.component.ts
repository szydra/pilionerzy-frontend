import {Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges} from '@angular/core';
import {BehaviorSubject, interval, Subject} from 'rxjs';
import {finalize, take, takeUntil} from 'rxjs/operators';
import {Question} from '@core/models/question';

@Component({
  selector: 'pil-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnChanges, OnDestroy {

  @Input() question: Question;
  @Input() correctAnswer: string;
  @Input() active: boolean;
  @Output() answerSelected: EventEmitter<string> = new EventEmitter();
  hoverable = false;

  private selected: string;
  private blinkingFinished = new BehaviorSubject<boolean>(null);
  blinkingFinished$ = this.blinkingFinished.asObservable();
  private interval$ = interval(500);
  private blinking = false;
  private destroy$ = new Subject<void>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.correctAnswer
      && changes.correctAnswer.currentValue
      && changes.correctAnswer.currentValue === this.selected) {
      this.blink();
    }
    if (changes.question) {
      this.hoverable = true;
      this.selected = null;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private blink(): void {
    this.interval$
      .pipe(
        takeUntil(this.destroy$),
        take(6),
        finalize(() => {
          this.blinking = false;
          this.blinkingFinished.next(true);
        })
      )
      .subscribe(() => this.blinking = !this.blinking);
  }

  sendAnswer(): void {
    this.answerSelected.emit(this.selected);
    this.hoverable = false;
  }

  onClick(prefix: string): void {
    if (this.active && !this.correctAnswer) {
      this.selected = this.selected === prefix ? null : prefix;
    }
  }

  submitButtonDisabled(): boolean {
    const answers = this.question.answers;
    const selectedVisible = answers.some(e => e && e.prefix === this.selected);
    return !(this.selected && selectedVisible);
  }

  correctBackground(prefix: string): boolean {
    return prefix === this.correctAnswer && (this.blinking || !this.active);
  }

  selectedBackground(prefix: string): boolean {
    return prefix === this.selected && !this.correctBackground(prefix);
  }

  unselectedBackground(prefix: string): boolean {
    return !this.correctBackground(prefix) && !this.selectedBackground(prefix);
  }
}
