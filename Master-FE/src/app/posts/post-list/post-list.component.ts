import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { PostService } from "../post.service";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { Post } from "../post.model";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"],
})
export class PostListComponent {
  @Input() posts$: Observable<Post[]>;

  isHidden(id) {
    return id === "tab-1";
  }
}
