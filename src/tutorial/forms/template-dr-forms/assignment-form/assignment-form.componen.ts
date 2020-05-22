import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-assignment-form',
    templateUrl: './assignment-form.componen.html',
    styleUrls: ['./assignment-form.componen.css']
})
export class AssignmentFormComponen implements OnInit {
    @ViewChild('assignmentForm', {static: false}) signUpForm: NgForm;

    defaultSubscriptionOption = 'Advanced';
    subscriptions = ['Basic', 'Advanced', 'Pro'];

    constructor() {
    }

    ngOnInit() {
    }

    onSubmit() {
        console.log(this.signUpForm.value);
    }

}
