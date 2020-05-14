import {Ingredient} from "../shared/ingredient.model";
import {EventEmitter, Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class ShoppingListService {
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
        new Ingredient('Bananas', 7),
    ];

    ingredientsChanged = new EventEmitter<Ingredient[]>()

    getIngredients(): Ingredient[] {
        return [...this.ingredients];
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.emit([...this.ingredients])
    }

    addIngredients(ingredients: Ingredient[]) {
        /*ingredients.forEach((ingredient) => {
            this.addIngredient(ingredient);
        })*/
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.emit([...this.ingredients])
    }
}
