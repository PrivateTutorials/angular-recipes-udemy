import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.componen.html',
    styleUrls: ['./app.componen.css']
})
export class AppComponen {
    // we have access to form before we submit it
    @ViewChild('userForm', {static: false}) signUpForm: NgForm;
    defaultQuestion = 'pet'; // Simple one-way data binding. To set initial value
    answer = ''; // Two-way data binding. To set initial value and display it in <p> afterwards
    genders = ['male', 'female'];
    user = {
        username: '',
        email: '',
        secretQuestion: '',
        answer: '',
        gender: ''
    };
    submitted = false;

    setWholeFormByOneCommand() {
        const suggestedName = 'Superuser';
        // set Value for the whole form
        this.signUpForm.setValue({
            userData: {
                userName: suggestedName,
                email: ''
            },
            secret: 'pet',
            questionAnswer: '',
            gender: 'male'
        });
    }

    suggestUserName() {
        const suggestedName = 'Superuser';
        // override 1 specific control
        this.signUpForm.form.patchValue({
            userData: {
                userName: suggestedName,
            },
        });
    }

    // Note, if you use @ViewChild, then type is: ElementRef
    // If we were passing simple reference, without ="ngForm", then we would have type: HTMLFormElement
    // e.g. <form (ngSubmit)="onSubmit(userForm)" #userForm>
    // onSubmit(form: HTMLFormElement) {

    /*onSubmit(form: NgForm) {
        console.log(form);
    }*/

    onSubmit() {
        this.submitted = true;
        this.user.username = this.signUpForm.value.userData.userName;
        this.user.email = this.signUpForm.value.userData.email;
        this.user.secretQuestion = this.signUpForm.value.secret;
        this.user.answer = this.signUpForm.value.questionAnswer;
        this.user.gender = this.signUpForm.value.gender;
        // resets all classes also: dirty, touched, etc
        this.signUpForm.reset();
    }
}
