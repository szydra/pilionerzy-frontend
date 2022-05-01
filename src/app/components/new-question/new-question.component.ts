import {Component, OnDestroy} from '@angular/core';
import {finalize, takeUntil} from 'rxjs/operators';
import {NewQuestion} from '../../models/new-question';
import {Subject} from 'rxjs';
import {QuestionService} from '@core/services/question.service';

@Component({
  selector: 'pil-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss']
})
export class NewQuestionComponent implements OnDestroy {

  question: NewQuestion = new NewQuestion();
  showError = false;
  showSuccess = false;
  waiting = false;

  private destroy$ = new Subject<void>();

  constructor(private questionService: QuestionService) {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(): void {
    this.waiting = true;
    this.questionService.addQuestion(this.question)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.waiting = false)
      )
      .subscribe(
        () => {
          this.showSuccess = true;
          this.question = new NewQuestion();
          setTimeout(() => this.showSuccess = false, 10000);
        },
        error => {
          this.showError = true;
          console.error('An unknown error occurred', error);
        }
      );
  }

  isButtonSubmitDisabled(): boolean {
    return !this.question.content
      || this.question.content.length < 4
      || !this.question.correctAnswer
      || this.question.answers.some(answer => !answer.content);
  }
}
