import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

interface Upload {
  _id: string;
  uploadPath: string;
}

@Injectable({ providedIn: 'root' })
export class UploadService {
  // private newBooks: Array<Upload> = [];
  // private newBooks$ = new Subject<Array<Upload>>();

  constructor(private httpClient: HttpClient) {}

  getUpload(): Observable<Array<string>> {
    return this.httpClient.get<Array<string>>(
      'http://localhost:3000/lib/upload'
    );
  }
  addUpload(file: File): void {
    const fileData = new FormData();

    fileData.append('file', file);
    this.httpClient
      .post<Upload>('http://localhost:3000/lib/upload', fileData)
      .subscribe((fileData: Upload) => {
        // const book: Upload = { ...fileData };
      });
  }
}
