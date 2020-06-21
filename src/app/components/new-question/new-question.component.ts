import {Component} from '@angular/core';
import {Question} from '../../models/question';
import {QuestionService} from '../../services/question.service';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'pil-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css']
})
export class NewQuestionComponent {
  question: Question = new Question();
  showError = false;
  showSuccess = false;
  waiting = false;

  constructor(private questionService: QuestionService) {
  }

  onSubmit() {
    this.waiting = true;
    this.questionService.addQuestion(this.question)
      .pipe(finalize(() => this.waiting = false))
      .subscribe(
        () => {
          this.showSuccess = true;
          this.question = new Question();
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
