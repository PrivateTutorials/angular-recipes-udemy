import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer'; // fromShoppingList - convention

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditWithoutNgrxCo implements OnInit, OnDestroy {
    // @ViewChild('name') nameElement: ElementRef; in html: #nameElement
    // in addMethod: this.nameElement.nativeElement.value

    @ViewChild('addIngredientForm', {static: false}) ingredientForm: NgForm;

    subscription: Subscription;
    editMode = false;
    editedItemIndex: number;
    editedItem: Ingredient;

    constructor(private shoppingListService: ShoppingListService) {
    }

    ngOnInit(): void {
        this.subscription = this.shoppingListService.startedEditing.subscribe((itemIndex: number) => {
            this.editedItemIndex = itemIndex;
            this.editMode = true;
            this.editedItem = this.shoppingListService.getIngredient(itemIndex);
            this.ingredientForm.setValue({
                name: this.editedItem.name,
                amount: this.editedItem.amount
            })
        });
    }

    onSubmit(form: NgForm) {
        const value = form.value;
        const ingredient = new Ingredient(value.name, value.amount);
        if (this.editMode) {
            this.shoppingListService.updateIngredient(this.editedItemIndex, ingredient);
        } else {
            this.shoppingListService.addIngredient(ingredient);
        }
        this.editMode = false;
        form.reset();
    }

    onDelete() {
        this.shoppingListService.deleteIngredient(this.editedItemIndex);
        this.onClear();
    }

    onClear() {
        this.ingredientForm.reset();
        this.editMode = false;
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
