import { Component, OnInit } from '@angular/core';

import { GameService } from '../../services/game.service';
import { GameUiService } from '../../services/game-ui.service';

import { Game } from '../../models/game';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit {
  awards: string[] = Game.AWARDS();
  levels: number[] = Array(Game.HIGHEST_LEVEL()).fill(0).map((x, i) => Game.HIGHEST_LEVEL() - i - 1);
  game: Game;
  waiting: boolean = false;

  constructor(private gameService: GameService,
    private gameUiService: GameUiService) { }

  ngOnInit() {
    this.game = new Game();
  }

  onGameStateChange(game: Game) {
    this.game = game;
    if (this.game.end) {
      for (let i of Game.GUARANTED_LEVELS()) {
        if (this.game.level >= i) {
          this.game.level = i - 1;
          break;
        }
      }
      this.gameUiService.roundLevelBoxCorners();
    }
  }

  onNewGameRequest() {
    this.gameUiService.resetLevelBoxCorners();
    this.game = new Game();
  }

  onResign(): void {
    this.waiting = true;
    this.gameService.sendAnswer(null).then(correctAnswer => {
      this.game.end = true;
      this.game.level--;
      this.game.correct = correctAnswer;
      this.waiting = false;
    });
    this.gameUiService.disableHover();
    this.gameUiService.roundLevelBoxCorners();
  }

  isGuaranted(level: number): boolean {
    return Game.GUARANTED_LEVELS().some(lev => lev === level + 1);
  }
}
