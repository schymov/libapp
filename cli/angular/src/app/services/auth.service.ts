import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface SignInFormValue {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  signin(authForm: SignInFormValue): Observable<{ token: string }> {
    return this.httpClient.post<{ token: string }>(
      `http://localhost:3000/auth/signin`,
      authForm
    );
  }
  // signup(): Observable<any> {}
  // getAllBooks(): Observable<any> {}
  // getFavoriteBooks(): Observable<any> {}

  data: string = '';
}
