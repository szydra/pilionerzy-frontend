import {Injectable} from '@angular/core';

@Injectable()
export class GameUiService {

  constructor() {
  }

  resetLevelBoxCorners(): void {
    setTimeout(() => {
      Array.from(document.getElementsByClassName('level-box'))
        .forEach(function (element) {
          const style = (<HTMLElement>element).style;
          style.borderTopLeftRadius = '';
          style.borderTopRightRadius = '';
        });
    });
  }

  roundLevelBoxCorners(): void {
    setTimeout(() => {
      const element = <HTMLElement>document.querySelector('.level-box.bg-success');
      if (element) {
        element.style.borderTopLeftRadius = '10px';
        element.style.borderTopRightRadius = '10px';
      }
    });
  }
}
