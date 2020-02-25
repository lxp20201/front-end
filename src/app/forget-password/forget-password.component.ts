import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { AuthenticationService } from "../_services";
import { AppComponent } from "../app.component";
import Swal from "sweetalert2";
@Component({
  selector: "app-forget-password",
  templateUrl: "./forget-password.component.html"
  // styleUrls: ['./forget-password.component.less']
})
export class ForgetPasswordComponent implements OnInit {
  platform: string;
  ForgetPasswordForm: FormGroup;
  submitted = false;
  loading = false;
  returnUrl: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    public app: AppComponent
  ) {}

  ngOnInit() {
    if (this.router.url == "/LMSForgetPassword") this.platform = "LMS";
    if (this.router.url == "/CMSForgetPassword") this.platform = "CMS";
    this.ForgetPasswordForm = this.formBuilder.group({
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
      ])
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.ForgetPasswordForm.controls;
  }

  onSubmit() {
    if (this.ForgetPasswordForm.invalid) {
      Swal.fire({
        title: "Required!",
        text: "Please enter your email",
        icon: "error",
        confirmButtonText: "OK"
      });
      return;
    }
    console.log(
      "this.ForgetPasswordForm.value.email",
      this.ForgetPasswordForm.value.email
    );
    var name = this.ForgetPasswordForm.value.email.lastIndexOf("@");
    this.authenticationService
      .forgetPassword(
        this.ForgetPasswordForm.value.email,
        name,
        this.platform == "CMS" ? true : false
      )
      .subscribe(result => {
        if (result.data["resetpassword"].success === true) {
          this.router.navigate(["/home"]);
          Swal.fire(
            "Success!",
            "A mail has been sent to your account",
            "success"
          );
        } else {
          Swal.fire("Failed!", result.data["resetpassword"].message, "error");
        }
      });
  }
}
