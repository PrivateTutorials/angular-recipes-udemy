import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'sortCustomPipe',
    pure: false
})
export class SortPip implements PipeTransform {

    transform(value: any, propName: string): any {
        return value.sort((a, b) => {
            if (a[propName] > b[propName]) {
                return 1;
            } else {
                return -1;
            }
        });
    }
}
