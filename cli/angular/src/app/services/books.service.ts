import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class BooksService {

  constructor(private httpClient: HttpClient) { }

  getAllBooks(): Observable<any>{
    return this.httpClient.get(`http://localhost:3000/lib/books`);
  }
}
