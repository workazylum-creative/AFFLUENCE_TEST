import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export abstract class ApiService {
  protected baseUrl: string = environment.apiUrl;

  protected handleError<T>(result: T, callback?: (error: any) => void) {
    return (error: any): Observable<T> => {
      if (callback) {
        callback(error);
      }

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
