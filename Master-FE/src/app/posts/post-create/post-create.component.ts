import {
  Component,
  OnInit,
  OnDestroy,
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
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
  isAuthenticated = false;

  private mode = "create";
  private postId: string;
  private authStatusSub: Subscription;
  private postSaveSub: Subscription;

  constructor(
    public postService: PostService,
    public route: ActivatedRoute,
    public authService: AuthService
  ) {}

  ngOnInit() {

    this.postSaveSub = this.postService.formSaved.subscribe(() => {
      this.onSavePost();
    });

    this.isAuthenticated = this.authService.getIsAuth();

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
      file: new FormControl(null, {}),
      servicePath: new FormControl(null, {}),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("postId")) {
        this.mode = "edit";
        this.postId = paramMap.get("postId");
        this.postService.getPost(this.postId).subscribe((postData) => {
          console.log("Edit mode", postData);
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
            filePath: postData.filePath,
            creator: postData.creator,
            servicePath: postData.servicePath
          };
          this.postService.selectedPost.next(this.post);
          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
            file: this.post?.filePath ? this.post?.filePath : "",
            servicePath: this.post?.servicePath ? this.post?.servicePath : "",
          });
        });
        //to prepopulate form, to override FormControls values
        //witch we set above(values are null at first, becouse first argument of FormControl)
        console.log("evo me ovde",this.post);
      } else {
        this.mode = "create";
        this.postService.selectedPost.next(null);
        this.postId = null;
      }
    });
  }
  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
    this.postSaveSub.unsubscribe();
  }

  onSavePost() {
    this.isLoading = true;
    console.log("POST SAVE", this.form);
    if (this.form.invalid) {
      console.log("INVALID FORM", this.form);
      return;
    }
    if (this.mode === "create") {
      console.log("Create");
      console.log(this.form.value.file);
      this.postService.addPost(
        this.form.value.title,
        this.form.value.content,
        this.form.value.servicePath,
        this.form.value.file
      );
    } else {
      console.log("Update");
      this.postService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.filePath
      );
    }
    this.form.reset();
  }
  onFilePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    //target a single control
    //file is file object
    this.form.patchValue({ file: file });
    this.form.get("file").updateValueAndValidity();
    //convert image into data url, witch can be used by
    //normal <img> tag
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
