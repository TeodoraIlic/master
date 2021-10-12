import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { PostModule } from "./posts/post.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { AuthInterceptor } from "./auth/auth-interceptor";
import { ErrorInterceptor } from "./error-interceptor";
import { ErrorComponent } from "./components/error/error.component";
import { AngularMaterialModule } from "./angular-material.module";
import { LayoutComponent } from "./components/layout/layout.component";
import { SideBarComponent } from "./components/side-bar/side-bar.component";
import { AuthModule } from "./auth/auth.module";
import { FooterComponent } from "./components/footer/footer.component";
import { LeanpageComponent } from './components/leanpage/leanpage.component';
import { HelpPageComponent } from './components/help-page/help-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LayoutComponent,
    ErrorComponent,
    SideBarComponent,
    FooterComponent,
    LeanpageComponent,
    HelpPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    PostModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent],
})
export class AppModule {}
