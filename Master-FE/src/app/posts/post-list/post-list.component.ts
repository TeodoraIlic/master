import { Component, OnInit, OnDestroy } from "@angular/core";
import { posts } from "../../../mocks/posts.mocks";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"],
})
export class PostListComponent implements OnInit, OnDestroy {
  posts = posts;
  ngOnInit() {}
  ngOnDestroy() {}

  isHidden(id) {
    return id === "tab-1";
  }
}
