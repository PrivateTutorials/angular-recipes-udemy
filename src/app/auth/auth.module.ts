import {NgModule} from '@angular/core';
import {AuthComponent} from './auth.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule, // to get SpinnerComponent from there
       //  RouterModule.forChild([{path: 'auth', component: AuthComponent}])
        RouterModule.forChild([{path: '', component: AuthComponent}])
    ],
})
export class AuthModule {

}
