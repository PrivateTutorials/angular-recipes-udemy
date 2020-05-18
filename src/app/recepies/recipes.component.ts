import {Component, OnInit} from '@angular/core';
import {RecipeService} from "./recipe.service";

@Component({
  selector: 'app-recepies',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
