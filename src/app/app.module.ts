import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BookingCheckComponent } from "./feature/booking-check/booking-check.component";
import { BookingConfirmComponent } from "./feature/booking-confirm/booking-confirm.component";

@NgModule({
  declarations: [AppComponent, BookingCheckComponent, BookingConfirmComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
