import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";

import * as moment from "moment";

@Component({
  selector: "app-booking-check",
  templateUrl: "./booking-check.component.html",
  styleUrls: ["./booking-check.component.scss"],
})
export class BookingCheckComponent implements OnInit {
  public checkForm!: FormGroup;
  public isSubmitted: boolean = false;
  public submitState: string = "none";

  public times: string[] = [];

  constructor() {}

  public submit(): void {
    if (this.isSubmitted) {
      return;
    }

    this.isSubmitted = true;
  }

  ngOnInit(): void {
    let timeWindow: number = new Date(2022, 8, 20, 10, 0).getTime();
    const timeWindowFinish: number = new Date(2022, 8, 20, 20, 0).getTime();
    const halfHourMs: number = 1800000; //60s x 30min x 1000ms

    this.times = [];

    while (timeWindow < timeWindowFinish) {
      const time: string = moment(timeWindow).format("HH:mm");
      this.times.push(time);
      timeWindow += halfHourMs;
    }
  }
}
