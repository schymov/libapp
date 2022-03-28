import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

interface Upload {
  _id: string;
  uploadPath: string;
}

@Injectable({ providedIn: 'root' })
export class UploadService {
  // private newBooks: Array<Upload> = [];
  // private newBooks$ = new Subject<Array<Upload>>();

  constructor(private httpClient: HttpClient) {}

  getUpload(userId: string) {
    // return this.httpClient.get(`http://localhost:3000/user/images/${userId}`);
  }
  addUpload(file: File): void {
    const fileData = new FormData();
    fileData.append('file', file);
    this.httpClient
      .post<Upload>('http://localhost:3000/lib/upload', fileData)
      .subscribe((fileData) => {
        const book: Upload = { ...fileData };
        // console.log(book);
        // this.newBooks.push(book);
        // this.newBooks$.next(this.newBooks);
      });
  }
}
