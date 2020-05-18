import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {UserServi} from "../user.servi";

@Component({
    selector: 'app-user',
    templateUrl: './user.compone.html',
    styleUrls: ['./user.compone.css']
})
export class UserCompone implements OnInit {
    id: number;

    constructor(private route: ActivatedRoute,
                private userService: UserServi) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.id = +params.id;
        });
    }

    onActivate() {
        this.userService.activatedEmitterSubject.next(true);
    }
}
