import { BookingConfirmComponent } from "./feature/booking-confirm/booking-confirm.component";
import { BookingCheckComponent } from "./feature/booking-check/booking-check.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "check",
    canActivate: [],
    component: BookingCheckComponent,
  },
  {
    path: "confirm/:datetime",
    canActivate: [],
    component: BookingConfirmComponent,
  },
  { path: "**", redirectTo: "check" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
