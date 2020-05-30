import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {throwError} from "rxjs";
import {User} from "./user.model";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment"; // Ang CLI will swap both: dev and prod files, regarding on build type

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // BehaviorSubject - gives access to the last previously stored data, before you have subscribed to it
    userSubject = new BehaviorSubject<User>(null); // null - a starting value
    // private readonly apiKey = 'AIzaSyBkZQWSjdvQ7znRts529C_xmFoOEZRFbYg';
    tokenExpirationTimer: any; // Timer

    // If I want to use other services here, then @Injectable decorator has to be added to class - user
    constructor(private http: HttpClient,
                private router: Router) {
    }

    signup(email: string, password: string): Observable<any> {
        return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`, {
            email,
            password,
            returnSecureToken: true
        }).pipe(
            // catchError(errorResponse => {...})
            catchError(this.handleError),
            tap(responseData => {
                this.handleAuthentication(
                    responseData.email,
                    responseData.localId,
                    responseData.idToken,
                    +responseData.expiresIn)
            })
        );
    }

    login(email: string, password: string): Observable<any> {
        return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`, {
            email,
            password,
            returnSecureToken: true
        }).pipe(
            catchError(this.handleError),
            tap(responseData => {
                this.handleAuthentication(
                    responseData.email,
                    responseData.localId,
                    responseData.idToken,
                    +responseData.expiresIn)
            })
        );
    }

    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }
        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );

        // getter - checks token expiration inside
        if (loadedUser.token) {
            this.userSubject.next(loadedUser);
            // get Time - converts Date to milliseconds
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    logout() {
        this.userSubject.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
    }

    autoLogout(expirationDuration: number) {
        // if I used arrow f(), then I could use 'this.logout', not binding
        this.tokenExpirationTimer = setTimeout(this.logout.bind(this), expirationDuration)
    }

    private handleAuthentication(email: string, userID: string, token: string, expiresIn: number) {
        // new Date().getTime(); // current time in MS
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

        const user = new User(email, userID, token, expirationDate)
        this.userSubject.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';

        if (!errorResponse.error || !errorResponse.error.error) {
            // will return an Observable that wraps the message
            return throwError(errorMessage);
        }
        switch (errorResponse.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email already exists';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'The password is not correct';
                break;
        }

        return throwError(errorMessage);
    }
}
