import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsModalModule, BsModalService } from 'ng2-bs3-modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from "./service/user.service";
import { AuthService } from './auth/auth.service';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { HttpClientModule } from '@angular/common/http';

//angular2-jwt config
import { AuthHttp, AuthConfig } from 'angular2-jwt';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig(), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BsModalModule,
    HttpModule,
    FormsModule,
    NgbModule.forRoot(),
    HttpClientModule,
  ],
  providers: [
    UserService,
    BsModalService,
    NgbModal,
    AuthService,
    AuthGuard,
    //angular2-jwt config
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
