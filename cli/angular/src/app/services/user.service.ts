import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {FormControl, Validators} from "@angular/forms";

interface UserForm {
  avatar: string,
  birthdate: string,
  email: string,
  gender: string,
  username: string,
}

interface PasswordForm {
  password: string,
  newPassword: string,
  confirmNewPassword: string,
}

export interface userInfo {
  email: string,
  favorites: string[],
  pwd: string,
  username: string,
  _id: string,
}

@Injectable({ providedIn: 'root' })
export class UserService {

  private  user= localStorage.getItem('userInfo');
  userId: string;

  constructor(private httpClient: HttpClient) {
    this.userId = typeof this.user === "string" ? JSON.parse(this.user).id : ""
  }

  getUserInfo(): Observable<object> {
    return this.httpClient.get(`http://localhost:3000/user/${this.userId}`);
  }

  changeUserFavorite(bookId: string) {
    const body = {
      bookId: bookId
    };
    return this.httpClient.patch(
      `http://localhost:3000/user/${this.userId}/favorites`,
      body);
  }

  changeUserInfo(userForm: UserForm) {
    const body = ({
      avatar: userForm.avatar,
      birthdate: userForm.birthdate,
      email: userForm.email,
      gender: userForm.gender,
      username: userForm.username,
    });
    return this.httpClient.patch(
      `http://localhost:3000/user/${this.userId}/info`,
      body);
  }

  changePassword(passwordForm: PasswordForm) {
    const body = ({
      password: passwordForm.password,
      newPassword: passwordForm.newPassword,
      confirmNewPassword: passwordForm.confirmNewPassword,
    });
    return this.httpClient.patch(
      `http://localhost:3000/user/${this.userId}/password`,
      body
    );
  }
}
