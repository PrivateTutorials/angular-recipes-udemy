import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponen} from './app.componen';
import {HomeComponen} from './home/home.componen';
import {UsersComponent} from './users/users.component';
import {ServersComponen} from './servers/servers.componen';
import {UserComponent} from './users/user/user.component';
import {EditServerComponen} from './servers/edit-server/edit-server.componen';
import {ServerComponen} from './servers/server/server.componen';
import {ServersServic} from './servers/servers.servic';
import {PaneNotFoundComponen} from './pane-not-found/pane-not-found.componen';
import {AppRoutingModul} from './app-routing.modul';
import {AuthServic} from './auth.servic';
import {AuthGuardServic} from './auth-guard.servic';
import {CanDeactivateGuardServic} from './servers/edit-server/can-deactivate-guard.servic';
import { ErrorPageComponen } from './error-page/error-page.componen';
import {ServerResolverServic} from './servers/server/server-resolver.servic';


@NgModule({
    declarations: [
        AppComponen,
        HomeComponen,
        UsersComponent,
        ServersComponen,
        UserComponent,
        EditServerComponen,
        ServerComponen,
        PaneNotFoundComponen,
        ErrorPageComponen
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModul
    ],
    providers: [ServersServic,
        AuthServic,
        AuthGuardServic,
        CanDeactivateGuardServic,
        ServerResolverServic ],
    bootstrap: [AppComponen]
})
export class AppMod {
}
