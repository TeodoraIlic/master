import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  OnDestroy,
} from "@angular/core";
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";
import { Post } from "../post.model";
import { PostService } from "../post.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { mimeType } from "./mime-type.validator";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"],
})
export class PostCreateComponent implements OnInit, OnDestroy {
  enteredTitle = "";
  enteredContent = "";
  isLoading: boolean = false;
  form: FormGroup;
  post: Post;
  imagePreview: string;

  private mode = "create";
  private postId: string;
  private authStatusSub: Subscription;

  constructor(
    public postService: PostService,
    public route: ActivatedRoute,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("postId")) {
        this.mode = "edit";
        this.postId = paramMap.get("postId");
        this.postService.getPost(this.postId).subscribe((postData) => {
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
            creator: postData.creator,
          };
        });
        //to prepopulate form, to override FormControls values
        //witch we set above(values are null at first, becouse first argument of FormControl)
        this.form.setValue({
          title: this.post.title,
          content: this.post.content,
        });
      } else {
        this.mode = "create";
        this.postId = null;
      }
    });
  }
  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
  onSavePost() {
    console.log("ON SAVE POST");
    this.isLoading = true;
    if (this.form.invalid) {
      return;
    }
    if (this.mode === "create") {
      console.log("Create");

      this.postService.addPost(this.form.value.title, this.form.value.content);
    } else {
      console.log("Update");
      this.postService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content
      );
    }
    this.form.reset();
  }
}
