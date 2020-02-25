import { Component, OnInit, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { AuthenticationService, AlertService } from "../_services";
import { AppComponent } from "../app.component";
import Swal from "sweetalert2";
@Component({
  templateUrl: "login.component.html",
  styleUrls: ["./login.component.less"]
})
export class LoginComponent implements OnInit {
  platform: string;
  loginForm: FormGroup;
  submitted = false;
  loading = false;
  returnUrl: string;
  is_staff: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    public app: AppComponent
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params =>{ console.log(params['email'])});
    console.log("this.router.url", this.router.url);
    if (this.router.url == "/LMSlogin") {
      this.platform = "LMS";
      this.is_staff = false;
    }
    if (this.router.url == "/CMSlogin") {
      this.platform = "CMS";
      this.is_staff = true;
    }
    this.loginForm = this.formBuilder.group({
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/
        )
      ])
    });
  }
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      Swal.fire({
        title: "Required!",
        text: "Please fill required details correctly",
        icon: "error",
        confirmButtonText: "OK"
      });
      return;
    }
    this.loading = true;
    this.authenticationService
      .login(this.loginForm.value.password,this.loginForm.value.email,this.is_staff,false)
      .subscribe(result => {
        console.log(result)
        if (result.data["login"].success === true) {
          console.log("inside login success",result.data["login"].message,this.platform);
          if (this.platform == "CMS") {
            localStorage.setItem("currentUserCMS", "true");
            let user_detail = {
              email: result.data["login"].email,
              username: result.data["login"].username,
              _id: result.data["login"]._id,
              name: result.data["login"].name,
              is_staff: result.data["login"].is_staff
            };
            localStorage.setItem("userDetailsCMS", JSON.stringify(user_detail));
            localStorage.setItem("csrfTokenCMS", JSON.stringify( result.data["login"].csrftoken ));
            this.router.navigate(["/CmsHome"]);
          } else if (this.platform == "LMS") {
            localStorage.setItem("userDetailsLMS", JSON.stringify(result.data["login"]["user_detail"]));
            localStorage.setItem("csrfTokenLMS", JSON.stringify(result.data["login"].csrftoken ? result.data["login"].csrftoken : result.data["login"].token ));
            localStorage.setItem("currentUserLMS", "true");
            this.router.navigate(["/home"]);
          }
          this.loading = false;
        } else {
          console.log("inside login error",result.data["login"].message,this.platform);
          if (this.platform == "CMS")
            localStorage.setItem("currentUserCMS", null);
          else if (this.platform == "LMS")
            localStorage.setItem("currentUserLMS", null);
          this.loading = false;
          Swal.fire({
            title: "Failed!",
            text: result.data["login"].message,
            icon: "error",
            confirmButtonText: "OK"
          });
        }
      });
  }
}
