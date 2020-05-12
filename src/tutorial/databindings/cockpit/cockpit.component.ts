import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

@Component({
    selector: 'app-cockpit',
    templateUrl: './cockpit.component.html',
    styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
    @Output('bpCreated') blueprintCreated = new EventEmitter<{ blueprintName: string, blueprintContent: string }>();
    @Output() serverCreated = new EventEmitter<{ serverName: string, serverContent: string }>();
    // newServerContent = '';
    @ViewChild('serverContentInput', {static: true}) serverContentInputElement: ElementRef;

    constructor() {
    }

    ngOnInit(): void {
    }

    onAddServer(el: HTMLInputElement) {
        this.serverCreated.emit({
            serverName: el.value,
            serverContent: this.serverContentInputElement.nativeElement.value
        });
    }

    onAddBlueprint(el: HTMLInputElement) {
        this.blueprintCreated.emit({
            blueprintName: el.value,
            blueprintContent: this.serverContentInputElement.nativeElement.value
        });
    }

}
