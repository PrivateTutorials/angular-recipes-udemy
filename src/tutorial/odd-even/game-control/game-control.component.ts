import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TimeInterval} from "rxjs";

@Component({
    selector: 'app-game-control',
    templateUrl: './game-control.component.html',
    styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
    @Output() intervalFiredEvent = new EventEmitter<number>();
    interval;
    lastNumber = 0;

    constructor() {
    }

    ngOnInit(): void {
    }

    onStart() {
        this.interval = setInterval(this.increment.bind(this), 1000)
    }

    onEnd() {
        clearInterval(this.interval);
    }

    increment(){
      this.intervalFiredEvent.emit(this.lastNumber + 1);
      this.lastNumber++;
    }
}
