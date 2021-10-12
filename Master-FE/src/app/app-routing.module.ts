import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { AuthGuard } from "./auth/auth.guard";
import { PostListContainer } from "./posts/containers/post-list.container";
import { LeanpageComponent } from "./components/leanpage/leanpage.component";
import { HelpPageComponent } from "./components/help-page/help-page.component";

const routes: Routes = [
  { path: "", component: LeanpageComponent },
  {
    path: "create",
    component: PostCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "create/:postId",
    component: PostCreateComponent,
    canActivate: [AuthGuard],
  },
  { path: "post/:postId", component: PostListContainer },
  {
    path: "edit/:postId",
    component: PostCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "help",
    component: HelpPageComponent,
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
