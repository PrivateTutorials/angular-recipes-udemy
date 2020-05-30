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
export class ShoppingEditComponent implements OnInit, OnDestroy {
    // @ViewChild('name') nameElement: ElementRef; in html: #nameElement
    // in addMethod: this.nameElement.nativeElement.value

    @ViewChild('addIngredientForm', {static: false}) ingredientForm: NgForm;

    subscription: Subscription;
    editMode = false;
    // editedItemIndex: number;
    editedItem: Ingredient;

    constructor(private shoppingListService: ShoppingListService,
                /*         private store: Store<{
                             shoppingList: {// shoppingList - as declared in app.module
                                 ingredients: Ingredient[] // as indicated in shopping-list reducer
                             }}>*/
                private store: Store<fromShoppingList.AppState>
    ) {
    }

    ngOnInit(): void {
        this.subscription = this.store.select('shoppingList').subscribe(stateData => {
            if (stateData.editedIngredientIndex > -1) {
                this.editMode = true;
                this.editedItem = stateData.editedIngredient;

                this.ingredientForm.setValue({
                    name: this.editedItem.name,
                    amount: this.editedItem.amount
                })
            } else {
                this.editMode = false;
            }
        })

        /*this.subscription = this.shoppingListService.startedEditing.subscribe((itemIndex: number) => {
            this.editedItemIndex = itemIndex;
            this.editMode = true;
            this.editedItem = this.shoppingListService.getIngredient(itemIndex);
            this.ingredientForm.setValue({
                name: this.editedItem.name,
                amount: this.editedItem.amount
            })
        });*/
    }

    onSubmit(form: NgForm) {
        const value = form.value;
        const ingredient = new Ingredient(value.name, value.amount);
        if (this.editMode) {
            // this.shoppingListService.updateIngredient(this.editedItemIndex, ingredient);
            this.store.dispatch(new ShoppingListActions.UpdateIngredient(ingredient));
        } else {
            this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
            // before ngRx
            //  this.shoppingListService.addIngredient(ingredient);
        }
        this.editMode = false;
        form.reset();
    }

    onDelete() {
        // before ngRx
        // this.shoppingListService.deleteIngredient(this.editedItemIndex);
        this.store.dispatch(new ShoppingListActions.DeleteIngredient())
        this.onClear();
    }

    onClear() {
        this.ingredientForm.reset();
        this.editMode = false;
        this.store.dispatch(new ShoppingListActions.StopEdit());
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.store.dispatch(new ShoppingListActions.StopEdit());
    }
}
