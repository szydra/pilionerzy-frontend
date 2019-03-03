import {SingleAnswer} from './single-answer';

export class Question {
  static readonly PREFIXES: string[] = ['A', 'B', 'C', 'D'];

  content = '';
  answers: SingleAnswer[];
  correctAnswer: string;

  constructor() {
    const answers = new Array<SingleAnswer>();
    Question.PREFIXES.forEach(prefix => answers.push(new SingleAnswer(prefix, '')));
    this.answers = answers;
  }
}
