import {Component, OnInit} from '@angular/core';

import {ServersServic} from '../servers.servic';
import {ActivatedRoute, Data, Params, Router} from '@angular/router';

@Component({
    selector: 'app-server',
    templateUrl: './server.componen.html',
    styleUrls: ['./server.componen.css']
})
export class ServerComponen implements OnInit {
    server: { id: number, name: string, status: string };

    constructor(private serversService: ServersServic,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInitParamsApproach() {
        const serverId = this.route.snapshot.queryParams['id'];
        this.server = this.serversService.getServer(+serverId);
        this.route.params.subscribe((params: Params) => {
            this.server = this.serversService.getServer(+params['id']);
        });
    }

    ngOnInit() {
        this.route.data.subscribe((data: Data) => {
            this.server = data['server']; // matched name in router property
        });
    }

    onEdit() {
        // instead of writting: navigate(['/servers', this.server.id, '/edit'],
        this.router.navigate(['edit'], {
            relativeTo: this.route,
            queryParamsHandling: 'preserve' // default behavior - old ones are dropped
        });
    }

}
