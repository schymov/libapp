import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FavoritesService {

  private user = localStorage.getItem('userInfo');
  userId: any;

  constructor(private httpClient: HttpClient) {
    if (typeof this.user === "string") {
      this.userId = JSON.parse(this.user).username
    } else {
      this.userId = null
    }
  }

  getUserInfo() {
      return this.httpClient.get(`http://localhost:3000/user/${this.userId}`);
      console.log("get favorites");
  }

  changeUserFavorite(bookId: string) {
    const body = ({
      bookId: bookId
    });
    console.log(body);
    return this.httpClient.patch(
      `http://localhost:3000/user/${this.userId}/favorites`,
      body);
  }
}
