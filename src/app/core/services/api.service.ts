import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, Subject, takeUntil, throwError } from "rxjs";

import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export abstract class ApiService {
  protected destroy$ = new Subject();
  protected baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public unsubscribe(): void {
    if (this.destroy$) {
      this.destroy$.next(null);
      this.destroy$.complete();
    }
  }

  protected get<T>(url: string, params: any): Promise<T> {
    return new Promise((resolve, reject) => {
      this.http
        .get<T>(url, { params: params })
        .pipe(takeUntil(this.destroy$), catchError(this.handleError<T>((error: any) => reject(error))))
        .subscribe((payload: T) => resolve(payload));
    });
  }

  protected handleError<T>(callback?: (error: any) => void) {
    return (error: any): Observable<T> => {
      if (callback) {
        callback(error);
      }

      return throwError(() => error);
    };
  }
}
