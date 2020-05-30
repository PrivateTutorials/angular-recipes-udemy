import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {AppRoutingModule} from "./app-routing.module";
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core.module";
import {shoppingListReducer} from "./shopping-list/store/shopping-list.reducer";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
    ],
    // RecipesModule, AuthModule and ShoppingListModule are not added because of lazy loading
    imports: [
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        HttpClientModule,
        SharedModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({ // we tell ngRx where to look for reducers
            shoppingList: shoppingListReducer
        }),
        CoreModule,
        AppRoutingModule, // last, to enable '**' generic not to override other paths in child modules
    ],
    providers: [], // all providers and Interceptors are provided in core.module
    bootstrap: [AppComponent], // what Comp you should recognize in index.html file
})
export class AppModule {
}
