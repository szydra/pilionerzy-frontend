import {Injectable} from '@angular/core';

@Injectable()
export class GameUiService {

  constructor() {
  }

  disableHover(): void {
    setTimeout(() => {
      Array.from(document.querySelectorAll('.bg-unselected, .bg-selected'))
        .forEach(function (element) {
          element.classList.add('disable-hover');
        });
    });
  }

  enableHover(): void {
    setTimeout(() => {
      Array.from(document.querySelectorAll('.bg-unselected, .bg-selected'))
        .forEach(function (element) {
          element.classList.remove('disable-hover');
        });
    });
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
