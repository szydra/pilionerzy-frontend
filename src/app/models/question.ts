import { SingleAnswer } from './single-answer';

export class Question {
  static PREFIXES: string[] = ['A', 'B', 'C', 'D'];

  id: number;
  content: string;
  answers: SingleAnswer[];
  correctAnswer: string;

  constructor() {
    this.content = '';
    let answers = new Array<SingleAnswer>();
    Question.PREFIXES.forEach(function(prefix) {
      answers.push(new SingleAnswer(prefix, ''));
    });
    this.answers = answers;
  }
}
