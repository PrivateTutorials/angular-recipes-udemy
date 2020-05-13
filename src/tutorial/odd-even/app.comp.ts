import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.comp.html',
    styleUrls: ['./app.compone.css']
})
export class AppComp {
    odds: number[] = [];
    evens: number[] = [];

    onIntervalFired(firedNumber: number) {
        if (firedNumber % 2 === 0) {
            this.evens.push(firedNumber)
        } else {
            this.odds.push(firedNumber)
        }
    }
}
