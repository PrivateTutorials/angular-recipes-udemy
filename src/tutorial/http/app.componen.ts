import {Component, OnInit} from '@angular/core';
import {Post} from "./post.model";
import {PostsServic} from "./posts.servic";

@Component({
    selector: 'app-root',
    templateUrl: './app.componen.html',
    styleUrls: ['./app.componen.css']
})
export class AppComponen implements OnInit {
    loadedPosts = [];
    isLoading = false;
    error = null;


    constructor(private postsService: PostsServic) {
    }

    ngOnInit() {
        this.fetchPosts();
    }

    onCreatePost(postData: Post) {
        this.postsService.createAndStorePost(postData).subscribe((responseData) => {
            // Firebase returns only Object ID in response body
            this.fetchPosts();
        })
    }

    onFetchPosts() {
        this.fetchPosts();
    }

    onClearPosts() {
        this.postsService.deleteAllPosts().subscribe(() => {
            this.loadedPosts = [];
        });
    }

    private fetchPosts() {
        this.isLoading = true;
        this.postsService.fetchPosts().subscribe((posts) => {
            this.isLoading = false;
            this.loadedPosts = posts;
        }, error => {
            this.isLoading = false;
            this.error = error;
        })
    }

    catchError() {
        this.error = null;
    }
}
