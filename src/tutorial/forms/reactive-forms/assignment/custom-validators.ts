import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';

export class CustomValidators {
    private static forbiddenProjectNames = ['Test'];

    static forbiddenNames(control: FormControl): { [key: string]: boolean } {
        // f() was binded, because it's triggered by Angular Validation and 'this' below has incorrect context
        if (CustomValidators.forbiddenProjectNames.includes(control.value)) {
            return {'nameIsForbidden': true};
        }
        return null; // for successful validation you must return 'null', not 'false'
    }

    static forbiddenAsyncNames(control: FormControl): Promise<any> | Observable<any> {
        return new Promise<any>((resolve, reject) => {
            setTimeout(() => {
                if (CustomValidators.forbiddenProjectNames.includes(control.value)) {
                    resolve({'nameIsForbidden': true});
                } else {
                    resolve(null);
                }
            }, 1000); // while waiting, adds class: ng-pending
        });
    }
}

