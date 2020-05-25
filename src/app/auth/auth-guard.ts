import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {map, take, tap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService,
                private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.authService.userSubject.pipe(
            // we take the latest user value only once and then unsubscribe from userSubject
            take(1),
            map(user => {
                // if user exists
                const isAuth = !!user;
                if (isAuth) {
                    return true;
                }
                // new approach for redirection, if map() f() will return false
                return this.router.createUrlTree(['/auth']);
            }),
            // old approach for redirection, if map() f() will return false
            // isAuth - result of map() f()
            /*tap(isAuth => {
                if (!isAuth) {
                    this.router.navigate(['/auth']);
                }
            })*/
        )
    }

}
