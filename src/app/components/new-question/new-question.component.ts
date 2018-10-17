import { Component } from '@angular/core';
import { Question } from '../../models/question';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css']
})

export class NewQuestion {
  question: Question = new Question();
  showError: boolean = false;
  showSuccess: boolean = false;
  waiting: boolean = false;

  constructor(private questionService: QuestionService) { }

  onSubmit() {
    this.waiting = true;
    this.questionService.addQuestion(this.question)
      .then(() => {
        this.showSuccess = true;
        this.question = new Question();
        setTimeout(() => this.showSuccess = false, 10000);
      }).catch(error => {
        this.showError = true;
        console.error("An unknown error occurred", error);
      }).then(() => this.waiting = false);
  }

  isButtonSubmitDisabled(): boolean {
    return !this.question.content
      || !this.question.correctAnswer
      || this.question.answers.some(answer => !answer.content);
  }
}
