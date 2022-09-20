import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import * as moment from "moment";

type FormInfos = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  save: boolean;
};

@Component({
  selector: "app-booking-confirm",
  templateUrl: "./booking-confirm.component.html",
  styleUrls: ["./booking-confirm.component.scss"],
})
export class BookingConfirmComponent implements OnInit {
  public date!: string;
  public confirmForm!: FormGroup;
  public isSubmitted: boolean = false;

  private formInfos: FormInfos = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    save: false,
  };

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  private get userInfos(): FormInfos {
    return {
      firstname: this.confirmForm.value.firstname ?? this.formInfos.firstname,
      lastname: this.confirmForm.value.lastname ?? this.formInfos.lastname,
      email: this.confirmForm.value.email ?? this.formInfos.email,
      phone: this.confirmForm.value.phone ?? this.formInfos.phone,
      save: this.confirmForm.value.save ?? this.formInfos.save,
    };
  }

  public submit(): void {
    if (this.isSubmitted) {
      return;
    }

    this.isSubmitted = true;

    if (this.confirmForm.value.save) {
      localStorage.setItem("user-infos", JSON.stringify(this.userInfos));
    } else {
      localStorage.clear();
    }

    this.toastr.success("your reservation has been has been registered!");
    this.router.navigateByUrl("check");
  }

  public ngOnInit(): void {
    const localInfos: string | null = localStorage.getItem("user-infos");

    this.formInfos = localInfos ? { ...this.formInfos, ...JSON.parse(localInfos) } : this.formInfos;

    this.confirmForm = this.formBuilder.group({
      firstname: [this.formInfos.firstname, Validators.required],
      lastname: [this.formInfos.lastname, Validators.required],
      email: [this.formInfos.email, Validators.compose([Validators.required, Validators.email])],
      phone: [this.formInfos.phone, Validators.pattern(/^(\+33\s*|0)[1-9](\s*\d\d){4}$/)],
      accept: [false, Validators.compose([Validators.required, Validators.requiredTrue])],
      save: [this.formInfos.save],
    });

    this.route.params.subscribe((params: any) => {
      const datetime: number = parseInt(params.datetime);
      this.date = moment(datetime).format("YYYY-MM-DD hh:mm:ss");
    });
  }
}
