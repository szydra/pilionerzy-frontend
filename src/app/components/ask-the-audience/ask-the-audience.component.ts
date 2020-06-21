import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GameService} from '../../services/game.service';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'pil-ask-the-audience',
  templateUrl: './ask-the-audience.component.html',
  styleUrls: ['./ask-the-audience.component.css']
})
export class AskTheAudienceComponent implements OnInit {

  @Output()
  popupClosed = new EventEmitter();
  @Output()
  errorEmitter: EventEmitter<Error> = new EventEmitter();
  audienceAnswers: Map<string, string>;
  waiting: boolean;

  constructor(private gameService: GameService) {
  }

  ngOnInit(): void {
    this.waiting = true;
    this.gameService.getAudienceAnswer()
      .pipe(
        finalize(() => this.waiting = false)
      )
      .subscribe(
        answers => this.audienceAnswers = answers,
        error => {
          this.errorEmitter.emit(error);
          this.close();
        });
  }

  parseInt = function (num): number {
    return parseInt(num, 10);
  };

  close(): void {
    this.popupClosed.emit();
  }

  get prefixes(): string[] {
    return Object.keys(this.audienceAnswers);
  }
}
