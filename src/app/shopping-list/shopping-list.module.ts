import {NgModule} from '@angular/core';
import {ShoppingListComponent} from './shopping-list.component';
import {ShoppingEditComponent} from './shopping-edit/shopping-edit.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports: [
        FormsModule,
        RouterModule.forChild([
           // {path: 'shopping-list', component: ShoppingListComponent} // before lazy loading
            {path: '', component: ShoppingListComponent}
        ]),
        SharedModule
    ],
    exports: []
})
export class ShoppingListModule {

}
