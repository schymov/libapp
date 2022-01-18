import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SingupService {

  constructor(private httpClient: HttpClient) { }

  postUser(authForm: any) {
    const body = {
      username: authForm.username,
      email: authForm.email,
      pwd: authForm.password,
    };
    return this.httpClient.post(
      'localhost:3000/auth/signup',
      body
    )
  }
}
