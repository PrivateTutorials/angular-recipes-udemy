import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

// smth like Express MW functions. next() - pass function further
// intercept() code runs just before req goes to BE
// req Obj is immutable. You need to clone it
export class AuthInterceptorServic implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url === 'someRestrictedUrl') {
            return next.handle(req);
        }
        console.log("request is on its way from Auth Interceptor");
        const modifiedRequest = req.clone({headers: req.headers.append('Auth', 'xyz')}); // will also return old header, sp they won't be overwritten
        return next.handle(modifiedRequest);
    }
}
