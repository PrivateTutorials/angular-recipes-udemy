import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {exhaustMap, take} from "rxjs/operators";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService) {
    }

    // will set 'auth' token to all outgoing requests
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authService.userSubject.pipe(
            // take() - gets only 1 value from Observable and automatically unsubscribes
            // just for case here, where I only want to get uer once, but not to be listening all the time to it
            // we take out the user and pass it to next Observable
            take(1),
            // commonly, if you have 2 Observables, the inner one can't be returned from outer
            // exhaustMap() - waits for 1-st Obs to complete. Result (user) - will be passed to next one
            // the observable, returned from exhaustMap() will be the returned result of whole chain
            exhaustMap(user => {
                if (!user) {
                    return next.handle(req);
                }
                const modifiedRequest = req.clone({
                    // For Firebase we set params. For other DBs, we could set auth in header req
                    params: new HttpParams().set('auth', user.token)
                })
                return next.handle(modifiedRequest);
            })
        )
    }
}
