import {
    AfterContentInit,
    AfterViewInit,
    Component, ContentChild,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

@Component({
    selector: 'app-server-element',
    templateUrl: './server-element.component.html',
    styleUrls: ['./server-element.component.css'],
    // encapsulation: ViewEncapsulation.None
})
export class ServerElementComponent implements OnInit, OnChanges, AfterViewInit, AfterContentInit {
    @Input('elementAlias')
    element: {
        type: string,
        name: string,
        content: string,
    };
    @ViewChild('heading', {static: true}) header: ElementRef;
    // contentParagraph - will look for elementRef in parent component template (app.component.html)
    @ContentChild('contentParagraph', {static: true}) paragraph: ElementRef;

    constructor() {
        console.log('Constructor called');
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log('ngOnChanges called');
        console.log(changes); // element, because hook only reflects to @Input elements
    }

    ngOnInit(): void {
        console.log('ngOnInit called');
        console.log('Text content: ' + this.header.nativeElement.textContent);
    }

    ngAfterContentInit(): void {
        console.log('AfterContentInit called');
        console.log('Text content: ' + this.header.nativeElement.textContent);
        console.log('Paragraph content: ' + this.paragraph.nativeElement.textContent);
    }

    ngAfterViewInit(): void {
        console.log('AfterViewInit called');
        console.log('Text content: ' + this.header.nativeElement.textContent);
        console.log('Paragraph content: ' + this.paragraph.nativeElement.textContent);
    }
}
