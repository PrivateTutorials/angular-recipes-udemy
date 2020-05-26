import {Directive, ElementRef, HostBinding, HostListener, Input} from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    @HostBinding('class.open') isOpen = false;

    // The simpler solution doesn't require constructor. Not closes DropDown is you click outside
    /*  @HostListener('click') toggleOpen() {
          this.isOpen = !this.isOpen;
      }*/

    constructor(private elRef: ElementRef) {
    }

    // placing the listener not on the dropdown, but on the document
    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    }
}
