import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.componen.html',
    styleUrls: ['./app.componen.css']
})
export class AppComponen {
    servers = [
        {
            instanceType: 'medium',
            name: 'Production',
            status: 'stable',
            started: new Date(2015, 1, 25)
        },
        {
            instanceType: 'large',
            name: 'User Database',
            status: 'stable',
            started: new Date(2017, 1, 21)
        },
        {
            instanceType: 'small',
            name: 'Development Server',
            status: 'offline',
            started: new Date(2015, 1, 21)
        },
        {
            instanceType: 'small',
            name: 'Testing Environment Server',
            status: 'stable',
            started: new Date(2012, 1, 30)
        }
    ];
    filteredStatus = '';
    appStatus = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('stable')
        }, 2000)
    })

    getStatusClasses(status: string) {
        return {
            'list-group-item-success': status === 'stable',
            'list-group-item-warning': status === 'offline',
            'list-group-item-danger': status === 'critical'
        };
    }

    onAddServer() {
        this.servers.push({
            instanceType: 'small',
            name: 'New Server',
            status: 'stable',
            started: new Date(2015, 1, 25)
        })
    }
}
