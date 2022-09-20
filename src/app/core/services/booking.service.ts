import { Injectable } from "@angular/core";

import { BookingVerify } from "src/typings/booking";
import { ApiService } from "src/app/core/services/api.service";

@Injectable({
  providedIn: "root",
})
export class BookingService extends ApiService {
  public verify(datetime: string): Promise<BookingVerify> {
    return this.get<BookingVerify>(`${this.baseUrl}/resource/1337/available`, { datetime });
  }
}
