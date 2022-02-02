import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {

  private user = localStorage.getItem('userInfo');
  userId: string;

  constructor(private httpClient: HttpClient) {
    this.userId = typeof this.user === "string" ? JSON.parse(this.user).id : ""
  }

  getUserInfo() {
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
}
