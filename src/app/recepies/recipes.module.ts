import {NgModule} from "@angular/core";
import {RecipesComponent} from "./recipes.component";

import {RecipeListComponent} from "./recipe-list/recipe-list.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {RecipeItemComponent} from "./recipe-list/recipe-item/recipe-item.component";
import {RecipeStartComponent} from "./recipe-start/recipe-start.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RecipesRoutingModule} from "./recipes-routing.module";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent,
    ],
    imports: [
        RecipesRoutingModule,
        ReactiveFormsModule,
        SharedModule // we have CommonModule exported from there
        // CommonModule // to enable directives: e.g. *ngIf; instead of BrowserModule, that has to be declared only once in app.module
    ],
    // these Components will be used not only in Recipes module, but on all other modules, that import this module
    exports:[
        // no reasons to export all Recipes components because we both: 1) use them internally and app.module doesn't need them
        // 1) we import routing module here, that also uses them
    ]
})
export class RecipesModule {

}
