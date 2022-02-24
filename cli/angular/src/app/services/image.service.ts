import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Subject } from "rxjs";

interface userImage {
  _id: string;
  userId: string;
  imagePath: string;
}

@Injectable({ providedIn: 'root' })
export class ImageService {
  private userImages: userImage[] = [];
  private userImages$ = new Subject<userImage[]>();
  constructor(private httpClient: HttpClient) {}

  getImage(userId: string) {
    return this.httpClient.get(`http://localhost:3000/user/images/${userId}`);
  }

  addImage(id: string, image: File): void {
    const imageData = new FormData();
    imageData.append("userId", id);
    imageData.append("image", image, id);
    this.httpClient
      .post<{ image: userImage }>(
        "http://localhost:3000/user/images",
        imageData)
      .subscribe((imageData) => {
        const image: userImage = {
          _id: imageData.image._id,
          userId: id,
          imagePath: imageData.image.imagePath,
        };
        this.userImages.push(image);
        this.userImages$.next(this.userImages);
      });
  }
}
