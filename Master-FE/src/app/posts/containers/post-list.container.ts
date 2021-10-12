import { Component } from "@angular/core";

import { PostService } from "../post.service";
import { ActivatedRoute } from "@angular/router";
import { Post } from "../post.model";

@Component({
  template: `
    <app-post-list *ngIf="selectedPost" [post]="selectedPost"></app-post-list>
  `,
})
export class PostListContainer {
  selectedPost: Post;

  constructor(public postService: PostService, public route: ActivatedRoute) {
    this.route.params.subscribe((val) => {
      if (this.postService.getLocalPosts?.length) {
        
        this.selectedPost = this.postService.getLocalPosts.find(
          (item) => item.id === val.postId
        );
        
        this.postService.selectedPost.next(this.selectedPost);
      }
    });
  }
}
