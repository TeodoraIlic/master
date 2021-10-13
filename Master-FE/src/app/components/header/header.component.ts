import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../auth/auth.service";
import { Subscription } from "rxjs";
import { PostService } from "src/app/posts/post.service";
import { ActivatedRoute } from "@angular/router";
import { Post } from "src/app/posts/post.model";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  userId: string;
  postCreatorId: string;
  userIsAuthenticated = false;
  selectedPost: Post;
  private authListenerSubs: Subscription;

  constructor(
    private authService: AuthService,
    private postService: PostService
  ) {}

  ngOnInit() {

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
    this.userId = this.authService.getUserId();
    this.postService.selectedPost.subscribe((value) => {
      this.selectedPost = value;
      console.log("selected post",!!value, value);
      console.log("show save button", (this.selectedPost && this.selectedPost.creator !== this.userId))
    });
  }
  onLogout() {
    this.authService.logout();
  }

  onDelete() {
    this.postService.deletePost(this.selectedPost.id);
  }

  onSave() {
    this.postService.formSaved.next();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
