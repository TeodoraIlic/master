import { Injectable } from "@angular/core";
import { Subject, Subscriber, Subscription } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { environment } from "../../environments/environment";
import { Post } from "./post.model";

const BACKEND_URL = environment.apiUrl + "/posts/";
@Injectable({ providedIn: "root" })
export class PostService {
  public posts: Post[] = [];
  private postsUpdated = new Subject<{ posts: Post[]; postCount: number }>();
  formSaved = new Subject();
  selectedPost = new Subject<Post>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pageSize=${postsPerPage}&page=${currentPage}`;

    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        BACKEND_URL + queryParams
      )
      .pipe(
        map((postData) => {
          return {
            posts: postData.posts.map((post) => {
              return {
                title: post.title,
                content: post.content,
                id: post.id,
                imagePath: post.imagePath,
                creator: post.creator,
                servicePath: post.servicePath,
                serviceName: post.serviceName
              };
            }),
            maxPosts: postData.maxPosts,
          };
        })
      )
      .subscribe((transformedPostData) => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts,
        });
      });
  }
  get getLocalPosts() {
    return this.posts;
  }
  getPost(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      filePath: string;
      creator: string;
      servicePath: string;
    }>(BACKEND_URL + id);
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string, servicePath: string, file: File) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("servicePath", servicePath);
    postData.append("file", file);

    this.http
      .post<{ message: string; post: Post }>(BACKEND_URL, postData)
      .subscribe((responseData) => {
        this.getPosts(50, 1);
        this.selectedPost.next(null);
        this.router.navigate(["/"]);
      });
  }

  updatePost(id: string, title: string, content: string, file: File | string) {
    let postData: Post | FormData;
    if (typeof file === "object") {
      postData = new FormData();
      postData.append("id", id);
      postData.append("title", title);
      postData.append("content", content);
      postData.append("file", file, title);
    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        filePath: file,
        creator: null,
      };
    }

    this.http.put(BACKEND_URL + id, postData).subscribe((res) => {
      this.router.navigate(["/"]);
    });
  }

  deletePost(postId: string) {
    return this.http.delete(BACKEND_URL + postId).subscribe((val) => {
      this.postsUpdated.next({
        posts: this.posts.filter((item) => item.id !== val),
        postCount: 50,
      });
      this.selectedPost.next(null);
      this.getPosts(50, 1);
      this.router.navigate(["create"]);
    });
  }
}
