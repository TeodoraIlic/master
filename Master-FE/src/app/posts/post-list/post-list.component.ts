import { Component, Input, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { Post } from "../post.model";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"],
})
export class PostListComponent implements OnInit {
  @Input() post: Post;
  isAuthenticated = false;

  constructor(public authService: AuthService) {
  }

  ngOnInit() {
    this.isAuthenticated = this.authService.getIsAuth();
  }

  onCopy() {
    var copyText = document.getElementById("copyServicePath") as HTMLInputElement;
    copyText.select();
    console.log(copyText.value);
    
    navigator.clipboard.writeText(copyText.value);
  }
}
