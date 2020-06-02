import {Ingredient} from '../shared/ingredient.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ShoppingListService {
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
        new Ingredient('Bananas', 7),
    ];

    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    getIngredients(): Ingredient[] {
        return [...this.ingredients];
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next([...this.ingredients]);
    }

    addIngredients(ingredients: Ingredient[]) {
        /*ingredients.forEach((ingredient) => {
            this.addIngredient(ingredient);
        })*/
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next([...this.ingredients]);
    }

    updateIngredient(index: number, upodatedIngredient: Ingredient) {
        this.ingredients[index] = upodatedIngredient;
        this.ingredientsChanged.next([...this.ingredients]);
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next([...this.ingredients]);
    }
}
