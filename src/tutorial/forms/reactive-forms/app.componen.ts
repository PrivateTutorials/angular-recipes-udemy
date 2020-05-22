import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.componen.html',
    styleUrls: ['./app.componen.css']
})
export class AppComponen implements OnInit {
    genders = ['male', 'female'];
    signupForm: FormGroup;
    forbiddenUserNames = ['Chris', 'Anna'];

    ngOnInit(): void {
        this.signupForm = new FormGroup({
            userData: new FormGroup({
                'username': new FormControl(
                    null,
                    [Validators.required, this.forbiddenNames.bind(this)]
                ), // 1-st - initial state; Quatations - to be sure that minifier will parse it OK
                // 3-rd arg - async validators
                email: new FormControl(null, [Validators.required, Validators.email], this.forbiddenAsyncEmails),
            }),
            gender: new FormControl('male'),
            hobbies: new FormArray([]) // holds an array of controls
        });

        // this.signupForm.valueChanges.subscribe: results - valid, invalid, pending
        this.signupForm.valueChanges.subscribe((value) => {
            // will print: this.signupForm.value
            // console.log(value);
        });

        // setsInitial value of form
        this.signupForm.setValue({
            userData: {
                username: 'Igor',
                email: 'tests@com.com'
            },
            gender: 'male',
            hobbies: []
        });

        // update only part of form
        //  this.signupForm.patchValue({
    }

    onSubmit() {
        console.log(this.signupForm);
        this.signupForm.reset();
    }

    onAddHobby() {
        const control = new FormControl(null, Validators.required);
        (<FormArray>this.signupForm.get('hobbies')).push(control);
    }

    getControls() {
        return (<FormArray>this.signupForm.get('hobbies')).controls;
        // return (this.signupForm.get('hobbies') as FormArray).controls;
    }

    // e.g. {nameIfForbidden: true}
    forbiddenNames(control: FormControl): { [key: string]: boolean } {
        // f() was binded, because it's triggered by Angular Validation and 'this' below has incorrect context
        if (this.forbiddenUserNames.includes(control.value)) {
            return {'nameIsForbidden': true};
        }
        return null; // for successful validation you must return 'null', not 'false'
    }

    forbiddenAsyncEmails(control: FormControl): Promise<any> | Observable<any> {
        return new Promise<any>((resolve, reject) => {
            setTimeout(() => {
                if (control.value === 'test@test.com') {
                    resolve({'emailIsForbidden': true});
                } else {
                    resolve(null);
                }
            }, 1000); // while waiting, adds class: ng-pending
        });
    }
}
