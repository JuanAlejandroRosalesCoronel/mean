import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { UserComponent } from "./user/user.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./guard/auth.guard";

const routes: Routes = [
  { path: '',
  redirectTo: 'home',
   pathMatch: 'full'
 },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    NgbModule.forRoot()
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
