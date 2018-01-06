import { Injectable } from '@angular/core';
declare var $: any;
declare var MathJax: any;

@Injectable()
export class GameUiService {

  constructor() { }

  blink(): void {
    setTimeout(() => {
      $(".bg-correct, .bg-incorrect-selected").toggleClass("bg-correct bg-incorrect-selected");
    });
  }

  disableHover(): void {
    setTimeout(() => {
      $(".bg-incorrect-unselected, .bg-incorrect-selected").addClass("disable-hover");
    });
  }

  enableHover(): void {
    setTimeout(() => {
      $(".bg-incorrect-unselected, .bg-incorrect-selected").removeClass("disable-hover");
    });
  }

  private resizeFont($element, maxHeight): void {
    while ($element.height() > maxHeight) {
      $element.css('font-size', parseFloat($element.css('font-size')) - 1);
    }
  }

  resetLevelBoxCorners(): void {
    setTimeout(() => {
      $(".level-box").css({
        'border-top-left-radius': '',
        'border-top-right-radius': ''
      });
    })
  }

  roundLevelBoxCorners(): void {
    setTimeout(() => {
      $(".level-box.bg-success").first().css({
        'border-top-left-radius': '10px',
        'border-top-right-radius': '10px'
      });
    })
  }

  stopBlinking(): void {
    setTimeout(() => {
      $(".bg-incorrect-selected")
        .removeClass("bg-incorrect-selected")
        .addClass("bg-correct");
    });
  }

  updateFontSize(): void {
    setTimeout(() => {
      $(".answer, .question").css('font-size', 20);
      this.resizeFont($(".answer"), 80);
      this.resizeFont($(".question"), 90);
    });
  }

  updateMathInLeftContainer(): void {
    setTimeout(() => {
      MathJax.Hub.Queue(["Typeset", MathJax.Hub, $("div.left-container")[0]])
    });
  }
}
