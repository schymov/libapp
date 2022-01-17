import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [AuthGuard],
    component: AuthComponent,
    children: [
      { path: 'signin', canActivate: [AuthGuard], component: SigninComponent },
      { path: 'signup', canActivate: [AuthGuard], component: SignupComponent },
    ],
  },
  { path: '', redirectTo: 'auth/signin', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
