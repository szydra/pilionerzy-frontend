import {Lifeline} from './lifeline';
import {Question} from '@core/models/question';

export class Game {
  constructor() {
    this.level = 0;
    this.active = true;
  }

  level: number;
  active: boolean;
  correctAnswer: string;
  lastQuestion: Question;
  usedLifelines: Lifeline[] = [];
}
