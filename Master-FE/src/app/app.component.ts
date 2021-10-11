import { Component, OnInit } from "@angular/core";
import { Post } from "./posts/post.model";
import { AuthService } from "./auth/auth.service";
import { PostService } from "./posts/post.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private postService: PostService
  ) {
    this.authService.autoAuthUser();
    this.postService.getPosts(50, 1);
  }
}
