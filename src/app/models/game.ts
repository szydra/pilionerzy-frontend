export class Game {
  public static HIGHEST_LEVEL(): number { return 12; }
  public static GUARANTED_LEVELS(): number[] { return [12, 7, 2, 0]; }
  public static AWARDS(): string[] {
    return ["500 zł", "1 000 zł", "2 000 zł",
      "5 000 zł", "10 000 zł", "20 000 zł",
      "40 000 zł", "75 000 zł", "125 000 zł",
      "250 000 zł", "500 000 zł", "1 000 000 zł"];
  }

  constructor() {
    this.level = 0;
    this.end = false;
  }

  level: number;
  end: boolean;
  correct: string;
}
