import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

interface AuthForm {
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
}

@Injectable({
  providedIn: 'root'
})
export class SingupService {

  constructor(private httpClient: HttpClient) { }

  postUser(authForm: AuthForm) {
    const body = ({
      username: authForm.username,
      email: authForm.email,
      pwd: authForm.password,
    });
    return this.httpClient.post(
      'http://localhost:3000/auth/signup',
      body
    )
  }
}
