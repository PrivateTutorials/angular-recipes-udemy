import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthServic} from '../auth.servic';

@Component({
    selector: 'app-home',
    templateUrl: './home.componen.html',
    styleUrls: ['./home.componen.css']
})
export class HomeComponen implements OnInit {

    constructor(private router: Router, private authService: AuthServic) {
    }

    ngOnInit() {
    }

    onLoadServers() {
        // some business logic and then
        this.router.navigate(['/servers']);
    }

    onLoadServer(serverId: number) {
        this.router.navigate(['/servers', serverId, 'edit'], {
            queryParams: {allowEdit: '1'},
            fragment: 'loading'
        });
    }

    onLogin() {
        this.authService.login();
    }

    onLogout() {
        this.authService.logout();
    }

}
