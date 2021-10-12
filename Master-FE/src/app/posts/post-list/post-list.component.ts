import { Component, Input, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { Post } from "../post.model";
import { PostCreateComponent } from "../post-create/post-create.component";
@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"],
})
export class PostListComponent implements OnInit {
  @Input() post: Post;
  isAuthenticated = false;
  userId: string;

  constructor(public authService: AuthService) {
  }

  ngOnInit() {
    this.isAuthenticated = this.authService.getIsAuth();
    this.userId = this.authService.getUserId();
  }

  onCopy() {
    var copyText = document.getElementById("copyServicePath") as HTMLInputElement;
    copyText.select();
    console.log(copyText.value);
    
    navigator.clipboard.writeText(copyText.value);
  }
}
