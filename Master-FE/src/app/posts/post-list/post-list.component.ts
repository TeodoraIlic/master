import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { PostService } from "../post.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"],
})
export class PostListComponent {
  @Input() posts$;

  isHidden(id) {
    return id === "tab-1";
  }
}
