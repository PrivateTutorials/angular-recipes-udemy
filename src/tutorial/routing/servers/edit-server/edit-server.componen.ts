import {Component, OnInit} from '@angular/core';

import {ServersServic} from '../servers.servic';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CanComponentDeactivate} from './can-deactivate-guard.servic';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-edit-server',
    templateUrl: './edit-server.componen.html',
    styleUrls: ['./edit-server.componen.css']
})
export class EditServerComponen implements OnInit, CanComponentDeactivate {
    server: { id: number, name: string, status: string };
    serverName = '';
    serverStatus = '';
    allowEdit = false;
    changesSaved = false;

    constructor(private serversService: ServersServic,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        // console.log(this.route.snapshot.queryParams);
        // console.log(this.route.snapshot.fragment);
        this.route.queryParams.subscribe((queryParams: Params) => {
            this.allowEdit = queryParams['allowEdit'] === '1';
        });
        this.route.fragment.subscribe();
        const id = +this.route.snapshot.params['id'];
        this.server = this.serversService.getServer(+id);
        this.serverName = this.server.name;
        this.serverStatus = this.server.status;
    }

    onUpdateServer() {
        this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
        this.changesSaved = true;
        this.router.navigate(['../'], {relativeTo: this.route});
    }

    canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.allowEdit) {
            return true;
        }
        if ((this.serverName !== this.server.name ||
            this.serverStatus !== this.server.status) && !this.changesSaved) {
            return confirm('Do you want to discard the changes?');
        } else {
            // either nothing was changed, or changes were saved
            return true;
        }
    }
}
