import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { saveAs } from "file-saver";

import { PostService } from "../post.service";
import { Post } from "../post.model";

@Component({
  template: `
    <app-post-list
      *ngIf="selectedPost"
      [post]="selectedPost"
      (onDownload)="onDownload()"
    ></app-post-list>
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

  onDownload() {
    saveAs(this.selectedPost.filePath, "download.yaml");
  }
}
