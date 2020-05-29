import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {AppRoutingModule} from "./app-routing.module";
import {ShoppingListModule} from "./shopping-list/shopping-list.module";
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core.module";
import {AuthModule} from "./auth/auth.module";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
    ],
    // RecipesModule, AuthModule and ShoppingListModule are not added because of lazy loading
    imports: [
        BrowserModule,
        HttpClientModule,
        SharedModule,
        CoreModule,
        AppRoutingModule, // last, to enable '**' generic not to override other paths in child modules
    ],
    providers: [], // all providers and Interceptors are provided in core.module
    bootstrap: [AppComponent], // what Comp you should recognize in index.html file
})
export class AppModule {
}
