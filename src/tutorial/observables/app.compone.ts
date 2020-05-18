import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserServi} from './user.servi';
import {Subscription} from "rxjs";

@Component({
    selector: 'app-root',
    templateUrl: './app.compone.html',
    styleUrls: ['./app.compone.css']
})
export class AppCompone implements OnInit, OnDestroy {
    userActivated = false;
    private activeatedSubscriuption: Subscription;

    constructor(private userService: UserServi) {
    }

    ngOnInit() {
        this.activeatedSubscriuption = this.userService.activatedEmitterSubject.subscribe((result: boolean) => {
            this.userActivated = result;
        });
    }

    ngOnDestroy(): void {
        this.activeatedSubscriuption.unsubscribe();
    }
}
