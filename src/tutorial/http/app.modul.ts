import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppComponen} from './app.componen';
import {AuthInterceptorServic} from "./auth-interceptor.servic";
import {LoginInterceptorServic} from "./login-interceptor.servic";

@NgModule({
    declarations: [AppComponen],
    imports: [BrowserModule, FormsModule, HttpClientModule],
    // Order of interceptors is matters
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorServic,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoginInterceptorServic,
            multi: true
        }
    ],
    bootstrap: [AppComponen]
})
export class AppModul {
}
