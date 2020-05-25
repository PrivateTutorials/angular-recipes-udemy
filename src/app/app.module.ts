import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {RecipesComponent} from './recepies/recipes.component';
import {RecipeListComponent} from './recepies/recipe-list/recipe-list.component';
import {RecipeDetailComponent} from './recepies/recipe-detail/recipe-detail.component';
import {RecipeItemComponent} from './recepies/recipe-list/recipe-item/recipe-item.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {ShoppingEditComponent} from './shopping-list/shopping-edit/shopping-edit.component';
import {DropdownDirective} from "./shared/dropdown-directive";
import {RecipeService} from "./recepies/recipe.service";
import {AppRoutingModule} from "./app-routing.module";
import {RecipeStartComponent} from './recepies/recipe-start/recipe-start.component';
import {RecipeEditComponent} from './recepies/recipe-edit/recipe-edit.component';
import {AuthComponent} from './auth/auth.component';
import {LoadingSpinnerComponent} from './shared/loading-spinner/loading-spinner.component';
import {AuthInterceptorService} from "./auth/auth-interceptor.service";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        ShoppingListComponent,
        ShoppingEditComponent,
        DropdownDirective,
        RecipeStartComponent,
        RecipeEditComponent,
        AuthComponent,
        LoadingSpinnerComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [RecipeService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true // allow multiple interceptors
        }],
    bootstrap: [AppComponent] // what Comp you should recognize in index.html file
})
export class AppModule {
}
