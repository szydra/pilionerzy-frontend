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
  levels: number[] = Array.from(new Array(Game.HIGHEST_LEVEL), (x, i) => Game.HIGHEST_LEVEL - i - 1);
  game: Game;
  showError: boolean = false;
  waiting: boolean = false;

  constructor(private gameService: GameService,
    private gameUiService: GameUiService) { }

  ngOnInit() {
    this.game = new Game();
  }

  onGameStateChange(game: Game) {
    this.game = game;
    if (this.game.end) {
      for (let i of Game.GUARANTED_LEVELS) {
        if (this.game.level >= i) {
          this.game.level = i - 1;
          break;
        }
      }
      this.gameUiService.roundLevelBoxCorners();
    }
  }

  onError(error: Error) {
    console.error("An unknown error occurred", error);
    this.showError = true;
    this.game.end = true;
    this.game.level--;
    this.gameUiService.roundLevelBoxCorners();
  }

  onNewGameRequest() {
    this.showError = false;
    this.gameUiService.resetLevelBoxCorners();
    this.game = new Game();
  }

  onResign(): void {
    this.waiting = true;
    this.gameService.stopGame().then(correctAnswer => {
      this.game.end = true;
      this.game.level--;
      this.game.correct = correctAnswer;
      this.gameUiService.roundLevelBoxCorners();
    }).catch(error => this.onError(error))
      .then(() => this.waiting = false);
    this.gameUiService.disableHover();
  }

  isGuaranted(level: number): boolean {
    return Game.GUARANTED_LEVELS.some(lev => lev === level + 1);
  }
}
