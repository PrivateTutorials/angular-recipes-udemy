import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverseCustomPipe'
})
export class ReversePip implements PipeTransform {

  transform(value: string): any {
    return value.split('').reverse().join('');
  }
}
