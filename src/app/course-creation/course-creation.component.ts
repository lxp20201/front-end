import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService, AuthenticationService, AlertService } from '../_services';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-course-creation',
  templateUrl: './course-creation.component.html',
  styleUrls: ['./course-creation.component.less']
})
export class CourseCreationComponent implements OnInit {

  CourseCreationForm: FormGroup;
  loading = false;
  userDetails: any;
  platform: string;
  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private authenticationService: AuthenticationService,
      private userService: UserService,
      private alertService: AlertService
  ) {
      console.log(this.router.url)
  }

  ngOnInit() {

    this.CourseCreationForm = this.formBuilder.group({
      course_name: new FormControl('', [Validators.required]),
      course_description: new FormControl('', [Validators.required]),
      course_image: new FormControl('', [Validators.required]),
      course_docs: new FormControl('', [Validators.required]),
      course_video: new FormControl('', [Validators.required]),
    });

  }

   // convenience getter for easy access to form fields///---/^[6-9]\d{9}\1*$/-------\\1{5}
   get f() { return this.CourseCreationForm.controls; }

}
