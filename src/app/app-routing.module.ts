import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

const appRoutes: Routes = [
    {path: '', redirectTo: 'recipes', pathMatch: 'full'},
    // lazy loading - only then load all component bundles when user visits it
    // OLD APPROACH
    // #RecipesModule - class name in the provided path
    // {path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'},
    {
        path: 'recipes',
        loadChildren: () => import('./recepies/recipes.module').then(loadedModule => loadedModule.RecipesModule)
    },
    {
        path: 'shopping-list',
        loadChildren: () => import('./shopping-list/shopping-list.module').then(loadedModule => loadedModule.ShoppingListModule)
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(loadedModule => loadedModule.AuthModule)
    },
    {path: '**', redirectTo: 'recipes'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled' })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
