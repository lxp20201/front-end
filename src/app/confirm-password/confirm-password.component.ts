import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from '../_helpers/must-match.validator';
import { AlertService } from '../_services';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.less']
})
export class ConfirmPasswordComponent implements OnInit {
  confirmPasswordForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private alertService: AlertService) { }

  ngOnInit() {
    this.confirmPasswordForm = this.formBuilder.group({
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/)]),
      confirmpassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/)])
    }, {
      validator: MustMatch('password', 'confirmpassword')
    });
  }

  get f() { return this.confirmPasswordForm.controls; }

  onSubmit() {
    console.log('this.confirmPasswordForm',this.confirmPasswordForm)
    this.alertService.clear();
    if (this.confirmPasswordForm.valid) {
      this.post();
    } else {
      this.alertService.error('Please Enter Passwords Correctly!');
      return;
    }
  }

  post() {
    //payload goes here
    var payload = new FormData();
    payload.append('password', this.confirmPasswordForm.value.password);
  }

}
