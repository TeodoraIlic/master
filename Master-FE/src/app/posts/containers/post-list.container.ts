import { Component, OnInit } from "@angular/core";

import { PostService } from "../post.service";
import { ActivatedRoute } from "@angular/router";
import { combineLatest, concat, forkJoin, merge, Observable, of } from "rxjs";
import { combineAll, filter, map, mergeMap, switchMap } from "rxjs/operators";
@Component({
  template: ` <app-post-list [posts$]="[posts$]"></app-post-list> `,
})
export class PostListContainer {
  posts$;
  constructor(public postService: PostService, public route: ActivatedRoute) {
    this.route.params.subscribe((val) => {
      this.posts$ = this.postService.getPostUpdateListener().pipe(
        map(({ posts, postCount }) => {
          const arr1 = posts.filter((item) => item.id === val.postId);
          return arr1;
        })
      );
    });
  }
}
