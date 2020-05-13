import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.compone.html',
  styleUrls: ['./app.compone.css']
})
export class AppCompone {
  oddNumbers = [1, 3, 5];
  evenNumbers = [2, 4];
  switchValue = 10;
  onlyOdd = false;
}
