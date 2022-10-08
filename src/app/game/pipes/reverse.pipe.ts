import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'reverse'})
export class ReversePipe implements PipeTransform {

  transform<T>(value: T[] | null, skip = 0): T[] {
    if (!value) {
      return [];
    }
    return value.splice(skip).reverse();
  }
}
