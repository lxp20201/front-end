import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { UserService, AuthenticationService, AlertService } from "../_services";
import Swal from "sweetalert2";

@Component({
  selector: "app-course-creation",
  templateUrl: "./course-creation.component.html",
  styleUrls: ["./course-creation.component.less"]
})
export class CourseCreationComponent implements OnInit {
  CourseCreationForm: FormGroup;
  loading = false;
  userDetails: any;
  platform: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    console.log(this.router.url);
  }

  ngOnInit() {
    this.CourseCreationForm = this.formBuilder.group({
      course_name: new FormControl("", [Validators.required]),
      course_description: new FormControl("", [Validators.required]),
      // course_image: new FormControl('', []),
      // course_docs: new FormControl('', []),
      // course_video: new FormControl('', []),
      organization_name: new FormControl("", [Validators.required]),
      course_number: new FormControl("", [Validators.required]),
      course_run: new FormControl("", [Validators.required])
    });
  }

  // convenience getter for easy access to form fields///---/^[6-9]\d{9}\1*$/-------\\1{5}
  get f() {
    return this.CourseCreationForm.controls;
  }

  reset() {
    this.CourseCreationForm.reset();
  }

  onSubmit() {
    var user = localStorage.getItem("userDetailsCMS");
    var detail = JSON.parse(user);
    console.log(
      this.CourseCreationForm.value.course_name,
      this.CourseCreationForm.value.course_description,
      detail._id,
      this.CourseCreationForm.value.course_image,
      this.CourseCreationForm.value.course_video,
      this.CourseCreationForm.value.course_docs
    );
    this.authenticationService
      .courseCreate(
        this.CourseCreationForm.value.course_name,
        this.CourseCreationForm.value.course_description,
        detail._id,
        [
          "https://documenter.getpostman.com/view/3561265/SzKQxfpk?version=latest"
        ],
        [
          "https://documenter.getpostman.com/view/3561265/SzKQxfpk?version=latest"
        ],
        [
          "https://documenter.getpostman.com/view/3561265/SzKQxfpk?version=latest"
        ],
        this.CourseCreationForm.value.organization_name,
        this.CourseCreationForm.value.course_number,
        this.CourseCreationForm.value.course_run
      )
      .subscribe((result: any) => {
        console.log(result);
        if (result.data.coursecreation.success === true) {
          Swal.fire("Success!", "Course created successfully", "success");
        } else {
          Swal.fire("Failed!", result.data.coursecreation.error.CourseErrMsg, "error");
          Swal.fire("Failed!", result.data.coursecreation.error.OrgErrMsg, "error");
          Swal.fire("Failed!", result.data.coursecreation.error.ErrMsg, "error");
        }
      });
  }
}
