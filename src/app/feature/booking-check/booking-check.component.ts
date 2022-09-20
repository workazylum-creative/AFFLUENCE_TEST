import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

import { BookingService, BookingVerify } from "src/app/core/services/booking.service";

import * as moment from "moment";

@Component({
  selector: "app-booking-check",
  templateUrl: "./booking-check.component.html",
  styleUrls: ["./booking-check.component.scss"],
})
export class BookingCheckComponent implements OnInit {
  public checkForm!: FormGroup;
  public isSubmitted: boolean = false;
  public times: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private bookingService: BookingService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  public submit(): void {
    if (this.isSubmitted) {
      return;
    }

    this.isSubmitted = true;

    const date: moment.Moment = moment(`${this.checkForm.value.date} ${this.checkForm.value.time}`);
    const datetime: string = date.format();

    this.bookingService.verify(datetime).then(
      (payload: BookingVerify) => {
        if (!payload.available) {
          this.toastr.error("this slot is not not available");
        } else {
          this.router.navigateByUrl(`confirm/${date.valueOf()}`);
        }
        this.reset();
      },
      (error: any) => {
        this.toastr.error("an error has occurred");
        this.reset();
      },
    );
  }

  public ngOnInit(): void {
    this.checkForm = this.formBuilder.group({
      date: ["", Validators.required],
      time: ["", Validators.required],
    });

    let timeWindow: number = moment().set({ hour: 10, minute: 0, second: 0 }).valueOf();
    const timeWindowFinish: number = moment().set({ hour: 20, minute: 0, second: 0 }).valueOf();

    this.times = [];

    while (timeWindow <= timeWindowFinish) {
      let time: moment.Moment = moment(timeWindow);
      this.times.push(time.format("HH:mm"));
      timeWindow = time.add(30, "minutes").valueOf();
    }
  }

  public ngOnDestroy(): void {
    this.bookingService.unsubscribe();
  }

  private reset(): void {
    this.isSubmitted = false;
    this.checkForm.reset();
  }
}
