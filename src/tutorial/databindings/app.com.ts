import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.comp.html',
    styleUrls: ['./app.comp.css']
})
export class AppCom {
    serverElements = [
        {type: 'server', name: 'Test server', content: 'Test description'}];


    onServerAdded(serverData: {serverName: string, serverContent: string}) {
        this.serverElements.push({
          type: 'server',
          name: serverData.serverName,
          content: serverData.serverContent
        });
    }

    onBlueprintAdded(blueprintData: {blueprintName: string, blueprintContent: string}) {
        this.serverElements.push({
          type: 'blueprint',
          name: blueprintData.blueprintName,
          content: blueprintData.blueprintContent
        });
    }
}
