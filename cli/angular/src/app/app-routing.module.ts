import { UploadedListComponent } from './components/main/uploaded-list/uploaded-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { MainComponent } from './components/main/main.component';
import { AuthGuard } from './guards/auth.guard';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { UserPasswordChangeComponent } from './components/user/user-password-change/user-password-change.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'signin', component: SigninComponent },
      { path: 'signup', component: SignupComponent },
    ],
  },
  { path: 'main', canActivate: [AuthGuard], component: MainComponent },
  {
    path: 'uploaded-list',
    canActivate: [AuthGuard],
    component: UploadedListComponent,
  },
  {
    path: 'user/favorites',
    canActivate: [AuthGuard],
    component: MainComponent,
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    component: UserComponent,
    children: [
      { path: 'edit', canActivate: [AuthGuard], component: UserEditComponent },
      {
        path: 'change-password',
        canActivate: [AuthGuard],
        component: UserPasswordChangeComponent,
      },
    ],
  },
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: '**', redirectTo: 'main' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
