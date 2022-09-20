import { Injectable } from "@angular/core";

import { ApiService } from "./api.service";

export type BookingVerify = {
  available: boolean;
};

@Injectable({
  providedIn: "root",
})
export class BookingService extends ApiService {
  public verify(datetime: string): Promise<BookingVerify> {
    return this.get<BookingVerify>(`${this.baseUrl}/resource/1337/available`, { datetime });
  }
}
