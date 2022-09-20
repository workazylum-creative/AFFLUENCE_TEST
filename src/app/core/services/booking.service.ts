import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";

type BookingVerify = {
  available: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService extends ApiService {
  constructor(protected http: HttpClient) {
    super();
  }

  public verify(datetime: string): Observable<BookingVerify> {
    return this.http
      .get<BookingVerify>(`${this.baseUrl}/resource/1337/available`, {
        params: {
          datetime,
        },
      })
      .pipe(catchError(this.handleError<BookingVerify>({ available: false })));
  }
}
