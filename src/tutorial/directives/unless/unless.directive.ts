import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
    selector: '[appUnless]'
})
export class UnlessDirective {
    @Input() set appUnless(condition: boolean) { // method is executed every time property is changes outside
        if (!condition) {
            this.viewContainerRef.createEmbeddedView(this.templateRef); // creates a view in this container
        } else {
            this.viewContainerRef.clear(); // remove everything from this place in DOM
        }
    }

    constructor(private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) { // template - what; vc - where
    }

}
