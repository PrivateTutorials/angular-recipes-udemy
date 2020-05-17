import {Component, OnInit} from '@angular/core';
import {ServersServic} from './servers.servic';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-servers',
    templateUrl: './servers.componen.html',
    styleUrls: ['./servers.componen.css']
})
export class ServersComponen implements OnInit {
    public servers: { id: number, name: string, status: string }[] = [];

    constructor(private serversService: ServersServic,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.servers = this.serversService.getServers();
    }

    onReload() {
       // this.router.navigate(['servers'], {relativeTo: this.route});
    }

}
