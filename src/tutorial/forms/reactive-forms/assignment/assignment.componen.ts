import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from './custom-validators';


@Component({
    selector: 'app-assignment',
    templateUrl: './assignment.componen.html',
    styleUrls: ['./assignment.componen.css']
})
export class AssignmentComponen implements OnInit {
    statuses = ['Stable', 'Critical', 'Finished'];
    projectsForm: FormGroup;

    constructor() {
    }

    ngOnInit() {
        this.projectsForm = new FormGroup({
            projectName: new FormControl(null, [
                    Validators.required,
                    CustomValidators.forbiddenNames
                ],
                CustomValidators.forbiddenAsyncNames),
            email: new FormControl(null, [Validators.required, Validators.email]),
            projectStatus: new FormControl(null),
        });
    }

    onSubmit() {
        console.log(this.projectsForm.value);
    }
}
