import { Question } from './question';

export class Game {
  public static readonly HIGHEST_LEVEL: number = 12;
  public static readonly GUARANTED_LEVELS: number[] = [12, 7, 2, 0];
  public static readonly AWARDS: string[] = ["500 zł", "1 000 zł",
    "2 000 zł", "5 000 zł", "10 000 zł", "20 000 zł", "40 000 zł",
    "75 000 zł", "125 000 zł", "250 000 zł", "500 000 zł", "1 000 000 zł"];

  constructor() {
    this.level = 0;
    this.finished = false;
  }

  level: number;
  finished: boolean;
  lastQuestion: Question;

  get awards(): string[] {
    return Game.AWARDS;
  }
}
