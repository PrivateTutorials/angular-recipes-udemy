import {Component, OnInit} from '@angular/core';

@Component({
    // selector: '[app-servers]', // change html selector to attribute selector. <div app-servers>
    // selector: '.app-servers', // change html selector to class selector. <div class="app-servers">
    selector: 'app-servers',
    /*  template: `
          <app-server></app-server>
          <app-server></app-server>`,*/
    templateUrl: './servers.component.html',
    styleUrls: ['./servers.component.css']
    // styles: [h3{..}] - an array, may be multiple styles
})
export class ServersComponent implements OnInit {
    disableAddServerButton = false;
    serverCreationStatus = 'No server was created yet';
    serverName = '';
    serverCreated = false;
    serversList = ['Test Server', 'Server 2']

    constructor() {
        setInterval(() => {
            this.disableAddServerButton = !this.disableAddServerButton;
        }, 2000)
    }

    ngOnInit(): void {
    }

    onCreateServer() {
        this.serverCreationStatus = 'Server was created. Name is: ' + this.serverName;
        this.serversList.push(this.serverName);
        this.serverCreated = true;
    }

    onUpdateServerName(event: Event) {
        this.serverName = (<HTMLInputElement>event.target).value;
    }
}
