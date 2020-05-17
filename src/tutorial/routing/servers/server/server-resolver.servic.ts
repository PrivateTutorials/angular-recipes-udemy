import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ServersServic} from '../servers.servic';
import {Injectable} from '@angular/core';

interface Server {
    id: number;
    name: string;
    status: string;
}

// resolves server object
@Injectable()
export class ServerResolverServic implements Resolve<Server> {
    constructor(private serversService: ServersServic) {
    }
    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<Server> | Promise<Server> | Server {
        return this.serversService.getServer(+route.params['id']);
    }

}
