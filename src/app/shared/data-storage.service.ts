import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {RecipeService} from "../recepies/recipe.service";
import {Recipe} from "../recepies/recipe.model";

import {exhaustMap, map, take, tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {AuthService} from "../auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    private readonly firebaseUrl = 'https://udemy-angular-dd532.firebaseio.com/recipes.json';

    constructor(private http: HttpClient,
                private recipeService: RecipeService,
                private authService: AuthService) {
    }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        // put - bulk post for ALL items, overriding existing
        this.http.put(this.firebaseUrl, recipes).subscribe(response => {
            console.log(response);
        });
    }

    fetchRecipes(): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(this.firebaseUrl).pipe(
            // not item by item, but the whole array
            map(recipes => {
                return recipes.map(recipe => {
                    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
                })
            }),
            tap(recipes => {
                this.recipeService.setRecipes(recipes);
            }))
    }

    fetchRecipesOldVersion(): Observable<Recipe[]> {
        return this.authService.userSubject.pipe(
            // take() - gets only 1 value from Observable and automatically unsubscribes
            // just for case here, where I only want to get uer once, but not to be listening all the time to it
            // we take out the user and pass it to next Observable
            take(1),
            // commonly, if you have 2 Observables, the inner one can't be returned from outer
            // exhaustMap() - waits for 1-st Obs to complete. Result (user) - will be passed to next one
            // the observable, returned from exhaustMap() will be the returned result of whole chain
            exhaustMap(user => {
                // OR to pass data check:
                // this.recipeService.setRecipes(recipes as Recipe[]);
                return this.http.get<Recipe[]>(this.firebaseUrl, {
                    // For Firebase we set params. For other DBs, we could set auth in header req
                    params: new HttpParams().set('auth', user.token)
                })
            }),
            // not item by item, but the whole array
            map(recipes => {
                return recipes.map(recipe => {
                    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
                })
            }),
            tap(recipes => {
                this.recipeService.setRecipes(recipes);
            }))
    }
}

