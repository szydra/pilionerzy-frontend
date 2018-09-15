import { Injectable } from '@angular/core';

@Injectable()
export class GameUiService {

  constructor() { }

  blink(): void {
    setTimeout(() => {
      let divToBlink = document.querySelector(".bg-correct, .bg-incorrect-selected");
      if (divToBlink) {
        divToBlink.classList.toggle("bg-correct");
        divToBlink.classList.toggle("bg-incorrect-selected");
      }
    });
  }

  disableHover(): void {
    setTimeout(() => {
      Array.from(document.querySelectorAll(".bg-incorrect-unselected, .bg-incorrect-selected"))
        .forEach(function(element) {
          element.classList.add("disable-hover");
        });
    });
  }

  enableHover(): void {
    setTimeout(() => {
      Array.from(document.querySelectorAll(".bg-incorrect-unselected, .bg-incorrect-selected"))
        .forEach(function(element) {
          element.classList.remove("disable-hover");
        });
    });
  }

  // This method returns the height of the highest matched element.
  // https://stackoverflow.com/a/6061029/8701267
  private getHeight(elements: HTMLCollection): number {
    return Math.max.apply(null, Array.from(elements).map(function(element) {
      return element.clientHeight;
    }));
  }

  private resizeFont(elements: HTMLCollection, maxHeight: number): void {
    let currentHeight = this.getHeight(elements);
    while (currentHeight > maxHeight) {
      Array.from(elements).forEach(function(element) {
        let style = (<HTMLElement>element).style;
        style.fontSize = parseFloat(style.fontSize) - 1 + 'px';
      });
      currentHeight = this.getHeight(elements);
    }
  }

  resetLevelBoxCorners(): void {
    setTimeout(() => {
      Array.from(document.getElementsByClassName("level-box"))
        .forEach(function(element) {
          let style = (<HTMLElement>element).style;
          style.borderTopLeftRadius = '';
          style.borderTopRightRadius = '';
        });
    })
  }

  roundLevelBoxCorners(): void {
    setTimeout(() => {
      let element = <HTMLElement>document.querySelector(".level-box.bg-success");
      if (element) {
        element.style.borderTopLeftRadius = '10px';
        element.style.borderTopRightRadius = '10px';
      }
    })
  }

  stopBlinking(): void {
    setTimeout(() => {
      let element = document.querySelector(".bg-correct, .bg-incorrect-selected");
      if (element) {
        element.classList.remove("bg-incorrect-selected");
        element.classList.add("bg-correct");
      }
    });
  }

  updateFontSize(): void {
    setTimeout(() => {
      Array.from(document.querySelectorAll(".answer, .question"))
        .forEach(function(element) {
          (<HTMLElement>element).style.fontSize = '20px';
        });
      this.resizeFont(document.getElementsByClassName("answer"), 80);
      this.resizeFont(document.getElementsByClassName("question"), 90);
    });
  }
}
