import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AuthService } from "src/app/auth/auth.service";
import { Post } from "../post.model";
@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"],
})
export class PostListComponent implements OnInit {
  @Input() post: Post;
  @Output() onDownload: EventEmitter<void> = new EventEmitter();
  isAuthenticated = false;
  userId: string;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.getIsAuth();
    this.userId = this.authService.getUserId();
  }

  onDownloadClick() {
    this.onDownload.emit();
  }

  onCopy() {
    var copyText = document.getElementById(
      "copyServicePath"
    ) as HTMLInputElement;
    copyText.select();
    console.log(copyText.value);

    navigator.clipboard.writeText(copyText.value);
  }
}
