import { Component, OnInit } from "@angular/core";

import { PostService } from "../post.service";
import { ActivatedRoute } from "@angular/router";
import { forkJoin, Observable, of } from "rxjs";
import { filter, map, mergeMap, switchMap } from "rxjs/operators";
@Component({
  template: ` <app-post-list [posts$]="[posts$]"></app-post-list> `,
})
export class PostListContainer implements OnInit {
  posts$ = new Observable();
  constructor(public postService: PostService, public route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("postId");
    forkJoin({
      source1: this.route.params,
      source2: this.postService.getPostUpdateListener(),
    })
      // .pipe(
      //   mergeMap((val) => {
      //     console.log("ISID", val);
      //     return of(1);
      //   })
      // )
      .subscribe((val) => {
        console.log("STA", val);
      });
    this.posts$ = this.postService.getPostUpdateListener().pipe(
      switchMap((res) => res.posts),
      filter((value) => value.id === id)
    );

    this.posts$.subscribe((value) => {
      console.log(value);
    });
  }
}
