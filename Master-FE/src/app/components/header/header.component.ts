import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../auth/auth.service";
import { Subscription } from "rxjs";
import { PostService } from "src/app/posts/post.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  userId: string;
  postCreatorId: string;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  constructor(
    private authService: AuthService,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    console.log(this.userIsAuthenticated);
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
    this.userId = this.authService.getUserId();
    
  }
  onLogout() {
    this.authService.logout();
  }

  onSave() {
    this.postService.formSaved.next();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
