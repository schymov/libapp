import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class TestService {

  constructor(private httpClient: HttpClient) { }

  get(): Observable<any>{
    return this.httpClient.get(`http://localhost:3000/lib/books`);
  }
}
