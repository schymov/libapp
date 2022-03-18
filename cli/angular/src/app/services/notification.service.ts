import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  public notificationURL = 'http://localhost:3000/subscribe';

  constructor(private httpClient: HttpClient) {}

  postSubscription(sub: PushSubscription): Observable<any> {
    return this.httpClient
      .post(this.notificationURL, sub)
      .pipe(catchError(this.handlError));
  }
  handlError(error: any) {
    return throwError(error.error.message);
  }
}
