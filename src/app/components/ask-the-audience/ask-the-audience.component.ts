import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GameService} from '../../services/game.service';

@Component({
  selector: 'pil-ask-the-audience',
  templateUrl: './ask-the-audience.component.html',
  styleUrls: ['./ask-the-audience.component.css']
})

export class AskTheAudienceComponent implements OnInit {
  @Output() popupClosed = new EventEmitter();
  @Output() errorEmitter: EventEmitter<Error> = new EventEmitter();
  audienceAnswers: Map<string, string>;
  waiting: boolean;

  constructor(private gameService: GameService) {
  }

  ngOnInit(): void {
    this.waiting = true;
    this.gameService.getAudienceAnswer()
      .then(answers => this.audienceAnswers = answers)
      .catch(error => {
        this.errorEmitter.emit(error);
        this.close();
      }).then(() => this.waiting = false);
  }

  parseInt = function (num) {
    return parseInt(num, 10);
  };

  close() {
    this.popupClosed.emit();
  }

  get prefixes() {
    return Object.keys(this.audienceAnswers);
  }
}
