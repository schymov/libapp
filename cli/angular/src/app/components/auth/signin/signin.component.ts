import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PopUpComponent } from 'src/app/common/pop-up/pop-up.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  public hide: boolean = true;
  public authForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialogRef: MatDialog
  ) {}

  ngOnInit(): void {}

  parseJwt(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }

  signIn() {
    this.authService.signin(this.authForm.value).subscribe({
      next: (result: { token: string }) => {
        const tokenData = this.parseJwt(result.token.split(' ')[1]);
        localStorage.setItem('userInfo', JSON.stringify(tokenData));
        const redirectUrl = window.location.origin + '/main';
        window.location.replace(redirectUrl);
      },
      error: (err: HttpErrorResponse) => {
        this.dialogRef.open(PopUpComponent, {
          data: {
            message: this.getErrorMessage(err.status),
            buttonText: 'Ok',
            redirect: '',
          },
        });
      },
    });
  }

  getErrorMessage(status: number) {
    switch (status) {
      case 401:
        return 'That password was incorrect. Please try again';
      case 404:
        return 'User not found. Please try again';
      default:
        return 'Invalid request';
    }
  }
}
