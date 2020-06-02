import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
    selector: '[appPlaceholder]'
})
export class PlaceholderDirective {
    // gives a pointer to a place where this directive will be used
    constructor(public viewContainerRef: ViewContainerRef) {
    }
}
