import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GameService} from '../../services/game.service';

@Component({
  selector: 'pil-phone-a-friend',
  templateUrl: './phone-a-friend.component.html',
  styleUrls: ['./phone-a-friend.component.css']
})

export class PhoneAFriendComponent implements OnInit {
  @Output() popupClosed = new EventEmitter();
  @Output() errorEmitter: EventEmitter<Error> = new EventEmitter();
  friendsAnswer: Map<string, string>;
  waiting: boolean;

  constructor(private gameService: GameService) {
  }

  ngOnInit(): void {
    this.waiting = true;
    this.gameService.getFriendAnswer()
      .then(answer => this.friendsAnswer = answer)
      .catch(error => {
        this.errorEmitter.emit(error);
        this.close();
      }).then(() => this.waiting = false);
  }

  close() {
    this.popupClosed.emit();
  }

  isFriendAFemale(): boolean {
    return Math.random() >= 0.5;
  }
}
