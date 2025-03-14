import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';

@Component({
    selector: 'app-error-page',
    templateUrl: './error-page.componen.html',
    styleUrls: ['./error-page.componen.css']
})
export class ErrorPageComponen implements OnInit {
    errorMessage: string;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        // this.errorMessage = this.route.snapshot.data['message'];
        // if data may change in future
        this.route.data.subscribe((data: Data) => {
            this.errorMessage = data['message'];
        });
    }
}
