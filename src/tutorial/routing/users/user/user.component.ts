import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
    user: { id: number, name: string };
    paramSubscription: Subscription;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.user = {
            id: this.route.snapshot.params['id'],
            name: this.route.snapshot.params['name']
        };

        this.paramSubscription = this.route.params.subscribe((params: Params) => {
            this.user.id = params['id'];
            this.user.name = params['name'];
        });
    }

    // We don't need to unsubsdcribe manually, because Angular does it by itself
    // But if we override default onDestroy f(), then we need to unsubscribe
    ngOnDestroy(): void {
        this.paramSubscription.unsubscribe();
    }
}
