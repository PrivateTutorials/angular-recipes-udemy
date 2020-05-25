import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders, HttpParams} from "@angular/common/http";
import {Post} from "./post.model";
import {catchError, map, tap} from "rxjs/operators";
import {throwError} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PostsServic {
    readonly firebaseUrl = 'https://udemy-angular-dd532.firebaseio.com/posts.json';
    // If we subscribe not in component, but in service. Then - after subscribe we use 2-nd argument: error
    // errorSubj = new Subject<string>();
    // subscribe((data)=>{}, error => this.errorSubj.next(error));
    // and in component:
    // this.postService.error.subscribe(err => {}). And make / delete subscription

    constructor(private http: HttpClient) {
    }

    createAndStorePost(postData: Post) {
        // .json - Firebase requirement
        // 'post' will return response body with type: { name: string }
        return this.http.post<{ name: string }>(this.firebaseUrl, postData, {
            // not to send only 'body' from response, but to send whole response Object
            observe: 'response'
        });
        /* .subscribe((responseData) => {
             console.log(responseData);
         })*/
    }

    fetchPosts() {
        // for multiple params:
        let searchParams = new HttpParams();
        searchParams = searchParams.append('print', 'pretty');
        searchParams = searchParams.append('custom', 'key');

        // 'get' will return response body with type: { [key: string]: Post }
        return this.http.get<{ [key: string]: Post }>(this.firebaseUrl, {
            headers: new HttpHeaders({'Custom-header': 'Hello'}),
            // params: new HttpParams().set('print', 'pretty') // for single param
            params: searchParams
        }).pipe(
            // not item by item, but the whole array
            map((responseData) => {
                const postsArray: Post[] = [];
                for (const key in responseData) {
                    if (responseData.hasOwnProperty(key)) {
                        postsArray.push({...responseData[key], id: key});
                    }
                }
                return postsArray;
            }),
            catchError((errorResponse) => {
                // send to analytics or smth else
                return throwError(errorResponse); // yields a new Observable, by wrapping an error
            })
        );
        // I don't subscribe here, thus Observable is returned from f()
    }

    deleteAllPosts() {
        return this.http.delete(this.firebaseUrl, {
            observe: 'events',
            responseType: 'json' // json - default; blob for file
        }).pipe(
            tap(ev => {
                console.log(ev);
                if (ev.type === HttpEventType.Sent) {
                    // ...
                }
                if (ev.type === HttpEventType.Response) {
                    console.log('Body from delete posts Response type: ' + ev.body);
                }
            })
        );
    }
}
