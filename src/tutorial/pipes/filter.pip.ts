import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false // to recalculate every time data source changes, or just any change in component
    // needed when you pass an array or object that got the content changed (but is still the same instance)
    // or when the pipe injects a service to get access to other values, Angular doesn't recognize if they have change
})
export class FilterPip implements PipeTransform {

    transform(value: any, filterString: string, propName: string): any {
        // filterString === '' => to give all list at beginning
        if (value.length === 0 || filterString === '') {
            return value;
        }

        return value.filter((item) => {
           // return item.status === filterString;
            return item[propName] === filterString;
        })
    }
}
