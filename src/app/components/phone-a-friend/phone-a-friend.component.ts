import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {GameService} from '../../services/game.service';
import {finalize, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'pil-phone-a-friend',
  templateUrl: './phone-a-friend.component.html',
  styleUrls: ['./phone-a-friend.component.scss']
})
export class PhoneAFriendComponent implements OnInit, OnDestroy {

  @Output()
  popupClosed = new EventEmitter();

  @Output()
  errorEmitter: EventEmitter<Error> = new EventEmitter();
  friendsAnswer: Map<string, string>;
  isFriendAFemale: boolean;
  waiting: boolean;

  private destroy$ = new Subject<void>();

  constructor(private gameService: GameService) {
  }

  ngOnInit(): void {
    this.waiting = true;
    this.isFriendAFemale = Math.random() >= 0.5;
    this.gameService.getFriendAnswer()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.waiting = false)
      )
      .subscribe(
        answer => this.friendsAnswer = answer,
        error => {
          this.errorEmitter.emit(error);
          this.close();
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  close() {
    this.popupClosed.emit();
  }
}
