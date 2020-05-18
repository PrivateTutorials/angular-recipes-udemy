import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Subscription, Observable, Observer} from 'rxjs';
import {map, filter} from 'rxjs/operators';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
    private firstObservableSubscription: Subscription;

    constructor() {
    }

    ngOnInit() {
        // every second new event will be emitted that gives us an observable with number value
        // subscribe returns a subscription
        // observables provided by Angular are managed by it and we don't need to unsubscribe from them
        /*this.firstObservableSubscription = interval(1000).subscribe((count) => {
            console.log(count);
        });*/

        const customIntervalObservable = new Observable((observer) => {
            let count = 0;
            setInterval(() => {
                // sends to observer data
                observer.next(count);
                if (count === 2) {
                    observer.complete();
                }
                if (count > 3) {
                    observer.error(new Error('Count is greater than 3'));
                }
                count++;
            }, 1000);
        });

        // pipe doesn't change data inside observable. Thus, pipe has to be used just before subscription
        /*customIntervalObservable.pipe(
            // the initial raw data, emitted by Observable
            map((data: number) => {
                return 'Round: ' + (data + 1);
            })
        );*/

        this.firstObservableSubscription = customIntervalObservable.pipe(
            // the initial raw data, emitted by Observable
            filter((data) => {
                return data > 0;
            }),
            map((data: number) => {
                return 'Round: ' + (data + 1);
            })
        ).subscribe((data) => {
            console.log(data);
        }, (error) => {
            console.log(error);
            // complete f() is not called on error, though Observable is dead and finished
            // error - cancels observable, but not completes it
        }, () => {
            console.log('Observer was completed');
        });

    }

    ngOnDestroy(): void {
        this.firstObservableSubscription.unsubscribe();
    }
}
