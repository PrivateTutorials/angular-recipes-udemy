import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponen} from './home/home.componen';
import {ServersComponen} from './servers/servers.componen';
import {ServerComponen} from './servers/server/server.componen';
import {EditServerComponen} from './servers/edit-server/edit-server.componen';
import {UsersComponent} from './users/users.component';
import {UserComponent} from './users/user/user.component';
import {PaneNotFoundComponen} from './pane-not-found/pane-not-found.componen';
import {AuthGuardServic} from './auth-guard.servic';
import {CanDeactivateGuardServic} from './servers/edit-server/can-deactivate-guard.servic';
import {ErrorPageComponen} from './error-page/error-page.componen';
import {ServerResolverServic} from './servers/server/server-resolver.servic';

const appRoutes: Routes = [
    {path: '', component: HomeComponen},
    /* { path: '', redirectTo: '/somewhere-else', pathMatch: 'full' }*/
    {

        path: 'servers',
        // all the routes will be accessible if canActivate() method in AuthGuardServic will return "true"
        // canActivate: [AuthGuardServic],
        // Now only children are protected, not parent 'servers' path
        canActivateChild: [AuthGuardServic],
        component: ServersComponen,
        children: [
            // server - custom name of property for resolver. Data is stored in server property
            {path: ':id', component: ServerComponen, resolve: {server: ServerResolverServic}},
            {path: ':id/edit', component: EditServerComponen, canDeactivate: [CanDeactivateGuardServic]},
        ]
    },
    {
        path: 'users', component: UsersComponent, children: [
            {path: ':id/:name', component: UserComponent}
        ]
    },
    {
        // path: 'not-found', component: PaneNotFoundComponen
        path: 'not-found', component: ErrorPageComponen, data: {
            message: 'Page not found!'
        }
    },
    {
        path: 'smth', redirectTo: '/not-found'
    },
    {
        path: '**', redirectTo: '/not-found'
    }
];

@NgModule({
    imports: [
        // useHash - old technique; # - informs servers to only handle the path before hash (e.g: localhost:4200/)
        // But better to use HTML history approach
        // RouterModule.forRoot(appRoutes, {useHash: true})
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModul {

}
