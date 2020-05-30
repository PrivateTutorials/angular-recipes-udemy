import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";

import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {LoggingService} from "../logging.service";
import * as fromShoppingList from './store/shopping-list.reducer'; // fromShoppingList - convention
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    // ingredients: Ingredient[];
    ingredients: Observable<{ ingredients: Ingredient[] }>;
    private ingredientChangeSubscription: Subscription;

    constructor(private shoppingListService: ShoppingListService,
                private loggingService: LoggingService,
                /*  private store: Store<{
                      shoppingList: {// shoppingList - as declared in app.module
                          ingredients: Ingredient[] // as indicated in shopping-list reducer
                      }}>*/
                private store: Store<fromShoppingList.AppState>
    ) {
    }

    ngOnInit(): void {
        this.ingredients = this.store.select('shoppingList');
        // below was used before ngRx
        // for initial load
        // this.ingredients = this.shoppingListService.getIngredients();
        // to listen dynamically for other changes
        /*this.ingredientChangeSubscription = this.shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
            this.ingredients = ingredients;
        });*/

        this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit');
    }

    ngOnDestroy(): void {
        // before ngRx. ngRx clears subscription automatically
        // this.ingredientChangeSubscription.unsubscribe();
    }

    onEditItem(index: number) {
        // this.shoppingListService.startedEditing.next(index);
        this.store.dispatch(new ShoppingListActions.StartEdit(index));
    }

}
