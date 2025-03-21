import {Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';
import {Store} from '@ngrx/store';
import * as ShoppingListActions from './../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer'; // fromShoppingList - convention
import * as fromApp from '../global-store/app.reducer'

@Injectable()
export class RecipeService {

    /* private recipes: Recipe[] = [
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
     ];*/

    private recipes: Recipe[] = [];
    recipesChanged = new Subject<Recipe[]>();

    constructor(private shoppingListService: ShoppingListService,
                private store: Store<fromApp.AppState>) {
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next([...this.recipes]);
    }

    getRecipes(): Recipe[] {
        return [...this.recipes];
    }

    getRecipe(index: number): Recipe {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        // before ngRx
        // this.shoppingListService.addIngredients(ingredients);
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next([...this.recipes]);
    }

    updateRecipe(index: number, updatedRecipe: Recipe) {
        this.recipes[index] = updatedRecipe;
        this.recipesChanged.next([...this.recipes]);
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next([...this.recipes]);
    }
}
