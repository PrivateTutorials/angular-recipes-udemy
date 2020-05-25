import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

import {RecipesComponent} from "./recepies/recipes.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {RecipeDetailComponent} from "./recepies/recipe-detail/recipe-detail.component";
import {RecipeStartComponent} from "./recepies/recipe-start/recipe-start.component";
import {RecipeEditComponent} from "./recepies/recipe-edit/recipe-edit.component";
import {RecipesResolverService} from "./recepies/recipes-resolver.service";
import {AuthComponent} from "./auth/auth.component";
import {AuthGuard} from "./auth/auth-guard";


const appRoutes: Routes = [
    {path: '', redirectTo: 'recipes', pathMatch: 'full'},
    {
        path: 'recipes', component: RecipesComponent,
        canActivate: [AuthGuard], // protect url from not logged user
        children: [
            {path: '', component: RecipeStartComponent},
            {path: 'new', component: RecipeEditComponent},
            // will load component when resolve() f() will get some data
            {path: ':id', resolve: [RecipesResolverService], component: RecipeDetailComponent},
            {path: ':id/edit', resolve: [RecipesResolverService], component: RecipeEditComponent},
        ]
    },
    {path: 'shopping-list', component: ShoppingListComponent},
    {path: 'auth', component: AuthComponent},
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
