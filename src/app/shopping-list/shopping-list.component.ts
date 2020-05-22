import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    ingredients: Ingredient[];
    private ingredientChangeSubscription: Subscription;

    constructor(private shoppingListService: ShoppingListService) {
    }

    ngOnInit(): void {
        // for initial load
        this.ingredients = this.shoppingListService.getIngredients();
        // to listen dynamically for other changes
        this.ingredientChangeSubscription = this.shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
            this.ingredients = ingredients;
        })
    }

    ngOnDestroy(): void {
        this.ingredientChangeSubscription.unsubscribe();
    }

    onEditItem(index: number) {
        this.shoppingListService.startedEditing.next(index);
    }

}
