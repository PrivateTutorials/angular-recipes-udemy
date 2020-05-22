import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import { RecipesComponent } from './recepies/recipes.component';
import { RecipeListComponent } from './recepies/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recepies/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recepies/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import {DropdownDirective} from "./shared/dropdown-directive";
import {RecipeService} from "./recepies/recipe.service";
import {AppRoutingModule} from "./app-routing.module";
import { RecipeStartComponent } from './recepies/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recepies/recipe-edit/recipe-edit.component';

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
        RecipeEditComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        ReactiveFormsModule
    ],
    providers: [RecipeService],
    bootstrap: [AppComponent] // what Comp you should recognize in index.html file
})
export class AppModule {
}
