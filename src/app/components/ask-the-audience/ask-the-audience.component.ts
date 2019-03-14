import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'pil-ask-the-audience',
  templateUrl: './ask-the-audience.component.html',
  styleUrls: ['./ask-the-audience.component.css']
})

export class AskTheAudienceComponent {
  @Output() popupClosed = new EventEmitter();
  audienceAnswers = new Map([
    ['A', '0%'],
    ['B', '40%'],
    ['C', '10%'],
    ['D', '50%']
  ]);

  parseInt = function(num) {
    return parseInt(num, 10);
  };

  close() {
    this.popupClosed.emit();
  }

  get prefixes() {
    return Array.from(this.audienceAnswers.keys());
  }
}
