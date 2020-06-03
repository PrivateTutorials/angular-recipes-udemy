import {Component, Input, OnInit} from '@angular/core';

// needs also to be added to  entryComponents: [AlerttComponent] in app.module

// "@angular/elements": "^9.1.9",
// "@webcomponents/custom-elements": "^1.4.1"

@Component({
  selector: 'app-alertt',
  templateUrl: './alertt.component.html',
  styleUrls: ['./alertt.component.css']
})
export class AlerttComponent implements OnInit {
  @Input() message: string;

  constructor() { }

  ngOnInit(): void {
  }

}
