import {Component, Injector} from '@angular/core';
import {createCustomElement} from '@angular/elements';
import {AlerttComponent} from "./alertt/alertt.component";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class ParentComp {
    content: SafeHtml = null;

    constructor(injector: Injector,
                domSanitizer: DomSanitizer) {
        setTimeout(() => {
            const AlertElement = createCustomElement(AlerttComponent, {
                injector
            });
            customElements.define('my-alert', AlertElement)
            this.content = domSanitizer.bypassSecurityTrustHtml('<my-alert message="Required dynamically"></my-alert>')
        }, 1000)
    }
}
