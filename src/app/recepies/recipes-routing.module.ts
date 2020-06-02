import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipesComponent} from './recipes.component';
import {AuthGuard} from '../auth/auth-guard';
import {RecipeStartComponent} from './recipe-start/recipe-start.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {RecipesResolverService} from './recipes-resolver.service';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';

const routes: Routes = [
    {
        // path: 'recipes', component: RecipesComponent, // was removed because of lazy loading
        path: '', // important to have empty path for lazy loading
        component: RecipesComponent,
        canActivate: [AuthGuard], // protect url from not logged user
        children: [
            {path: '', component: RecipeStartComponent},
            {path: 'new', component: RecipeEditComponent},
            // will load component when resolve() f() will get some data
            {path: ':id', resolve: [RecipesResolverService], component: RecipeDetailComponent},
            {path: ':id/edit', resolve: [RecipesResolverService], component: RecipeEditComponent},
        ]
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule {

}
