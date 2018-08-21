import { Injectable } from '@angular/core';
declare var $: any;

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

  // This method returns the height of the highest matched element.
  // https://stackoverflow.com/a/6061029/8701267
  private getHeight($element): number {
    return Math.max.apply(null, $element.map(function() {
      return $(this).height();
    }).get());
  }

  private resizeFont($element, maxHeight): void {
    let currentHeight = this.getHeight($element);
    while (currentHeight > maxHeight) {
      $element.css('font-size', parseFloat($element.css('font-size')) - 1);
      currentHeight = this.getHeight($element);
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
}
