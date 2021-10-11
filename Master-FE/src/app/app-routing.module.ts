import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { AuthGuard } from "./auth/auth.guard";
import { PostListContainer } from "./posts/containers/post-list.container";

const routes: Routes = [
  { path: "", component: PostCreateComponent },
  {
    path: "create",
    component: PostCreateComponent,
    canActivate: [AuthGuard],
  },
  { path: ":postId", component: PostListContainer },
  {
    path: "edit/:postId",
    component: PostCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
