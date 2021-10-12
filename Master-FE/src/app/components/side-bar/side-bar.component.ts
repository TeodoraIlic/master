import { AfterViewInit, Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { Post } from "src/app/posts/post.model";
import { PostService } from "src/app/posts/post.service";

@Component({
  selector: "app-side-bar",
  templateUrl: "./side-bar.component.html",
  styleUrls: ["./side-bar.component.css"],
})
export class SideBarComponent implements OnInit {
  availableServices: Post[] = [];
  myServices: Post[] = [];
  isLoading = false;
  userIsAuthenticated = false;
  userId: string;
  private postsSub: Subscription;
  private authStatusSub: Subscription;
  currentPage = 1;
  totalPosts = 0;
  postsPerPage = 50;
  pageSizeOptions = [1, 2, 5, 10];
  constructor(
    public postServices: PostService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    window.addEventListener("DOMContentLoaded", () => {
      const tabs = document.querySelectorAll('[role="tab"]');
      // Add a click event handler to each tab
      tabs.forEach((tab) => {
        tab.addEventListener("click", this.changeTabs);
      });
    });


    this.isLoading = true;
    this.postServices.getPosts(this.postsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.postsSub = this.postServices
      .getPostUpdateListener()
      .subscribe((postData: { posts: Post[]; postCount: number }) => {
        this.isLoading = false;
        this.totalPosts = postData.postCount;
        console.log("from side bar", postData);
        this.availableServices = postData.posts.filter(
          (post) => post.creator !== this.userId
        );
        this.myServices = postData.posts.filter(
          (post) => post.creator === this.userId && post.creator !== undefined
        );
      });
 

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

  changeTabs(e) {
    const target = e.target;
    const parent = target.parentNode;
    const grandparent = parent.parentNode;

    // Remove all current selected tabs
    parent
      .querySelectorAll('[aria-selected="true"]')
      .forEach((t) => t.setAttribute("aria-selected", false));

    // Set this tab as selected
    target.setAttribute("aria-selected", true);

    // Hide all tab panels
    grandparent
      .querySelectorAll('[role="tabpanel"]')
      .forEach((p) => p.setAttribute("hidden", true));

    // Show the selected panel
    grandparent.parentNode
      .querySelector(`#${target.getAttribute("aria-controls")}`)
      .removeAttribute("hidden");
  }
}
