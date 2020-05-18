import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

import {RecipesComponent} from "./recepies/recipes.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {RecipeDetailComponent} from "./recepies/recipe-detail/recipe-detail.component";
import {RecipeStartComponent} from "./recepies/recipe-start/recipe-start.component";
import {RecipeEditComponent} from "./recepies/recipe-edit/recipe-edit.component";


const appRoutes: Routes = [
    {path: '', redirectTo: 'recipes', pathMatch: 'full'},
    {
        path: 'recipes', component: RecipesComponent, children: [
            {path: '', component: RecipeStartComponent},
            {path: 'new', component: RecipeEditComponent},
            {path: ':id', component: RecipeDetailComponent},
            {path: ':id/edit', component: RecipeEditComponent},
        ]
    },
    {path: 'shopping-list', component: ShoppingListComponent},
    {path: '**', redirectTo: 'recipes'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
