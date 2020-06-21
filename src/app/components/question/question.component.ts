import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {BehaviorSubject, interval} from 'rxjs';
import {finalize, take} from 'rxjs/operators';
import {Question} from '../../models/question';

@Component({
  selector: 'pil-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnChanges {

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

  private blink(): void {
    this.interval$
      .pipe(
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

  onClick(prefix: string) {
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
