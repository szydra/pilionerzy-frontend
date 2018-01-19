import { SingleAnswer } from './single-answer';

export class Question {
  id: number;
  content: string;
  answers: SingleAnswer[];
}
