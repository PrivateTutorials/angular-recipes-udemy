import {Component, ComponentFactoryResolver, OnDestroy, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AlertComponent} from "../shared/alert/alert.component";
import {PlaceholderDirective} from "../shared/placeholder/placeholder.directive";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {
    // to look for a type. Will get the first occurrence
    @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    private closeSubscription: Subscription;

    constructor(private authService: AuthService,
                private router: Router,
                private componentFactoryResolver: ComponentFactoryResolver) {
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;

        let auth$: Observable<AuthResponseData>

        this.isLoading = true;
        if (this.isLoginMode) {
            auth$ = this.authService.login(email, password);
        } else {
            auth$ = this.authService.signup(email, password);
        }

        auth$.subscribe(responseData => {
            console.log(responseData);
            this.isLoading = false;
            this.router.navigate(['/recipes']);
        }, errorMessage => {
            //TODO to check why on the first time we have incorrect (default) result
            this.error = errorMessage;
            this.showErrorAlert(errorMessage);
            this.isLoading = false;
        })

        form.reset();
    }

    onHandleError() {
        this.error = null;
    }

    private showErrorAlert(message: string) {
        // You can't create components by yourself. Angular has to do it. Below code won't work
        // const alert = new AlertComponent();

        const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef; // viewContainerRef - in directive constructor
        hostViewContainerRef.clear();

        const alertComponentRef = hostViewContainerRef.createComponent(alertComponentFactory);

        // .instance - access to the concrete component
        // Instance has properties, added to the component (e.g. 'message' and 'closeEventEmitter')
        alertComponentRef.instance.message = message;
        this.closeSubscription = alertComponentRef.instance.closeEventEmitter.subscribe(() => {
            this.closeSubscription.unsubscribe();
            hostViewContainerRef.clear();
        })
    }

    ngOnDestroy(): void {
        if (this.closeSubscription) {
            this.closeSubscription.unsubscribe();
        }
    }
}
