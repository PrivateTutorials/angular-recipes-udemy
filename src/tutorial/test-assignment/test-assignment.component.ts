import {Component} from '@angular/core';

@Component({
    selector: 'app-test-assignment',
    templateUrl: './test-assignment.component.html',
    styleUrls: ['./test-assignment.component.css']
})
export class TestAssignmentComponent {
    userName = 'Igor';
    isParagraphDisplayed = false;
    numberOfParagraphs = [];

    onUserReset(event: Event) {
        this.userName = '';
    }

    onToggleDetails() {
        this.isParagraphDisplayed = !this.isParagraphDisplayed;
        // this.numberOfParagraphs.push(this.numberOfParagraphs.length + 1);
        this.numberOfParagraphs.push(new Date());
    }
}
