import {EventEmitter, Injectable} from "@angular/core";
import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {

    constructor(private shoppingListService: ShoppingListService) {
    }

    private recipes: Recipe[] = [
        new Recipe('Omelette',
            'This is a simple test description',
            'https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/cheeseomelette_80621_16x9.jpg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('Egg', 4
                )]
        ),
        new Recipe('Coffee',
            'This is a simple test description',
            'https://see.news/wp-content/uploads/2019/06/istock-157528129.jpg',
            [
                new Ingredient('Water', 2),
                new Ingredient('Sugar', 1)
            ])
    ];

    recipeSelected = new EventEmitter<Recipe>();

    getRecipes(): Recipe[] {
        return [...this.recipes];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.shoppingListService.addIngredients(ingredients);
    }
}
